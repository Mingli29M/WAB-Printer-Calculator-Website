"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "@/lib/theme"
import { LanguageProvider } from "@/lib/i18n"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
