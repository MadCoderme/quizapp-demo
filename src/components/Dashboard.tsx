import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Divider,
  Icon,
  IconProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const auth = getAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTimeout(() => {
          toast("Please signin first");
          navigate("/login");
        }, 1000);
      } else {
        if (searchParams.get("startPlaying") === "true") {
          onOpen();
        }
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      {auth.currentUser ? (
        <Container w="full" h="100%">
          <Stack spacing="24px" align={"center"} justify={"center"}>
            <Text fontSize="4xl" mt={5}>
              Hi <b>{auth.currentUser.displayName}</b> 👋!
            </Text>
            <Divider />
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500"
              }}
              onClick={onOpen}
            >
              Play Quiz
            </Button>
            <Text fontSize="2xl" align={"left"}>
              Your Progress 📈
            </Text>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500"
              }}
              onClick={() => navigate("/results")}
            >
              Check Results
            </Button>
          </Stack>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose Quiz</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Select placeholder="Select Class" id="cl">
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Select>
                <br />
                <Select placeholder="Select Subject" id="sub">
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="geology">Geology</option>
                  <option value="history">History</option>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() =>
                    navigate(
                      "/quiz?class=" +
                        document.getElementById("cl").value +
                        "&subject=" +
                        document.getElementById("sub").value
                    )
                  }
                >
                  Start
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      ) : null}
    </>
  );
}
