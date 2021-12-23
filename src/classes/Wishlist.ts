/**
 * @module Wish List
 */

import { IProduct } from '@type/product';

import ItemDOM from '@dom/ItemDOM';
import Item from '@classes/Item';
import LocalStorage from '@classes/LocalStorage';

/**
 * Класс для работы со списком желаний
 */
class Wishlist {
  /**
   * Метод для создания шапки в списке желаний
   * @param name текст шапки
   */
  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  /**
   * Метод для создания пустого списка желаний
   * @param text отображаемый текст
   */
  static createEmptyListItems(text: string) {
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `<div class="empty-list">${text}</div>`;
    return $item;
  }

  /**
   * Методя для добавления обработчиков на кнопки в карточке продукта в списке желаний
   * @param $item кнопка в карточке продукта
   * @param product исходный продукт
   * @param shoppingList
   */
  static addEvent(
    $item: HTMLElement,
    product: IProduct,
    shoppingList: boolean,
  ) {
    const $likeButton: HTMLElement | null = $item.querySelector(
      '.item-description-likeBtn',
    );
    const $buttonPurchase: HTMLElement | null = $item.querySelector(
      '.item-purchase-button',
    );
    Item.addButtonEvent($buttonPurchase, $likeButton, product, shoppingList);
  }

  /**
   * Метод для создания списка желаний
   */
  static async createWishlist() {
    const wishlistData = await LocalStorage.getListData('wishlist');
    const userData = await LocalStorage.getUserData();
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (userData && wishlistData && wishlistData.length > 0) {
        wishlistData?.forEach((product) => {
          $container.append(
            ItemDOM.createAddedItem(product, userData, 'wishlist'),
          );
        });
        $wrapper.append($container);
        $wrapper.append(this.createHeaderList('Wishlist'));
      } else {
        $wrapper.append(this.createEmptyListItems('Wishlist is empty'));
        $wrapper.append(this.createHeaderList('Wishlist'));
      }
    }
  }

  /**
   * Метод для показа счётчика товаров в списке желаний
   * @param wishList текущий список желаний
   */
  static showWishlistCounter(wishList: string[]): void {
    const $wishListCounter: HTMLElement | null = document.querySelector(
      '.wishlist-span-container',
    );
    if ($wishListCounter) {
      $wishListCounter.textContent = `(${wishList.length})`;
    }
  }

  /**
   * Метод для изменения счётчика товаров в списке желаний
   * @param product исходный продукт
   * @param showWishList
   * @param $buttonElement элемент, вызвавший изменение счётчика
   */
  static changeWishlistCounter(
    product: IProduct,
    showWishList: (wishlist: string[]) => void,
    $buttonElement: HTMLElement,
  ): void {
    const data = LocalStorage.changeUserProductList(
      product.data.id,
      'wishlist',
    );
    if (data) {
      showWishList(data.data.wishlist);
      $buttonElement.classList.toggle('button-like_active');
    }
  }
}

export default Wishlist;
