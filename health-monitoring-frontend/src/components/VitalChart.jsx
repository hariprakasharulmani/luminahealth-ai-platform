import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { format } from "date-fns";

export default function VitalChart({ data }) {
  const [timeframe, setTimeframe] = useState("7"); // "7" or "30"

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        No vitals history available yet.
      </div>
    );
  }

  // Slice data based on timeframe 
  // data is already reversed (old to new) by the parent component, 
  // so we take the last N items (most recent)
  const limit = timeframe === "7" ? 7 : 30;
  const slicedData = data.slice(-limit);

  // Format the date so it looks nice on X Axis
  const chartData = slicedData.map((item) => {
    let formatted = "";
    try {
      if (item.date) {
        const parsed = new Date(item.date);
        if (!isNaN(parsed)) {
          formatted = format(parsed, "MMM dd HH:mm");
        }
      }
    } catch(e) {}
    
    return {
      ...item,
      formattedDate: formatted,
    };
  });

  return (
    <div className="flex flex-col h-[350px] w-full">
      <div className="mb-4 flex items-center justify-end px-4">
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
        >
          <option value="7">Last 7 submissons</option>
          <option value="30">Last 30 submissions</option>
        </select>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fontSize: 12 }} 
            tickMargin={10} 
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="bloodPressure"
            name="Blood Pressure"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="glucoseLevel"
            name="Glucose"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="heartRate"
            name="Heart Rate"
            stroke="#f43f5e"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="bmi"
            name="BMI"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
