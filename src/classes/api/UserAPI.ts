/**
 * @module API
 */

import { IUser } from '@type/user';
import { IResponse } from '@type/api';

import { backEndInstance } from '@api/API';

/**
 * Class for working with users
 */
class UserAPI {
  /**
   * Method for getting a user by ID
   * @param id user ID
   */
  static async getUserByID(id: string) {
    try {
      console.log(`getUserByID id:${id} `)
     // const response = await instance.get<IResponse<IUser>>(`user?id=${id}`);
      const response = await backEndInstance.get<IResponse<IUser>>(
        `user?id=${id}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('error in API getUserByID!');
    }
  }

  /**
   * Method to get all users
   */
  static async getAllUsers() {
    try {
      const response = await backEndInstance.get<IResponse<IUser[]>>('users');
      return response.data.data;
    } catch (err) {
      throw new Error('error in API getAllUsers!!');
    }
  }

  /**
   * Method for adding a new user to the database
   * @param name new user`s name
   */
  static async addUser(name: string) {
    try {
      const response = await backEndInstance.post<IResponse<IUser>>('user', {
        name,
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for complex modification of user data (name, wishlist, shopping cart)
   * @param user complete user data
   */
  static async changeUserData(user: IUser) {
    try {
      const response = await backEndInstance.post<IResponse<IUser>>(
        'userData',
        {
          data: user,
        },
      );
      return response.data.data;
    } catch (err) {
      throw new Error('error in API changeUserData!!!');
    }
  }
}

export default UserAPI;
