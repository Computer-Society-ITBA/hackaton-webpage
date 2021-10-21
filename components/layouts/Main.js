import React from "react";
import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Computer Society ITBA's Hackathon" />
        <meta name="author" content="Juan Pablo Oriana" />
        <title>Hackathon - CS</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hackathon - CS" />
      </Head>
      <Container maxW="container.lg" pt={14}>
        {children}
      </Container>
    </Box>
  );
};

export default Main;
