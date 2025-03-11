import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  items: string[];
  removeItem: (index: number) => void;
}

const ItemList: React.FC<Props> = ({ items, removeItem }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
          <TouchableOpacity
            onPress={() => removeItem(index)}
            style={styles.trashButton}>
            <Icon name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  itemText: { fontSize: 18 },
  trashButton: {
    backgroundColor: "#407BFF",
    padding: 10,
    borderRadius: 10,
  },
});

export default ItemList;
