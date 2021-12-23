import { addClosePopup, addOpenPopup, fixLoginPopup } from '@scripts/base/listeners';
import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';
import { IUser } from '@type/user';

class HeaderAuth {
  static setAuthorized(userData: undefined | IUser) {
    // console.log(`setAuthorized: ${userData}`)
    const $headerContainerNav: HTMLElement | null =
      document.querySelector('.header-container-nav');
    if (!$headerContainerNav) return;
    $headerContainerNav.innerHTML = ``;

    if (userData) {
      // console.log(`setAuthorized: ${userData}`)
      $headerContainerNav.innerHTML = `
          <a id="wishlistId" class="icon-heart header-nav-link hash-link" href="#wishlist"
            >Wishlist <span class="wishlist-span-container">(0)</span></a
          >
          <a
            id="shoppingId"
            class="icon-cart header-nav-link hash-link"
            href="#shoppingcart"
            >Shopping cart <span class="cart-span-container">(0)</span></a 
          >
          <div class="header-nav-account">          
          <a class="header-nav-link icon-user">${userData.name}</a>  
          <a class="header-nav-link icon-enter"  id="logout">Logout</a> 
          </div>    
      `;
      //можно вывести имя или ник, если не на 3 строки
      const $logout: HTMLElement | null = document.getElementById('logout'); // ссылка логина
      if ($logout) {
        fixLoginPopup($logout);
        addOpenPopup($logout);
      }

      ShoppingList.showShoppingListCounter(userData.shoppingList);
      Wishlist.showWishlistCounter(userData.wishlist);


    } else {
      //console.log(`setAuthorized: ${userData}`)
      $headerContainerNav.innerHTML = `           
          <div class="header-nav-account">
            <a class="header-nav-link icon-enter" id="login">Login</a>
            <span>or</span>
            <a class="header-nav-link create" id="create-account">Create account</a>
          </div>
      `;
      //предлагаю оставить create словами, тк адекватной иконки для создания я не припомню, а если будет непонятно, что это - в него не будут тыкать
      //если будут варианты - прикрутить иконку - 2 минуты. можешь глянуть iconmoon - если вдруг что-то понравится

      const $login: HTMLElement | null = document.getElementById('login'); // ссылка логина
      const $create: HTMLElement | null = document.getElementById('create-account'); // ссылка создать аккаунт
      // console.log($login)
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
