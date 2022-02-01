import React from "react";
import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8} overflow="hidden">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Juan Pablo Oriana" />
          <title>HackIT-BA! by Computer Society ITBA</title>
          <meta name="title" content="HackIT-BA! by Computer Society ITBA"/>
              <meta name="description" content="HackIT-BA es una hackathon gratis de 36hs el 1, 2 y 3 de abril, enmarcada en 3 categorías principales: Ciberseguridad y privacidad, Productividad y Automatización e Inclusión Financera."/>
                  <meta property="og:type" content="website"/>
                      <meta property="og:url" content="https://metatags.io/"/>
                          <meta property="og:title" content="HackIT-BA! by Computer Society ITBA"/>
                              <meta property="og:description" content="HackIT-BA es una hackathon gratis de 36hs el 1, 2 y 3 de abril, enmarcada en 3 categorías principales: Ciberseguridad y privacidad, Productividad y Automatización e Inclusión Financera."/>
                                  <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"/>


                                      <meta property="twitter:card" content="summary_large_image"/>
                                          <meta property="twitter:url" content="https://metatags.io/"/>
                                              <meta property="twitter:title" content="HackIT-BA! by Computer Society ITBA"/>
                                                  <meta property="twitter:description" content="HackIT-BA es una hackathon gratis de 36hs el 1, 2 y 3 de abril, enmarcada en 3 categorías principales: Ciberseguridad y privacidad, Productividad y Automatización e Inclusión Financera."/>
                                                      <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"/>
        </Head>
      <Navbar />
      <Container maxW="container.lg" pt={14}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Main;
