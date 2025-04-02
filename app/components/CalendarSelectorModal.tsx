import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Card from "./Card";

interface Props {
  selectedDate: string;
  onDateChange: (date: string) => void;
  labelText: string;
  cancelText: string;
}

const CalendarSelectorModal: React.FC<Props> = ({
  selectedDate,
  onDateChange,
  labelText,
  cancelText,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: any) => {
    onDateChange(day.dateString);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Card>
        <Text style={styles.label}>{labelText}</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.dateButton}>
          <Text style={styles.dateText}>
            {new Date(selectedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>
      </Card>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#407BFF",
                },
              }}
              theme={{
                todayTextColor: "#407BFF",
                arrowColor: "#407BFF",
              }}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={{ color: "#407BFF", textAlign: "center" }}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
  },
  label: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 18,
  },
  dateButton: {
    backgroundColor: "#EAF0FF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#407BFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "90%",
  },
  cancelButton: {
    marginTop: 12,
  },
});

export default CalendarSelectorModal;
