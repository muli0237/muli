import type React from "react"
import type { Metadata } from "next"
import { Oxanium, Inter } from "next/font/google"
import { Suspense } from "react"
import { CursorProvider } from "@/components/cursor-provider"
import { MotionProvider } from "@/components/motion-context"
import "@fontsource/oxanium/400.css"
import "@fontsource/oxanium/600.css"
import "@fontsource/oxanium/700.css"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
})

export const metadata: Metadata = {
  title: "Joshua Muli | Full-Stack Engineer & Security Researcher",
  description:
    "Portfolio of Joshua Muli, a full-stack engineer building resilient web products, distributed systems, and thoughtful digital experiences.",
  keywords: [
    "Joshua Muli",
    "full-stack developer",
    "security researcher",
    "cybersecurity",
    "DevOps",
    "distributed systems",
    "Kubernetes",
    "Go",
    "Next.js",
    "TypeScript",
    "Three.js portfolio",
  ],
  authors: [{ name: "Joshua Muli" }],
  creator: "Joshua Muli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joshua-muli.dev",
    title: "Joshua Muli | Full-Stack Engineer & Security Researcher",
    description:
      "Portfolio of Joshua Muli, a full-stack engineer building resilient web products, distributed systems, and thoughtful digital experiences.",
    siteName: "Joshua Muli Portfolio",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${oxanium.variable} ${inter.variable} bg-[#05070a] text-[#e5e7eb] antialiased selection:bg-[#00f0ff] selection:text-[#0b1020]`}>
        <MotionProvider>
          <CursorProvider enabled={true} color="#00f0ff" size={20} trailLength={14} particleCount={4}>
            <Suspense fallback={null}>{children}</Suspense>
          </CursorProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
