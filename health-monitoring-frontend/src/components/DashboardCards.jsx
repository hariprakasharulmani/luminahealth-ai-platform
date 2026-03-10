import { Activity, Droplet, Heart, Weight, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function DashboardCards({ summaryData, latestVital }) {
  if (!summaryData) return null;

  const data = {
    avgHeartRate: summaryData.avgHeartRate ? Math.round(summaryData.avgHeartRate) : 0,
    avgBloodPressure: summaryData.avgBloodPressure || "0/0",
    avgGlucoseLevel: summaryData.avgGlucoseLevel ? Math.round(summaryData.avgGlucoseLevel) : 0,
    avgBmi: summaryData.avgBmi ? Number(summaryData.avgBmi).toFixed(1) : 0,
    avgRiskScore: summaryData.avgRiskScore ? Number(summaryData.avgRiskScore).toFixed(2) : 0,
  };

  // Extract latest risk level from latest reading if available, else fallback
  const latestRiskLevel = latestVital?.riskLevel || "UNKNOWN";
  
  // Choose color based on risk
  let riskColor = "text-emerald-500";
  let riskBg = "bg-emerald-500/10";
  let riskFullBg = "bg-emerald-100 dark:bg-emerald-900/30";
  if (latestRiskLevel === "HIGH") {
    riskColor = "text-rose-500";
    riskBg = "bg-rose-500/10";
    riskFullBg = "bg-rose-100 dark:bg-rose-900/30";
  } else if (latestRiskLevel === "MEDIUM") {
    riskColor = "text-amber-500";
    riskBg = "bg-amber-500/10";
    riskFullBg = "bg-amber-100 dark:bg-amber-900/30";
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 h-full">
      <Card className="overflow-hidden relative transition-all hover:shadow-md hover:-translate-y-1">
        <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-rose-500/10 blur-2xl"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Heart Rate</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
            <Heart className="h-5 w-5 text-rose-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgHeartRate} bpm</div>
          <p className="text-xs text-muted-foreground">
            Normal: 60-100 bpm
          </p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden relative transition-all hover:shadow-md hover:-translate-y-1">
        <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10 blur-2xl"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Blood Pressure</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgBloodPressure}</div>
          <p className="text-xs text-muted-foreground">
            Normal: &lt;120/80
          </p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden relative transition-all hover:shadow-md hover:-translate-y-1">
        <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/10 blur-2xl"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Glucose</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Droplet className="h-5 w-5 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgGlucoseLevel} mg/dL</div>
          <p className="text-xs text-muted-foreground">
            Fasting Normal: 70-99 mg/dL
          </p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden relative transition-all hover:shadow-md hover:-translate-y-1">
        <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-amber-500/10 blur-2xl"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Avg BMI</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Weight className="h-5 w-5 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgBmi}</div>
          <p className="text-xs text-muted-foreground">
            Normal range: 18.5 - 24.9
          </p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden relative transition-all hover:shadow-md hover:-translate-y-1">
        <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full ${riskBg} blur-2xl`}></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-semibold text-muted-foreground">AI Risk Analysis</CardTitle>
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${riskFullBg}`}>
            <BrainCircuit className={`h-5 w-5 ${riskColor}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgRiskScore}</div>
          <p className={`text-xs mt-1 font-bold ${riskColor}`}>
            Latest: {latestRiskLevel}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
