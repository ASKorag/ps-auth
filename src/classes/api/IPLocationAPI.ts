/**
 * @module API
 */

import { ipLocInstance } from '@api/API';

/**
 * Класс для определения местоположения пользователя, опираясь на IP адрес
 */
class IPLocationAPI {
  /**
   * Метод для получения кода страны пользователя
   */
  static async getCountryCode(): Promise<string> {
    try {
      const resp = await ipLocInstance.get('');
      return resp.data.country_code;
    } catch (err) {
      throw new Error(`Ooops! I can't get country code`);
    }
  }
}

export default IPLocationAPI;
