/**
 * @module Init
 */

import LocalStorage from '@classes/LocalStorage';
import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';

import router from '@scripts/init/router';

import HeaderAuth from '@classes/HeaderAuth';


// инициализация магазина
const storeInit = () =>
  document.addEventListener(
    'DOMContentLoaded',
    async () => {
     // console.log("DOMContentLoaded11")
     /* const userData = await LocalStorage.getUserData();*/
      const userData = await LocalStorage.refreshUserData();
      const currency = LocalStorage.getCurrency();
      //console.log("DOMContentLoaded222")
      if (userData) {
      //  console.log("Auth1")
        router.init(currency);
        ShoppingList.showShoppingListCounter(userData.shoppingList);
        Wishlist.showWishlistCounter(userData.wishlist);
        localStorage.setItem("auth", "true")
       // console.log("Auth2")


        HeaderAuth.setAuthorized(userData)

        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }else {
       // console.log("unAuth1")
        router.init(currency);
       // console.log("unAuth2")
        HeaderAuth.setAuthorized(undefined)
        localStorage.setItem("auth", "false")
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    },
    { once: true },
  );

export default storeInit;
