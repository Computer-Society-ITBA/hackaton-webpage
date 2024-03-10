import {
  AddIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  EmailIcon,
  Icon,
  LockIcon,
  MinusIcon,
  StarIcon,
  ViewIcon,
  ViewOffIcon,
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Center,
  InputGroup,
  CircularProgress,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "../../config/axiosConfig";
import styled from "@emotion/styled";
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";

        

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
const TeamCard = ({
  team,
  onTeamSelected,
  onTeamRejected,
  ...extendedProps
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errorrMessage, setErrorMessage] = useState("");
  const rejectTeam = async () => {
    setIsLoading(true);
    try {
      await onTeamRejected();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Ocurrio un error al rechazar al equipo");
    }
    setIsLoading(false);
  };
  const acceptTeam = async () => {
    setIsLoading(true);
    try {
      await onTeamSelected();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Ocurrio un error al aceptar al equipo");
    }
    setIsLoading(false);
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
          {team.qualified === undefined ? (
            <MinusIcon color="gray" />
          ) : team.qualified ? (
            <CheckIcon color="CSGreen" />
          ) : (
            <CloseIcon color="red.500" />
          )}
          <IconButton
            _hover={{ backgroundColor: "grey" }}
            mx="4%"
            onClick={onToggle}
            backgroundColor="transparent"
            icon={isOpen ? <MinusIcon /> : <AddIcon />}
          ></IconButton>
        </HStack>
      </Flex>
      <Flex></Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack width="full" align="start">
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Email del equipo:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.email}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Describe al equipo: intereses, estudios, mentalidad:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.teamDescription}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            ¿Por qué les interesa participar en HackITBA?
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.motivation}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Participantes
          </Text>
          <Accordion width="full" defaultIndex={[]} allowMultiple>
            {team.participants.map((participant, index) => {
              return (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>{participant.name}</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <VStack align="start" width="full">
                      <Text size={TextSize} textAlign="start" color="CSOrange">
                        DNI:{" "}
                        <Text
                          as="span"
                          size={TextSize}
                          color="white"
                          display="inline"
                        >
                          {participant.DNI}
                        </Text>
                      </Text>
                      <Text size={TextSize} textAlign="start" color="CSOrange">
                        email:{" "}
                        <Text
                          as="span"
                          size={TextSize}
                          color="white"
                          display="inline"
                        >
                          {participant.email}
                        </Text>
                      </Text>
                      <Text size={TextSize} textAlign="start" color="CSOrange">
                        edad:{" "}
                        <Text
                          as="span"
                          size={TextSize}
                          color="white"
                          display="inline"
                        >
                          {participant.age}
                        </Text>
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </VStack>
        <Center>
          <Text fontSize={TextSize} color="red.500">
            {errorrMessage}
          </Text>
        </Center>
        <Flex width="full">
          <Button
            onClick={rejectTeam}
            size={["sm", "lg"]}
            height="48px"
            width="40%"
            isLoading={isLoading}
            border="5px"
            color="black"
            variant="solid"
            bgColor="red.500"
            _hover={{ backgroundColor: "red.400" }}
            my="4%"
            leftIcon={<CloseIcon />}
          >
            Rechazar
          </Button>
          <Spacer />
          <Button
            onClick={acceptTeam}
            size={["sm", "lg"]}
            height="48px"
            width="40%"
            isLoading={isLoading}
            border="5px"
            color="black"
            variant="solid"
            bgColor="CSGreen"
            _hover={{ backgroundColor: "#05eda7" }}
            my="4%"
            leftIcon={<CheckIcon />}
          >
            Aceptar
          </Button>
        </Flex>
      </Collapse>
    </VStack>
  );
};

const TeamSelection = ({ token }) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modifyTeamQualification = (index, uid, qualification) => {
    return async () => {
      try {
        await axiosApiInstance.put(`/users/${uid}/qualified`, {
          qualified: qualification,
        });
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
        const users = (await axiosApiInstance.get("/users")).data.users;
        setTeams(users.filter((user) => user.role === "user"));
      } catch (err) {
        console.log(err);
      }
      //dejamos a los participantes solo

      setIsLoading(false);
    }
    getUsersFromApi();
  }, []);
  return (
    <VStack align="start" width="full">
      <Heading textAlign="start">{`Equipos aceptados: ${
        teams.filter((team) => team.qualified).length
      }`}</Heading>
      {/* <Grid width='full' templateColumns={['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)']}>
                {teams.map((team,index)=>{
                    return(
                        <GridItem key={index} mx={['2%','2%','4%','6%','8%']} align='center' py='2%'>
                            <TeamCard team={team} key={index}></TeamCard>
                        </GridItem>
                    )
                })}
            </Grid> */}
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
              <TeamCard
                key={index}
                mx="2%"
                my="1%"
                width={["100%", "80%", "45%", "40%", "25%"]}
                team={{ number: index + 1, ...team }}
                onTeamSelected={modifyTeamQualification(index, team.uid, true)}
                onTeamRejected={modifyTeamQualification(index, team.uid, false)}
              ></TeamCard>
            );
          })}
        </Flex>
      )}
    </VStack>
  );
};

const RegisterMentorButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #2fe0b5;
    border: 1px solid #2fe0b5;

    svg path {
      fill: #2fe0b5;
    }
  }
`;


const MentorRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (event) => setEmail(event.target.value.trim());
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const [errorMessage, setErorrMessage] = useState("");

  const registerMentor = async (name, email, password) => {
    setIsLoading(true);
    try {
      // TODO call API
    } catch (err) {
      setErorrMessage(
        "Ocurrio un error, revisa el que el nombre, el email y la contraseña sean correctos"
      );
    }
    setIsLoading(false);
  };


  return (
    <VStack width="full" direction="column" justifyContent="space-between">
      <Flex
        gap="2em"
        align="center"
        direction="column"
        width={["85%", "65%", "50%", "40%", "30%"]}
      >
        <Heading>Registrar Mentor</Heading>
        <Spacer></Spacer>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <StarIcon />
          </InputLeftElement>
          <Input
            value={name}
            onChange={handleNameChange}
            minH="3.5em"
            placeholder="Nombre del mentor"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <EmailIcon />
          </InputLeftElement>
          <Input
            value={email}
            onChange={handleEmailChange}
            minH="3.5em"
            placeholder="Email del mentor"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <LockIcon />
          </InputLeftElement>
          <Input
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            minH="3.5em"
            placeholder="Contraseña para el mentor"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
          <InputRightElement minH="3.5em">
            <IconButton
              color="black"
              icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShowPassword(!showPassword)}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Text fontSize={TextSize} color="red.500">
          {errorMessage}
        </Text>
        <RegisterMentorButton
          isLoading={isLoading}
          disabled={email === "" || password === ""}
          onClick={() => registerMentor(name, email, password)}
          backgroundColor="CSGreen"
          width="full"
        >
          Registrar mentor
        </RegisterMentorButton>
      </Flex>
    </VStack>
  );

}

const SubmissionCard = ({ submission, mentors, ...extendedProps }) => {
  const { isOpen, onToggle } = useDisclosure();

  const [selectedMentors, setSelectedMentors] = useState(submission.mentors);
  const handleSelectedMentorsChange = (selectedMentors) => {
    setSelectedMentors(selectedMentors);
    // TODO send to backend
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
        >{`Equipo ${submission.number}: ${submission.name}`}</Heading>
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
            {submission.email}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Asignar Mentores:
          </Text>
        </VStack>
        <MultiSelect 
            value={selectedMentors} 
            onChange={(e) => handleSelectedMentorsChange(e.value)} 
            options={mentors} 
            optionLabel="name" 
            placeholder="Seleccione los mentores" 
            display="chip" 
            className="w-full md:w-20rem" 
            />
      </Box>
    </VStack>
  );
}


const MentorAssignment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
      const getTeams = async () => {
        try {
          const response = await axiosApiInstance.get(`/submissions`);
          const submissions = response.data;
          const updatedTeams = [];
          for (const sub of submissions) {
            try {
              const submissionReq = await axiosApiInstance.get(`/submissions/${sub.id}`)
              const submissionObj = submissionReq.data
              const team = await axiosApiInstance.get(`/users/${submissionObj.userId}`)
              const teamData = team.data
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
      
      const getMentors = async () => {
        try{
          const response = await axiosApiInstance.get(`/mentors`)
          const mentors = response.data.mentors
          setMentors(prevMentors => [...mentors])
          console.log("Mentors:")
          console.log(mentors)
        }
        catch(err){
          console.log(err)
        }
      }

      getTeams();
      getMentors();
  
    }, []);

  const handleSaveChanges = () => {
    console.log("submissionsByMentor")
    console.log(submissionsByMentor)
  }

  return (
    <HStack width="full" align="start" justifyContent="start">
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
            {teams.map((submission, index) => {
              return (
                <SubmissionCard
                key={index}
                mx="2%"
                my="1%"
                width={["100%", "80%", "45%", "40%", "25%"]}
                submission={{ number: index + 1, ...submission }}
                mentors={mentors}
                ></SubmissionCard>
                );
              })}
          </Flex>
        )}
      </VStack>
      <Button mt={2} mr={2} onClick={handleSaveChanges}>
        Guardar Cambios
      </Button>
                      
    </HStack>
  );
};


const AdminView = ({ token }) => {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Selección de equipos</Tab>
        <Tab>Registro de mentores</Tab>
        <Tab>Asignación de mentores a equipos</Tab>
      </TabList>

      <TabPanels>
        {/* Selección de proyectos */}
        <TabPanel>
          <TeamSelection token={token} />
        </TabPanel>
        {/* Registrar mentor*/}
        <TabPanel>
          <MentorRegistration />
        </TabPanel>
        {/* Asignar mentores a equipos*/}
        <TabPanel>
          <MentorAssignment />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AdminView;
