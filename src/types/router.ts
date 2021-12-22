import { TFilter } from '@type/product';

export type TRouteCallback = (...args: any[]) => void;

export type TRoute = {
  /** hash hash route */
  hash: string;

  /** title title of browser tab */
  title: string;

  /** callback callback function for route */
  callback: TRouteCallback;

  /** isCalled indicator whether this route has been called */
  isCalled: boolean;
};

export type TFilterRoute = {
  /** hash hash route */
  hash: string;

  /** title title of browser tab */
  title: string;

  /** filter name for route generation */
  filter: 'All' | TFilter | null;
};
