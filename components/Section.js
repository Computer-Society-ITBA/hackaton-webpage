import React from "react";
import { motion } from "framer-motion";
import {
  chakra,
  shouldForwardProp,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === "transition";
  },
});
const Section = ({
  children,
  delay = 0,
  heading,
  headingOffset = 0,
  ...extendedProps
}) => {
  const bg = useColorModeValue("#f0e7db", "#101012");
  return (
    <StyledDiv
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      mb={6}
      {...extendedProps}
    >
      {heading && (
        <Heading
          as="h2"
          mt={headingOffset}
          ml="5"
          px="4"
          mb="2"
          maxWidth="fit-content"
          size="xl"
          bg={bg}
          color="brand.300"
          width="auto"
        >
          {heading}
        </Heading>
      )}
      {children}
    </StyledDiv>
  );
};

export default Section;
