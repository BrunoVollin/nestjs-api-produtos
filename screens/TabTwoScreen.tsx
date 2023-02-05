import { StyleSheet, Alert } from "react-native";
import { useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { TextInput, Button } from "react-native-paper";

import axios from "axios";

export default function TabTwoScreen() {
  const [text, setText] = useState("");

  function cadastrar(text: string ) {
    axios
      .post("http://192.168.0.107:8080/product/createProduct", {
        productName: text,
      })
      .then(function (response) {
        console.log(response);
        Alert.alert("Produto cadastrado com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("Erro ao cadastrar produto!");
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
        theme={{ dark: true }}
      />
      <Button
        mode="contained"
        onPress={() => cadastrar(text)}
      >
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
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
