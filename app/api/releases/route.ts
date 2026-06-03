import { NextResponse } from "next/server"

export interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  body: string
  published_at: string
  html_url: string
  assets: {
    id: number
    name: string
    browser_download_url: string
    size: number
    download_count: number
  }[]
}

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Mingli29M/WAB-Print-Calculator/releases",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      // Return empty array if no releases found
      if (response.status === 404) {
        return NextResponse.json([])
      }
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const releases: GitHubRelease[] = await response.json()
    return NextResponse.json(releases)
  } catch (error) {
    console.error("Error fetching releases:", error)
    return NextResponse.json([])
  }
}
