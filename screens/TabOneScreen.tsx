import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useState, useEffect, useRef } from "react";
import FifaCard from "./FifaCard";
import Database from "../services/database";
import {
  Card,
  IconButton,
  TextInput,
  Button,
  Modal,
  Paragraph,
  Provider,
} from "react-native-paper";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const db = useRef(new Database());

  const getData = async () => {
    try {
      const data = await db.current.getData();
      setData(data.rows._array.reverse() as never);
    } catch (error: any) {
      console.log("Erro", error);
    }
    // limpar input
    setText("");
  };

  const deleteData = async (id: number) => {
    try {
      await db.current.delete(id);
      getData();
    } catch (error: any) {
      console.log("Erro", error);
    }
  };

  const handleClick = async () => {
    try {
      db.current.insertData(text);
      getData();
    } catch (error: any) {
      console.log("Erro", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        label="Digite aqui"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button onPress={handleClick}>Adicionar</Button>
      <FlatList
        data={data}
        renderItem={({ item }: any) => (
          <Card>
            <Card.Title
              title={item.data}
              subtitle={new Date().toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            />
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => {
                  setVisible(true);
                }}
              />
              <IconButton
                icon="delete"
                iconColor="red"
                onPress={() => deleteData(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
