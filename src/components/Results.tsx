import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Divider,
  Tabs,
  TabList,
  Tab,
  Table,
  TabPanels,
  TabPanel,
  useDisclosure,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody
} from "@chakra-ui/react";
import LineGraphResult from "./LineGraphResult";
import BarGraphResult from "./BarGraphResult";
import RadarGraph from "./RadarGraph";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { getFirestore, getDoc, doc } from "@firebase/firestore";

export default function Results({ appConfig }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(appConfig);

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTimeout(() => {
          toast("Please signin first");
          navigate("/login");
        }, 1000);
      } else {
        getQuizResults();
      }
    });
  }, []);

  async function getQuizResults() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setQuizzes(docSnap.data()?.quizzes);
  }

  const formatDate = (date: number) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    let mm: number = d.getMonth() + 1; // Months start at 0!
    let dd: number = d.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  return (
    <>
      <Navbar />
      {auth.currentUser ? (
        quizzes.length > 0 ? (
          <Container w="full" h="100%">
            <Stack spacing="24px" align={"center"} justify={"center"}>
              <Text fontSize="4xl" mt={5}>
                Results of <b>{auth.currentUser.displayName}</b>
              </Text>
              <Divider />
            </Stack>
            <Tabs variant="soft-rounded" mt={5} colorScheme="green">
              <TabList>
                <Tab>List</Tab>
                <Tab>Line Graph</Tab>
                <Tab>Bar Graph</Tab>
                <Tab>Radar Graph</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Subject</Th>
                          <Th isNumeric>Score</Th>
                          <Th>Date</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {quizzes.map((i) => (
                          <Tr>
                            <Td>{i?.sub.toUpperCase()}</Td>
                            <Td isNumeric>{i?.score.toFixed(2)}%</Td>
                            <Td>{formatDate(i.date)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <LineGraphResult data={quizzes} />
                </TabPanel>
                <TabPanel>
                  <BarGraphResult data={quizzes} />
                </TabPanel>
                <TabPanel>
                  <RadarGraph data={quizzes} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        ) : (
          <Text fontSize="2xl" align="center" mt={5}>
            You don't have any Results yet!
          </Text>
        )
      ) : null}
    </>
  );
}
