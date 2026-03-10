import { Brain, ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";

export default function HealthInsights({ vitals }) {
  if (!vitals || vitals.length === 0) {
    return null;
  }

  // vitals array is sorted descending by date
  const latest = vitals[0];
  const insights = [];

  // Rules Engine
  if (latest.glucoseLevel > 140) {
    insights.push({ type: "critical", text: "Elevated glucose detected. Recommendation: Consult physician.", icon: ArrowUpRight, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" });
  } else if (latest.glucoseLevel < 70) {
    insights.push({ type: "warning", text: "Low glucose detected. Consume fast-acting carbs.", icon: ArrowDownRight, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" });
  } else {
    insights.push({ type: "good", text: "Glucose levels are optimal.", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" });
  }

  // BP Parsing (handling format '120/80' vs '120')
  const bpString = String(latest.bloodPressure);
  let systolic = null;
  if (bpString.includes('/')) {
    systolic = parseInt(bpString.split('/')[0]);
  } else {
    systolic = parseInt(bpString);
  }

  if (systolic && systolic >= 130) {
    insights.push({ type: "critical", text: `High blood pressure (${latest.bloodPressure}). Monitor closely.`, icon: ArrowUpRight, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" });
  } else if (systolic && systolic < 90) {
    insights.push({ type: "warning", text: `Low blood pressure (${latest.bloodPressure}). Stay hydrated.`, icon: ArrowDownRight, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" });
  }

  if (latest.bmi >= 25 && latest.bmi < 30) {
    insights.push({ type: "warning", text: "BMI slightly above recommended range.", icon: ArrowUpRight, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" });
  } else if (latest.bmi >= 30) {
    insights.push({ type: "critical", text: "BMI in obese range. Seek medical consultation.", icon: ArrowUpRight, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" });
  } else if (latest.bmi >= 18.5 && latest.bmi < 25) {
    insights.push({ type: "good", text: "BMI is within normal healthy range.", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" });
  }

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg h-full transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-indigo-500" />
          AI Health Insights
        </CardTitle>
        <CardDescription>Generated from your latest reading</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className={`flex items-start gap-3 rounded-lg border p-3 transition-all ${insight.bg} ${insight.border}`}>
              <div className={`mt-0.5 rounded-full p-1 bg-background shadow-sm ${insight.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">{insight.text}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
