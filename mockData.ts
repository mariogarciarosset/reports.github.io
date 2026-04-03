// Mock data baseado nos dados reais do PDF - Março 2026
// Estrutura preparada para migração futura para Supabase

export interface BrandData {
  id: string;
  name: string;
  color: string;
  metaCaptacao: number;
  metaFaturamentoBruto: number;
  metaFaturamentoLiquido: number;
  captadoMTD: number;
  faturadoBrutoMTD: number;
  devolucoesMTD: number;
  faturadoLiquidoMTD: number;
  ticketMedio: number;
  pedidos: number;
  margem: number;
}

export interface DailyData {
  dia: string;
  date: string;
  captacao: number;
  faturamentoBruto: number;
  devolucoes: number;
  faturamentoLiquido: number;
  metaCaptacaoDia: number;
  metaFaturamentoDia: number;
  brands: {
    [brandId: string]: {
      captacao: number;
      faturamentoBruto: number;
      devolucoes: number;
      faturamentoLiquido: number;
    };
  };
}

export const BRAND_COLORS = {
  cia: "hsl(217, 91%, 60%)",
  bfs: "hsl(142, 71%, 45%)",
  valisere: "hsl(326, 80%, 60%)",
  aguadoce: "hsl(25, 95%, 53%)",
} as const;

export const brands: BrandData[] = [
  {
    id: "cia",
    name: "CIA Marítima",
    color: BRAND_COLORS.cia,
    metaCaptacao: 1800000,
    metaFaturamentoBruto: 1650000,
    metaFaturamentoLiquido: 1500000,
    captadoMTD: 1523400,
    faturadoBrutoMTD: 1389200,
    devolucoesMTD: 98500,
    faturadoLiquidoMTD: 1290700,
    ticketMedio: 385,
    pedidos: 3956,
    margem: 62.3,
  },
  {
    id: "bfs",
    name: "Body For Sure",
    color: BRAND_COLORS.bfs,
    metaCaptacao: 950000,
    metaFaturamentoBruto: 870000,
    metaFaturamentoLiquido: 800000,
    captadoMTD: 812300,
    faturadoBrutoMTD: 745600,
    devolucoesMTD: 52100,
    faturadoLiquidoMTD: 693500,
    ticketMedio: 298,
    pedidos: 2726,
    margem: 58.7,
  },
  {
    id: "valisere",
    name: "Valisere",
    color: BRAND_COLORS.valisere,
    metaCaptacao: 1200000,
    metaFaturamentoBruto: 1100000,
    metaFaturamentoLiquido: 1000000,
    captadoMTD: 978500,
    faturadoBrutoMTD: 892300,
    devolucoesMTD: 71800,
    faturadoLiquidoMTD: 820500,
    ticketMedio: 342,
    pedidos: 2861,
    margem: 65.1,
  },
  {
    id: "aguadoce",
    name: "Água Doce",
    color: BRAND_COLORS.aguadoce,
    metaCaptacao: 420000,
    metaFaturamentoBruto: 385000,
    metaFaturamentoLiquido: 350000,
    captadoMTD: 287600,
    faturadoBrutoMTD: 258900,
    devolucoesMTD: 32400,
    faturadoLiquidoMTD: 226500,
    ticketMedio: 215,
    pedidos: 1337,
    margem: 51.2,
  },
];

// Helper to generate daily data for March 2026
function generateDailyData(): DailyData[] {
  const days: DailyData[] = [];
  const daysInMonth = 26; // dados até dia 26

  const brandDailyBase = {
    cia: { captacao: 58592, fatBruto: 53430, dev: 3788, fatLiq: 49642 },
    bfs: { captacao: 31242, fatBruto: 28677, dev: 2004, fatLiq: 26673 },
    valisere: { captacao: 37635, fatBruto: 34319, dev: 2762, fatLiq: 31558 },
    aguadoce: { captacao: 11062, fatBruto: 9958, dev: 1246, fatLiq: 8712 },
  };

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2026-03-${String(i).padStart(2, "0")}`;
    const dayLabel = `${i}/03`;
    const dayOfWeek = new Date(2026, 2, i).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const variance = 0.7 + Math.random() * 0.6;
    const weekendFactor = isWeekend ? 1.25 : 1;
    const factor = variance * weekendFactor;

    const brandDaily: DailyData["brands"] = {};
    let totalCaptacao = 0;
    let totalFatBruto = 0;
    let totalDev = 0;
    let totalFatLiq = 0;

    for (const [id, base] of Object.entries(brandDailyBase)) {
      const bf = factor * (0.85 + Math.random() * 0.3);
      const cap = Math.round(base.captacao * bf);
      const fb = Math.round(base.fatBruto * bf);
      const dev = Math.round(base.dev * bf * (0.8 + Math.random() * 0.4));
      const fl = fb - dev;
      brandDaily[id] = { captacao: cap, faturamentoBruto: fb, devolucoes: dev, faturamentoLiquido: fl };
      totalCaptacao += cap;
      totalFatBruto += fb;
      totalDev += dev;
      totalFatLiq += fl;
    }

    days.push({
      dia: dayLabel,
      date: dateStr,
      captacao: totalCaptacao,
      faturamentoBruto: totalFatBruto,
      devolucoes: totalDev,
      faturamentoLiquido: totalFatLiq,
      metaCaptacaoDia: Math.round(4370000 / 31),
      metaFaturamentoDia: Math.round(3650000 / 31),
      brands: brandDaily,
    });
  }
  return days;
}

export const dailyData: DailyData[] = generateDailyData();

// Totals
export const totals = {
  metaCaptacao: brands.reduce((s, b) => s + b.metaCaptacao, 0),
  metaFaturamentoBruto: brands.reduce((s, b) => s + b.metaFaturamentoBruto, 0),
  metaFaturamentoLiquido: brands.reduce((s, b) => s + b.metaFaturamentoLiquido, 0),
  captadoMTD: brands.reduce((s, b) => s + b.captadoMTD, 0),
  faturadoBrutoMTD: brands.reduce((s, b) => s + b.faturadoBrutoMTD, 0),
  devolucoesMTD: brands.reduce((s, b) => s + b.devolucoesMTD, 0),
  faturadoLiquidoMTD: brands.reduce((s, b) => s + b.faturadoLiquidoMTD, 0),
  ticketMedio: Math.round(brands.reduce((s, b) => s + b.ticketMedio * b.pedidos, 0) / brands.reduce((s, b) => s + b.pedidos, 0)),
  pedidos: brands.reduce((s, b) => s + b.pedidos, 0),
  margem: Number((brands.reduce((s, b) => s + b.margem * b.faturadoLiquidoMTD, 0) / brands.reduce((s, b) => s + b.faturadoLiquidoMTD, 0)).toFixed(1)),
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
