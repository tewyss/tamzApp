import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async (items: string[]) => {
  await AsyncStorage.setItem("items", JSON.stringify(items));
};

export const loadFromStorage = async () => {
  const storedItems = await AsyncStorage.getItem("items");
  return storedItems ? JSON.parse(storedItems) : [];
};

export const clearStorage = async () => {
  await AsyncStorage.removeItem("items");
};
