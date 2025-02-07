import {
  Text,
  Button,
  VStack,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
const TextSize = ["md", "lg", "xl", "2xl", "3xl"];

const FirstStep = ({ setName, name, nextStep }) => {
  const [value, setValue] = useState(name);
  const [invalidValue, setInvalidValue] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    setInvalidValue(event.target.value === "");
  };

  const moveForward = () => {
    setName(value);
    nextStep();
  };

  return (
    <VStack>
      <Breadcrumb separator={">"} w="full" padding={"2%"} fontSize="3xl">
        <BreadcrumbItem>
          <Text fontSize={["xl", "2xl", "3xl"]}>Inscripción</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text color={"CSLightOrange"} fontSize={["xl", "2xl", "3xl"]}>
            Datos equipo
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack px="4%" paddingTop="5%">
        <Text fontSize={TextSize} paddingBottom="5%">
          Ingresá acá el{" "}
          <Text as="span" color="CSLightOrange">
            {" "}
            nombre de tu equipo:
          </Text>
        </Text>
        <Input
          isInvalid={invalidValue}
          borderWidth="1.5px"
          errorBorderColor="red.500"
          value={value}
          onChange={handleChange}
          textColor={"black"}
          bg="white"
          focusBorderColor="white"
        />
        <Text textAlign="center" fontSize={TextSize} color="red.500">
          {invalidValue ? "El nombre no puede estar vacio" : ""}
        </Text>
        <Text textAlign="center" fontSize={TextSize}>
          <Text as="span" color="CSLightOrange">
            {" "}
            Recordá
          </Text>
          : el nombre debe ser apropiado para la competencia
        </Text>
      </VStack>

      <Center paddingTop="2%">
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
          isDisabled={invalidValue || value === ""}
        >
          Siguiente
        </Button>
      </Center>
    </VStack>
  );
};

export default FirstStep;
