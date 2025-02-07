import { useState } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import auth from "../../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];

const InscribirseButton = styled(Button)`
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
    color: #FAD399;
    border: 1px solid #FAD399;

    svg path {
      fill: #FAD399;
    }
  }
`;

function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [correctMessage, setCorrectMessage] = useState("");

  const [correctEmail, setCorrectEmail] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value.trim());

  const handleSendResetEmail = (email) => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setCorrectEmail(true);
        setCorrectMessage(`Correo enviado correctamente a ${email}.`);
      })
      .catch((error) => {
        setErrorMessage(
          "Ocurrio un error, revisa el que el email sea correcto."
        );
      });
    setIsLoading(false);
  };

  return (
    <VStack width="full" direction="column" justifyContent="space-between">
      <Img
        src="/images/chars-left.png"
        alt="decoration image"
        alignSelf="start"
        paddingTop="2%"
        w={["18%", "15%", "12%", "10%", "8%"]}
      ></Img>
      <Flex
        gap="2em"
        align="center"
        direction="column"
        width={["85%", "65%", "50%", "40%", "30%"]}
      >
        <Heading size={HeadingSize}>Reiniciar contraseña</Heading>

        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <EmailIcon />
          </InputLeftElement>
          <Input
            value={email}
            onChange={handleEmailChange}
            minH="3.5em"
            placeholder="Ingresá tu email"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
        </InputGroup>
        <Text fontSize={TextSize}>
          Se enviara un correo a esa direccion para restablecer la contraseña.
        </Text>

        <InscribirseButton
          isLoading={isLoading}
          onClick={() => handleSendResetEmail(email)}
          color="CSDarkBlue"
          backgroundColor="CSLightOrange"
          width="full"
        >
          Enviar
        </InscribirseButton>

        {/* <Text fontSize={TextSize} color="red.500"> */}
        <Text fontSize={TextSize} color={correctEmail ? "CSGreen" : "red.500"}>
          {correctEmail ? correctMessage : errorMessage}
        </Text>
      </Flex>
    </VStack>
  );
}

export default Home;
