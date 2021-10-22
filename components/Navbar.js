import Logo from "./Logo";
import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  Button,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
// import ThemeToggleButton from "./ThemeToggleButton";
import { IoLogoGithub } from "react-icons/io5";

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");
  if (target !== "_blank") {
    return (
      <NextLink href={href} passHref>
        <Link
          p={2}
          bg={active ? "grassTeal" : undefined}
          color={active ? "#202023" : inactiveColor}
          {...props}
        >
          {children}
        </Link>
      </NextLink>
    );
  }
  return (
    <Link
      p={2}
      bg={active ? "grassTeal" : undefined}
      color={active ? "#202023" : inactiveColor}
      href={href}
      target="_blank"
      {...props}
    >
      {children}
    </Link>
  );
};

const Navbar = (props) => {
  const { path } = props;

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#f0e7db", "#101012")}
      style={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo />
          </Heading>
        </Flex>

        <Box flex={1} align="right">
          {/* <ThemeToggleButton /> */}

          <Box ml={2} zIndex={99}>
            <Button colorScheme="green">¡Inscribite!</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
