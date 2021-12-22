/**
 * @module Shopping List
 */

import { IProduct } from '@type/product';
import { IUser } from '@type/user';

import Item from '@classes/Item';
import Wishlist from '@classes/Wishlist';
import DOMElems from '@classes/DOMElems';
import LocalStorage from '@classes/LocalStorage';

import { humanPrice, calcFinalPrice } from '@scripts/price';
import localStorage from '@classes/LocalStorage';

/**
 * Класс для работы с корзиной
 */

class ShoppingList {
  /**
   * Метод для создания шапки в корзине
   * @param name текст шапки
   */

  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  /**
   * Метод для создания карточки продукта в корзине
   * @param product исходный продукт
   * @param userData текущий пользователь
   */

  static createShoppingListItem(product: IProduct, userData: IUser) {
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    const saleElement = Item.getSale(product);

    const $likeBtn = DOMElems.btn({
      classes: [
        'item-description-likeBtn',
        isAddedToWishlist ? 'button-like_active' : '',
      ],
    });

    const $purchaseBtn = DOMElems.btn({
      text: 'added',
      classes: [
        'item-purchase-button',
        isAddedToPurchase ? 'button-purchase-added' : '',
      ],
    });

    const $image = DOMElems.img({
      src: product.data.images.span_2x1,
      alt: product.data.name,
    });

    $item.innerHTML = `
    <div class="checkbox-container">
            <input type="checkbox" id="checkbox-${
              product.data.id
            }" name="name-${product.data.id}">
        <label for="checkbox-${product.data.id}">Buy it!</label>
    </div>
      <a class="item-filtered-img" href="#${
        product.data.id
      }" onclick="return false"><img src=${product.data.images.span_2x1} alt="${
      product.data.name
    }"></a>
                <div class="item-filtered-description">
                    <h2>
                      ${product.data.name}
                      ${saleElement[1]}
                    </h2>
                    ${product.data.description}
                    <div>
                        <button class="item-description-likeBtn ${
                          isAddedToWishlist ? 'button-like_active' : ' '
                        }"></button>
                        <span class="item-purchase-prise">
                          <span class="item-price-amount ${saleElement[3]}">
                            ${humanPrice(product.data.price.basic.cost)} 
                            ${saleElement[2]}
                          </span>
                          ${saleElement[0]}
                        </span>
                        <button class="item-purchase-button ${
                          isAddedToPurchase ? 'button-purchase-added' : ''
                        }">added</button>
                        </div>
                        </div>
    `;
    Wishlist.addEvent($item, product, true);
    return $item;
  }

  /**
   * Метод для создания корзины
   */

  static async createShoppingList() {
    const shoppingListData = await LocalStorage.getListData('shoppingList');
    const userData = await LocalStorage.getUserData();
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (shoppingListData && userData) {
        shoppingListData.forEach((product) => {
          $container.append(this.createShoppingListItem(product, userData));
        });
        $wrapper.append(this.createHeaderList('Shopping list'));
        $wrapper.append($container);

        const $totalContainer = document.createElement('div');
        $totalContainer.classList.add('total-container');

        const $totalPrice = document.createElement('p');
        $totalPrice.classList.add('total-price');
        $totalPrice.innerHTML = `Total: <span>0 ${localStorage.getCurrency()}</span>`;

        const $totalBtn = document.createElement('button');

        $totalBtn.classList.add('total-button');
        $totalBtn.textContent = 'buy';

        $totalContainer.append($totalPrice);
        $totalContainer.append($totalBtn);

        $container.append($totalContainer);
      } else {
        $wrapper.append(
          Wishlist.createEmptyListItems('Your shopping cart is empty'),
        );
        $wrapper.append(this.createHeaderList('Shopping list'));
      }

      $container.addEventListener('click', (event) => {
        const $target = event.target as HTMLElement;

        if ($target.tagName === 'INPUT') {
          calcFinalPrice($container);
        }
      });
    }
  }

  /**
   * Метод для показа счётчика товаров в корзине
   * @param shopping текущая корзина
   */

  static showShoppingListCounter(shopping: string[]): void {
    const $shoppingCounter: HTMLElement | null = document.querySelector(
      '.cart-span-container',
    );
    if ($shoppingCounter) {
      $shoppingCounter.textContent = `(${shopping.length})`;
    }
  }

  /**
   * Метод для изменения счётчика товаров в корзине
   * @param product исходный продукт
   * @param showShopping
   * @param $buttonElement  элемент, вызвавший изменение счётчика
   */

  static changeShoppingListCounter(
    product: IProduct,
    showShopping: (shopping: string[]) => void,
    $buttonElement: HTMLElement,
  ): void {
    const data = LocalStorage.changeUserProductList(
      product.data.id,
      'shoppingList',
    );
    if (data) {
      ShoppingList.showShoppingListCounter(data.data.shoppingList);

      const isProductInShoppingList = $buttonElement.classList.contains(
        'button-purchase-added',
      );
      // change button text and class
      $buttonElement.textContent = isProductInShoppingList
        ? 'purchase'
        : 'added';
      $buttonElement.classList.toggle('button-purchase-added');
    }
  }
}

export default ShoppingList;
