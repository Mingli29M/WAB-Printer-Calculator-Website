"use client"

import { Button } from "@/components/ui/button"
import { Download, Monitor, Apple, FileCode } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import type { GitHubRelease } from "@/app/api/releases/route"

interface DownloadSectionProps {
  releases: GitHubRelease[]
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function getAssetIcon(name: string) {
  if (name.includes("win") || name.endsWith(".exe") || name.endsWith(".msi")) {
    return Monitor
  }
  if (name.includes("mac") || name.includes("osx") || name.endsWith(".dmg")) {
    return Apple
  }
  return FileCode
}

function getAssetLabel(name: string, language: string) {
  if (name.includes("win") || name.endsWith(".exe") || name.endsWith(".msi")) {
    return "Windows"
  }
  if (name.includes("mac") || name.includes("osx") || name.endsWith(".dmg")) {
    return "macOS"
  }
  if (name.includes("linux") || name.endsWith(".AppImage") || name.endsWith(".deb")) {
    return "Linux"
  }
  return name
}

export function DownloadSection({ releases }: DownloadSectionProps) {
  const { t, language } = useLanguage()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (releases.length === 0) {
    return (
      <section id="download" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.downloadTitle}
          </h2>
          <div className="p-12 rounded-2xl border border-border bg-card/50">
            <p className="text-muted-foreground text-lg mb-6">
              {t.noReleasesDesc}
            </p>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/Mingli29M/WAB-Print-Calculator"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "zh" ? "在 GitHub 上关注此项目" : "Follow this project on GitHub"}
              </a>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const latestRelease = releases[0]

  return (
    <section id="download" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.downloadTitle}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.downloadSubtitle}
          </p>
        </div>

        {/* Latest Release */}
        <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {latestRelease.name || latestRelease.tag_name}
                </h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {t.latestRelease}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "zh" ? "发布于" : "Released on"} {formatDate(latestRelease.published_at)}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a
                href={latestRelease.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "zh" ? "查看发布说明" : "View Release Notes"}
              </a>
            </Button>
          </div>

          {latestRelease.assets.length > 0 ? (
            <div className="grid gap-4">
              {latestRelease.assets.map((asset) => {
                const Icon = getAssetIcon(asset.name)
                return (
                  <a
                    key={asset.id}
                    href={asset.browser_download_url}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-card transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {getAssetLabel(asset.name, language)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {asset.name} · {formatBytes(asset.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground hidden sm:block">
                        {asset.download_count} {language === "zh" ? "次下载" : "downloads"}
                      </span>
                      <Download className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              {language === "zh" ? "此版本暂无可下载文件" : "No downloadable files for this release"}
            </p>
          )}
        </div>

        {/* Older Releases */}
        {releases.length > 1 && (
          <div className="text-center">
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/Mingli29M/WAB-Print-Calculator/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "zh" ? "查看所有历史版本" : "View all releases"}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
