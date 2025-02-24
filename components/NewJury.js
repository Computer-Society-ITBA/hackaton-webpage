import {
  Img,
  VStack,
  Text,
  AspectRatio,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  Heading,
  Spacer,
  IconButton,
  ModalBody,
  useDisclosure,
  LinkBox,
} from "@chakra-ui/react";
import styles from "./juryStyle.module.css";
import { CloseIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { LiaLinkedinIn } from "react-icons/lia";
import { AiFillLinkedin } from "react-icons/ai";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
const BoxTextSize = ["10cqw", "20cqw"];
const ModalSize = ["sm", "md", "lg", "xl", "2xl"];

const Jury = ({ jury, ...extendedProps }) => {
  const revealed = jury.revealed === undefined ? true : jury.revealed;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onHover, setOnHover] = useState(false);
  const closeModal = () => {
    setOnHover(false);
    onClose();
  };

  return (
    <>
      {revealed ? (
        <VStack
          justify="center"
          w={["8em", "8em", "10em", "12em", "13em"]}
          {...extendedProps}
        >
          <AspectRatio className={styles.container} ratio={1} width="full">
            <Box
              onClick={onOpen}
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
              <Img
                src={jury.imgSrc}
                alt={jury.name + "'s photo"}
                borderRadius="6%"
              />
              <Modal
                isOpen={isOpen}
                onClose={closeModal}
                scrollBehavior="inside"
                size={ModalSize}
                isCentered
              >
                <ModalOverlay />
                <ModalContent backgroundColor="#14192D" borderWidth="2px">
                  <ModalHeader>
                    <HStack>
                      <Heading fontSize={HeadingSize}>{jury.name}</Heading>
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
                            components={{
                              //Esto es feo pero es la unica forma de forzarle margen a los bullets en mkdown
                              ul: ({ children }) => (
                                <ul
                                  style={{
                                    marginTop: "20px",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  {children}
                                </ul>
                              ),
                              li: ({ children }) => (
                                <li style={{ marginTop: "10px" }}>
                                  {children}
                                </li>
                              ),
                            }}
                          >
                            {jury.description}
                          </ReactMarkdown>
                        </Text>
                      </HStack>
                      {jury.linkedin ? (
                        <LinkBox p="5%">
                          <a href={jury.linkedin} target="_blank">
                            <AiFillLinkedin/>
                          </a>
                        </LinkBox>
                      ) : null}
                    </VStack>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Box
                className={`${styles.overlay} object-contain`}
                borderRadius="6%"
              >
                <VStack justifyContent="center" alignItems="center">
                  {jury.details.map((detail, index) => {
                    return (
                      <Text key={index} textAlign="center">
                        {detail}
                      </Text>
                    );
                  })}
                </VStack>
              </Box>
            </Box>
          </AspectRatio>
          <Text
            size={["xs", "xs", "md", "md", "lg"]}
            textAlign="center"
            width="100%"
          >
            {jury.name}
          </Text>
        </VStack>
      ) : (
        <VStack
          justify="center"
          w={["8em", "8em", "10em", "12em", "13em"]}
          {...extendedProps}
        >
          <AspectRatio className={styles.container} ratio={1} width="full">
            <Box>
              <Text>Proximamente</Text>
              <Box className={styles.overlay} borderRadius="6%">
                <Text fontSize={TextSize} textAlign="center" pt="2">
                  Será revelado luego de ser publicado en nuestras redes
                  sociales
                </Text>
              </Box>
            </Box>
          </AspectRatio>
        </VStack>
      )}
    </>
  );

  // return (
  // <VStack
  //   justify="center"
  //   w={["8em", "8em", "10em", "12em", "13em"]}
  //   {...extendedProps}
  // >
  //   <AspectRatio className={styles.container} ratio={1} width="full">
  //     <Box>
  //       <Img
  //         src={jury.imgSrc}
  //         alt={jury.name + "'s photo"}
  //         borderRadius="6%"
  //       />

  //       <Box className={styles.overlay} borderRadius="6%">
  //         <Text fontSize={TextSize} textAlign="center" pt="2">
  //           {jury.details}
  //         </Text>
  //       </Box>
  //     </Box>
  //   </AspectRatio>
  //   <Text
  //     size={["xs", "xs", "md", "md", "lg"]}
  //     textAlign="center"
  //     width="100%"
  //   >
  //     {jury.name}
  //   </Text>
  // </VStack>
  // );
};
export default Jury;
