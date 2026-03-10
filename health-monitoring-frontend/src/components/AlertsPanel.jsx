import { AlertCircle, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";

export default function AlertsPanel({ vitals }) {
  if (!vitals || vitals.length === 0) return null;

  const alerts = [];
  
  // Look at the latest 3 readings to see if any recent alerts popped up
  const recentVitals = vitals.slice(0, 3);
  
  recentVitals.forEach((recording) => {
    const bpNum = recording.bloodPressure.toString().includes('/') 
      ? parseInt(recording.bloodPressure.split('/')[0]) 
      : parseInt(recording.bloodPressure);

    if (recording.glucoseLevel > 160) {
      alerts.push({ text: `Critical glucose level alert (${recording.glucoseLevel} mg/dL)`, severity: 'critical' });
    }
    if (bpNum > 140) {
      alerts.push({ text: `High blood pressure warning (${recording.bloodPressure})`, severity: 'warning' });
    }
    if (recording.heartRate > 100 || recording.heartRate < 50) {
      alerts.push({ text: `Abnormal heart rate detected (${recording.heartRate} bpm)`, severity: 'warning' });
    }
    if (recording.riskScore > 0.8) {
      alerts.push({ text: `Extreme AI Risk Alert - Seek immediate medical attention`, severity: 'critical' });
    }
  });

  const uniqueAlerts = Array.from(new Set(alerts.map(a => a.text)))
      .map(text => alerts.find(a => a.text === text))
      .slice(0, 4); // Show top 4

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg h-full transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-rose-500 animate-bounce" style={{ animationDuration: '2s' }} />
          Smart Health Alerts
        </CardTitle>
        <CardDescription>Recent critical warnings</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {uniqueAlerts.length === 0 ? (
          <div className="flex h-[100px] items-center justify-center rounded-lg border border-dashed border-emerald-500/20 bg-emerald-500/5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            No active alerts. You are doing great!
          </div>
        ) : (
          uniqueAlerts.map((alert, idx) => (
            <div key={idx} className={`flex items-start gap-3 rounded-lg border p-3 ${
              alert.severity === 'critical' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
            }`}>
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-snug">{alert.text}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
