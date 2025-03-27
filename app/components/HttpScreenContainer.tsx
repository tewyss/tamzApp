import React, { useState } from "react";
import HttpScreenView from "./HttpScreenView";

export default function HttpScreenContainer() {
  const [url, setUrl] = useState<string>(
    "https://homel.vsb.cz/~mor03/TAMZ/TAMZ22.php"
  );
  const [login, setLogin] = useState<string>("nev0081");
  const [receivedData, setReceivedData] = useState<string>("");
  const [decodedData, setDecodedData] = useState<string>("");
  const [finalMessage, setFinalMessage] = useState<string>("");
  const [activeButton, setActiveButton] = useState<"get" | "send">("get");

  const handleGetCode = async () => {
    try {
      const timestamp = Date.now();
      const getUrl = `${url}?user=${login}&timestamp=${timestamp}`;
      const response = await fetch(getUrl);
      const data = await response.text();

      if (!response.ok) {
        alert(`GET Error: ${data}`);
        return;
      }
      setActiveButton("send");
      setReceivedData(data);

      const decoded = atob(data);
      setDecodedData(decoded);
      alert("GET Success: Token získán a dekódován.");
    } catch (error: any) {
      alert(`GET Error: ${error.message}`);
    }
  };

  const handleSendCode = async () => {
    try {
      const token = receivedData;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
      });
      const data = await response.text();

      if (!response.ok) {
        alert(`POST Error: ${data}`);
        return;
      }
      setActiveButton("get");
      setFinalMessage(data);
      alert("POST Success: Zpráva přijata.");
    } catch (error: any) {
      alert(`POST Error: ${error.message}`);
    }
  };

  const logicProps = {
    url,
    login,
    receivedData,
    decodedData,
    finalMessage,
    activeButton,
    setUrl,
    setLogin,
    handleGetCode,
    handleSendCode,
  };

  return <HttpScreenView {...logicProps} />;
}
