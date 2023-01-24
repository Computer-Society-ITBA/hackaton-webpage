import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#1C1C1C", "#1C1C1C")(props),
    },
  }),
};

const components = {
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "underline",
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: "#525252",
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },
};

const fonts = {
  heading: "'Sora'",
  body: "'Sora'",
};

const colors = {
  brand: {
    100: "#e8fff3",
    200: "#2FE0B5",
    300: "#55faa2",
    400: "#fafbfc",
    500: "#0bbd5c",
    600: "rgba(8,153,74,1)",
    700: "#056631",
    800: "#023b1c",
    900: "#012110",
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, components, fonts, colors });
export default theme;
