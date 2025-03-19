import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  history: string[];
  removeItem: (index: number) => void;
  clearAll: () => void;
}

const HistoryList: React.FC<Props> = ({ history, removeItem, clearAll }) => (
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>History</Text>
      <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
        <Text style={styles.clearText}>CLEAR ALL</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={history}
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer}>
          <Text>{item}</Text>
          <TouchableOpacity onPress={() => removeItem(index)}>
            <Icon name="trash" size={20} color="#407BFF" />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  clearButton: {
    padding: 5,
  },
  clearText: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HistoryList;
