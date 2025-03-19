export interface BMICalculationResult {
  bmi: number;
  roundedBMI: number;
  status: string;
  message: string;
}

export function calculateBMI(
  name: string,
  age: number,
  gender: string,
  height: number,
  weight: number
): BMICalculationResult {
  const bmi = weight / (height / 100) ** 2;
  const roundedBMI = parseFloat(bmi.toFixed(2));

  const status =
    bmi < 18.5
      ? "Underweight ⚠️"
      : bmi < 25
      ? "Normal 💪"
      : bmi < 30
      ? "Overweight 🍔"
      : "Obese 🚨";

  const message = `${name} (${gender}, ${age} y/o), your BMI is ${roundedBMI} – ${status}`;

  return { bmi, roundedBMI, status, message };
}
