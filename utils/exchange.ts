import axios from "axios";

const BASE_URL = "http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php";

export interface CurrencyData {
  country_label: string;
  curr_label: string;
  unit: number;
  code: string;
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
