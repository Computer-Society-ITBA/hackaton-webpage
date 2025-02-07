import {
  CircularProgress,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useStore from "../../config/storeConfig";
import AdminView from "../../components/views/Admin";
import UserView from "../../components/views/User";
import MentorView from "../../components/views/Mentor";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];

const TODOView = () => {
  return (
    <VStack p="4%">
      <Heading
        size={HeadingSize}
        py="2%"
        textAlign="center"
        color="CSLightBlue"
      >
        ¡Nos estamos preparando!
      </Heading>
      <Text size={TextSize} textAlign="center">
        Te avisaremos cuando puedas comenzar a usar tu perfil
      </Text>
    </VStack>
  );
};
const Home = () => {
  const userInfo = useStore((state) => state.userInfo);
  const userToken = useStore((state) => state.token);
  const [view, setView] = useState(
    <Flex pt="8%" justifyContent="center" alignItems="center" align="center">
      <CircularProgress
        isIndeterminate
        color="CSLightOrange"
        size="40%"
      ></CircularProgress>
    </Flex>
  );
  useEffect(() => {
    switch (userInfo?.role) {
      case "admin":
        setView(<AdminView token={userToken} />);
        break;
      case "user":
        setView(<UserView userInfo={userInfo} />);
        break;
      case "mentor":
        setView(<MentorView token={userToken} />);
        break;
      default:
        // SET TO PROFILE VIEW
        setView(<TODOView />);
    }
  }, [userToken, userInfo]);
  return view;
};

export default Home;
