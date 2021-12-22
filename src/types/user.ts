/**
 * @module User Interface
 */

export interface IUser {
  /** user ID */
  id: string;
  /** username */
  name: string;
  /** array of product IDs in the wishlist */
  wishlist: Array<string>;
  /** array of product IDs in the cart */
  shoppingList: Array<string>;
}
