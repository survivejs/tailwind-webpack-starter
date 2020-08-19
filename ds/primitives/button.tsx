import * as elements from "typed-html";
import Box from "./box";
import Flex from "./flex";

type ButtonProps = { onclick?: string; sx?: string };
type Variant = "primary" | "secondary";

// https://tailwindcss.com/components/buttons
const Button = (
  { onclick, sx, variant }: ButtonProps & { variant?: Variant },
  children: string[]
) => (
  <Box
    as="button"
    onclick={onclick}
    py="2"
    px="4"
    sx={`${sx} ${getVariantClasses(variant)}`}
  >
    {children}
  </Box>
);

function getVariantClasses(variant?: Variant) {
  const sharedClasses = "font-bold rounded";

  switch (variant) {
    case "primary":
      return `${sharedClasses} bg-primary text-white hover:bg-secondary`;
    case "secondary":
      return `${sharedClasses} bg-secondary text-white hover:bg-primary`;
  }

  return sharedClasses;
}

export const displayName = "Button";
export const Example = () => (
  <Flex x-state="'foobar'" direction="column" sx="space-y-4">
    <Box as="span" x="'Value: ' + state" />
    <Button
      onclick="setState('foobar')"
      sx="border-solid border-2 border-gray-600"
    >
      Set to foobar
    </Button>
    <Button variant="primary" onclick="setState('primary')">
      Set to primary
    </Button>
    <Button variant="secondary" onclick="setState('secondary')">
      Set to secondary
    </Button>
  </Flex>
);

export default Button;
