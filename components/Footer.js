import {
  Text,
  VStack,
  HStack,
  Img,
  Spacer,
  IconButton,
} from "@chakra-ui/react";

import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const HackITBAImage = "/images/hackitba-new-logo.png";
  const CSImage = "/images/IEEE_CS.png";
  return (
    <VStack mt="24" w="full">
      <Text align="center" fontSize={["xs", "sm", "md", "lg", "lg"]}>
        &copy; {currentYear} Computer Society ITBA Student Branch. Todos los
        derechos reservados.
      </Text>
      <HStack my="4" w="full" justify="center" spacing="4">
        <IconButton
          aria-label="Instagram"
          icon={<FaInstagram />}
          fontSize="2xl"
          variant="link"
          isRound
          colorScheme="linkedin"
          _hover={{ color: "linkedin.500" }}
          onClick={() =>
            window.open(
              "https://www.instagram.com/computer.society.itba/?hl=en",
              "_blank"
            )
          }
        />
        <IconButton
          aria-label="Twitter"
          icon={<FaYoutube />}
          fontSize="2xl"
          variant="link"
          isRound
          colorScheme="linkedin"
          _hover={{ color: "linkedin.500" }}
          onClick={() =>
            window.open(
              "https://www.youtube.com/channel/UCGRu7ac5g1M5fuVYPYX8Ifg",
              "_blank"
            )
          }
        />
        <IconButton
          aria-label="LinkedIn"
          icon={<FaLinkedin />}
          fontSize="2xl"
          variant="link"
          isRound
          colorScheme="linkedin"
          _hover={{ color: "linkedin.500" }}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/itba-computer-society/posts/?feedView=all",
              "_blank"
            )
          }
        />
      </HStack>
      <HStack w="full" justify="end">
        <Img
          src={HackITBAImage}
          alt="HackITBA image"
          width={["25%", "22%", "18%", "16%", "16%"]}
        ></Img>
        <Img
          paddingRight="1%"
          paddingBottom="1%"
          src={CSImage}
          alt="IEEE Computer Society image"
          width={["25%", "22%", "18%", "16%", "16%"]}
        ></Img>
      </HStack>
    </VStack>
  );
};

export default Footer;
