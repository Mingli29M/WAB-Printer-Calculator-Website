"use client"

import { Button } from "@/components/ui/button"
import { Download, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n"

interface HeroSectionProps {
  hasReleases: boolean
  latestVersion?: string
}

export function HeroSection({ hasReleases, latestVersion }: HeroSectionProps) {
  const { t, language } = useLanguage()
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {hasReleases && latestVersion && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {t.version} {latestVersion} {language === "zh" ? "现已发布" : "is now available"}
            </span>
          </div>
        )}

        <div className="mb-8 flex justify-center">
          <Image
            src="/app-icon.png"
            alt="WAB Print Calculator"
            width={120}
            height={120}
            className="rounded-2xl shadow-2xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
          <span className="text-balance block">{t.heroTitle}</span>
          <span className="text-primary text-3xl md:text-4xl font-medium mt-2 block">{t.heroSubtitle}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          {t.heroDescription}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasReleases ? (
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="#download">
                <Download className="size-5" />
                {t.getStarted}
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="gap-2 px-8" disabled>
              <Download className="size-5" />
              {t.comingSoon}
            </Button>
          )}
          <Button variant="outline" size="lg" className="gap-2 px-8" asChild>
            <a
              href="https://github.com/Mingli29M/WAB-Print-Calculator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-5" />
              {t.viewOnGitHub}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

        {/* Tech stack badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {[t.dotnet, t.avaloniaUI, t.crossPlatform].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-card/50 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
