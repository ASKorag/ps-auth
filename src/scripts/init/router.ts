/**
 * @module Init
 */

import { TFilterRoute } from '@type/router';

import Router from '@classes/Router';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
import Filter from '@classes/Filter';
import NavPanelDOM from '@dom/NavPanelDOM';

/** эксземпляр роутера */
const router = new Router();

const arr: TFilterRoute[] = [
  {
    hash: '',
    title: 'Premium Store',
    filter: 'All',
  },
  {
    hash: 'all',
    title: 'All products',
    filter: 'All',
  },
  {
    hash: 'vehicles',
    title: 'Vehicles',
    filter: 'Technique',
  },
  {
    hash: 'gold',
    title: 'Gold',
    filter: 'Gold',
  },
  {
    hash: 'premium',
    title: 'Premium',
    filter: 'Premium',
  },
  {
    hash: 'provisions',
    title: 'Provisions',
    filter: 'Provisions',
  },
];

arr.forEach((route) => {
  const { hash, title, filter } = route;
  router.addRoute(hash, title, () => {
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts(filter);
    Filter.addEvent();
  });
});

router
  .addRoute('wishlist', 'Wishlist', () => {
    Wishlist.createWishlist();
  })
  .addRoute('shoppingcart', 'Shopping cart', () =>
    ShoppingList.createShoppingList(),
  );

export default router;
