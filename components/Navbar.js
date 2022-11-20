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

import styled from "@emotion/styled";

const PrimaryButton = styled(Button)`
  font-size: 14px; 
  border-radius: 8px; 
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 8px 16px;
  height: 32px;

  &:hover {
    background-color: transparent;
    color: #2fe0b5;
    border: 1px solid #2fe0b5;
  }
`;


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
      bg={useColorModeValue("#1E212A", "#1E212A")}
      style={{ backdropFilter: "blur(10px)" }}
      borderBottom="1px solid #676C74"
      height="64px"
      zIndex={99}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        h="100%"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo />
          </Heading>
        </Flex>

        <Box align="right" alignItems="center" marginLeft="auto" display="flex">
          {/* <ThemeToggleButton /> */}

          {/* <Box ml={(2, 0)} mr={(0, 2)} zIndex={99}>
            <NextLink href="https://bit.ly/hackit-ba" passHref>
              <a target="_blank" rel="noreferrer">
                <PrimaryButton colorScheme="brand">Inscribite</PrimaryButton>
              </a>
            </NextLink>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
