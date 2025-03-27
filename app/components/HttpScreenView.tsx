import React from "react";
import { ScrollView, Text, TextInput, StyleSheet } from "react-native";
import Card from "./Card";
import CustomButton from "./CustomButton";

interface HttpScreenViewProps {
  url: string;
  login: string;
  receivedData: string;
  decodedData: string;
  finalMessage: string;
  activeButton: "get" | "send";
  setUrl: (url: string) => void;
  setLogin: (login: string) => void;
  handleGetCode: () => void;
  handleSendCode: () => void;
}

export default function HttpScreenView({
  url,
  login,
  receivedData,
  decodedData,
  finalMessage,
  activeButton,
  setUrl,
  setLogin,
  handleGetCode,
  handleSendCode,
}: HttpScreenViewProps): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>HTTP</Text>

      <Card>
        <Text style={styles.label}>URL</Text>
        <TextInput style={styles.input} value={url} onChangeText={setUrl} />
        <Text style={styles.label}>Login</Text>
        <TextInput style={styles.input} value={login} onChangeText={setLogin} />
      </Card>

      <Card>
        <Text style={styles.label}>Received Secret Data</Text>
        <TextInput style={styles.input} value={receivedData} editable={false} />
        <Text style={styles.label}>Decoded Secret Data (atob)</Text>
        <TextInput style={styles.input} value={decodedData} editable={false} />
        <Text style={styles.label}>Final Message</Text>
        <TextInput
          style={styles.input}
          value={finalMessage}
          editable={false}
          multiline
          scrollEnabled
        />
      </Card>

      <Card>
        <CustomButton
          title="GET CODE"
          onPress={handleGetCode}
          style={[
            activeButton === "get"
              ? styles.activeButton
              : styles.inactiveButton,
            styles.buttonSpacing,
          ]}
        />
        <CustomButton
          title="SEND CODE"
          onPress={handleSendCode}
          style={
            activeButton === "send"
              ? styles.activeButton
              : styles.inactiveButton
          }
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f4f4",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  activeButton: {
    backgroundColor: "#407BFF",
  },
  inactiveButton: {
    backgroundColor: "#B0C4FF",
  },
  buttonSpacing: {
    marginBottom: 10,
  },
});
