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
import { auth } from "../config/firebaseConfig";

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

const ProfileButton = ({user,...extendedProps})=>{
  return(
    <Box>

    </Box>
  )
}
const Navbar = (props) => {
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
          {/* { <ThemeToggleButton />} */}

          <Box ml={(2, 0)} mr={(0, 2)} zIndex={99}>
            {auth.currentUser?
              <Heading>Hello</Heading>
            :
            <NextLink href="/register" >
              <a>
                <PrimaryButton  backgroundColor="CSGreen" fontSize={['xs','sm','md','xl','xl']} size={['xs','sm','sm','md','md']}>INSCRIBITE</PrimaryButton>
              </a>
            </NextLink>
            }
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
