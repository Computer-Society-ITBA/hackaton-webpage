import { Img, Box } from "@chakra-ui/react";
import Link from "next/dist/client/link";

const SponsorLogo = ({ link, logo, name, width, height }) => {
  return (
    <Box mx={8}>
      <Link href={link} passHref>
        <a target="_blank">
          <Img
            src={logo}
            height={48}
            alt={name}
            width={width ? width : "auto"}
            height={height ? height : 40}
            cursor="pointer"
            _hover={{
              transform: "scale(1.1)",
              transition: "ease-in-out 0.1s",
            }}
            _active={{
              transform: "scale(0.9)",
              transition: "ease-in-out 0.1s",
            }}
          />
        </a>
      </Link>
    </Box>
  );
};

export default SponsorLogo;
