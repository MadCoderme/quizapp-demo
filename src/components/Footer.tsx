import { ReactNode } from "react";

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <Text fontWeight="bold">
          Made by{" "}
          <Link
            target="_blank"
            color="blue.500"
            href="https://github.com/MadCoderme"
          >
            MadCoderme
          </Link>
        </Text>
        <Text fontWeight="bold">
          Github:{" "}
          <Link
            target="_blank"
            color="blue.500"
            href="https://github.com/MadCoderme/quizapp-demo/tree/main/"
          >
            MadCoderme/quizapp-demo
          </Link>
        </Text>
      </Container>
    </Box>
  );
}
