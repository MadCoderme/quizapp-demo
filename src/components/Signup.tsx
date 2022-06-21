import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import GoogleButton from "react-google-button";
import { Link as NavLink, useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "@firebase/auth";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { toast } from "react-toastify";

export default function Signup({ appConfig }) {
  const auth = getAuth();
  const db = getFirestore(appConfig);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function signup() {
    toast("Please wait...");
    const name: string = document.getElementById("name").value;
    const email: string = document.getElementById("email").value;
    const password: string = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        }).then(async () => {
          console.log(user);
          await setDoc(doc(db, "users", user.uid), {
            name: name,
            quizzes: []
          });
          toast.success("Successfully signed up!");
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  async function signinGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          quizzes: []
        });
        toast.success("Successfully Logged in");
        navigate("/dashboard");
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w="md" maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Full name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link color={"blue.400"}>
                  <NavLink to="/login">Have an Account?</NavLink>
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                onClick={signup}
              >
                Sign up
              </Button>
              <Stack style={{ alignItems: "center" }}>
                <GoogleButton onClick={() => signinGoogle()} />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
