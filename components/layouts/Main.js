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
        <meta name="description" content="Computer Society ITBA's Hackathon" />
        <meta name="author" content="Juan Pablo Oriana" />
        <title>Hackathon - CS</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hackathon - CS" />
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
