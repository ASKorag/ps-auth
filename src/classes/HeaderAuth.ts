import { addClosePopup, addOpenPopup, fixLoginPopup } from '@scripts/base/listeners';
import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';
import { IUser } from '@type/user';

class HeaderAuth {
  static setAuthorized(userData:undefined | IUser) {
    console.log(`setAuthorized: ${userData}`)
    const $headerContainerNav: HTMLElement | null =
      document.querySelector('.header-container-nav');
    if (!$headerContainerNav) return;
    $headerContainerNav.innerHTML = ``;

    if (userData) {
      console.log(`setAuthorized: ${userData}`)
      $headerContainerNav.innerHTML = `
          <a id="wishlistId" class="header-nav-link hash-link" href="#wishlist"
            >Wishlist <span class="wishlist-span-container">(0)</span></a
          >
          <a
            id="shoppingId"
            class="shopping header-nav-link hash-link"
            href="#shoppingcart"
            >Shopping cart <span class="cart-span-container">(0)</span></a
          >
          <a class="header-nav-link logout" id="logout">Logout</a>      
      `;
      const $logout: HTMLElement | null = document.getElementById('logout'); // ссылка логина
      if ($logout) {
        fixLoginPopup($logout);
        addOpenPopup($logout);
      }

      ShoppingList.showShoppingListCounter(userData.shoppingList);
      Wishlist.showWishlistCounter(userData.wishlist);


    } else {
      console.log(`setAuthorized: ${userData}`)
      $headerContainerNav.innerHTML = `           
          <div class="header-nav-account">
            <a class="header-nav-link" id="login">Login</a>
            <span>or</span>
            <a class="header-nav-link" id="create-account">Create account</a>
          </div>
      `;
      const $login: HTMLElement | null = document.getElementById('login'); // ссылка логина
      const $create: HTMLElement | null = document.getElementById('create-account'); // ссылка создать аккаунт
      console.log($login)
      if ($login) {
        fixLoginPopup($login);
        addOpenPopup($login);
      }

      if ($create) addOpenPopup($create);
    }
    const $wrapper: HTMLElement | null = document.getElementById('popupWrapper'); // серый фон попапа
    if ($wrapper) addClosePopup($wrapper);
  }
}

export default HeaderAuth;