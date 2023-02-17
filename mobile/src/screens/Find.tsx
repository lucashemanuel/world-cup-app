import { VStack, Heading, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const toast = useToast();

  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código do bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Você entrou no bolão!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response?.data?.message === "Bolão não encontrado!") {
        return toast.show({
          title: "O bolão não foi encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }
      if (
        error.response?.data?.message ===
        "Você já está participando desse bolão!"
      ) {
        return toast.show({
          title: "Você já está participando desse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          color="white"
          fontSize="xl"
          fontFamily="heading"
          textAlign="center"
          mb={8}
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
