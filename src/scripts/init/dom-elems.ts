type TElem = {
  id?: string;
  classes?: string | string[];
};

export type TParElem = TElem & {
  text?: string;
  inner?: HTMLElement | HTMLElement[];
};

export type TBtnElem = TParElem & {
  type?: 'button' | 'reset' | 'submit';
};

export type TImgElem = TElem & {
  src: string;
  alt: string;
};

export type TLinkElem = TParElem & {
  href: string;
};

export type TInputElem = TElem & {
  type:
    | 'button'
    | 'checkbox'
    | 'file'
    | 'hidden'
    | 'image'
    | 'password'
    | 'radio'
    | 'reset'
    | 'submit'
    | 'text';
  name?: string;
};

export type TLabelElem = TParElem & {
  for?: string;
};
