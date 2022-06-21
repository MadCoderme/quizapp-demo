import { useMemo, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { Chart } from "react-charts";

export default function BarGraphResult({ data }) {
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
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <Container h="md" w="100%" padding={10}>
      {gData.length > 0 ? (
        <Chart
          series={{ type: "bar" }}
          alignSelf="center"
          data={gData}
          axes={axes}
          tooltip
        />
      ) : null}
    </Container>
  );
}
