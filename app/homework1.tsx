import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
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
const zodiacImages: Record<string, any> = {
  Kozoroh: require("../assets/images/kozoroh.png"),
  Vodnář: require("../assets/images/vodnar.png"),
  Ryby: require("../assets/images/ryby.png"),
  Beran: require("../assets//images/beran.png"),
  Býk: require("../assets/images/byk.png"),
  Blíženci: require("../assets/images/blizenci.png"),
  Rak: require("../assets/images/rak.png"),
  Lev: require("../assets/images/lev.png"),
  Panna: require("../assets/images/panna.png"),
  Váhy: require("../assets/images/vahy.png"),
  Štír: require("../assets/images/stir.png"),
  Střelec: require("../assets/images/strelec.png"),
};

const importantDates = [
  { name: "Konec semestru", date: "2025-05-17", color: "red" },
  { name: "Vědecká rada", date: "2025-03-26", color: "green" },
  { name: "Sportovní den", date: "2025-04-23", color: "blue" },
];

const getDaysLeft = (targetDateString: string) => {
  const today = new Date();
  const targetDate = new Date(targetDateString);
  const diff = Math.ceil(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff;
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [zodiacSign, setZodiacSign] = useState<string | null>(null);

  const calculateDaysToGo = (date: string) => {
    setDaysRemaining(getDaysLeft(date));
  };

  const getZodiacSign = (date: string) => {
    const selected = new Date(date);
    const day = selected.getDate();
    const month = selected.getMonth();

    if (day < breakDates[month]) {
      setZodiacSign(zodiacSigns[month]);
    } else {
      setZodiacSign(zodiacSigns[(month + 1) % 12]);
    }
  };

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    calculateDaysToGo(day.dateString);
    getZodiacSign(day.dateString);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Termíny</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Dnešní datum: {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Důležité události</Text>
        {importantDates.map((event, index) => {
          const daysLeft = getDaysLeft(event.date);
          return (
            <View style={styles.eventRow} key={index}>
              <View
                style={[styles.colorDot, { backgroundColor: event.color }]}
              />
              <Text style={styles.eventText}>
                {event.name}:
                <Text style={styles.daysText}>
                  {" "}
                  {daysLeft > 0 ? daysLeft : 0} dní{" "}
                </Text>
                <Text>[{event.date}]</Text>
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Zadej datum</Text>
        <Calendar
          onDayPress={handleDayPress}
          markingType="custom"
          markedDates={{
            [selectedDate || ""]: { selected: true, selectedColor: "#007AFF" },
            "2025-05-17": {
              customStyles: {
                container: {
                  backgroundColor: "red",
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
            "2025-03-26": {
              customStyles: {
                container: {
                  backgroundColor: "green",
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
            "2025-04-23": {
              customStyles: {
                container: {
                  backgroundColor: "blue",
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
          }}
        />
      </View>
      {selectedDate && (
        <View style={styles.card}>
          <Text style={styles.result}>Vybrané datum: {selectedDate}</Text>
          <Text style={styles.result}>
            Počet dní do zvoleného data: {daysRemaining}
          </Text>
          <Text style={styles.result}>Znamení zvěrokruhu: {zodiacSign}</Text>
          {zodiacSign && (
            <Image
              source={zodiacImages[zodiacSign]}
              style={styles.zodiacImage}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 10,
    textAlign: "center",
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  eventText: {
    fontSize: 16,
    color: "#333",
  },
  result: {
    fontSize: 16,
    marginTop: 5,
  },
  daysText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  zodiacImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: "center",
  },
});
