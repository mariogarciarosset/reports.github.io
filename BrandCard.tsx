import { Card, CardContent } from "@/components/ui/card";
import { BrandData, formatCurrency, formatPercent } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface BrandCardProps {
  brand: BrandData;
}

export function BrandCard({ brand }: BrandCardProps) {
  const atingimento = (brand.faturadoLiquidoMTD / brand.metaFaturamentoLiquido) * 100;
  const share = brand.faturadoLiquidoMTD;
  const riskLevel = atingimento >= 85 ? "low" : atingimento >= 70 ? "medium" : "high";

  return (
    <Card className="border-border/50 bg-card/80 overflow-hidden">
      <div className="h-1" style={{ backgroundColor: brand.color }} />
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-foreground">{brand.name}</h3>
          <span
            className={cn("text-xs px-2 py-0.5 rounded-full font-medium", {
              "bg-success/20 text-success": riskLevel === "low",
              "bg-warning/20 text-warning": riskLevel === "medium",
              "bg-danger/20 text-danger": riskLevel === "high",
            })}
          >
            {riskLevel === "low" ? "No alvo" : riskLevel === "medium" ? "Atenção" : "Risco"}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fat. Líquido</span>
            <span className="font-medium text-foreground">{formatCurrency(share)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Atingimento</span>
            <span className={cn("font-semibold", {
              "text-success": riskLevel === "low",
              "text-warning": riskLevel === "medium",
              "text-danger": riskLevel === "high",
            })}>{formatPercent(atingimento)}</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(atingimento, 100)}%`, backgroundColor: brand.color }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Margem</span>
            <span className="text-foreground">{formatPercent(brand.margem)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
