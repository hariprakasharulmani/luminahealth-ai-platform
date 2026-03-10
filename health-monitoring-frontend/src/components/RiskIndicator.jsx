import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "../utils/utils";

export default function RiskIndicator({ riskLevel, riskScore }) {
  let bgColor = "bg-gray-100 dark:bg-gray-800";
  let textColor = "text-gray-800 dark:text-gray-200";
  let Icon = Info;
  let label = "Unknown Risk";

  if (riskLevel === "LOW") {
    bgColor = "bg-emerald-100 dark:bg-emerald-900/30";
    textColor = "text-emerald-700 dark:text-emerald-400";
    Icon = CheckCircle;
    label = "Low Risk";
  } else if (riskLevel === "MEDIUM") {
    bgColor = "bg-amber-100 dark:bg-amber-900/30";
    textColor = "text-amber-700 dark:text-amber-400";
    Icon = AlertTriangle;
    label = "Medium Risk";
  } else if (riskLevel === "HIGH") {
    bgColor = "bg-rose-100 dark:bg-rose-900/30";
    textColor = "text-rose-700 dark:text-rose-400";
    Icon = AlertTriangle;
    label = "High Risk";
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl p-6 text-center transition-colors",
        bgColor
      )}
    >
      <Icon className={cn("mb-3 h-10 w-10", textColor)} />
      <h3 className={cn("text-lg font-bold", textColor)}>{label}</h3>
      {riskScore !== undefined && (
        <p className={cn("mt-1 text-2xl font-black", textColor)}>
          Score: {Number(riskScore).toFixed(2)}
        </p>
      )}
    </div>
  );
}
