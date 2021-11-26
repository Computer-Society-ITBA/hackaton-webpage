import Link from "next/link";
import Image from "next/image";
import { Heading, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  &:hover img {
    transform: rotate(20deg);
  }
`;

const Logo = () => {
  const csImage = `/images/cs-logo-white.png`;

  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image src={csImage} width={30} height={30} alt="logo" />
          <Heading
            color={useColorModeValue("gray.800", "whiteAlpha.900")}
            size="lg"
          >
            HackIT-BA!
          </Heading>
        </LogoBox>
      </a>
    </Link>
  );
};

export default Logo;
