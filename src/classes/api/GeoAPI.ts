/**
 * @module API
 */

import { geoLocInstance } from '@api/API';

/**
 * Класс для работы с геолокацией
 */
class GeoAPI {
  /**
   * Метод для получения координат пользователя браузером
   */
  static getPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { longitude, latitude } = pos.coords;
      GeoAPI.savePositon(longitude, latitude);
    });
  }

  /**
   * Метод для сохранения координат пользователя в локальное хранилище
   * @param longitude долгота
   * @param latitude широта
   */
  static savePositon(longitude: number, latitude: number): void {
    window.localStorage.setItem('longitude', String(longitude));
    window.localStorage.setItem('latitude', String(latitude));
  }

  /**
   * Метод для получения кода страны пользователя
   * @param longitude долгота
   * @param latitude широта
   */
  static async getCountryCode(
    longitude: number,
    latitude: number,
  ): Promise<string> {
    try {
      const resp = await geoLocInstance.get(
        `reverse.php?key=pk.6622c6988c1228ba51e625c22d5efb77&lat=${latitude}&lon=${longitude}&format=json`,
      );
      return resp.data.address.country_code.toUpperCase();
    } catch (err) {
      throw new Error(`Ooops! I can't get country code`);
    }
  }
}

export default GeoAPI;
