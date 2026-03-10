import { cn } from "../utils/utils";

export default function RiskGauge({ score }) {
  // Normalize score to 0..1
  const normalizedScore = Math.min(Math.max(score || 0, 0), 1);
  const percentage = Math.round(normalizedScore * 100);
  
  // Calculate SVG arc
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // It's a semi circle, so we only fill half
  const strokeDashoffset = circumference - (percentage / 100) * (circumference / 2);

  // Determine color based on ranges: 0-0.3 LOW, 0.3-0.6 MEDIUM, 0.6-1.0 HIGH
  let colorClass = "stroke-emerald-500";
  let label = "Low Risk";
  let bgGradient = "from-emerald-500/20";
  
  if (normalizedScore > 0.6) {
    colorClass = "stroke-rose-500";
    label = "High Risk";
    bgGradient = "from-rose-500/20";
  } else if (normalizedScore > 0.3) {
    colorClass = "stroke-amber-500";
    label = "Medium Risk";
    bgGradient = "from-amber-500/20";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex h-[100px] w-[200px] items-end justify-center overflow-hidden">
        {/* Background track arc */}
        <svg height={radius * 2} width={radius * 2} className="absolute inset-0">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 2} ${circumference / 2}`}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="stroke-muted"
            style={{ transformOrigin: "center", transform: "rotate(-180deg)" }}
          />
        </svg>

        {/* Foreground colored arc */}
        <svg height={radius * 2} width={radius * 2} className="absolute inset-0 transition-all duration-1000 ease-out">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={colorClass}
            style={{ transformOrigin: "center", transform: "rotate(-180deg)" }}
          />
        </svg>

        {/* Outer Glow */}
        <div className={cn("absolute bottom-0 h-24 w-24 rounded-full bg-gradient-to-t to-transparent blur-2xl", bgGradient)} />

        <div className="absolute bottom-4 flex flex-col items-center text-center leading-none">
          <span className="text-3xl font-black text-foreground">{percentage}%</span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
      </div>
    </div>
  );
}
