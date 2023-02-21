import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useState } from 'react';
import {
  Heading,
  Flex,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Link,
  Grid,
  GridItem,
  Spacer,
  VStack,
  Divider,
  Input,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  Image,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Show,
  Stack
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
const joi = require('joi')

const ModalSize = ['sm','md','lg','xl','2xl']
const HeadingSize = ['sm','sm','md','lg','xl']
const AvatarSize = ['md','md','lg','xl','xl']
const TextSize = ['xs','sm','md','lg','xl']
const MemberModal = ({isOpen, onClose})=>{
  return 
}
const schema = joi.object({
  name: joi.string()
  .min(4),
  dni: joi.string().regex(new RegExp('^[0-9]{1,2}\.?[0-9]{3,3}\.?[0-9]{3,3}$')),
  email:joi.string().email({tlds:{allow:false}}),
})

const ParticipantCard = ({participant, onEdit, onDelete})=>{
  return(
    <Card width='full' pt='2%' borderWidth='4px' borderColor="CSBlue">
      <CardBody>
        <Flex align='center' direction='row' width='full'>
          <Avatar color='white' backgroundColor='gray' size={AvatarSize} name={participant.name}></Avatar>
          <VStack mx='6%' align='start'>
            <Text fontSize={HeadingSize}>{`Nombre: ${participant.name}`}</Text>
            <Text fontSize={HeadingSize}>{`DNI: ${participant.dni}`}</Text>
            <Text fontSize={HeadingSize}>{`Email: ${participant.email}`}</Text>
          </VStack>
          <Spacer/>
          <Stack paddingX='2%' direction={['column','column','row','row','row']} >
            <IconButton mx='2%' icon={<EditIcon/>} onClick={onEdit}/>
            <IconButton mx='2%' icon={<DeleteIcon/>} onClick={onDelete}/>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  )
}

const FourthStep = ({participants, setParticipants, nextStep, prevStep}) => {
  const [localParticipants, setLocalParticipants] = useState(participants)
  const [currIndex, setCurrIndex] = useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalName, setModalName] = useState("")
  const [modalDNI, setModalDNI] = useState("")
  const [modalEmail, setModalEmail] = useState("")
  const [modalInvalidName, setModalInvalidName] = useState(false)
  const [modalInvalidDNI, setModalInvalidDNI] = useState(false)
  const [modalInvalidEmail, setModalInvalidEmail] = useState(false)
  const changeModalName = (event)=>{
    setModalName(event.target.value)
    setModalInvalidName(schema.validate({name:event.target.value}).error!==undefined)
  }
  const changeModalDNI = (event)=>{
    setModalDNI(event.target.value)
    setModalInvalidDNI(schema.validate({dni:event.target.value}).error!==undefined)
  }
  const changeModalEmail = (event)=>{
    setModalEmail(event.target.value)
    setModalInvalidEmail(schema.validate({email:event.target.value}).error!==undefined)
  }

  const editParticipant = (i) =>{
    return ()=>{
      const participant = localParticipants.at(i)
      setModalName(participant.name)
      setModalDNI(participant.dni)
      setModalEmail(participant.email)
      setModalInvalidName(false)
      setModalInvalidDNI(false)
      setModalInvalidEmail(false)
      setCurrIndex(i)
      onOpen()
    }
  }
  
  const SaveParticipant = (i) =>{
    return ()=>{
      const aux = Array.from(localParticipants)
      if(i===undefined){
        const participant = {
          name: modalName,
          dni: modalDNI,
          email: modalEmail
        }
        aux.push(participant)
      }else{
        aux[i].name = modalName
        aux[i].dni = modalDNI
        aux[i].email = modalEmail
      }
      setLocalParticipants(aux)
      setCurrIndex(undefined)
      onClose()//se cierra el modal
    }
  }

  const createParticipant = ()=>{
    setModalName("")
    setModalDNI("")
    setModalEmail("")
    setModalInvalidName(false)
    setModalInvalidDNI(false)
    setModalInvalidEmail(false)
    setCurrIndex(undefined)
    onOpen()
  }
  const deleteParticipant = (i)=>{
    return ()=>{
      setLocalParticipants(localParticipants.filter((p,index) => index!==i))
    }
  }

  const moveForward = () => {
    setParticipants(localParticipants)
    nextStep()
  }
  const moveBackwards = ()=>{
    setParticipants(localParticipants)
    prevStep()
  }

  return (
    <VStack  w="full">
      <Breadcrumb separator={">"} w='full' padding={'2%'} fontSize = "3xl">
            <BreadcrumbItem>
                <Text fontSize={['3xs', 'xs', 'lg', '2xl']}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text  fontSize={['3xs', 'xs', 'lg', '2xl']}>Datos equipo</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text fontSize={['3xs', 'xs', 'lg', '2xl']}>Mail y Contraseña</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"#386af6"} fontSize={['3xs', 'xs', 'lg', '2xl']}>Datos del Equipo</Text>
            </BreadcrumbItem>
       </Breadcrumb>
        <VStack w={"full"} align={"center"} >

          {/* <Text fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 1</Text></Text>
          <Input value={p1} onChange={handleP1} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"}   fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 2</Text> </Text> 
          <Input value={p2} onChange={handleP2} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"}  fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 3</Text></Text>
          <Input value={p3} onChange={handleP3} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"} fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 4</Text></Text>
          <Input value={p4} onChange={handleP4} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>
          <Text fontSize={["sm", "md", "lg"]}>{p1==="" || p2==="" || p3 === "" || p4 === "" ? "Debes completar todos los participantes":""}</Text>
          <Text paddingTop="2%" align={"center"} fontSize={["sm", "md", "lg"]}>Recordá que todas las identidades serán corroboradas con foto del DNI</Text> */}
          <VStack width={['90%','80%','60%','50%','50%']} mb='4%' gap='8px'>
            {localParticipants.map((participant, index)=>{
              return(
                <ParticipantCard  key={index} onEdit={editParticipant(index)} onDelete={deleteParticipant(index)} participant={participant} ></ParticipantCard>
              )
            })}
          </VStack>
          <Center>
          <Button onClick={createParticipant}
              colorScheme="blue"
              size={["sm", "lg"]}
              height="48px"
              border="5px"
              color="black"
              variant="solid"
              bgColor="CSBlue"
              leftIcon={<AddIcon/>}
              isDisabled={localParticipants.length>=4}
              > 
              Agregar participante 
          </Button>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size={ModalSize} isCentered>
            <ModalOverlay />
            <ModalContent backgroundColor='#1C1C1C' borderWidth='2px' borderColor='CSBlue'>
                <ModalHeader>
                    <HStack>
                        <Heading fontSize={HeadingSize}>Agregar participante</Heading>
                        <Spacer></Spacer>
                        <IconButton onClick={onClose} icon={<CloseIcon/>}></IconButton>
                    </HStack>
                </ModalHeader>
                <ModalBody>
                  <Text paddingTop={"2%"}   fontSize={["md", "lg", "xl"]}> Nombre </Text> 
                  <Input textColor={"black"} isInvalid={modalInvalidName} value={modalName} onChange={changeModalName} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]}></Input>
                  <Text paddingTop={"2%"}   fontSize={["md", "lg", "xl"]}> DNI </Text> 
                  <Input textColor={"black"} isInvalid={modalInvalidDNI} value={modalDNI} onChange={changeModalDNI} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]}></Input>
                  <Text paddingTop={"2%"}   fontSize={["md", "lg", "xl"]}> Email </Text> 
                  <Input textColor={"black"} isInvalid={modalInvalidEmail} value={modalEmail} onChange={changeModalEmail} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]}></Input>
                  <HStack w='full' justify='end'>
                    <Button onClick={SaveParticipant(currIndex)}
                      size={["sm", "lg"]}
                      height="48px"
                      width="200px"
                      border="5px"
                      color="black"
                      variant="solid"
                      bgColor="CSGreen"
                      _hover={{"backgroundColor":'#05eda7'}}
                      my='4%'
                      leftIcon={<CheckIcon/>}
                      isDisabled={modalName===""||modalDNI===""||modalEmail===""||modalInvalidName||modalInvalidDNI||modalInvalidEmail}
                      > 
                      Guardar 
                    </Button>
                  </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
          </Center>
          <Center paddingTop='2%'>
            <HStack>
            <Button onClick={moveBackwards}
              colorScheme="orange"
              size={["sm", "lg"]}
              height="48px"
              width="200px"
              border="5px"
              color="black"
              variant="solid"
              bgColor="CSGreen"
              _hover={{"backgroundColor":'#05eda7'}}
              > 
              Volver 
            </Button>
            <Button onClick={moveForward}
              colorScheme="orange"
              size={["sm", "lg"]}
              height="48px"
              width="200px"
              border="5px"
              color="black"
              variant="solid"
              bgColor="orange"
              isDisabled={localParticipants.length===0}
              > 
              Siguiente 
            </Button>

            </HStack>
        </Center>
        </VStack>
    </VStack>
  );
};

export default FourthStep