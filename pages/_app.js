import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts/Main";
import Fonts from "../components/Fonts";
import theme from "../lib/theme";
import { AnimatePresence } from "framer-motion";

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence mode="wait" initial={true}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  );
};

export default Website;
