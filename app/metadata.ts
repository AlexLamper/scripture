import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scripture ",
  description: "Explore the Bible interactively with Scripture. Discover Bible teachings through an engaging and gamified learning experience.",
  authors: [
    {
      name: "Alex Lamper",
      url: "scripture-one.vercel.app",
    },
  ],
  keywords: ["Bible", "Bible study", "interactive learning", "gamified Bible experience", "Scripture"],
  openGraph: {
    title: "Scripture",
    description: "Explore the Bible interactively with Scripture. Discover Bible teachings through an engaging and gamified learning experience.",
    url: "scripture-one.vercel.app",
    siteName: "Scripture",
    images: [
      {
        url: "scripture-one.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scripture OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@scripture", 
    creator: "@scripture",
    title: "Scripture",
    description: "Explore the Bible interactively with Scripture. Discover Bible teachings through an engaging and gamified learning experience.",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  themeColor: "#855940",
  appleWebApp: {
    title: "Scripture",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  manifest: "/site.webmanifest",
};