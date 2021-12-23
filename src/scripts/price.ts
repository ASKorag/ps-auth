/**
 * @module Price
 */

import localStorage from '@classes/LocalStorage';
// import { TCurrencyCode, TCurrencySign } from '@type/price';

/**
 * Функция для получения цены в удобном человеку представлении
 * @param price цена продукта в виде строки
 */
function humanPrice(price: string): string {
  const numPrice = +price;
  return numPrice.toLocaleString('ru-RU');
}

/**
 * Функция для перевода цены из удобной человеку формы в обычную
 * @param str строка с ценой в удобном для человека виде
 */
function parseToNumber(str: string): number {
  const practicalStr = str.replace(',', '.').replace(/\s/g, '');
  return Number.parseFloat(practicalStr);
}

/**
 * Функция для получения знака или кода валюты
 * @param currencyCode код валюты
 */
function getCurrencySign(currencyCode: string): string {
  switch (currencyCode) {
    case 'BYN':
      return 'BYN';
    case 'RUB':
      return '₽';
    case 'UAH':
      return '₴';
    case 'PLN':
      return 'zł';
    case 'CNY':
      return '¥';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
}

/**
 * Функция для расчёта финальной цены выбранных продуктов в корзине
 * @param $container HTML элемент, содержащий продукты для расчёта
 */
function calcFinalPrice($container: HTMLElement) {
  const $totalPrice = $container.querySelector('.total-price > span');
  const $items = $container.querySelectorAll('.item-filtered-container');

  let summaryPrice = 0;

  $items.forEach(($item) => {
    const $checkbox = $item.querySelector(
      '[type=checkbox]',
    ) as HTMLInputElement | null;

    if ($checkbox && $checkbox.checked) {
      // search two span with price
      let $price = $item.querySelector('.item-price-reduced');
      if (!$price) {
        $price = $item.querySelector('.item-price-amount');
      }

      if ($price && $price.textContent) {
        const price = parseToNumber($price.textContent);
        summaryPrice += price;
      }
    }
  });

  if ($totalPrice) {
    $totalPrice.textContent = `${humanPrice(
      String(summaryPrice),
    )} ${getCurrencySign(localStorage.getCurrency())}`;
  }
}

export { humanPrice, parseToNumber, calcFinalPrice, getCurrencySign };
