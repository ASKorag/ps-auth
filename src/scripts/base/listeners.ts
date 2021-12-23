import PopupContainer from '@classes/PopupContainer';

// для работы перезагрузки по кликам
function reloadPageSameLink() {
  document.addEventListener('click', (event) => {
    const $target = event.target as HTMLElement;
    let fullHash = window.location.hash;

    // фикс для главной страницы
    if (fullHash === '') {
      fullHash = `#`;
    }

    if (
      $target.classList.contains('hash-link') &&
      $target.getAttribute('href') === fullHash
    ) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  });
}

// корректная форма на малых экранах
function fixLoginPopup($loginID: HTMLElement) {
  window.addEventListener('resize', () => {
    // отслеживание ширины экрана, если <= 720, то css убирает текст по медиа запросам, а здесь добавляется класс login
    // для логина, который клеит картинку на место текста
    if (window.screen.width <= 720) {
      $loginID.classList.add('login');
    } else {
      $loginID.classList.remove('login');
    }
  });
}

function addOpenPopup($target: HTMLElement) {
  $target.addEventListener('click', (event) => PopupContainer.openPopup(event));
}

function addClosePopup($target: HTMLElement) {
  $target.addEventListener('click', (event) =>
    PopupContainer.closePopup(event),
  );
}

export { reloadPageSameLink, fixLoginPopup, addOpenPopup, addClosePopup };
