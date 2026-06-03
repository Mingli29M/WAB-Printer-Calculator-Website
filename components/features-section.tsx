"use client"

import { Calculator, Zap, Box, DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function FeaturesSection() {
  const { t } = useLanguage()
  
  const features = [
    {
      icon: Calculator,
      title: t.precisionTitle,
      description: t.precisionDesc,
    },
    {
      icon: Box,
      title: t.materialTitle,
      description: t.materialDesc,
    },
    {
      icon: Zap,
      title: t.energyTitle,
      description: t.energyDesc,
    },
    {
      icon: DollarSign,
      title: t.transparentTitle,
      description: t.transparentDesc,
    },
  ]

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
