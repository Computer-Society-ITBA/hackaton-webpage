import { Img, VStack, Text, AspectRatio, Flex, Container, Box } from "@chakra-ui/react"
import styles from './juryStyle.module.css'
const Jury = ({jury}) =>{
    return(
        <VStack justify='center' w={['6em','8em','10em','12em','13em']}>
        <AspectRatio className={styles.container} ratio={1} width='full'>
            <Box>
                <Img src={jury.imgSrc} alt={jury.name + "'s photo"} borderRadius='6%'/>
                <Box className={styles.overlay} borderRadius='6%'>
                    <Text textAlign='center' pt='2'>{jury.details}</Text>
                </Box>
            </Box>
        </AspectRatio>
            <Text size={['xs','xs','md','md','lg']} textAlign='center' width="100%">{jury.name}</Text>
        </VStack>
    )
}
module.exports = Jury