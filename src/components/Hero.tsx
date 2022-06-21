import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Check your Preparation
          <Text as={"span"} color={"orange.400"} style={{ marginLeft: 5 }}>
            with Online MCQ Quiz
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Login to participate in our huge library of quizzes for classes 6-10
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            <Link to="/login">Get started</Link>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
