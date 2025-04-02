import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import Card from "./Card";
import { CurrencyData } from "../../utils/exchange";

interface Props {
  currencies: CurrencyData[];
  selectedCode: string;
  onSelect: (code: string) => void;
  labelText: string;
  searchPlaceholder: string;
  cancelText: string;
}

const CurrencyPickerModal: React.FC<Props> = ({
  currencies,
  selectedCode,
  onSelect,
  labelText,
  searchPlaceholder,
  cancelText,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = currencies.filter((item) =>
    `${item.code} ${item.country_label} ${item.curr_label}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <View style={{ marginVertical: 12 }}>
      <Card>
        <Text style={styles.label}>{labelText}</Text>

        <TouchableOpacity
          style={styles.selected}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.selectedText}>{selectedCode}</Text>
        </TouchableOpacity>
      </Card>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.search}
              placeholder={searchPlaceholder}
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.code);
                    setModalVisible(false);
                    setSearch("");
                  }}>
                  <Text style={styles.itemText}>
                    {item.code} - {item.country_label} ({item.curr_label})
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 18,
  },
  selected: {
    backgroundColor: "#407BFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    maxHeight: "80%",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
  },
  cancelText: {
    color: "#407BFF",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default CurrencyPickerModal;
