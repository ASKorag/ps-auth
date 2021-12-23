/**
 * @module Product
 */

/** страна происхождения техники */
type TCountry =
  | 'china'
  | 'czech'
  | 'france'
  | 'germany'
  | 'italy'
  | 'japan'
  | 'poland'
  | 'sweden'
  | 'uk'
  | 'usa'
  | 'ussr';

/** тип техники */
type TTechnique = 'AT-SPG' | 'heavyTank' | 'lightTank' | 'mediumTank' | 'SPG';

/** класс техники */
type TTier = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

/** тип продукта */
export type TFilter = 'Technique' | 'Premium' | 'Gold' | 'Provisions';

export interface IProductData {
  /** ID продукта */
  id: string;

  /** название продукта */
  name: string;

  /** описание продукта */
  description: string;

  /** стоимость продукта */
  price: {
    /** базовая стоимость продукта */
    basic: {
      /** значение базовой стоимости продукта */
      cost: string;

      /** валюта базовой стоимости */
      currency: string;
    };

    /** актуальная стоимость продукта */
    actual: {
      /** значение актуальной стоимости продукта */
      cost: string;

      /** тип скидки */
      discountType: string;
    };
  };

  /** изображения продукта */
  images: {
    /** ссылка на изображение для большой плитки */
    span_1x1: string;

    /** ссылка на изображение для маленькой плитки */
    span_2x1: string;
  };
}

export interface ITechniqueData extends IProductData {
  filter: {
    /** страна техники */
    nation: TCountry;

    /** тип техники */
    type: TTechnique;

    /** класс техники */
    tier: TTier;
  };
}

export interface IProduct {
  /** тип продукта */
  type: TFilter;

  /** количество ячеек, занимаемых продуктом */
  span: number;

  /** данные продукта */
  data: IProductData | ITechniqueData;
}
