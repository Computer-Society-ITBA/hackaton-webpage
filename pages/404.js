import { Heading, Container } from "@chakra-ui/react";

const Custom404 = () => {
  return (
    <Container flex={1} my={32}>
      <Heading color="brand.300" textAlign="center" as="h1">
        Oops! No encontramos lo que estas buscando
      </Heading>
    </Container>
  );
};

export default Custom404;
