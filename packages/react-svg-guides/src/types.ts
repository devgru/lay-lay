export type Guide = {
  (): number;
  (value: number): void;

  id: string;
  handle: string;
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

export type GuideArgs = {
  defaultValue?: number;
  setValue?: (value: number, name: string) => void;
};
