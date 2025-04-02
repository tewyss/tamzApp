import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import CurrencyInput from "./components/CurrencyInput";
import ExchangeResult from "./components/ExchangeResult";
import {
  fetchExchangeRates,
  convertCurrency,
  CurrencyData,
} from "../utils/exchange";
import CustomButton from "./components/CustomButton";
import CalendarSelectorModal from "./components/CalendarSelectorModal";
import CurrencyPickerModal from "./components/CurrencyPickerModal";
import { Alert } from "react-native";
import LangSwitcher from "./LangSwitcher";
import { texts } from "../utils/locales";
import CoinAnimation from "./components/CoinAnimation";

const Homework5 = () => {
  const [amount, setAmount] = useState("100");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [rates, setRates] = useState<CurrencyData[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const getTodayDate = (): string => {
    return new Date().toISOString().split("T")[0];
  };
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [lang, setLang] = useState<"cs" | "en">("en");
  const t = texts[lang];
  const [animateCoin, setAnimateCoin] = useState(false);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await fetchExchangeRates(selectedDate, lang);
        setRates(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRates();
  }, [selectedDate, lang]);

  const handleConvert = () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(t.alertTitle, t.alertMessage);
      return;
    }
    setAnimateCoin(true);

    const rateData = rates.find((c) => c.code === selectedCurrency);
    if (!rateData) return;

    const converted = convertCurrency(
      numericAmount,
      rateData.rate,
      rateData.unit
    );
    setResult(converted);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <CoinAnimation
        trigger={animateCoin}
        onFinish={() => setAnimateCoin(false)}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{t.title}</Text>
      <LangSwitcher selected={lang} onSelect={setLang} />
      <CurrencyInput
        label={t.amountLabel}
        value={amount}
        onChangeText={setAmount}
        placeholder={t.amountPlaceholder}
      />
      <CurrencyPickerModal
        currencies={rates}
        selectedCode={selectedCurrency}
        onSelect={setSelectedCurrency}
        labelText={t.currencyLabel}
        searchPlaceholder={t.searchPlaceholder}
        cancelText={t.cancel}
      />
      <CustomButton title={t.convert} onPress={handleConvert} />
      <CalendarSelectorModal
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        labelText={t.dateLabel}
        cancelText={t.cancel}
      />
      <ExchangeResult
        result={result}
        currencyCode={selectedCurrency}
        label={t.resultLabel}
      />
    </ScrollView>
  );
};

export default Homework5;
