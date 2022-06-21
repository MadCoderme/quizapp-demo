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
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc
} from "@firebase/firestore";
import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "@firebase/auth";
import Navbar from "./Navbar";

export default function Auth({ appConfig }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(appConfig);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);

  function login() {
    const email: string = document.getElementById("email").value;
    const password: string = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        toast.success("Successfully Logged in");
        navigate("/dashboard");
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  function signinGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        const docRef = doc(db, "users", user.uid);
        const u = await getDoc(docRef);
        if (u.exists()) {
          toast.success("Successfully Logged in");
          navigate("/dashboard");
        } else {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            quizzes: []
          });
          toast.success("Successfully Logged in");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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
                    <NavLink to="/signup">Don't have an Account?</NavLink>
                  </Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                  onClick={login}
                >
                  Sign in
                </Button>
                <Stack style={{ alignItems: "center" }}>
                  <GoogleButton onClick={() => signinGoogle()} />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
