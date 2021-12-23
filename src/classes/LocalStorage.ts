/**
 * @module Local Storage
 */

import { TFilter } from '@type/product';
import UserAPI from '@api/UserAPI';
import ProductAPI from '@api/ProductAPI';
import {
  TCurrency,
  IProductLocalStorageData,
  IUserLocalStorageData,
  TLocalData,
} from '@type/local-storage';
import { authAPI } from '@api/authApi';
import HeaderAuth from '@classes/HeaderAuth';

/**
 * Класс для работы с локальным хранилищем
 */

class LocalStorage {
  /** ID пользователя для рабоаты */
  #userId = '';

  /** Валюта продуктов */
  #currency = 'PLN' as TCurrency;

  /**
   * Метод для получения валюты продуктов
   */

  getCurrency() {
    return this.#currency;
  }

  /**
   * Метод для получения данных из локального хранилища
   * @param id ID запрашиваемых данных
   */

  getLocalData(id: string): TLocalData {
    const dataJson: string | null = localStorage.getItem(`${id}`);
    if (dataJson) return JSON.parse(dataJson);
    return null;
  }

  setLocalData(id: string, data:string){
    localStorage.setItem(id, data);
  }

  /**
   * Метод для отправки данных пользователя с локального хранилища в БД
   */

  async sendUserData() {
    const userData = this.getLocalData('user') as IUserLocalStorageData | null;
    if (userData) {
      const data = await UserAPI.changeUserData(userData.data);
    }
  }

  /**
   * Метод для получения данных пользователя из БД и сохранения их в локальное хранилище
   */

  async refreshUserData() {
    try {
      const userData = await authAPI.refresh();
      this.#userId = userData.profile.id;
      return userData.profile;
    } catch (e) {
      console.log(`refreshUserData   error:${e}`);
    }

  }


  async updateUserData() {
    const userData = await UserAPI.getUserByID(this.#userId);
    if (!userData) return null;
    const localUserData = {
      data: userData,
      dateAdded: Date.now(),
    };
    localStorage.setItem('user',  JSON.stringify(localUserData));
    //this.setLocalData('user',  JSON.stringify(localUserData))

    localStorage.setItem('user', JSON.stringify(localUserData));

    return userData;
  }


  /**
   * Метод для получения продуктов по типу из БД и сохранения их в локальное хранилище
   * @param filter - тип продукта
   */

  async updateProductDataByFilter(filter: TFilter | 'All') {
    const productDataByFilter = await ProductAPI.getProductsByFilter(
      filter,
      this.#currency,
    );
    if (!productDataByFilter) return null;
    const localProductData = {
      data: productDataByFilter,
      dateAdded: Date.now(),
    };
    localStorage.setItem(filter,  JSON.stringify(localProductData));
    //this.setLocalData(filter,  JSON.stringify(localProductData))
    return productDataByFilter;
  }

  /**
   * Главный метод для получения продуктов
   * @param filter - тип продукта
   */

  async getProductDataByFilter(filter: TFilter | 'All') {
    const productDataStorageByFilter = this.getLocalData(
      filter,
    ) as IProductLocalStorageData | null;
    if (!productDataStorageByFilter) {

      const $spinner = document.getElementById("spinner")
      if($spinner) $spinner.style.display="block"

      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter)  {
        if($spinner) $spinner.style.display="none"
        return productDataByFilter;
      }
      if($spinner) $spinner.style.display="none"
    } else if (Date.now() - productDataStorageByFilter.dateAdded < 3000000) {
      // 3000000 - 10 минут - максимальное время актуальности данных в локальном хранилище
      setTimeout(() => {
        // запрос на получение новых данных после отрисоки на основе данных из локального хранилища
        this.updateProductDataByFilter(filter).then(() => {});
      });
      return productDataStorageByFilter.data;
    } else {
      const $spinner = document.getElementById("spinner")
      if($spinner) $spinner.style.display="block"
      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter) {
        if($spinner) $spinner.style.display="none"
        return productDataByFilter;
      }
      if($spinner) $spinner.style.display="none"
    }
    return null;
  }

  /**
   * Главный метод для получения данных пользователя
   */

  async getUserData() {
    const isAuth=this.getLocalData('auth',)
    //console.log(`getUserData  auth:${isAuth}`)
    if(isAuth){
      const userDataStorage = this.getLocalData(
        'user',
      ) as IUserLocalStorageData | null;
      if (!userDataStorage) {
        try {
          const userData = await this.updateUserData();
          if (userData) return userData;
          else return null
        }catch (e) {
          return null
        }

      } else if (Date.now() - userDataStorage.dateAdded < 3000000) {
        // 3000000 - 10 минут
        return userDataStorage.data;
      } else {
        const userData = await this.updateUserData();
        if (userData) return userData;
        else return null
      }
    }else {
      return null
    }

  }

  /**
   * Метод для получения продуктов из БД по списку из пользовательских данных
   * @param listType - тип списка
   */

  async getListData(listType: 'shoppingList' | 'wishlist') {
    // всегда берем актуальные данные с сервера по списку id
    const userData = await this.getUserData();
    if (userData) {
      if (userData[listType].length > 0) {
        const $spinner = document.getElementById("spinner")
        if($spinner) $spinner.style.display="block"
        const productData =  await ProductAPI.getProductsByList(userData[listType], this.#currency);
        if(productData){
          if($spinner) $spinner.style.display="none"
          return productData
        }else{
          if($spinner) $spinner.style.display="none"
          return null
        }
      }
    }
    return null;
  }

  /**
   * Метод для изменения локальной корзины пользователя
   * @param productId ID продукта
   * @param listType выбор типа списка продуктов
   */

  changeUserProductList(
    productId: string,
    listType: 'shoppingList' | 'wishlist',
  ): IUserLocalStorageData | null {
    const user = this.getLocalData('user') as IUserLocalStorageData | null;
    if (user) {
      const index: number = user.data[listType].indexOf(productId);
      if (index !== -1) {
        user.data[listType].splice(index, 1);
      } else {
        user.data[listType].push(productId);
      }
      localStorage.setItem('user', JSON.stringify(user));
      // передача пользовательских данных на сервер после отрисовки
      setTimeout(() => this.sendUserData());
      return user;
    }
    return null;
  }

  async loginSubmit(event: any) {
    //console.log('loginSubmit');
    //console.log(event);
    const usedDada = {
      email: event.target.form[0].value,
      password: event.target.form[1].value,
    };
   // console.log(usedDada);

    try {
      const user = await authAPI.login(usedDada.email, usedDada.password);
      if (user) {
        localStorage.setItem('token',  user.accessToken);
        //this.setLocalData('token', user.accessToken)
        const localUserData = {
          data: user.profile,
          dateAdded: Date.now(),
        };
        localStorage.setItem('user',  JSON.stringify(localUserData));
        localStorage.setItem("auth", "true")
        //this.setLocalData('user',  JSON.stringify(localUserData))
        HeaderAuth.setAuthorized(user.profile);
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    } catch (e) {
      console.log(e);
    }
  }

  async createAccountSubmit(event: any) {
    console.log('createAccountSubmit');
    console.log(event);
    /*const usedDada = {
      email: 'victor_sinitca@mail.ru',
      password: 'aaaaa123',
      name: 'Tester',
    };*/
    const usedDada = {
      email: event.target.form[2].value,
      password: event.target.form[3].value,
      name: event.target.form[0].value,
    };
    console.log(usedDada);

    const user = await authAPI.registration(usedDada.email, usedDada.password, usedDada.name);
    if (user) {
     /* this.setLocalData('token', user.accessToken)*/
      localStorage.setItem('token',  user.accessToken);
      localStorage.setItem("auth", "true")
      HeaderAuth.setAuthorized(user.profile);
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }
  }

  async logoutSubmit(event: any) {
    const user = await authAPI.logout();
    localStorage.setItem('token', "");
    localStorage.setItem('user', "");
    localStorage.setItem("auth", "false")
    /*this.setLocalData('token', '')
    this.setLocalData('user', '')*/
    HeaderAuth.setAuthorized(undefined);
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  resetSubmit(event: any) {
    console.log('createAccountSubmit');
  }


}

export default new LocalStorage();
