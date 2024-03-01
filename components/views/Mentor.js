import {
  AddIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  Icon,
  MinusIcon,
} from "@chakra-ui/icons";
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Flex,
  Spacer,
  IconButton,
  useDisclosure,
  Collapse,
  Grid,
  SimpleGrid,
  GridItem,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Center,
  useAvatarStyles,
  CircularProgress,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "../../config/axiosConfig";
import ReactStars from "react-rating-stars-component";
import { SocialIcon } from "react-social-icons";
import useStore from "../../config/storeConfig";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];



const RateCategoryCard = ({ name, onCategoryRatingChanged }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Text fontSize={TextSize}>{name}</Text>
          <Spacer></Spacer>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <VStack align="start" width="full">
          <ReactStars    count={5}
          onChange={onCategoryRatingChanged}
          size={24}
           activeColor="#ffd700"/>
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );

}


const RateTeamCard = ({
  team,
  onTeamSelected,
  onTeamRejected,
  ...extendedProps
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errorrMessage, setErrorMessage] = useState("");

  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState([]);

  const userInfo = useStore((state) => state.userInfo);


  const handleRatingChange = (index, newRating) => {


    setRatings(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[index] = newRating;
      return newRatings;
    });
  };

  // try {
  //   const response = await axiosApiInstance.get(
  //     `/users/${userInfo.uid}/submission`
  //   );
  //   return response.data && response.data.userId === userInfo.uid;
  // } catch (err) {
  //   return false;
  // }

  const handleSubmit = () => {

    //         submissionId, relevancia, creatividad, presentacion, descripcion
    try{
      axiosApiInstance.post(
        `/mentors/${userInfo.uid}/votes`,
        {
          ...ratings,
          feedback
        }
      );
    } catch (err) {
        console.log(err)
    }
    setFeedback('');
  };

  return (
    <VStack
      p="2%"
      align="center"
      borderRadius="8px"
      borderWidth="2px 2px 6px 2px"
      borderColor="CSBlue"
      {...extendedProps}
    >
      <Flex
        onClick={onToggle}
        direction="row"
        verticalAlign="middle"
        width="full"
      >
        <Heading
          fontSize={HeadingSize}
        >{`Equipo ${team.number}: ${team.name}`}</Heading>
        <Spacer></Spacer>
        <HStack>
          <IconButton
            _hover={{ backgroundColor: "grey" }}
            mx="4%"
            onClick={onToggle}
            backgroundColor="transparent"
            icon={isOpen ? <MinusIcon /> : <AddIcon />}
          ></IconButton>
        </HStack>
      </Flex>
      
      <Box as={Collapse} in={isOpen} animateOpacity w="100%">
        <VStack width="full" align="start">
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Email del equipo:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.email}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Descripción:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.teamDescription}
          </Text>
          <Spacer></Spacer>
          <HStack width="full" justify="space-around">
            <SocialIcon network="github" url={team.githubLink} />
            <SocialIcon network="youtube" url={team.youtubeLink} />
          </HStack>
          <Spacer></Spacer>
        </VStack>
        <Center>
          <Text fontSize={TextSize} color="red.500">
            {errorrMessage}
          </Text>
          
        </Center>
        <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Calificar equipo:
          </Text>
        <Accordion width="full" defaultIndex={[]} allowMultiple>
        {['Relevancia', 'Creatividad', 'Presentación'].map((category, index) => (
          <RateCategoryCard 
            key={index} 
            name={category}
            onRatingChange={(newRating) => handleRatingChange(index, newRating)} 
          />
        ))}
        </Accordion>
        <VStack width="full" align="end">
          <Spacer></Spacer>
          <Input
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            placeholder="Feedback" 
          >
          </Input>
          <Button onClick={handleSubmit} mt={2}>
        Enviar
        </Button>
        </VStack>
      </Box>
    </VStack>
  );
};


const TeamRating = ({ token }) => {
  const [teams, setTeams] = useState([
    {
      number: 1,
      name: "Equipo 1",
      quialified: true,
      email: "equipo1@email.com",
      teamDescription: "Un equipo muy interesante",
      motivation: "Queremos aprender",
      githubLink: "github.com",
      youtubeLink: "youtube.com",
      participants: [
        {
          name: "Participante 1",
          DNI: "12345678",
          email: "e1p1@email.com",
          age: 20,
        }
      ]
    },
    {
      number: 2,
      name: "Equipo 2",
      quialified: false,
      email: "equipo2@email.com",
      teamDescription: "Un equipo muy interesante",
      motivation: "Queremos aprender",
      githubLink: "github.com",
      youtubeLink: "youtube.com",
      participants: [
        {
          name: "Participante 1",
          DNI: "12345678",
          email: "e2p1@email.com",
          age: 20,
        }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const modifyTeamQualification = (index, uid, qualification) => {
    return async () => {
      try {
        await axiosApiInstance.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${uid}/qualified`,
          { qualified: qualification }
        );
        const aux = teams.slice();
        aux[index].qualified = qualification;
        setTeams(aux);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
  };

  useEffect(() => {

    async function getUsersFromApi() {
      setIsLoading(true);
      try {
        const users = (
          await axiosApiInstance.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users`
          )
        ).data.users;
        setTeams(users.filter((user) => user.role === "user"));
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    }

    async function getUserProfile() {

    }
    getUsersFromApi();
  }, []);
  return (
    <VStack align="start" width="full">
      {isLoading ? (
        <Center width="full">
          <CircularProgress
            isIndeterminate
            color="CSOrange"
            size="40%"
          ></CircularProgress>
        </Center>
      ) : (
        <Flex
          width="full"
          direction="row"
          flexWrap="wrap"
          justifyContent="start"
          alignItems="start"
          verticalAlign="top"
        >
          {teams.map((team, index) => {
            return (
              <RateTeamCard
                key={index}
                mx="2%"
                my="1%"
                width={["100%", "80%", "45%", "40%", "25%"]}
                team={{ number: index + 1, ...team }}
                onTeamSelected={modifyTeamQualification(index, team.uid, true)}
                onTeamRejected={modifyTeamQualification(index, team.uid, false)}
              ></RateTeamCard>
            );
          })}
        </Flex>
      )}
    </VStack>
  );
};


const MentorView = ({ token }) => {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Puntuación de equipos</Tab>
      </TabList>

      <TabPanels>
        {/* Selección de proyectos */}
        <TabPanel>
          <TeamRating token={token} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MentorView;
