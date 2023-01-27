import { Img, VStack, Text, AspectRatio } from "@chakra-ui/react"

const Jury = ({jury}) =>{
    return(
        <VStack justify='center' w={['6em','8em','10em','12em','13em']}>
            <AspectRatio w={'100%'} ratio={1}>
                <Img src={jury.imgSrc} alt={jury.name + "'s photo"} borderRadius='6%' />
            </AspectRatio>
            <Text size={['xs','xs','md','md','lg']} textAlign='center' width="100%">{jury.name}</Text>
        </VStack>
    )
}
module.exports = Jury