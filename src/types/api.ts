/**
 * @module API Interfaces
 */

export interface IResponse<T> {
  resultCode: 0 | 1;
  messages: string[];
  data: T | null ;
}

export interface IAddUserReq {
  name: string;
}

export interface IGetProductsByListReq {
  listProductsId: string[];
}

export interface IChangeWishlistReq {
  userId: string;
  productId: string;
}

export interface IChangePurchaseReq extends IChangeWishlistReq {
  isAdd: boolean;
}
