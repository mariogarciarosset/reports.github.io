import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GaugeChartProps {
  title: string;
  value: number;
  label: string;
}

export function GaugeChart({ title, value, label }: GaugeChartProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const angle = (clampedValue / 100) * 180;
  const getColor = () => {
    if (clampedValue >= 90) return "hsl(var(--success))";
    if (clampedValue >= 70) return "hsl(var(--warning))";
    return "hsl(var(--danger))";
  };

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-4">
        <div className="relative w-40 h-20 overflow-hidden">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 10 95 A 85 85 0 0 1 190 95"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 10 95 A 85 85 0 0 1 190 95"
              fill="none"
              stroke={getColor()}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(angle / 180) * 267} 267`}
            />
          </svg>
          <div className="absolute inset-0 flex items-end justify-center pb-0">
            <span className="text-2xl font-bold text-foreground">{value.toFixed(1)}%</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}
