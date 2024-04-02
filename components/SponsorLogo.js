import { Img, Link } from "@chakra-ui/react";

const SponsorLogo = ({ link, logo, name, width, height, style }) => {
  return (
    <Link {...style} href={link} isExternal>
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
