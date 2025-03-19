import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "./components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TAMZ I</Text>
      <CustomButton
        title="HomeWork 1"
        onPress={() => router.push("/homework1")}
        style={styles.buttonContainer}
      />
      <CustomButton
        title="HomeWork 2"
        onPress={() => router.push("/homework2")}
        style={styles.buttonContainer}
      />
      <CustomButton
        title="HomeWork 3"
        onPress={() => router.push("/homework3")}
        style={styles.buttonContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 15,
    borderWidth: 5,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    width: 250,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  buttonContainer: {
    marginTop: 25,
  },
});
