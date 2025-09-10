import { CartItem } from './models';
import { OrderRequest} from './api';


export type EventType =
  | 'product:select'
  | 'cart:add'
  | 'cart:remove'
  | 'order:submit'
  | 'checkout:step1'
  | 'checkout:step2'
  | 'modal:open'
  | 'modal:close';

export interface EventPayloadMap {
  'product:select': { id: string };
  'cart:add': { product: CartItem };
  'cart:remove': { id: string };
  'order:submit': { order: OrderRequest };
  'checkout:step1': undefined;
  'checkout:step2': undefined;
  'modal:open': undefined;
  'modal:close': undefined;
}