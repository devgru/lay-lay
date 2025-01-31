export type Guide = {
  (): number;
  (value: number): void;

  id: string;
  handle: string;
};

export type GuideArgs = {
  setValue: (value: number, handle: string) => void;
  defaultValue: number;
};

export type GuidesAttachment = {
  top?: Guide;
  verticalCenter?: Guide;
  bottom?: Guide;
  left?: Guide;
  horizontalCenter?: Guide;
  right?: Guide;
  more?: GuidesAttachment;
};

export type SVGOrHTMLElement = SVGElement | HTMLElement;

export type GuidesState = {
  getRootRect: (force?: boolean) => DOMRect;
  verticalGuides: Set<Guide>;
  horizontalGuides: Set<Guide>;
};

export type GuidesStateRequestCallback = (state: GuidesState) => void;