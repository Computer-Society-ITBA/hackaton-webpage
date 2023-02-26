import { Img, Box, Center, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const SponsorLogo = ({ link, logo, name, width, height, style }) => {
  return (
    <Link {...style} href={link} isExternal height='100%' mx={8}>
      <Img
        src={logo}
        alt={name}
        width={width ? width : "auto"}
        height={height ? height : "auto"}
        cursor="pointer"
        _hover={{
          transform: "scale(1.1)",
          transition: "ease-in-out 0.1s",
        }}
        _active={{
          transform: "scale(0.9)",
          transition: "ease-in-out 0.1s",
        }}
        objectFit="contain"
      />
    </Link>    
  );
};

export default SponsorLogo;
