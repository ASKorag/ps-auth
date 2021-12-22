import localStorage from '@classes/LocalStorage';

function humanPrice(price: string): string {
  const numPrice = +price;
  return numPrice.toLocaleString('ru-RU');
}

function parseToNumber(str: string): number {
  const practicalStr = str.replace(',', '.').replace(/\s/g, '');
  return Number.parseFloat(practicalStr);
}

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
    )} ${localStorage.getCurrency()}`;
  }
}

export { humanPrice, parseToNumber, calcFinalPrice };
