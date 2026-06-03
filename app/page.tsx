"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FormulaSection } from "@/components/formula-section"
import { DownloadSection } from "@/components/download-section"
import { Footer } from "@/components/footer"
import type { GitHubRelease } from "@/app/api/releases/route"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {
  const { data: releases = [], isLoading } = useSWR<GitHubRelease[]>(
    "/api/releases",
    fetcher,
    { 
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  const hasReleases = releases.length > 0
  const latestVersion = hasReleases ? releases[0].name || releases[0].tag_name : undefined

  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection hasReleases={hasReleases} latestVersion={latestVersion} />
        <FeaturesSection />
        <FormulaSection />
        <DownloadSection releases={releases} />
      </main>
      <Footer />
    </>
  )
}
