type AstNode = {
  type: string;
  kind?: string;
  span: {
    start: number;
    end: number;
    ctxt: number;
  };
  declare?: boolean;
  declarations?: AstNode[];
  body?: AstNode[] | AstNode;
  init?: AstNode;
};
type Component = {
  displayName: string;
  description: string;
  default: () => string;
  exampleSource: string;
  componentSource: string;
  // TODO: Prop type
  props: any[];
};
type Pages = {
  [key: string]: Page;
};
type Layout = ({
  url,
  title,
  meta,
  pages,
  attributes,
}: {
  url: string;
  title?: string;
  meta?: { [key: string]: string };
  pages: DynamicPages;
  attributes: {};
}) => void;
// TODO: Figure out a good way to type dynamic pages
type DynamicPages = { layout: Layout; attributes: {} }[];
type Page = {
  module: {
    default: Layout;
  };
  pages: DynamicPages;
  attributes: {};
};
type Urls = {
  [key: string]: {
    layout?: Layout;
    path: string | undefined;
    pages: DynamicPages;
    attributes: {};
  };
};

export type { AstNode, Component, Pages, Page, Urls };
