import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Slider from "@react-native-community/slider";

interface Props {
  onCalculate: (
    name: string,
    age: number,
    gender: string,
    height: number,
    weight: number
  ) => void;
}

const BMIForm: React.FC<Props> = ({ onCalculate }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(90);

  const nameInputRef = useRef<TextInput>(null);
  const ageInputRef = useRef<TextInput>(null);

  const handlePressCalculate = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter a valid name.");
      return;
    }

    const parsedAge = parseInt(age, 10);
    if (!age.trim() || isNaN(parsedAge) || parsedAge <= 0) {
      Alert.alert("Validation Error", "Please enter a valid age.");
      return;
    }

    onCalculate(name, parsedAge, gender, height, weight);
    setName("");
    setAge("");
    Keyboard.dismiss();
  };

  const RadioOption = ({
    label,
    value,
    selected,
    onPress,
  }: {
    label: string;
    value: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.radioOption}>
      <View
        style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
        {selected && <Text style={styles.radioCheck}>✓</Text>}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.form}>
      <TextInput
        ref={nameInputRef}
        placeholder="e.g. Johny Sins"
        placeholderTextColor="#666"
        style={styles.input}
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        onSubmitEditing={() => ageInputRef.current?.focus()}
      />
      <TextInput
        ref={ageInputRef}
        placeholder="e.g. 30"
        placeholderTextColor="#666"
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />

      <View style={styles.radioGroup}>
        <RadioOption
          label="Male"
          value="male"
          selected={gender === "male"}
          onPress={() => setGender("male")}
        />
        <RadioOption
          label="Female"
          value="female"
          selected={gender === "female"}
          onPress={() => setGender("female")}
        />
      </View>

      <Text style={styles.label}>Height: {height} cm</Text>
      <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={220}
        step={1}
        value={height}
        onValueChange={setHeight}
      />
      <Text style={styles.label}>Weight: {weight} kg</Text>
      <Slider
        style={styles.slider}
        minimumValue={30}
        maximumValue={150}
        step={1}
        value={weight}
        onValueChange={setWeight}
      />

      <TouchableOpacity
        onPress={handlePressCalculate}
        style={styles.calcButton}>
        <Text style={styles.calcButtonText}>Calculate BMI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#407BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioCircleSelected: {
    backgroundColor: "#407BFF",
  },
  radioCheck: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 15,
  },
  calcButton: {
    backgroundColor: "#407BFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  calcButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BMIForm;
