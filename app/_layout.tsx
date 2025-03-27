import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "HomeScreen" }} />
      <Stack.Screen name="homework1" options={{ title: "HomeWork1" }} />
      <Stack.Screen name="homework2" options={{ title: "HomeWork2" }} />
      <Stack.Screen name="homework3" options={{ title: "HomeWork3" }} />
      <Stack.Screen name="homework4" options={{ title: "HomeWork4" }} />
    </Stack>
  );
}
