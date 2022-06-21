import { useMemo, useEffect, useState } from "react";
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
import { Chart } from "react-charts";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default function LineGraphResult({ data }) {
  const auth = getAuth();
  const [gData, setgData] = useState([]);

  useEffect(() => {
    let gLabeledData = [
      {
        label: "Overall Performance",
        data: []
      }
    ];
    data.map((i: Object, v: number) => {
      gLabeledData[0].data.push({
        x: v + 1,
        y: i?.score
      });
    });
    console.log(gLabeledData);
    setgData(gLabeledData);
  }, [data]);

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <Container h="md" w="md" padding={10}>
      {gData.length > 0 ? <Chart data={gData} axes={axes} tooltip /> : null}
      <Text mt={5} mb={10} align="center" fontSize="xl">
        Overall Progress
      </Text>
    </Container>
  );
}
