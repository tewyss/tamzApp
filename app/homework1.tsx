import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const zodiacSigns = [
  "Kozoroh",
  "Vodnář",
  "Ryby",
  "Beran",
  "Býk",
  "Blíženci",
  "Rak",
  "Lev",
  "Panna",
  "Váhy",
  "Štír",
  "Střelec",
];
const breakDates = [20, 19, 20, 20, 21, 21, 22, 22, 22, 23, 22, 21];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [zodiacSign, setZodiacSign] = useState<string | null>(null);

  const importantDates = [
    { name: "Konec semestru", date: "2025-05-17", color: "red" },
    { name: "Vědecká rada", date: "2025-03-26", color: "green" },
    { name: "Sportovní den", date: "2025-04-23", color: "blue" },
  ];

  const calculateDaysToGo = (date: string) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diff = Math.ceil(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    setDaysRemaining(diff);
  };

  const getZodiacSign = (date: string) => {
    const selected = new Date(date);
    const day = selected.getDate();
    const month = selected.getMonth();

    if (day < breakDates[month]) {
      setZodiacSign(zodiacSigns[month === 0 ? 11 : month - 1]);
    } else {
      setZodiacSign(zodiacSigns[month]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Termíny</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Dnešní datum: {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.card}>
        {importantDates.map((event, index) => (
          <Text key={index} style={{ color: event.color, fontSize: 16 }}>
            ● {event.name}: {event.date}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Zadej datum</Text>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            calculateDaysToGo(day.dateString);
            getZodiacSign(day.dateString);
          }}
          markedDates={{
            [selectedDate || ""]: { selected: true, selectedColor: "#007AFF" },
          }}
        />

        {selectedDate && (
          <>
            <Text style={styles.result}>Vybrané datum: {selectedDate}</Text>
            <Text style={styles.result}>
              Počet dní do zvoleného data: {daysRemaining}
            </Text>
            <Text style={styles.result}>Znamení zvěrokruhu: {zodiacSign}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  result: {
    fontSize: 16,
    marginTop: 5,
  },
});
