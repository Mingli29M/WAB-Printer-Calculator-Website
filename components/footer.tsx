"use client"

import { Github } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/app-icon.png"
            alt="WAB Print Calculator"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <p className="font-semibold text-foreground">{t.copyright}</p>
            <p className="text-sm text-muted-foreground">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Mingli29M/WAB-Print-Calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="size-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t.copyright}. {t.allRightsReserved}.
        </p>
      </div>
    </footer>
  )
}
