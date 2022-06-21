import * as React from "react"
import {
  Text,
  Link,
  VStack,
  Container,
  Stack,
  Heading,
  Button,
  Flex,
  useColorModeValue
} from "@chakra-ui/react"
import CustomBadge from "./CustomBadge";

export default function Demo() {
  return (
    <>
      <Flex
        align="center"
        justify={"center"}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Container maxW={'5xl'} py={10} alignContent="center">
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </Container>
      </Flex>
      <Container maxW={'5xl'} py={10}>
        <Flex direction="column" align="start">
          <VStack spacing={10} align="flex-start">
            <Heading>Buttons</Heading>
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="razzmatazz" variant="solid">
                Button
              </Button>
              <Button colorScheme="razzmatazz" variant="outline">
                Button
              </Button>
              <Button colorScheme="razzmatazz" variant="ghost">
                Button
              </Button>
              <Button colorScheme="razzmatazz" variant="link">
                Button
              </Button>
            </Stack>
            <Stack spacing={4} direction="row" align="center">
              <Button colorScheme="razzmatazz" size="xs">
                Button
              </Button>
              <Button colorScheme="razzmatazz" size="sm">
                Button
              </Button>
              <Button colorScheme="razzmatazz" size="md">
                Button
              </Button>
              <Button colorScheme="razzmatazz" size="lg">
                Button
              </Button>
              <Button size="xl" variant="with-shadow">
                This is a custom button
              </Button>
            </Stack>
            <Heading>Text</Heading>
            <VStack spacing={4} align="start">
              <Text fontSize="6xl">(6xl) In love with React & Next</Text>
              <Text fontSize="5xl">(5xl) In love with React & Next</Text>
              <Text fontSize="4xl">(4xl) In love with React & Next</Text>
              <Text fontSize="3xl">(3xl) In love with React & Next</Text>
              <Text fontSize="2xl">(2xl) In love with React & Next</Text>
              <Text fontSize="xl">(xl) In love with React & Next</Text>
              <Text fontSize="lg">(lg) In love with React & Next</Text>
              <Text fontSize="md">(md) In love with React & Next</Text>
              <Text fontSize="sm">(sm) In love with React & Next</Text>
              <Text fontSize="xs">(xs) In love with React & Next</Text>
              <Text fontWeight="bold">This text is bold</Text>
            </VStack>
            <Heading>Custom</Heading>
            <CustomBadge>I am a custom badge</CustomBadge>
          </VStack>
        </Flex>
      </Container>
    </>

  );
};