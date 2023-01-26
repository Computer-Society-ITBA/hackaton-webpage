import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
const styles = {
  global: (props) => ({
    body: {
      bg: mode("#1C1C1C", "#1C1C1C")(props),
    },
    // Esto logra cambiar la altura sin que se choque con el ancho
    // Por ahora lo dejo asi, despues hay que ver si hay una mejor manera
    // (cambiar height en el Flex que lo contiene toca a width por alguna razon)
    "#tsparticles":{
      height:"80vh",
      width:"100vw"
    }
  }),
};



const thick = defineStyle({
    borderWidth: '2px', 
    borderStyle: "solid", 
    borderColor: 'white',
})

export const dividerTheme = defineStyleConfig({
    variants: { thick },
})
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
  Divider: dividerTheme
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
  CSgreen:"#01CBA1"
};

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, components, fonts, colors, breakpoints });
export default theme;
