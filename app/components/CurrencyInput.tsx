import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import Card from "./Card";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const CurrencyTextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  label: {
    marginBottom: 6,
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default CurrencyTextInput;
