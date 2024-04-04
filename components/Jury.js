import { Img, VStack, Text, AspectRatio, Box } from "@chakra-ui/react";
import styles from "./juryStyle.module.css";
const TextSize = ["8px", "10px", "12px", "16px", "16px"];
const Jury = ({ jury, ...extendedProps }) => {
  const revealed = jury.revealed === undefined ? true : jury.revealed;

  return (
    <>
      {revealed ? (
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
