import '../elements/elements';

import '@scss/main.scss';
import '@scss/variables/colors.scss';
import '@scss/variables/sizes.scss';
import '@scss/popup.scss';
import '@scss/item.scss';
import '@scss/items-filtered-list.scss';
import '@scss/filters.scss';
import '@scss/main-content.scss';
import '@scss/item-content.scss';
import '@scss/iconmoon.scss';

import storeInit from '@scripts/init/store';
import {
  reloadPageSameLink,
  fixLoginPopup,
  addOpenPopup,
  addClosePopup,
} from '@scripts/base/listeners';
console.log("main init")
storeInit();
reloadPageSameLink();

/// /////////////////////////////////////////////////////////////////////

/*
const $login: HTMLElement | null = document.getElementById('login'); // ссылка логина
const $create: HTMLElement | null = document.getElementById('create-account'); // ссылка создать аккаунт
const $wrapper: HTMLElement | null = document.getElementById('popupWrapper'); // серый фон попапа

if ($login) {
  fixLoginPopup($login);
  addOpenPopup($login);
}

if ($create) {
  addOpenPopup($create);
}

if ($wrapper) {
  addClosePopup($wrapper);
}
*/
