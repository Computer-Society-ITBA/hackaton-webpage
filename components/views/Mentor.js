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
  Input, useToast,
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
  const toast = useToast();

  const userInfo = useStore((state) => state.userInfo);

  const [voted, setVoted] = useState(false)

  //Check if already voted to disable the card.
  useEffect(() => {
      const getVote = async () => {
        const votings = await axiosApiInstance.get(`/votes?mentor=${userInfo.uid}&submission=${team.submission}`)
        if (votings.data.length > 0) {
          setVoted(true)
        }
      }

      getVote()
  }, []);



  //
  const RELEVANCIA = 0
  const CREATIVIDAD = 1
  const PRESENTACION = 2



  const handleRatingChange = (index, newRating) => {
    setRatings(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[index] = newRating;
      return newRatings;
    });
  };


  const handleSubmit = () => {

      axiosApiInstance.post(
        `/mentors/${userInfo.uid}/votes`,
        {
          "submissionId": team.submission,
          "relevancia": ratings[RELEVANCIA],
          "creatividad": ratings[CREATIVIDAD],
          "presentacion": ratings[PRESENTACION],
          "descripcion": feedback
        }
      ).catch(err => {
        toast({
          title: "Error. Recuerda que solo podes votar una vez al equipo",
          status: "error",
          duration: 3000,
        });
        setFeedback('');
    }).then(e => {
      setVoted(true)
        toast({
          title: "Voto guardado correctemente",
          status: "success",
          duration: 3000,
        });
    })
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
            <a rel={'external'} href={team.githubLink? team.githubLink.includes("//") ?  team.githubLink : `//${team.githubLink}` : ""} target={"_blank"}>
              <SocialIcon network="github" />
            </a>

            <a rel={'external'} href={team.youtubeLink ? team.youtubeLink.includes("//") ? team.youtubeLink : `//${team.youtubeLink}` : ""} target={"_blank"} >
              <SocialIcon network="youtube" />
            </a>
          </HStack>
          <Spacer></Spacer>
        </VStack>
        <Center>
          <Text fontSize={TextSize} color="red.500">
            {errorrMessage}
          </Text>
          
        </Center>

        {
          !voted ?
              <>
                <Text fontSize={TextSize} textAlign="start" color="CSOrange">
                  Calificar equipo:
                </Text>
                <Accordion width="full" defaultIndex={[]} allowMultiple>
                  {['Relevancia', 'Creatividad', 'Presentación'].map((category, index) => (
                      <RateCategoryCard
                          key={index}
                          name={category}
                          onCategoryRatingChanged={(newRating) => handleRatingChange(index, newRating)}
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
                  <Button onClick={ handleSubmit} mt={2}>
                    Enviar
                  </Button>
                </VStack>
              </> : <></>
        }


      </Box>
    </VStack>
  );
};


const TeamRating = ({ token }) => {

  const userInfo = useStore((state) => state.userInfo);
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axiosApiInstance.get(`/mentors/${userInfo.uid}/submissions`);
        const submissions = response.data.submissions;
        const updatedTeams = [];
        console.log(submissions)

        for (const sub of submissions) {
          try {
            const submissionReq = await axiosApiInstance.get(`/submissions/${sub}`)
            const submissionObj = submissionReq.data

            const team = await axiosApiInstance.get(`/users/${submissionObj.userId}`)
            const teamData = team.data
            console.log(teamData)
            const teamObj = {
              name: teamData.name,
              email: teamData.email,
              teamDescription: teamData.teamDescription,
              githubLink: submissionObj.githubLink,
              youtubeLink: submissionObj.youtubeLink,
              submission: sub
            }

            updatedTeams.push(teamObj);

          } catch (error) {
            console.log(error)
          }
        }

        setTeams(prevTeams => [...updatedTeams]);

      } catch (err) {
        console.log(err);
      }
    }

    getTeams();

  }, []);


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
        // setTeams(users.filter((user) => user.role === "user"));
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    }

    async function getUserProfile() {

    }
    // getUsersFromApi();
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
          {
            teams ? teams.map((team, index) => {
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
          }) :
                <></>
          }
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
