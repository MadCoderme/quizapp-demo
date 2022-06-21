import Question from "./Question";
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
  useDisclosure,
  Radio,
  RadioGroup,
  useColorMode
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Countdown from "react-countdown";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import Navbar from "./Navbar";
import { toast } from "react-toastify";

export default function Quiz({ appConfig }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();

  const db = getFirestore(appConfig);
  const auth = getAuth();
  const navigate = useNavigate();

  type classes = "6" | "7" | "8" | "9" | "10";
  type subject = "math" | "science" | "geology" | "history";
  type startingTime = number;
  type duration = number;
  type score = number;

  const classes = searchParams.get("class");
  const subject = searchParams.get("subject");

  const [startingTime, setStartingTime] = useState();
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isResultOut, setResultOut] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTimeout(() => {
          toast("Please signin first");
          navigate("/login");
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    if (classes && subject) getQuestions();
  }, []);

  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async function getQuestions() {
    const docRef = doc(db, "questions", classes, subject, "questions");
    const docSnap = await getDoc(docRef);
    let allQuestions = docSnap.data().list;
    shuffle(allQuestions);
    if (allQuestions.length > 10) {
      allQuestions.length = 10;
    }
    setQuestions(allQuestions);
    setStartingTime(+new Date());
  }

  async function insertDatatoDB(d: number, s: score) {
    const docRef = doc(db, "users", auth.currentUser.uid);
    updateDoc(docRef, {
      quizzes: arrayUnion({
        class: classes,
        sub: subject,
        score: s,
        duration: d,
        date: +new Date()
      })
    });
  }

  function submit() {
    const results: Array<number> = [];
    answers.map((itm, idx) => {
      if (itm === questions[idx].answer) {
        results.push(1);
      } else {
        results.push(0);
      }
    });
    setResultOut(true);

    const correct = results.filter((el) => el === 1);
    document.getElementById("res").innerHTML =
      correct.length + " out of " + results.length;

    const duration: number = +new Date() - startingTime,
      score: number = (correct.length / results.length) * 100;
    setDuration(duration);
    setScore(score);
    insertDatatoDB(duration, score);
  }

  const parseDuration = (duration: number) => {
    let minutes: number = parseInt(duration / 60);
    let seconds: number = parseInt(duration - minutes * 60);
    return minutes + ":" + seconds;
  };

  return (
    <>
      <Navbar />
      {auth.currentUser ? (
        <Container w="100%" h="100%">
          <Stack spacing="24px" align={"center"} justify={"center"}>
            <Text fontSize="4xl">{subject.toUpperCase()} Quiz</Text>
            {isResultOut ? (
              <Text fontSize="xl">
                <b>Time Taken:</b> {parseDuration(duration / 1000)}
              </Text>
            ) : (
              <Countdown date={Date.now() + 10 * 60000} />
            )}
            <Divider />
            <Text id="res" fontSize="2xl"></Text>
            <Stack>
              {questions.map((item, idx) => (
                <Question
                  item={item}
                  idx={idx}
                  onChange={(val) => (answers[idx] = val)}
                  res={
                    isResultOut
                      ? answers[idx] == item.answer
                        ? "corr"
                        : "wro"
                      : ""
                  }
                />
              ))}
            </Stack>
            {isResultOut ? (
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                onClick={() => navigate("/dashboard")}
              >
                Go Back to Dashboard
              </Button>
            ) : (
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                onClick={() => submit()}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Container>
      ) : null}
    </>
  );
}
