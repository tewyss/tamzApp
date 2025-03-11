import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  addItem: (text: string) => void;
  removeAll: () => void;
}

const InputBar: React.FC<Props> = ({ addItem, removeAll }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim().length > 0) {
      addItem(input);
      setInput("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Přidat položku..."
        placeholderTextColor="#666"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeAll} style={styles.clearButton}>
        <Text style={styles.buttonText}>CLEAR ALL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    textAlignVertical: "center",
  },
  saveButton: {
    backgroundColor: "#407BFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InputBar;
