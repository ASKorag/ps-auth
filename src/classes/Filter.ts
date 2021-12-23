/**
 * @module Filter
 */

import { IProduct, TFilter } from '@type/product';
import { IUser } from '@type/user';
import { IProductLocalStorageData } from '@type/local-storage';

import Item from '@classes/Item';
import ProductAPI from '@api/ProductAPI';
import Wishlist from '@classes/Wishlist';

import LocalStorage from '@classes/LocalStorage';

import lazy from '@scripts/lazy';
import lazyBD from '@scripts/lazyBD';
import ItemDOM from '@classes/dom/ItemDOM';
import VehiclesFilterDOM from '@classes/dom/VehiclesFilterDOM';

/**
 * Класс для фильтрации продуктов и работы с уже отфильтрованными продуктами
 */

class Filter {
  //  #nation #type #tier используются для фильтрации продуктов типа техника
  /** страна техники */
  static #nation: string | undefined;

  /** тип техники */
  static #type: string | undefined;

  /** уровень техники */
  static #tier: string | undefined;

  /**
   * Метод для добавления обработчиков кнопок фильтров
   */

  static addEvent(): void {
    const $filterButtons: NodeListOf<Element> =
      document.querySelectorAll('.main-nav-link');
    $filterButtons.forEach((item: Node) => {
      item.addEventListener('click', (e) => {
        const $eventTarget: HTMLElement = e.target as HTMLElement;
        const $prevFilter = document.querySelector('.active-link');
        if ($prevFilter && $prevFilter !== $eventTarget) {
          $prevFilter.classList.remove('active-link');
        }
        $eventTarget.classList.add('active-link');
      });
    });
  }

  /**
   * Метод для фильтрации всех продуктов
   * @param filter фильтр для сортировки
   */

  static filterProducts(filter: TFilter | 'All' | null) {
    let $target: HTMLElement | null;
    LocalStorage.getUserData().then((userData) => {
     // if (userData) {
      //console.log(`filterProducts userData:${userData} `)
        const actualFilter = filter;
        $target = document.querySelector(`[data-filter=${filter}]`);
        $target?.classList.add('active-link');

        if (filter === 'All') {
          this.createAllFilterProducts(userData);
        } else {
          LocalStorage.getProductDataByFilter(actualFilter!).then((data) => {
            if (data)
              this.createFilterProducts(data, userData, data, actualFilter!);
          });
        }
     // }
    });
  }

  /**
   * Метод для фильтрации техники
   * @param userData текущий пользователь
   */

  static filterTechniqueProducts(userData: IUser |null) {
    const techniqueProduct = LocalStorage.getLocalData(
      'Technique',
    ) as IProductLocalStorageData | null;
    if (techniqueProduct) {
      let check = false;
      const filteredProducts = techniqueProduct.data.filter((item) => {
        if ('filter' in item.data) {
          check = true;
          if (this.#nation && this.#nation !== 'all') {
            check = item.data.filter.nation === this.#nation;
          }
          if (this.#tier && this.#tier !== 'all') {
            check = check && item.data.filter.tier === this.#tier;
          }
          if (this.#type && this.#type !== 'all') {
            check = check && item.data.filter.type === this.#type;
          }
        }
        return check;
      });
      Filter.showFilterProduct(filteredProducts, userData);
    }
  }

  /**
   * Метод для создания фильтрованных продуктов
   * @param filteredProducts массив фильтрованных продуктов
   * @param userData текущий пользователь
   * @param productData массив всех продуктов
   * @param filter фильтр для сортировки
   */

  static createFilterProducts(
    filteredProducts: IProduct[],
    userData: IUser | null,
    productData: IProduct[],
    filter: string,
  ) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper?.lastChild) {
      if ($wrapper?.children.length === 3) {
        $wrapper?.removeChild($wrapper?.lastChild);
      }
      $wrapper?.removeChild($wrapper?.lastChild);
    }
    if (filter === 'Technique') {
      const $itemFilter = VehiclesFilterDOM.createVehiclesFilter();
      $wrapper?.append($itemFilter);
      const buttonsFilterList = $itemFilter.querySelectorAll(
        '.filter-container-checkedBtn',
      );
      const allFilterTypes = $itemFilter.querySelectorAll('.filter-btn');
      const resetTypeButton = $itemFilter.querySelector('.item-filters-btn');
      if (resetTypeButton) {
        Filter.addFilterEvent(
          resetTypeButton,
          allFilterTypes,
          buttonsFilterList,
          userData,
        );
      }
    }
    if ($visualContainer) {
      $wrapper?.append($visualContainer);
    }
    Filter.showFilterProduct(filteredProducts, userData);
  }

  /**
   * Метод для добавления событий на фильтры для техники
   * @param resetTypeButton кнопка сброса фильтра
   * @param allFilterTypes список всех фильтров по типам
   * @param buttonsFilterList список основных фильиров
   * @param userData текущий пользователь
   */

  static addFilterEvent(
    resetTypeButton: Element,
    allFilterTypes: NodeListOf<Element>,
    buttonsFilterList: NodeListOf<Element>,
    userData: IUser | null,
  ) {
    const filterText: { [char: string]: string } = {
      nations: 'All nations',
      types: 'All types',
      tiers: 'All tiers',
    };
    resetTypeButton?.addEventListener('click', () => {
      buttonsFilterList.forEach((item) => {
        item.textContent = filterText[item.classList[1]];
        item.classList.remove(item.classList[3]);
      });
      this.#type = 'all';
      this.#tier = 'all';
      this.#nation = 'all';
      this.filterTechniqueProducts(userData);
    });

    allFilterTypes.forEach((item) => {
      item.addEventListener('click', (e) => {
        const $eventElement = e.currentTarget as HTMLElement;
        const $filterTypeButton = $eventElement.parentElement?.parentElement
          ?.firstElementChild as HTMLElement;
        const filterButtonContent =
          $eventElement.firstElementChild?.textContent;
        const filterType = $eventElement.classList[0];
        if (filterType === 'nations-btn') {
          this.#nation = $eventElement.dataset.nation;
        } else if (filterType === 'type-btn') {
          this.#type = $eventElement.dataset.type;
        }
        if (filterType !== 'tires-btn') {
          if ($filterTypeButton.classList.length > 3) {
            $filterTypeButton.classList.remove($filterTypeButton.classList[3]);
            $filterTypeButton.classList.add(
              $eventElement.firstElementChild?.className!,
            );
            $filterTypeButton.textContent = filterButtonContent!;
          } else {
            $filterTypeButton.classList.add(
              $eventElement.firstElementChild?.className!,
            );
            $filterTypeButton.textContent = filterButtonContent!;
          }
        }
        if ($eventElement.classList[0] === 'tires-btn') {
          $filterTypeButton.textContent = filterButtonContent!;
          this.#tier = $eventElement.dataset.tier;
        }
        $eventElement.parentElement?.parentElement?.lastElementChild?.classList.toggle(
          'opened-list',
        );
        this.filterTechniqueProducts(userData);
      });
    });

    buttonsFilterList.forEach((item) => {
      item.addEventListener('click', (e) => {
        (e.currentTarget as HTMLElement).nextElementSibling?.classList.toggle(
          'opened-list',
        );
      });
    });
  }

  /**
   * Метод для показа фильтрованных продуктов
   * @param filteredProducts массив фильтрованных продуктов
   * @param userData текущий пользователь
   */

  static showFilterProduct(filteredProducts: IProduct[], userData: IUser | null) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    if ($visualContainer) {
      $visualContainer.innerText = '';
      if (filteredProducts.length === 0) {
        $visualContainer.append(Wishlist.createEmptyListItems('List is Empty'));
      }
      const $container = document.createElement('div');
      $container.id = 'main';
      $container.classList.add('main-container-content');
      $visualContainer.appendChild($container);

      let itemCounter = 0;
      filteredProducts.forEach((value: IProduct) => {
        if (itemCounter < 20) {
          $container.appendChild(ItemDOM.createItem(value, userData));
          itemCounter += value.span;
        }
      });
    }

    lazy(20, 100, userData, filteredProducts);
  }

  /**
   * Метод для создания всех продуктов
   * @param userData текущий пользователь
   */

  static createAllFilterProducts(userData: IUser | null) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper?.lastChild) {
      if ($wrapper?.children.length === 3) {
        $wrapper?.removeChild($wrapper?.lastChild);
      }
      $wrapper?.removeChild($wrapper?.lastChild);
    }
    if ($visualContainer) {
      $wrapper?.append($visualContainer);
    }
    Filter.showAllFilterProduct(userData);
  }

  /**
   * Метод для показа всех продуктов
   * @param userData текущий пользователь
   */

  static showAllFilterProduct(userData: IUser | null) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    if ($visualContainer) {
      $visualContainer.innerText = '';
      const $container = document.createElement('div');
      $container.id = 'main';
      $container.classList.add('main-container-content');
      $visualContainer.appendChild($container);


      const $spinner = document.getElementById("spinner")
      if($spinner) $spinner.style.display="block"
      ProductAPI.getAllProductsByLazy(1, 40, LocalStorage.getCurrency()).then(
        (value) => {
          if (value) {
            value.products.forEach((product: IProduct) => {
              $container.appendChild(ItemDOM.createItem(product, userData));
            });
            lazyBD(40, 500, userData);
          }
        },
      ).finally(()=>{
        if($spinner) $spinner.style.display="none"
      });
    }
  }
}

export default Filter;
