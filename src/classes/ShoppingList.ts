/**
 * @module Shopping List
 */

import { IProduct } from '@type/product';

import Wishlist from '@classes/Wishlist';
import ItemDOM from '@dom/ItemDOM';
import LocalStorage from '@classes/LocalStorage';

import localStorage from '@classes/LocalStorage';

import { calcFinalPrice, getCurrencySign } from '@scripts/price';

/**
 * Chopping cart class
 */
class ShoppingList {
  /**
   * Method to create a 'hat' in the cart
   * @param name text content of the 'hat'
   */
  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  /**
   * Method to create a cart
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
          $container.append(
            ItemDOM.createAddedItem(product, userData, 'shoppingList'),
          );
        });
        $wrapper.append(this.createHeaderList('Shopping list'));
        $wrapper.append($container);

        const $totalContainer = document.createElement('div');
        $totalContainer.classList.add('total-container');

        const $totalPrice = document.createElement('p');
        $totalPrice.classList.add('total-price');
        $totalPrice.innerHTML = `Total: <span>0 ${getCurrencySign(
          localStorage.getCurrency(),
        )}</span>`;

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
   * Method to display the amount of items in a cart
   * @param shopping current cart
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
   * Method to change the amount of items in a cart
   * @param product initial product
   * @param showShopping
   * @param $buttonElement elem which has caused counter changing
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
