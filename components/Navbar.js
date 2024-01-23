import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  Container,
  Box,
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Text,
  Avatar,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import Logo from "./Logo";
import useStore from "../config/storeConfig";

const PrimaryButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #2fe0b5;
    border: 1px solid #2fe0b5;

    svg path {
      fill: #2fe0b5;
    }
  }
`;

const NavButton = ({ text, href }) => {
  return (
    <Box ml={(5, 0)} mr={(0, 5)} zIndex={99}>
      <NextLink href={href}>
        <PrimaryButton
          backgroundColor="CSGreen"
          fontSize={["xs", "sm", "md", "xl", "xl"]}
          size={["xs", "sm", "sm", "md", "md"]}
        >
          {text}
        </PrimaryButton>
      </NextLink>
    </Box>
  );
};

const LoggedOutButton = () => {
  const inscriptionsEnabled = useStore((state) => state.inscriptionsEnabled);
  const setConfig = useStore((state) => state.setConfig);
  const [navButtons, setNavButtons] = useState(
    <NavButton text="Iniciar Sesión" href="/login" />
  );

  useEffect(() => {
    if (inscriptionsEnabled === undefined) {
      return setConfig();
    }

    if (inscriptionsEnabled) {
      setNavButtons(
        <>
          <NavButton text="Inscribite Aqui!" href="/register" />
          <NavButton text="Iniciar Sesión" href="/login" />
        </>
      );
    }
  }, [setConfig, inscriptionsEnabled, navButtons]);

  return navButtons;
};

const mapToName = new Map([
  ["user", "Equipo"],
  ["mentor", "Mentor"],
  ["jury", "Jurado"],
  ["admin", "Administrador"],
]);
const LoggedInButton = () => {
  const router = useRouter();
  const userInfo = useStore((state) => state.userInfo);
  const storeLogOut = useStore((state) => state.logout);
  const goToProfile = () => router.push("/profile");
  const logOut = async () => {
    await router.push("/");
    storeLogOut();
  };

  return (
    <Menu>
      <MenuButton
        backgroundColor="transparent"
        height="120%"
        _hover={{ backgroundColor: "CSBlue" }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <HStack>
          <Avatar
            color="white"
            backgroundColor="gray"
            name={userInfo?.name}
          ></Avatar>
          <VStack p="2" align="start">
            <Heading fontSize="smaller">{userInfo?.name}</Heading>
            <Text fontSize="smaller">{mapToName.get(userInfo?.role)}</Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={goToProfile}>Mi perfil</MenuItem>
        <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
  );
};

const Navbar = (props) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [navButton, setNavButton] = useState(
    <LoggedOutButton></LoggedOutButton>
  );

  useEffect(() => {
    if (isLoggedIn) {
      setNavButton(<LoggedInButton />);
    } else {
      setNavButton(<LoggedOutButton />);
    }
  }, [isLoggedIn]);

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#1C1C1C", "#1C1C1C")} // sin esto es transparente (tipo vidrio), no se si lo queremos asi
      //Saco lo del navbar transparente porque no funciona en safari
      style={{ backdropFilter: "blur(10px)" }}
      borderBottom="1px solid #676C74"
      height="72px"
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

        <Box
          align="right"
          justifyContent="space-between"
          alignItems="center"
          marginLeft="auto"
          display="flex"
        >
          {navButton}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
