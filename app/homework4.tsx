import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HttpScreenContainer from "./components/HttpScreenContainer";

export default function Homework(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <HttpScreenContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
