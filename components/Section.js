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
  textTransform = "uppercase",
  fontSize = "24px",
  isSubtitle = false,
  ...extendedProps
}) => {
  const bg = useColorModeValue("#1E212A", "#1E212A");
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
          px="4"
          textTransform={textTransform}
          maxWidth="fit-content"
          margin="0 auto"
          left="0"
          right="0"
          marginTop={headingOffset || -74}
          fontSize={isSubtitle ? "20px" : fontSize}
          textAlign="center"
          bg={bg}
          color={isSubtitle ? "#E9ECF3" : "brand.300"}
          width="auto"
          position="absolute"
          fontWeight={isSubtitle ? "normal" : "500"}
        >
          {heading}
        </Heading>
      )}
      {children}
    </StyledDiv>
  );
};

export default Section;
