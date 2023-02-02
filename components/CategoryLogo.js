import { CloseIcon } from "@chakra-ui/icons";
import { Box, Heading, Img, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, ModalBody, HStack, Icon, IconButton, Spacer, VStack, Text, UnorderedList, ListItem } from "@chakra-ui/react"
import { useState } from "react";

const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['xs','sm','md','lg','xl']
const ModalSize = ['sm','md','lg','xl','2xl']

const CategoryLogo = (props) => {
 const {category} = props
 //separo a los tokens cuando viene un espacio que no esta seguido por una "y"
 //ej: "hola y chau" => ["hola y", "chau"]
 const names = category.name.split(new RegExp(" (?=[^y])"))
 const { isOpen, onOpen, onClose} = useDisclosure()
//  const [isShown, setIsShown] = useState(false);
 return(
    // queda raro que cuando te acercas a la foto ya te toma el hover, pero bueno es por la caja que la contiene con el texto
    <Box onClick={onOpen} boxSize="25%" direction="column" w='100%' _hover={{
        transform: "scale(1.05)",
        transition: "ease-in-out 0.2s",
      }}
      _active={{
        transform: "scale(0.9)",
        transition: "ease-in-out 0.1s",
      }} >
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size={ModalSize}>
            <ModalOverlay />
            <ModalContent backgroundColor='#1C1C1C' borderWidth='2px' borderColor='CSGreen'>
                <ModalHeader>
                    <HStack>
                        <Heading fontSize={HeadingSize}>{category.name}</Heading>
                        <Spacer></Spacer>
                        <IconButton onClick={onClose} icon={<CloseIcon/>}></IconButton>
                    </HStack>
                </ModalHeader>
                <ModalBody p={0}>
                    <VStack>
                        <HStack p='4%'>
                            <Text fontSize={TextSize} pr='6%' align='center'>{category.description}</Text>
                            <Img width='30%' src={category.imgSrc} alt={category.name}/>
                        </HStack>
                        <HStack w='full' align='start'>
                            <Img alignSelf='end' src="/images/Category_decoration.svg" alt="decoration"/>
                            <VStack p='4%'>
                                <Text fontWeight='bold' fontSize={HeadingSize} >Alcance de la categoría</Text>
                                <UnorderedList> 
                                    {category.scope.map((scopeItem)=> <ListItem>{scopeItem}</ListItem>)}
                                </UnorderedList>
                            </VStack>
                        </HStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
        <Center>
            {/* {isShown?<Img onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} height='200px' width='200px' src={imgSrc} alt={names[0]}></Img>: <Img onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} height='200px' width='200px' src='/images/IEEE_CS.svg' alt={names[0]}></Img>} */}
            <Img height='200px' width='200px' src={category.imgSrc} alt={category.name}></Img>
        </Center>
        {names.map((name)=>{
            return(<Heading  key={name} size={['xs','xs','md','md','lg']} textAlign='center' width="100%" >{name}</Heading>)
        })}
    </Box>
 )
}
export default CategoryLogo