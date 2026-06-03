"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "zh"

interface Translations {
  // Header
  features: string
  download: string
  github: string
  
  // Hero
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  getStarted: string
  viewOnGitHub: string
  dotnet: string
  avaloniaUI: string
  crossPlatform: string
  
  // Features
  featuresTitle: string
  featuresSubtitle: string
  precisionTitle: string
  precisionDesc: string
  materialTitle: string
  materialDesc: string
  energyTitle: string
  energyDesc: string
  transparentTitle: string
  transparentDesc: string
  
  // Formula
  formulaTitle: string
  formulaSubtitle: string
  materialCost: string
  materialCostDesc: string
  energyCost: string
  energyCostDesc: string
  totalCost: string
  totalCostDesc: string
  
  // Download
  downloadTitle: string
  downloadSubtitle: string
  latestRelease: string
  downloadNow: string
  noReleases: string
  noReleasesDesc: string
  comingSoon: string
  version: string
  
  // Footer
  copyright: string
  allRightsReserved: string
  madeWith: string
  
  // Theme
  lightMode: string
  darkMode: string
  language: string
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    features: "Features",
    download: "Download",
    github: "GitHub",
    
    // Hero
    heroTitle: "WAB Print Calculator",
    heroSubtitle: "Precision Cost Estimation for 3D Printing",
    heroDescription: "Calculate your 3D printing costs with accuracy. Track material usage, energy consumption, and total print costs with our powerful desktop application.",
    getStarted: "Download Now",
    viewOnGitHub: "View on GitHub",
    dotnet: ".NET",
    avaloniaUI: "Avalonia UI",
    crossPlatform: "Cross-Platform",
    
    // Features
    featuresTitle: "Powerful Features",
    featuresSubtitle: "Everything you need to accurately calculate and manage your 3D printing costs",
    precisionTitle: "Precision Cost Calculation",
    precisionDesc: "Calculate material and energy costs with high precision using customizable formulas and parameters.",
    materialTitle: "Material Profile Management",
    materialDesc: "Create and manage multiple material profiles with different costs, densities, and properties.",
    energyTitle: "Energy Consumption Tracking",
    energyDesc: "Track electricity costs based on print time, power consumption, and local energy rates.",
    transparentTitle: "Cost Transparency",
    transparentDesc: "See a complete breakdown of all costs including material, energy, and optional labor costs.",
    
    // Formula
    formulaTitle: "Calculation Formulas",
    formulaSubtitle: "Transparent and accurate cost calculations",
    materialCost: "Material Cost",
    materialCostDesc: "Calculate material cost based on weight and price per unit",
    energyCost: "Energy Cost",
    energyCostDesc: "Calculate energy consumption based on power and print time",
    totalCost: "Total Cost",
    totalCostDesc: "Sum of all cost components including optional markup",
    
    // Download
    downloadTitle: "Download WAB Print Calculator",
    downloadSubtitle: "Get started with accurate 3D printing cost estimation",
    latestRelease: "Latest Release",
    downloadNow: "Download",
    noReleases: "Coming Soon",
    noReleasesDesc: "We are working on the first release. Check back soon!",
    comingSoon: "Coming Soon",
    version: "Version",
    
    // Footer
    copyright: "WAB Print Calculator",
    allRightsReserved: "All Rights Reserved",
    madeWith: "Made with",
    
    // Theme
    lightMode: "Light",
    darkMode: "Dark",
    language: "Language",
  },
  zh: {
    // Header
    features: "功能",
    download: "下载",
    github: "GitHub",
    
    // Hero
    heroTitle: "WAB 打印计算器",
    heroSubtitle: "3D 打印精准成本估算",
    heroDescription: "精确计算您的 3D 打印成本。通过我们强大的桌面应用程序追踪材料用量、能耗和总打印成本。",
    getStarted: "立即下载",
    viewOnGitHub: "在 GitHub 查看",
    dotnet: ".NET",
    avaloniaUI: "Avalonia UI",
    crossPlatform: "跨平台",
    
    // Features
    featuresTitle: "强大功能",
    featuresSubtitle: "精确计算和管理 3D 打印成本所需的一切",
    precisionTitle: "精准成本计算",
    precisionDesc: "使用可自定义的公式和参数，高精度计算材料和能源成本。",
    materialTitle: "材料配置管理",
    materialDesc: "创建和管理多个材料配置，支持不同的成本、密度和属性。",
    energyTitle: "能耗追踪",
    energyDesc: "根据打印时间、功耗和当地电价追踪电力成本。",
    transparentTitle: "成本透明",
    transparentDesc: "查看所有成本的完整明细，包括材料、能源和可选的人工成本。",
    
    // Formula
    formulaTitle: "计算公式",
    formulaSubtitle: "透明准确的成本计算",
    materialCost: "材料成本",
    materialCostDesc: "根据重量和单价计算材料成本",
    energyCost: "能源成本",
    energyCostDesc: "根据功率和打印时间计算能耗",
    totalCost: "总成本",
    totalCostDesc: "所有成本组成的总和，包括可选的加成",
    
    // Download
    downloadTitle: "下载 WAB 打印计算器",
    downloadSubtitle: "开始精确估算 3D 打印成本",
    latestRelease: "最新版本",
    downloadNow: "下载",
    noReleases: "即将推出",
    noReleasesDesc: "我们正在准备第一个版本，敬请期待！",
    comingSoon: "即将推出",
    version: "版本",
    
    // Footer
    copyright: "WAB 打印计算器",
    allRightsReserved: "保留所有权利",
    madeWith: "使用",
    
    // Theme
    lightMode: "浅色",
    darkMode: "深色",
    language: "语言",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "zh")) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
