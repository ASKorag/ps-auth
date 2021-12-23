/**
 * @module Router
 */

import { TFilter } from '@type/product';

export type TRouteCallback = (...args: any[]) => void;

export type TRoute = {
  /** hash route */
  hash: string;

  /** title of browser tab */
  title: string;

  /** callback function for route */
  callback: TRouteCallback;
};

export type TFilterRoute = {
  /** hash route */
  hash: string;

  /** title of browser tab */
  title: string;

  /** filter name for route generation */
  filter: 'All' | TFilter | null;
};
