import * as elements from "typed-html";
import { constructTailwindClasses, tailwindKeys } from "./_utils";
import config from "../../tailwind";

type ColorKeys = keyof typeof config.expandedColors;
type MarginKeys = keyof typeof config.theme.margin;
type PaddingKeys = keyof typeof config.theme.padding;
type WidthKeys = keyof typeof config.theme.width;
type MinWidthKeys = keyof typeof config.theme.minWidth;
type MaxWidthKeys = keyof typeof config.theme.maxWidth;
type HeightKeys = keyof typeof config.theme.height;
type MinHeightKeys = keyof typeof config.theme.minHeight;
type MaxHeightKeys = keyof typeof config.theme.maxHeight;
type ScreenKeys = keyof typeof config.theme.screens;

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  m?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mb?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mt?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  ml?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mr?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mx?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  my?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  p?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pb?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pt?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pl?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pr?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  px?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  py?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  color?: ColorKeys | { [k in ScreenKeys | "default"]?: ColorKeys };
  bg?: ColorKeys | { [k in ScreenKeys | "default"]?: ColorKeys };
  w?: WidthKeys | { [k in ScreenKeys | "default"]?: WidthKeys };
  minw?: MinWidthKeys | { [k in ScreenKeys | "default"]?: MinWidthKeys };
  maxw?: MaxWidthKeys | { [k in ScreenKeys | "default"]?: MaxWidthKeys };
  h?: HeightKeys | { [k in ScreenKeys | "default"]?: HeightKeys };
  minh?: MinHeightKeys | { [k in ScreenKeys | "default"]?: MinHeightKeys };
  maxh?: MaxHeightKeys | { [k in ScreenKeys | "default"]?: MaxHeightKeys };
  // Exposed attributes
  onclick?: string;
  role?: string;
  x?: string;
  style?: string;
  id?: string;
  // TODO: sx can be only tailwind classes so constraint to those
  sx?: string;
};

// https://theme-ui.com/components/box
const Box = (props: BoxProps = {}, children: string[]) =>
  elements.createElement(
    props?.as || "div",
    attachAttributes(props),
    children.join("")
  );

export const displayName = "Box";
export const Example = () => (
  <Box
    m="2"
    p="4"
    w={{ default: "full", lg: "auto" }}
    color="white"
    bg="primary"
  >
    Beep
  </Box>
);

export default Box;

function attachAttributes(props): elements.Attributes {
  if (!props) {
    return {};
  }

  const ret: { [key: string]: string } = {};

  Object.entries(props).forEach(([k, v]) => {
    if (k === "as" || k === "sx") {
      return;
    }

    if (k.split("-").length > 1 || !tailwindKeys.includes(k)) {
      ret[k] = v as string;
    }
  });

  const klass = constructTailwindClasses(props).join(" ");

  if (klass) {
    ret["class"] = klass;
  }

  return ret;
}
