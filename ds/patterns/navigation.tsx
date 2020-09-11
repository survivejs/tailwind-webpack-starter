import * as elements from "../../src/elements.ts";
import Flex from "../primitives/flex.tsx";
import Box from "../primitives/box.tsx";
import Link, { ExternalLinkProps } from "../primitives/link.tsx";

// https://tailwindcss.com/components/navigation
const Navigation = ({ logo }: { logo?: string }, children: string[]) => (
  <Flex
    as="nav"
    direction="row"
    p="6"
    sx="items-center justify-between flex-wrap"
    x-state="false"
  >
    <Flex mr="6" direction="row" sx="items-center flex-shrink-0">
      {logo}
    </Flex>
    <Box sx="block lg:hidden">
      <Flex
        as="button"
        direction="column"
        px="3"
        py="2"
        sx="items-center border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        onclick="setState(v => !v)"
      >
        <svg
          class="fill-current w-3 h-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Flex>
    </Box>
    <Box
      x-class="!state && 'hidden'"
      w="full"
      sx="block flex-grow lg:flex lg:items-center lg:w-auto"
    >
      {children.join("")}
    </Box>
  </Flex>
);

const NavigationItem = (
  { href, isSelected }: ExternalLinkProps & { isSelected?: boolean },
  label
) => (
  <Link.withExternal
    href={href}
    sx={`${
      isSelected ? "font-bold" : ""
    } block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}
  >
    {label}
  </Link.withExternal>
);

const displayName = "Navigation";
const Example = () => (
  <Box bg="primary" color="white">
    <Navigation
      logo={<NavigationItem href="/">tailwind-webpack-starter</NavigationItem>}
    >
      <Box sx="lg:flex-grow">
        <NavigationItem href="/blog/">Blog</NavigationItem>
        <NavigationItem href="/design-system/" isSelected={true}>
          Design system
        </NavigationItem>
      </Box>
      <Box>
        <NavigationItem href="https://github.com/survivejs/tailwind-webpack-starter">
          Star at GitHub
        </NavigationItem>
      </Box>
    </Navigation>
  </Box>
);
export const showCodeEditor = true;

export { Navigation, NavigationItem, displayName, Example };
