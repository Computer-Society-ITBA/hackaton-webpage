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
  Text,
  Card,
  Avatar,
  HStack,
  VStack,
  Collapse,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";

import styled from "@emotion/styled";
import { auth } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import Head from "next/head";
import { useStore } from "../config/storeConfig";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
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

const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['10px','10px','8px','9px','12px']
//No se usa 
// const LinkItem = ({ href, path, target, children, ...props }) => {
//   const active = path === href;
//   const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");
//   if (target !== "_blank") {
//     return (
//       <NextLink href={href} passHref>
//         <Link
//           p={2}
//           bg={active ? "grassTeal" : undefined}
//           color={active ? "#202023" : inactiveColor}
//           {...props}
//         >
//           {children}
//         </Link>
//       </NextLink>
//     );
//   }
//   return (
//     <Link
//       p={2}
//       bg={active ? "grassTeal" : undefined}
//       color={active ? "#202023" : inactiveColor}
//       href={href}
//       target="_blank"
//       {...props}
//     >
//       {children}
//     </Link>
//   );
// };

const LoggedOutButton = ()=>{
  return (
    (<NextLink href="/login" >

      <PrimaryButton  backgroundColor="CSGreen" fontSize={['xs','sm','md','xl','xl']} size={['xs','sm','sm','md','md']}>Iniciar Sesión</PrimaryButton>

    </NextLink>)
  );
}
const mapToName = new Map([["user","Equipo"],["mentor","Mentor"],["jury","Jurado"],["admin","Administrador"]])
const LoggedInButton = ()=>{
  const router = useRouter()
  const userInfo = useStore((state)=>state.userInfo)
  const storeLogOut = useStore((state)=>state.logout)
  const {isOpen, onToggle} = useDisclosure()
  const goToProfile=()=>router.push('/profile')
  const logOut = async ()=>{
    await router.push('/')
    storeLogOut()
    
  }
  // return(
  //   <VStack top='0.5' cursor='pointer' transition="all 0.3s ease" _hover={{"borderColor":"CSOrange"}} px='2px' gap={0} borderWidth='2px' borderColor='CSBlue' borderRadius='4px'>
  //     <HStack>
  //       <Avatar color='white' backgroundColor='gray' name={userInfo.name}></Avatar>
  //       <VStack p='2' align='start'>
  //         <Heading fontSize='smaller'>{userInfo.name}</Heading>
  //         <Text fontSize='smaller'>{mapToName.get(userInfo.role)}</Text>
  //       </VStack>
  //     </HStack> 
  //     <Collapse in={isOpen}>
  //       <Heading>Hello world</Heading>
  //     </Collapse>
  //   </VStack>
  // )
  return(
    <Menu>
    <MenuButton backgroundColor='transparent' height="120%" _hover={{"backgroundColor":"CSBlue"}} as={Button} rightIcon={<ChevronDownIcon />}>
        <HStack>
         <Avatar color='white' backgroundColor='gray' name={userInfo?.name}></Avatar>
         <VStack p='2' align='start'>
           <Heading fontSize='smaller'>{userInfo?.name}</Heading>
           <Text fontSize='smaller'>{mapToName.get(userInfo?.role)}</Text>
         </VStack>
       </HStack> 
    </MenuButton>
  <MenuList>
    <MenuItem onClick={goToProfile} >Mi perfil</MenuItem>
    <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
  </MenuList>
</Menu>
  )
}

const Navbar = (props) => {
  const isLoggedIn = useStore((state)=>state.isLoggedIn)
  const userInfo = useStore((state)=>state.userInfo)
  const [navButton, setNavButton] = useState(
      <LoggedOutButton></LoggedOutButton>
  )
  useEffect(()=>{
    if(isLoggedIn){
      setNavButton(<LoggedInButton/>)
    }else{
      setNavButton(<LoggedOutButton/>)
    }
  },[isLoggedIn])
// onAuthStateChanged(auth,()=>setNavButton(<Heading>Logged In!</Heading>))
  const { path } = props;
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#1C1C1C", "#1C1C1C")}// sin esto es transparente (tipo vidrio), no se si lo queremos asi 
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

        <Box align="right" alignItems="center" marginLeft="auto" display="flex">
          <Box ml={(2, 0)} mr={(0, 2)} zIndex={99}>
            {navButton}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
