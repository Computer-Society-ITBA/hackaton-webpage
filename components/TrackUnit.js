import {
  Flex,
  Text,
  Img,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const TrackUnit = ({ title, content, image }) => {
  return (
    <Flex direction="column" alignItems="center" my={2} maxW={200}>
      <Heading
        as="h4"
        fontSize="20"
        textAlign="center"
        height={10}
        color="brand.200"
      >
        {title}
      </Heading>
      <Popover trigger="click">
        <PopoverTrigger>
          <Img
            src={image}
            width={32}
            height={32}
            mt={6}
            mb={3}
            alt={title}
            ml={(2, 0)}
            cursor="pointer"
            _hover={{ transform: "scale(1.1)", transition: "ease-in-out 0.2s" }}
          />
        </PopoverTrigger>
        <PopoverContent
          bg="black"
          color="brand.300"
          borderColor="brand.300"
          borderWidth={3}
          borderRadius={20}
          width={400}
        >
          <PopoverHeader
            textAlign="center"
            fontWeight="bold"
            borderColor="brand.300"
          >
            <Text>{title}</Text>
            <PopoverCloseButton />
          </PopoverHeader>

          <PopoverBody fontSize="16" textAlign="center">
            {content}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default TrackUnit;
