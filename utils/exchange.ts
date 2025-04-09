import axios from "axios";
import getLastMonths from "./calculateMonths";

const BASE_URL = "http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php";

export interface CurrencyData {
  country_label: string;
  curr_label: string;
  unit: number;
  code: string;
  rate: number;
}
export interface Point {
  month: string;
  rate: number;
}

export const fetchExchangeRates = async (
  date?: string,
  lang: "cs" | "en" = "en"
) => {
  const params: any = { lang };
  if (date) params.date = date;

  const response = await axios.get(BASE_URL, { params });
  return response.data.data as CurrencyData[];
};

export const convertCurrency = (amount: number, rate: number, unit: number) => {
  return (amount * unit) / rate;
};
export const fetchCurrencyHistory = async (
  currencyCode: string,
  lang: "cs" | "en" = "en"
) => {
  const months = getLastMonths(10);

  const history = await Promise.all(
    months.map(async (date) => {
      const rates = await fetchExchangeRates(date, lang);
      const rate = rates.find((item) => item.code === currencyCode);
      return {
        month: date.slice(0, 7),
        rate: rate ? rate.rate : 0,
      };
    })
  );

  return history;
};
