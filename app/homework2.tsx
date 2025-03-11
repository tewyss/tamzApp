import React, { useEffect, useState } from "react";
import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemList from "./components/ItemList";
import InputBar from "./components/InputBar";
import {
  loadFromStorage,
  saveToStorage,
  clearStorage,
} from "../utils/storageUtils";

export default function Homework() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await loadFromStorage();
      setItems(storedItems);
    };
    loadItems();
  }, []);

  const addItem = (text: string) => {
    const newItems = [...items, text];
    setItems(newItems);
    saveToStorage(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    saveToStorage(newItems);
  };

  const removeAll = () => {
    setItems([]);
    clearStorage();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={110}>
        <Text style={styles.title}>Local Storage</Text>
        <ItemList items={items} removeItem={removeItem} />
        <InputBar addItem={addItem} removeAll={removeAll} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
