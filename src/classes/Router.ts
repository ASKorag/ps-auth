/**
 * @module Router
 */

import { TRoute, TRouteCallback } from '@type/router';
import { TCurrency } from '@type/local-storage';

import LocalStorage from '@classes/LocalStorage';
import Item from '@classes/Item';
import NavPanelDOM from '@dom/NavPanelDOM';
import ProductAPI from '@api/ProductAPI';

/**
 * Class for creating a router with hash support
 */

class Router {
  /** array of saved routes */
  #routes: TRoute[] = [];

  /**
   * Method for change a title to a browser tab
   */

  static #changeTitle(title: string): void {
    document.title = title;
  }

  /**
   * Method for adding a route to a router
   * @param hash hash route
   * @param title the title of the browser tab
   * @param callback callback function for route
   */

  addRoute(hash: string, title: string, callback: TRouteCallback): Router {
    this.#routes.push({
      hash,
      title,
      callback,
      isCalled: false,
    });
    return this;
  }

  /**
   * Метод для создания пути товара при перезагрузке страницы
   * @param hash хэш пути
   * @param currency валюта продуктов
   */

  async createRoute(hash: string, currency: TCurrency): Promise<boolean> {
    const product = await ProductAPI.getProductsByList([hash], currency);
    if (product && product.length) {
      this.addRoute(hash, product[0].data.name, () => {
        LocalStorage.getUserData().then((userData) => {
          //if (userData) {
            NavPanelDOM.showMainNavContainer();
            Item.showSelectedItem(product[0], userData);
         // }
        });
      });
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      return true;
    }
    return false;
  }

  /**
   * Method for finding a route in the array of saved routes of the router
   * @param hash hash route
   */

  findRoute(hash: string): TRoute | undefined {
    return this.#routes.find((r) => r.hash === hash);
  }

  /**
   * Method whether the given route was called
   * @param hash hash route
   */

  checkRoute(hash: string): boolean | undefined {
    const route = this.findRoute(hash);
    return route?.isCalled;
  }

  /**
   * Method for getting hash
   */

  static #getHash(): string {
    return window.location.hash.slice(1);
  }

  /**
   * Method for initializing the router
   * @param currency валюта продуктов
   */

  init(currency: TCurrency) {
    window.addEventListener('hashchange', async () => {
      const hash = Router.#getHash();
      const route = this.findRoute(hash);
      if (route) {
        route.callback();
        route.isCalled = true;
        Router.#changeTitle(route.title);
      } else {
        // пробуем создать путь сами
        const isRouteCreated = await this.createRoute(hash, currency);

        if (!isRouteCreated) {
          Router.#changeTitle('*****');
          throw new Error(`Path #'${hash}' is undefined`);
        }
      }
    });
  }
}

export default Router;
