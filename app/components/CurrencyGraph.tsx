import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Canvas from "react-native-canvas";
import { texts } from "@/utils/locales";

interface Point {
  month: string;
  rate: number;
}

interface Props {
  data: Point[];
  lang: "cs" | "en";
}

const CurrencyGraph: React.FC<Props> = ({ data, lang }) => {
  const t = texts[lang];
  const handleCanvas = async (canvas: any) => {
    if (!canvas) return;

    const ctx = await canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 200;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (data.length === 0) return;

    const minRate = Math.min(...data.map((d) => d.rate));
    const maxRate = Math.max(...data.map((d) => d.rate));
    const rateRange = maxRate - minRate || 1;

    const points = data.map((d, index) => {
      const x = (index / (data.length - 1)) * (canvas.width - 40) + 20;
      const y =
        canvas.height -
        ((d.rate - minRate) / rateRange) * (canvas.height - 40) -
        20;
      return { x, y };
    });

    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(20, canvas.height - 20);
    ctx.lineTo(canvas.width, canvas.height - 20);
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.stroke();

    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const currentRate = data[i].rate;
      const nextRate = data[i + 1].rate;

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = nextRate < currentRate ? "#FF3B30" : "#4CAF50";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = "#407BFF";
      ctx.fill();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.graphTitle}</Text>
      <Canvas ref={handleCanvas} style={styles.canvas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
  },
  canvas: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 320,
    height: 200,
    elevation: 2,
  },
});

export default CurrencyGraph;
