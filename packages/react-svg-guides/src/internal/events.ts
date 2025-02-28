import { type SetRootRectAccessor } from './types';
import { REQUEST_ROOT_RECT_ACCESSOR_EVENT } from './constants';

export class RequestRootRectAccessorEvent extends Event {
  constructor(public callback: SetRootRectAccessor) {
    super(REQUEST_ROOT_RECT_ACCESSOR_EVENT, { bubbles: true });
  }
}

export const requestRootRectAccessor = (
  element: Element,
  callback: SetRootRectAccessor,
) => {
  element.dispatchEvent(new RequestRootRectAccessorEvent(callback));
};
