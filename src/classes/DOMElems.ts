/**
 * @module DOMElems
 */
import {
  TBtnElem,
  TImgElem,
  TInputElem,
  TLabelElem,
  TLinkElem,
  TParElem,
} from '@scripts/init/dom-elems';

class DOMElems {
  static #elem(tag: string, data: any): HTMLElement {
    const { classes } = data;

    const $elem = document.createElement(tag);

    const attributes = Object.keys(data);

    attributes.forEach((attr) => {
      if (attr !== 'classes' && attr !== 'text' && attr !== 'inner') {
        if (attr.startsWith('data-')) {
          const name = attr.replace('data-', '');
          $elem.dataset[name] = data[attr];
        } else {
          $elem.setAttribute(attr, data[attr]);
        }
      }
    });

    if (classes) {
      if (Array.isArray(classes)) {
        classes.forEach((cl: string) => {
          if (cl.trim() !== '') {
            $elem.classList.add(cl);
          }
        });
      } else {
        $elem.classList.add(classes);
      }
    }

    if (data.text) {
      $elem.textContent = data.text;
    }

    if (data.inner) {
      if (Array.isArray(data.inner)) {
        $elem.append(...data.inner);
      } else {
        $elem.append(data.inner);
      }
    }

    return $elem;
  }

  static btn(data: TBtnElem): HTMLButtonElement {
    return DOMElems.#elem('button', data) as HTMLButtonElement;
  }

  static img(data: TImgElem): HTMLImageElement {
    return DOMElems.#elem('img', data) as HTMLImageElement;
  }

  static link(data: TLinkElem): HTMLLinkElement {
    return DOMElems.#elem('a', data) as HTMLLinkElement;
  }

  static div(data: TParElem): HTMLDivElement {
    return DOMElems.#elem('div', data) as HTMLDivElement;
  }

  static input(data: TInputElem): HTMLInputElement {
    return DOMElems.#elem('input', data) as HTMLInputElement;
  }

  static label(data: TLabelElem): HTMLLabelElement {
    return DOMElems.#elem('label', data) as HTMLLabelElement;
  }

  static span(data: TParElem): HTMLSpanElement {
    return DOMElems.#elem('span', data) as HTMLSpanElement;
  }

  static p(data: TParElem): HTMLParagraphElement {
    return DOMElems.#elem('p', data) as HTMLParagraphElement;
  }

  static nav(data: TParElem): HTMLElement {
    return DOMElems.#elem('nav', data);
  }
}

export default DOMElems;
