"use client";
import { useState } from "react";
import {
  Container,
  Title,
  Flex,
  Text,
  Button,
  Textarea,
  Group,
  Card,
  CopyButton,
  Tooltip,
  Anchor,
  Center,
} from "@mantine/core";

const fgOptions = [
  { color: "#4f545c", label: "Dark Gray (33%)" },
  { color: "#dc322f", label: "Red" },
  { color: "#859900", label: "Yellowish Green" },
  { color: "#b58900", label: "Gold" },
  { color: "#268bd2", label: "Light Blue" },
  { color: "#d33682", label: "Pink" },
  { color: "#2aa198", label: "Teal" },
  { color: "#ffffff", label: "White" },
];

const bgOptions = [
  { color: "#002b36", label: "Blueish Black" },
  { color: "#cb4b16", label: "Rust Brown" },
  { color: "#586e75", label: "Gray (40%)" },
  { color: "#657b83", label: "Gray (45%)" },
  { color: "#839496", label: "Light Gray (55%)" },
  { color: "#6c71c4", label: "Blurple" },
  { color: "#93a1a1", label: "Light Gray (60%)" },
  { color: "#fdf6e3", label: "Cream White" },
];

const fgMap: Record<string, number> = {
  "#4f545c": 30,
  "#dc322f": 31,
  "#859900": 32,
  "#b58900": 33,
  "#268bd2": 34,
  "#d33682": 35,
  "#2aa198": 36,
  "#ffffff": 37,
};

const bgMap: Record<string, number> = {
  "#002b36": 40,
  "#cb4b16": 41,
  "#586e75": 42,
  "#657b83": 43,
  "#839496": 44,
  "#6c71c4": 45,
  "#93a1a1": 46,
  "#fdf6e3": 47,
};

const DiscordColorGenerator = () => {
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  const generateDiscordText = () => {
    let styleCodes = "";
    if (isBold) styleCodes += "\u001b[1m";
    if (isUnderlined) styleCodes += "\u001b[4m";
    const fgCode = fgMap[fgColor] ?? 37;
    const bgCode = bgMap[bgColor] ?? 40;

    const dimPrefix = styleCodes === "" ? "2;" : "";
    const bgANSI = `\u001b[${dimPrefix}${bgCode}m`;
    const fgANSI = `\u001b[${dimPrefix}${fgCode}m`;

    const ansiStr =
      styleCodes + bgANSI + fgANSI + text + "\u001b[0m" + bgANSI + "\u001b[0m";
    return "```ansi\n" + ansiStr + "\n```";
  };

  const handleResetAll = () => {
    setText("");
    setFgColor("");
    setBgColor("");
    setIsBold(false);
    setIsUnderlined(false);
  };

  const toggleBold = () => {
    setIsBold((prev) => !prev);
  };

  const toggleUnderline = () => {
    setIsUnderlined((prev) => !prev);
  };

  return (
    <Container size="md" py="xl">
      <Flex justify="center" align="center" wrap="wrap" gap="xs">
        <Title order={1}>Discord</Title>
        <Title order={1} c="blue">
          Colored
        </Title>
        <Title order={1}>Text Generator</Title>
      </Flex>
      <Title ta="center" pt="md" order={4}>
        About
      </Title>
      <Text ta="center" pt="md">
        This is a simple app that creates colored Discord messages using the
      </Text>
      <Text ta="center">
        ANSI color codes available on the latest Discord desktop versions.
      </Text>
      <Text ta="center" pt="md">
        To use this, write your text, select parts of it and assign colors to
        them,
      </Text>
      <Text ta="center">
        then copy it using the button below, and send in a Discord message.
      </Text>
      <Title ta="center" pt="md" order={4}>
        Source Code
      </Title>
      <Text ta="center" pt="md">
        This app runs entirely in your browser and the source code is freely
        available on{" "}
        <Anchor href="https://github.com/Abhinav-1904" target="_blank">
          <Text component="span" c="blue" fw={500}>
            GitHub
          </Text>
        </Anchor>
      </Text>
      <Title order={3} ta="center" pt="md">
        Create your text
      </Title>
      <Flex justify="center" align="center" mt="md" gap="xs">
        <Button color="gray" onClick={handleResetAll}>
          Reset All
        </Button>
        <Button color={isBold ? "green" : "gray"} onClick={toggleBold}>
          Bold
        </Button>
        <Button
          color={isUnderlined ? "green" : "gray"}
          onClick={toggleUnderline}
          style={{ textDecoration: "underline" }}
        >
          Line
        </Button>
      </Flex>
      <ColorSwatchGroup title="FG" options={fgOptions} onSelect={setFgColor} />
      <ColorSwatchGroup title="BG" options={bgOptions} onSelect={setBgColor} />
      <Textarea
        autosize
        size="xl"
        radius="md"
        pt="md"
        placeholder="Welcome to Discord Colored Text Generator!"
        minRows={5}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <Card
        withBorder
        mt="md"
        p="md"
        style={{
          maxHeight: 200, // Limit card height to 200px
          overflowY: "auto", // Make text scroll if it overflows
        }}
      >
        <Text
          style={{
            color: fgColor,
            backgroundColor: bgColor,
            padding: "4px",
            fontWeight: isBold ? "bold" : "normal",
            textDecoration: isUnderlined ? "underline" : "none",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {text || "Preview: Your text will appear here..."}
        </Text>
      </Card>
      <Center mt="md">
        <CopyButton value={generateDiscordText()}>
          {({ copied, copy }) => (
            <Button color={copied ? "green" : "gray"} onClick={copy}>
              {copied ? "Copied" : "Copy Text as Discord Formatted"}
            </Button>
          )}
        </CopyButton>
      </Center>
      <Text ta="center" mt="md">
        This is an unofficial tool, it is not made or endorsed by Discord.
      </Text>
    </Container>
  );
};

const ColorSwatchGroup = ({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: { color: string; label: string }[];
  onSelect: (color: string) => void;
}) => {
  return (
    <Group gap="xs" mt="md" justify="center">
      <Text fw={700}>{title}</Text>
      {options.map(({ color, label }) => (
        <Tooltip key={color} label={label} withArrow>
          <Button
            variant="filled"
            style={{
              backgroundColor: color,
              width: 30,
              height: 30,
              padding: 0,
              minWidth: 30,
            }}
            onClick={() => onSelect(color)}
          />
        </Tooltip>
      ))}
    </Group>
  );
};

export default DiscordColorGenerator;
