import { IProduct } from '@type/product';
import { IUser } from '@type/user';

import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';

import { calcFinalPrice, humanPrice } from '@scripts/price';
import LocalStorage from '@classes/LocalStorage';
import ItemDOM from '@classes/dom/ItemDOM';

/**
 * Класс для работы с продуктом
 */

class Item {
  /**
   * Метод для отображения карточки продукта
   * @param product исходный продукт
   * @param userData текущий пользователь
   */

  static showSelectedItem(product: IProduct, userData: IUser | null) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $container: HTMLElement | null = document.getElementById('main');
    const $itemFilter: HTMLElement | null =
      document.querySelector('.item-filters');

    if ($visualContainer) {
      if ($container) {
        $visualContainer?.removeChild($container!);
      }

      if (
        $visualContainer?.parentElement?.children.length === 3 &&
        $itemFilter
      ) {
        $visualContainer?.parentElement?.removeChild($itemFilter);
      }
      const $item: HTMLElement = ItemDOM.createSelectedItem(product, userData);
      $visualContainer.appendChild($item);
    }
  }

  /**
   * Метод для получения стоимостных данных продукта
   * @param product исходный продукт
   */

  static getSale(product: IProduct) {
    let priceAmount = '';
    let actualPrice = ``;
    let sale = ``;
    let currency = `${product.data.price.basic.currency}`;
    if (product.data.price.basic.cost !== product.data.price.actual.cost) {
      actualPrice = `
      <span class = "item-arrow icon-arrow-right"></span>
      <span class="item-price-reduced">${humanPrice(
        product.data.price.actual.cost,
      )} ${product.data.price.basic.currency}</span>`;
      let discountAmount = Math.ceil(
        100 -
          (100 * +product.data.price.actual.cost) /
            +product.data.price.basic.cost,
      );
      sale = `<span class='item-sale'>-${discountAmount}%</span>`;
      currency = ``;
      priceAmount = 'price-sale';
      if (product.data.price.actual.discountType === '') {
        discountAmount =
          +product.data.price.basic.cost - +product.data.price.actual.cost;
        sale = `<span class='item-sale'>-${discountAmount} ${product.data.price.basic.currency}</span>`;
      }
    }
    return [actualPrice, sale, currency, priceAmount];
  }

  /**
   * Метод для добавления обработчиков на кнопки
   * @param $buttonPurchase
   * @param $likeButton
   * @param product
   * @param shoppingList
   */

  static addButtonEvent(
    $buttonPurchase: HTMLElement | null,
    $likeButton: HTMLElement | null,
    product: IProduct,
    shoppingList: boolean,
  ): void {
    if ($buttonPurchase) {
      $buttonPurchase.addEventListener('click', (e) => {
        ShoppingList.changeShoppingListCounter(
          product,
          ShoppingList.showShoppingListCounter,
          $buttonPurchase,
        );
        if (shoppingList) {
          if (!$buttonPurchase.classList.contains('button-purchase-added')) {
            const parent = $buttonPurchase.closest('.item-filtered-container');
            parent?.classList.add('delete-item');
            LocalStorage.getLocalData('user');
            const user = LocalStorage.getLocalData('user')?.data as IUser;
            if (user.shoppingList.length === 0) {
              const $totalContainer =
                document.querySelector('.total-container');
              if ($totalContainer) {
                $totalContainer.parentElement?.removeChild($totalContainer);
                parent?.parentElement?.append(
                  Wishlist.createEmptyListItems('Your shopping cart is empty'),
                );
              }
            }
            parent?.addEventListener('animationend', () => {
              parent?.parentElement?.removeChild(parent);
              const $container = document.querySelector(
                '.items-filtered',
              ) as HTMLElement;

              if ($container) {
                calcFinalPrice($container);
              }
            });
          }
        }
      });
    }
    if ($likeButton) {
      $likeButton.addEventListener('click', (e) => {
        Wishlist.changeWishlistCounter(
          product,
          Wishlist.showWishlistCounter,
          $likeButton,
        );
      });
    }
  }
}

export default Item;
