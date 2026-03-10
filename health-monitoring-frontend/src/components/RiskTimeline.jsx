import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

export default function RiskTimeline({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        No risk history available.
      </div>
    );
  }

  const chartData = data
    .filter(d => d.riskScore !== undefined && d.riskScore !== null)
    .map(d => {
      let shortDate = "Unknown";
      let longDate = "Unknown Date";
      try {
        if (d.date) {
          const parsed = new Date(d.date);
          if (!isNaN(parsed)) {
            shortDate = format(parsed, "MMM dd");
            longDate = format(parsed, "MMM dd, yyyy HH:mm");
          }
        }
      } catch (e) {
        // Fallback for invalid dates
      }
      
      return {
        date: shortDate,
        score: Number(d.riskScore).toFixed(2),
        fullDate: longDate
      };
    })
    // We want chronologically for chart drawing (left to right)
    .reverse();

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(15, 23, 42, 0.9)", color: "white" }}
            labelFormatter={(label, payload) => payload?.[0]?.payload?.fullDate || label}
          />
          <ReferenceLine y={0.3} stroke="#10b981" strokeDasharray="3 3" opacity={0.3} />
          <ReferenceLine y={0.6} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.3} />
          <ReferenceLine y={1.0} stroke="#f43f5e" strokeDasharray="3 3" opacity={0.3} />
          <Line
            type="monotone"
            dataKey="score"
            name="Risk Score"
            stroke="#818cf8"
            strokeWidth={3}
            dot={{ r: 4, fill: "#818cf8", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#818cf8", stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
