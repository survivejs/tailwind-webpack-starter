import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";
import config from "../../tailwind.json";
import Box from "./box";
import Flex from "./flex";

type InternalLinks = keyof typeof config.internalLinks;

const Link = (props: { href: InternalLinks; sx?: string }, label) => (
  <LinkExternal {...props}>{label}</LinkExternal>
);

const LinkExternal = (props: { href: string; sx?: string }, label) => (
  <a href={props.href} class={constructTailwindClasses(props).join(" ")}>
    {label}
  </a>
);
Link.External = LinkExternal;

export const displayName = "Link";
export const Example = () => (
  <Flex sx="flex-col">
    <Box>
      <Link href="/design-system/">Design system</Link>
    </Box>
    <Box>
      <Link.External href="https://github.com/survivejs/tailwind-webpack-starter">
        Star at GitHub
      </Link.External>
    </Box>
  </Flex>
);

export default Link;
