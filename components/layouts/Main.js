import React from "react";
import Head from "next/head";
import { Box, Container, Flex } from "@chakra-ui/react";
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
          <meta property="og:url" content="https://hackitba.vercel.app"/>
          <meta property="og:title" content="HackIT-BA! by Computer Society ITBA"/>
          <meta property="og:description" content="HackIT-BA es una hackathon gratis de 36hs el 1, 2 y 3 de abril, enmarcada en 3 categorías principales: Ciberseguridad y privacidad, Productividad y Automatización e Inclusión Financera."/>
          <meta property="og:image" content="https://hackitba.vercel.app/images/flyer.jpeg"/>

          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:url" content="https://hackitba.vercel.app/images/flyer.jpeg"/>
          <meta property="twitter:title" content="HackIT-BA! by Computer Society ITBA"/>
          <meta property="twitter:description" content="HackIT-BA es una hackathon gratis de 36hs el 1, 2 y 3 de abril, enmarcada en 3 categorías principales: Ciberseguridad y privacidad, Productividad y Automatización e Inclusión Financera."/>
          <meta property="twitter:image" content="https://hackitba.vercel.app/images/flyer.jpeg"/>
        </Head>
        <Navbar />
        {/* No se como hacer para que deje bien el espacio con el position fixex de navbar, por ahora dejo el padding */}
        <Container maxW="full" paddingX={0} pt={16}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Main;
