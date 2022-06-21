import { useMemo, useEffect, useState } from "react";
import { Flex, Container } from "@chakra-ui/react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

export default function RadarGraph({ data }) {
  const [gData, setgData] = useState([]);

  var captions: Object = {
    math: "Math",
    science: "Science",
    geology: "Geology",
    history: "History"
  };

  useEffect(() => {
    let gLabeledData = [
      {
        meta: { color: "red" },
        data: {}
      }
    ];
    data.map((i: Object, v: number) => {
      gLabeledData[0].data[i.sub]
        ? (gLabeledData[0].data[i.sub] += i.score)
        : (gLabeledData[0].data[i.sub] = i.score);
    });

    if (!gLabeledData[0].data["science"]) gLabeledData[0].data["science"] = 0;
    if (!gLabeledData[0].data["math"]) gLabeledData[0].data["math"] = 0;
    if (!gLabeledData[0].data["geology"]) gLabeledData[0].data["geology"] = 0;
    if (!gLabeledData[0].data["history"]) gLabeledData[0].data["history"] = 0;

    setgData(gLabeledData);
  }, [data]);

  return (
    <Container h="md" w="md" padding={10}>
      {gData.length > 0 ? (
        <RadarChart captions={captions} data={gData} size={450} />
      ) : null}
    </Container>
  );
}
