import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Alert } from "react-native";
import BMIForm from "./components/BMIForm";
import ResultDialog from "./components/ResultDialog";
import HistoryList from "./components/HistoryList";
import {
  loadFromStorage,
  saveToStorage,
  clearStorage,
} from "../utils/storageUtils";
import { Provider as PaperProvider } from "react-native-paper";
import { calculateBMI } from "../utils/calculateBMI";

export default function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogText, setDialogText] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await loadFromStorage();
      setHistory(storedHistory);
    };
    loadHistory();
  }, []);

  const handleCalculate = (
    name: string,
    age: number,
    gender: string,
    height: number,
    weight: number
  ) => {
    const result = calculateBMI(name, age, gender, height, weight);
    setDialogText(result.message);
    setDialogVisible(true);

    const today = new Date().toLocaleDateString();
    const entry = `${today} --- ${name} --- BMI: ${Math.floor(result.bmi)}`;
    const newHistory = [...history, entry];
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  const handleClearAll = () => {
    Alert.alert("Clear All", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          setHistory([]);
          clearStorage();
        },
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>BMI Kalkulačka</Text>
          <BMIForm onCalculate={handleCalculate} />
          <ResultDialog
            visible={dialogVisible}
            onClose={() => setDialogVisible(false)}
            text={dialogText}
          />
          <HistoryList
            history={history}
            removeItem={handleRemoveItem}
            clearAll={handleClearAll}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
