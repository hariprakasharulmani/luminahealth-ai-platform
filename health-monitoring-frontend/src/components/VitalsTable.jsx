import { format } from "date-fns";

export default function VitalsTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        No records found.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-auto rounded-xl border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-gray-50/50 dark:bg-gray-800/50">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Date
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Blood Pressure
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Glucose
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Heart Rate
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              BMI
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Risk Score
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Risk Level
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle">
                {(() => {
                  if (!item.date) return "-";
                  try {
                    const parsed = new Date(item.date);
                    if (!isNaN(parsed)) {
                      return format(parsed, "MMM dd, yyyy HH:mm");
                    }
                  } catch (e) {}
                  return "-";
                })()}
              </td>
              <td className="p-4 align-middle font-medium">{item.bloodPressure}</td>
              <td className="p-4 align-middle">{item.glucoseLevel} mg/dL</td>
              <td className="p-4 align-middle">{item.heartRate} bpm</td>
              <td className="p-4 align-middle">{item.bmi}</td>
              <td className="p-4 align-middle">
                {item.riskScore !== undefined ? Number(item.riskScore).toFixed(3) : "-"}
              </td>
              <td className="p-4 align-middle">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                  ${
                    item.riskLevel === "LOW"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : item.riskLevel === "MEDIUM"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                      : item.riskLevel === "HIGH"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {item.riskLevel || "UNKNOWN"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
