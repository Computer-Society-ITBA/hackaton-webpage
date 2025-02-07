import { useState } from "react";
import {
  Text,
  Button,
  VStack,
  Input,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  Center,
} from "@chakra-ui/react";

import joi from "joi";

const ThirdStep = ({
  setEmail,
  email,
  setPassword,
  password,
  nextStep,
  prevStep,
}) => {
  const validatePassword = (password) => {
    return (
      joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).validate(password)
        .error === undefined
    );
  };
  const [localEmail, setLocalEmail] = useState(email);
  const [localPassword, setLocalPassword] = useState(password);
  const [localPassword2, setLocalPassword2] = useState(password);
  const [invalidEmail, setInvalidEmail] = useState(
    !validEmail(email) && email !== ""
  );
  const [invalidPassword1, setInvalidPassword1] = useState(
    !validatePassword(password) && password !== ""
  );
  const [invalidPassword2, setInvalidPassword2] = useState(
    !validatePassword(password) && password !== ""
  );

  const handleEmail = (event) => {
    setLocalEmail(event.target.value);
    setInvalidEmail(!validEmail(event.target.value));
  };

  const handlePassword1 = (event) => {
    setLocalPassword(event.target.value);
    setInvalidPassword1(!validatePassword(event.target.value));
  };

  const handlePassword2 = (event) => {
    setLocalPassword2(event.target.value); //Estos handlers se pueden reducir a uno solo pasandolo como parametro
    setInvalidPassword2(!validatePassword(event.target.value));
  };

  function validEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const moveForward = () => {
    setPassword(localPassword);
    setEmail(localEmail);
    nextStep();
  };
  const moveBackwards = () => {
    setEmail(localEmail);
    setPassword(localPassword === localPassword2 ? localPassword : "");
    prevStep();
  };

  return (
    <VStack>
      <Breadcrumb separator={">"} w="full" padding={"2%"} fontSize="3xl">
        <BreadcrumbItem>
          <Text fontSize={["xs", "sm", "2xl"]}>Inscripción</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text fontSize={["xs", "sm", "2xl"]}>Datos equipo</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text color="CSLightOrange" fontSize={["xs", "sm", "2xl"]}>
            Mail y contraseña
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <b>
        <Text
          paddingTop={"5%"}
          color="CSLightOrange"
          fontSize={["2xl", "3xl", "4xl"]}
        >
          EMAIL
        </Text>
      </b>
      <Input
        borderWidth="1.5px"
        errorBorderColor="red.500"
        isInvalid={invalidEmail}
        value={localEmail}
        onChange={handleEmail}
        textColor={"black"}
        bg="white"
        focusBorderColor="white"
        w={["300px", "400px", "500px"]}
      />
      <b>
        <Text
          paddingTop={"10%"}
          color="CSLightOrange"
          fontSize={["2xl", "3xl", "4xl"]}
        >
          CONTRASEÑA
        </Text>
      </b>
      <Input
        borderWidth="1.5px"
        errorBorderColor="red.500"
        isInvalid={localPassword !== localPassword2 || invalidPassword1}
        value={localPassword}
        onChange={handlePassword1}
        textColor={"black"}
        bg="white"
        focusBorderColor="white"
        w={["300px", "400px", "500px"]}
        type={"password"}
      />
      <b>
        <Text
          paddingTop={"10%"}
          color="CSLightOrange"
          fontSize={["2xl", "3xl", "4xl"]}
        >
          REPETIR CONTRASEÑA
        </Text>
      </b>
      <Input
        borderWidth="1.5px"
        errorBorderColor="red.500"
        isInvalid={localPassword !== localPassword2 || invalidPassword2}
        value={localPassword2}
        onChange={handlePassword2}
        textColor={"black"}
        bg="white"
        focusBorderColor="white"
        w={["300px", "400px", "500px"]}
        type={"password"}
      />
      <Text align={"center"} fontSize={["sm", "lg", "xl"]} paddingTop={"1%"}>
        Recordá que estos datos son para{" "}
        <Text as="span" color="CSLightBlue">
          iniciar sesión
        </Text>
      </Text>
      <Text fontSize={["sm", "lg", "xl"]} color="red.500">
        {invalidEmail ? "Email no valido" : ""}
      </Text>
      <Text fontSize={["sm", "lg", "xl"]} color="red.500">
        {invalidPassword1 || invalidPassword2
          ? "La contraseña debe estar formada por 6 a 30 caracteres sin espacios"
          : ""}
      </Text>
      <Text fontSize={["sm", "lg", "xl"]} color="red.500">
        {localPassword !== localPassword2
          ? "Las constraseñas deben coincidir"
          : ""}
      </Text>
      <Center paddingTop="2%">
        <HStack>
          <Button
            onClick={moveBackwards}
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="CSLightBlue"
            _hover={{
              backgroundColor: "CSDarkBlue",
              color: "CSLightBlue",
              border: "1px solid #AFEFF3" //  #AFEFF3 === CSLightBlue
            }}
          >
            Volver
          </Button>
          <Button
            onClick={moveForward}
            colorScheme="CSLightOrange"
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="CSLightOrange"
            _hover={{
              backgroundColor: "CSDarkBlue",
              color: "CSLightOrange",
              border: "1px solid #FAD399" //  #FAD399 === CSLightOrange
            }}
            isDisabled={
              !localEmail ||
              invalidEmail ||
              !localPassword ||
              localPassword !== localPassword2 ||
              invalidPassword1 ||
              invalidPassword2
            }
          >
            Siguiente
          </Button>
        </HStack>
      </Center>
    </VStack>
  );
};

export default ThirdStep;
