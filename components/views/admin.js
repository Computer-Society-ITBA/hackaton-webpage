import { AddIcon, CheckCircleIcon, CheckIcon, CloseIcon, Icon, MinusIcon } from "@chakra-ui/icons"
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
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {axiosApiInstance} from "../../config/axiosConfig"

const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['xs','sm','md','lg','xl']
const TeamCard = ({team, ...extendedProps}) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <VStack p='2%' align='center' borderRadius='8px' borderWidth='2px 2px 6px 2px' borderColor='CSBlue' {...extendedProps}>
            <Flex onClick={onToggle} direction='row' verticalAlign='middle' width='full'>
                <Heading fontSize={HeadingSize}>{`Equipo ${team.number}: ${team.name}`}</Heading>
                <Spacer></Spacer>
                <HStack>
                    {team.qualified?<CheckCircleIcon color='CSGreen'/>:<CloseIcon color='red.500'/>}
                    <IconButton _hover={{"backgroundColor":"grey"}} mx='4%' onClick={onToggle} backgroundColor='transparent' icon={isOpen?<MinusIcon/>:<AddIcon/>}></IconButton>
                </HStack>
            </Flex>
            <Flex>
                
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <VStack width='full' align='start'>
                    <Text fontSize={TextSize} textAlign='start' color='CSBlue'>Describe al equipo: intereses, estudios, mentalidad:</Text>
                    <Text  size={TextSize}textAlign='start'>{team.teamDescription}</Text>
                    <Text fontSize={TextSize} textAlign='start' color='CSBlue'>¿Por qué les interesa participar en HackITBA?</Text>
                    <Text size={TextSize} textAlign='start'>{team.motivation}</Text> 
                    <Text fontSize={TextSize} textAlign='start' color='CSBlue'>Participantes</Text>
                    <Accordion width='full' defaultIndex={[]} allowMultiple>
                    {team.participants.map((participant,index)=>{
                        return(
                            <AccordionItem key={index}>
                                <h2>
                                <AccordionButton>
                                    <Text fontSize={TextSize}>{participant.name}</Text>
                                    <Spacer></Spacer>
                                    <AccordionIcon/>
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <VStack align='start' width='full'>
                                        <Text size={TextSize} textAlign='start' color='CSBlue'>DNI: <span size={TextSize} color='white' display='inline'>{participant.DNI}</span></Text>
                                        <Text size={TextSize} textAlign='start' color='CSBlue'>email: <span size={TextSize} color='white' display='inline'>{participant.email}</span></Text>
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })}
                    </Accordion>
                </VStack>
                <Flex width='full'>
                <Button 
                      size={["sm", "lg"]}
                      height="48px"
                      width="40%"
                      border="5px"
                      color="black"
                      variant="solid"
                      bgColor="red.500"
                      _hover={{"backgroundColor":'red.400'}}
                      my='4%'
                      leftIcon={<CloseIcon/>}
                      > 
                      Rechazar 
                    </Button>
                    <Spacer/>
                <Button 
                      size={["sm", "lg"]}
                      height="48px"
                      width="40%"
                      border="5px"
                      color="black"
                      variant="solid"
                      bgColor="CSGreen"
                      _hover={{"backgroundColor":'#05eda7'}}
                      my='4%'
                      leftIcon={<CheckIcon/>}
                      > 
                      Aceptar 
                    </Button>
                </Flex>
            </Collapse>
        </VStack>
    )
}
const TeamSelection = ({token})=>{
    const [teams,setTeams] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        async function getUsersFromApi(){
            setIsLoading(true)
            // const reqOptions = {
            //     method:'GET',
            //     headers:{
            //         "Authorization":`Bearer ${token}`,
            //     }
            // }
            try{
                // const users = (await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`,reqOptions)).json()).users
                const users = (await axiosApiInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)).users
                console.log(users)
                setTeams(users.filter(user=>user.role==='user'))
            }catch(err){
                console.log(err)
            }
            //dejamos a los participantes solo
            
            setIsLoading(false)
        }
        getUsersFromApi()
    },[])
    return(
        <VStack align='start' width='full'>
            <Heading textAlign='start'>{`Equipos aceptados: ${teams.filter(team=>team.qualified).length}`}</Heading>
            {/* <Grid width='full' templateColumns={['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)']}>
                {teams.map((team,index)=>{
                    return(
                        <GridItem key={index} mx={['2%','2%','4%','6%','8%']} align='center' py='2%'>
                            <TeamCard team={team} key={index}></TeamCard>
                        </GridItem>
                    )
                })}
            </Grid> */}
            {isLoading?
            <Center width='full'>
                <CircularProgress isIndeterminate color='CSOrange' size='40%'></CircularProgress>
            </Center>
            :
            <Flex width='full' direction='row' flexWrap='wrap' justifyContent='start' alignItems='start' verticalAlign='top'>
                {teams.map((team,index)=>{
                    return(
                        <TeamCard key={index} mx='2%' my='1%' width={['100%','80%','45%','40%','25%']} team={{number: index+1, ...team}}></TeamCard>
                    )
                })}
            </Flex>  
            }
            
        </VStack>
    )

}
const AdminView = ({token})=>{
    return(
        <Tabs variant='enclosed'>
            <TabList>
                <Tab>
                    Selección de equipos
                </Tab>
                <Tab>
                    Evaluación de proyectos
                </Tab>
            </TabList>

            <TabPanels>
                {/* Selección de proyectos */}
                <TabPanel> 
                    <TeamSelection token={token}/>
                </TabPanel>
                {/* Evaluacion de proyectos */}
                <TabPanel>
                    <div>
                    <p>two!</p>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}


module.exports = {AdminView}