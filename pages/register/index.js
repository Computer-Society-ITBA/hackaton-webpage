import React, { useState } from "react";
import {
  Heading,
  Flex,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Link,
  Grid,
} from "@chakra-ui/react";
import {useWindowSize} from "rooks";
import ParticleImage, { forces } from "react-particle-image";
import styled from "@emotion/styled";

const Subtitle = styled(Text)`
  font-size: 14px;
  text-transform: uppercase;
  color: #b1b7c2;
`;

const Separator = styled.span`
  border-left: 1px solid #b1b7c2;
  margin-left: 16px;
  margin-right: 16px;
`;

const Badge = styled.span`
  color: #2F323A;
  background-color: #BDC4CF;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 5px 6px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 8px;
`;

const PrimaryButton = styled(Button)`
  font-size: 14px;
  border-radius: 8px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  margin-top: 40px;
  height: 48px;
  padding: 16px 24px;

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

const motionForce = (x, y) => {
  return forces.disturbance(x, y, 30);
};
const Home = () => {
  
  const { innerWidth } = useWindowSize();
  const cyberImage = "/images/cyber-security.svg";
  const cryptoImage = "/images/cryptocurrency.svg";
  const robotImage = "/images/robot.svg";

  return (
    <h1>hola</h1> // Aca deberia renderizar el carrusel
  );
};

export default Home;
