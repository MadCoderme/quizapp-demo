import { Text, Stack, Radio, RadioGroup, useColorMode } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Question({ item, idx, onChange, res }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const [selected, setSelected] = useState();
  const [bg, setBg] = useState("");

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  useEffect(() => {
    console.log(res);
    if (res == "corr") setBg(colorMode == "light" ? "green.100" : "green.600");
    else if (res == "wro") setBg(colorMode == "light" ? "red.100" : "red.600");
    else setBg("");
  }, [res]);

  return (
    <Stack bg={bg} padding={5} borderRadius="md">
      <Text>
        Q{idx + 1}. {item.question}
      </Text>
      <RadioGroup value={selected}>
        <Stack direction="column">
          {item.options.map((item, idx) => (
            <Radio size="lg" value={idx} onChange={() => setSelected(idx)}>
              {item}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {res == "wro" ? (
        <Text>
          <b>Correct Answer:</b> {item.options[item.answer]}
        </Text>
      ) : null}
    </Stack>
  );
}
