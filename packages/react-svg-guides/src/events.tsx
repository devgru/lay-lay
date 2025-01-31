import { GuidesStateRequestCallback } from './types';
import { GUIDES_STATE_REQUEST_EVENT } from './constants';

export class GuidesStateRequestEvent extends Event {
  constructor(public callback: GuidesStateRequestCallback) {
    super(GUIDES_STATE_REQUEST_EVENT, { bubbles: true });
  }
}

export const requestGuidesState = (element: Element, callback: GuidesStateRequestCallback) => {
  element.dispatchEvent(new GuidesStateRequestEvent(callback));
};