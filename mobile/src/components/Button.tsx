import { Button as NativeBaseButton, Text, IButtonProps } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type?: "primary" | "secondary";
}

export function Button({ title, type = "primary", ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === "secondary" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "secondary" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "secondary" ? "white" : "black"}
        textTransform="uppercase"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
