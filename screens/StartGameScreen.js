import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "./../components/Card";
import Colors from "./../constants/colors";
import Input from "./../components/Input";
import { useState } from "react";

const StartGameScreen = (props) => {
  const [enteredValued, setEnteredValue] = useState("");
  const [confirmed, serConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    serConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValued);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!', 
        'Number has to be a number between 1 and 99.', 
        [{text: 'Okey', style: 'destructive', onPress: resetInputHandler}]);
      return;
    }
    serConfirmed(true);
    setEnteredValue(""); // < enteredValued still not change on this stage
    setSelectedNumber(parseInt(enteredValued)); // < still can use enteredValued before resetting
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>The Game Screen!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select the Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalization="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValued}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                style={styles.button}
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default StartGameScreen;
