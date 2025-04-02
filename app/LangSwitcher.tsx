import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  selected: "cs" | "en";
  onSelect: (lang: "cs" | "en") => void;
}

const LangSwitcher: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => onSelect("en")}
        style={[
          styles.button,
          selected === "en" ? styles.active : styles.inactive,
        ]}>
        <Text style={[styles.text, selected === "en" && styles.activeText]}>
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSelect("cs")}
        style={[
          styles.button,
          selected === "cs" ? styles.active : styles.inactive,
        ]}>
        <Text style={[styles.text, selected === "cs" && styles.activeText]}>
          CS
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  inactive: {
    backgroundColor: "#EAF0FF",
  },
  active: {
    backgroundColor: "#407BFF",
  },
  text: {
    fontWeight: "600",
    color: "#407BFF",
  },
  activeText: {
    color: "white",
  },
});

export default LangSwitcher;
