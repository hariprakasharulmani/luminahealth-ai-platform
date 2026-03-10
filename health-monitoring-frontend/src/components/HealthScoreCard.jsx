import { ActivitySquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function HealthScoreCard({ latestRiskScore }) {
  // If no data, default to perfect health (0 risk)
  const baseScore = latestRiskScore !== undefined && latestRiskScore !== null ? Number(latestRiskScore) : 0;
  
  // Inverse of Risk Score. 0 risk = 100 health. 1 risk = 0 health.
  const healthScore = Math.max(0, Math.round(100 - (baseScore * 100)));

  let status = "Excellent";
  let color = "text-emerald-500";
  let bg = "bg-emerald-500/10";
  
  if (healthScore < 40) {
    status = "Critical";
    color = "text-rose-500";
    bg = "bg-rose-500/10";
  } else if (healthScore < 70) {
    status = "Fair";
    color = "text-amber-500";
    bg = "bg-amber-500/10";
  } else if (healthScore < 90) {
    status = "Good";
    color = "text-emerald-400";
    bg = "bg-emerald-400/10";
  }

  return (
    <Card className="overflow-hidden relative transition-all hover:shadow-md hover:-translate-y-1">
      <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full blur-2xl ${bg}`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-semibold text-muted-foreground">Health Score</CardTitle>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bg}`}>
          <ActivitySquare className={`h-5 w-5 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 mt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-foreground">{healthScore}</span>
          <span className="text-sm font-bold text-muted-foreground">/ 100</span>
        </div>
        <p className={`mt-1 text-sm font-bold ${color}`}>
          Status: {status}
        </p>
      </CardContent>
    </Card>
  );
}
