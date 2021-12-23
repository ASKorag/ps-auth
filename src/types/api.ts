/**
 * @module API
 */

export interface IResponse<T> {
  /** код выполнения */
  resultCode: 0 | 1;

  /** ошибки (код выполнения 1) */
  messages: string[];

  /** данные с сервера */
  data: T | null;
}

export interface IAddUserReq {
  /** имя пользователя */
  name: string;
}

export interface IGetProductsByListReq {
  /** список ID продуктов */
  listProductsId: string[];
}

export interface IChangeWishlistReq {
  /** ID пользователя */
  userId: string;

  /** ID продукта */
  productId: string;
}

export interface IChangePurchaseReq extends IChangeWishlistReq {
  /** флаг, показывающий добавлен ли продукт в корзину */
  isAdd: boolean;
}
