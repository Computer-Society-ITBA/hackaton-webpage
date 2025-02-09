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
import Timer from "../components/Timer";

const PrimaryButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;
  color: #14192D;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: #14192D;
    color: #AFEFF3;
    border: 1px solid #AFEFF3;

    svg path {
      fill: #AFEFF3;
    }
  }
`;

const NavButton = ({ text, href }) => {
  return (
    <Box ml={(5, 0)} mr={(0, 5)} zIndex={99}>
      <NextLink href={href}>
        <PrimaryButton
          backgroundColor="CSLightBlue"
          fontSize={["2xs","xs", "sm", "md", "xl", "xl"]}
          size={["2xs","xs", "sm", "sm", "md", "md"]}
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
      setConfig();
    } else if (inscriptionsEnabled) {
      setNavButtons(
        <>
          <NavButton text="¡Inscribite Acá!" href="/register" />
          <NavButton text="Iniciar Sesión" href="/login" />
        </>
      );
    }
  }, [setConfig, inscriptionsEnabled]);

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
        paddingY="15%"
        _hover={{
          backgroundColor: "CSLightBlue",
          color: "CSDarkBlue"
        }}
        _active={{
          backgroundColor: "CSLightBlue",
          color: "CSDarkBlue"
        }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <HStack>
          <Avatar
            color="CSDarkBlue"
            backgroundColor="CSLightOrange"
            name={userInfo?.name}
          ></Avatar>
          <VStack p="2" align="start">
            <Heading fontSize="smaller">{userInfo?.name}</Heading>
            <Text fontSize="smaller">{mapToName.get(userInfo?.role)}</Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList
        backgroundColor="CSLightBlue"
        color="CSDarkBlue"
      >
        <MenuItem
          onClick={goToProfile}
          backgroundColor="CSLightBlue"
          color="CSDarkBlue"
          _hover={{
            backgroundColor: "CSDarkBlue",
            color: "CSLightBlue"
          }}
        >
          Mi perfil
        </MenuItem>
        <MenuItem
          onClick={logOut}
          backgroundColor="CSLightBlue"
          color="CSDarkBlue"
          _hover={{
            backgroundColor: "CSDarkBlue",
            color: "CSLightBlue"
          }}
        >
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const NewNavbar = (props) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [navButton, setNavButton] = useState(
    <LoggedOutButton/>
  );
  const inscriptionsEnabled = useStore((state) => state.inscriptionsEnabled);
  const [ timeLeftSection, setTimeLeftSection ] = useState(<></>);
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    setIsPC(window.innerWidth > 768);

    if(inscriptionsEnabled){
      setTimeLeftSection(<Timer/>);
    }

    if (isLoggedIn) {
      setNavButton(<LoggedInButton />);
    } else {
      setNavButton(<LoggedOutButton />);
    }
  }, [isLoggedIn, inscriptionsEnabled]);

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#14192D", "#14192D")} // sin esto es transparente (tipo vidrio), no se si lo queremos asi
      //Saco lo del navbar transparente porque no funciona en safari
      style={{ backdropFilter: "blur(10px)" }}
      //borderBottom="1px solid #676C74"
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
        paddingTop="2%"
        paddingBottom="1%"
      >
        <Flex align="center" mr="auto" flexShrink={0}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo />
          </Heading>
        </Flex>
        {!isLoggedIn && (
          <Flex align="center"
                alignItems="center"
                marginLeft="auto"
                marginRight="auto"
                whiteSpace="nowrap"
          >
            { timeLeftSection }
          </Flex>
          )
        }
        {isPC ? (<Box
          align="right"
          justifyContent="space-between"
          alignItems="center"
          ml="auto"
          display="flex"
        >
          { navButton }
        </Box>) : (<VStack
          align="right"
          justifyContent="space-between"
          alignItems="center"
          ml="auto"
          display="flex"
        >
          { navButton }
        </VStack>)}
      </Container>
    </Box>
  );
};

export default NewNavbar;
