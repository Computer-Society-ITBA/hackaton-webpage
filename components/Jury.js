import {
  Img,
  VStack,
  Text,
  AspectRatio,
  Flex,
  Container,
  Box,
} from "@chakra-ui/react";
import styles from "./juryStyle.module.css";
const TextSize = ["8px", "10px", "12px", "16px", "16px"];
const Jury = ({ jury, ...extendedProps }) => {

  return (
    <>
      {jury.revelead ?
        <VStack
          justify="center"
          w={["8em", "8em", "10em", "12em", "13em"]}
          {...extendedProps}
        >
          <AspectRatio className={styles.container} ratio={1} width="full">
            <Box>
              <Img
                src={jury.imgSrc}
                alt={jury.name + "'s photo"}
                borderRadius="6%"
              />
              <Box className={styles.overlay} borderRadius="6%">
                <Text fontSize={TextSize} textAlign="center" pt="2">
                  {jury.details}
                </Text>
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
        :
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
                  Los detalles seran revelados una vez que se conozca el juez.
                </Text>
              </Box>
            </Box>
          </AspectRatio>
        </VStack>
      }
    </>
  )

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
