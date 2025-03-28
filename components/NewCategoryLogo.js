import { CloseIcon } from "@chakra-ui/icons";
import ReactMarkdown from 'react-markdown';

import {
  Box,
  Heading,
  Img,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  IconButton,
  Spacer,
  VStack,
  Text,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
const ModalSize = ["sm", "md", "lg", "xl", "2xl"];

const NewCategoryLogo = (props) => {
  const { category } = props;
  //separo a los tokens cuando viene un espacio que no esta seguido por una "y"
  //ej: "hola y chau" => ["hola y", "chau"]
  const names = category.name.split(new RegExp(" (?=[^y])"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onHover, setOnHover] = useState(false);
  const closeModal = () => {
    setOnHover(false);
    onClose();
  };
  return (
    // queda raro que cuando te acercas a la foto ya te toma el hover, pero bueno es por la caja que la contiene con el texto
    <Box
      onClick={onOpen}
      boxSize="25%"
      direction="column"
      //w="100%"
      h="100%"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      _hover={{
        transform: "scale(1.05)",
        transition: "ease-in-out 0.2s",
      }}
      _active={{
        transform: "scale(0.9)",
        transition: "ease-in-out 0.1s",
      }}
    >
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        scrollBehavior="inside"
        size={ModalSize}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor="#14192D"
          borderWidth="2px"
          borderColor={category.color}
        >
          <ModalHeader>
            <HStack>
              <Heading fontSize={HeadingSize}>{category.name}</Heading>
              <Spacer></Spacer>
              <IconButton
                onClick={closeModal}
                icon={<CloseIcon />}
              ></IconButton>
            </HStack>
          </ModalHeader>
          <ModalBody p={0}>
            <VStack>
              <HStack p="4%">
                <Text fontSize={TextSize} pr="6%" align="justify">
                  <ReactMarkdown
                    components={{//Esto es feo pero es la unica forma de forzarle margen a los bullets en mkdown
                      ul: ({ children }) => (
                        <ul style={{ marginTop: "20px", paddingLeft: "20px" }}>
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li style={{ marginTop: "10px" }}>{children}</li>
                      ),
                    }}
                  >
                    {category.description}
                  </ReactMarkdown>
                </Text>
                {category.logoSvg ? (
                  <category.logo
                    height="100%"
                    width="100%"
                    color="white"
                    strokeWidth="4px"
                    stroke="white"
                  />
                ) : null}
              </HStack>
              <HStack w="full" align="center" justify="center">
                <Img
                  src={category.logoSmall}
                  width={"20%"}
                  alt="decoration"
                  marginBottom={"5%"}
                />
                {/* Alcance de la categoria */}
                {/* <VStack p='4%'>
                                <Text fontWeight='bold' fontSize={HeadingSize} >Alcance de la categoría</Text>
                                <UnorderedList> 
                                    {category.scope.map((scopeItem)=> <ListItem key={scopeItem}>{scopeItem}</ListItem>)}
                                </UnorderedList>
                            </VStack> */}
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Center>
        {/* {isShown?<Img onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} height='200px' width='200px' src={imgSrc} alt={names[0]}></Img>: <Img onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} height='200px' width='200px' src='/images/IEEE_CS.svg' alt={names[0]}></Img>} */}
        {/* <Img height='200px' width='200px' src={category.imgSrc} alt={category.name}></Img> */}
        {category.logoSvg ? (
          <category.logo
            height="50%"
            width="50%"
            color={onHover ? "#01CBA1" : "white"}
            strokeWidth="4px"
            stroke={onHover ? "#01CBA1" : "white"}
          />
        ) : (
          <Img
            height="100%"
            width="100%"
            objectFit="contain"
            src={category.logo}
            alt="category_logo"
          ></Img>
        )}
      </Center>
    </Box>
  );
};
export default NewCategoryLogo;
