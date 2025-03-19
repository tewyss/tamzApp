import React from "react";
import { Dialog, Portal, Button } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  text: string;
}

const ResultDialog: React.FC<Props> = ({ visible, onClose, text }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>BMI Result</Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{text}</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={onClose} labelStyle={styles.buttonLabel}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
    backgroundColor: "#fafafa",
  },
  dialogTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "#407BFF",
  },
  dialogContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    lineHeight: 22,
  },
  dialogActions: {
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#407BFF",
    fontWeight: "bold",
  },
});

export default ResultDialog;
