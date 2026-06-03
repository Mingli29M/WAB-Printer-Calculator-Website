"use client"

import { useLanguage } from "@/lib/i18n"

export function FormulaSection() {
  const { t, language } = useLanguage()
  
  const formulas = [
    {
      title: t.materialCost,
      formula: language === "zh" 
        ? "材料成本 = 重量 (g) × 单价 (元/g)" 
        : "Material Cost = Weight (g) × Price per gram",
      description: t.materialCostDesc,
    },
    {
      title: t.energyCost,
      formula: language === "zh"
        ? "电量 (kWh) = 功率 (W) × 时间 (h) / 1000"
        : "Energy (kWh) = Power (W) × Time (h) / 1000",
      description: t.energyCostDesc,
    },
    {
      title: t.totalCost,
      formula: language === "zh"
        ? "总成本 = 材料成本 + 电费成本"
        : "Total Cost = Material Cost + Energy Cost",
      description: t.totalCostDesc,
    },
  ]

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.formulaTitle}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.formulaSubtitle}
          </p>
        </div>

        <div className="space-y-8">
          {formulas.map((item) => (
            <div key={item.title} className="p-6 rounded-xl border border-border bg-card/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <div className="font-mono text-primary text-xl mb-2">
                {item.formula}
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
