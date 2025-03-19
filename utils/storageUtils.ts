import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "bmi_items";

export const saveToStorage = async (items: string[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const loadFromStorage = async () => {
  const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};

export const clearStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
