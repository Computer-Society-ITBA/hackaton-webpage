import { Box, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" color="#CSLightBlue" />
    </Box>
  );
};

export default LoadingSpinner;
