import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "./Card";

interface Props {
  result: number | null;
  currencyCode: string;
  label: string;
}

const ExchangeResult: React.FC<Props> = ({ result, currencyCode, label }) => {
  if (result === null) return null;

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {result.toFixed(2)} {currencyCode}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    color: "#555",
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: "#407BFF",
  },
});

export default ExchangeResult;
