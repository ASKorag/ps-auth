import { IUser } from '@type/user';
import { IProduct } from '@type/product';

/** user в local storage */
export interface IUserLocalStorageData {
  data: IUser;
  dateAdded: number;
}

/** продукты в local storage */
export interface IProductLocalStorageData {
  data: IProduct[];
  dateAdded: number;
}

/** продукты в local storage */
export type TLocalData =
  | IUserLocalStorageData
  | IProductLocalStorageData
  | null;

/** тип валюты */
export type TCurrency = '' | 'BYN' | 'RUB';
