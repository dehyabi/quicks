import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Quicks | Task & Team Communication',
    template: '%s | Quicks'
  },
  description: 'Streamline your workflow with Quicks - A modern task management and team communication platform. Organize tasks, collaborate with your team, and stay productive with real-time chat and project tracking.',
  keywords: [
    'task management',
    'team communication',
    'chat app',
    'collaboration',
    'productivity',
    'project management',
    'task tracker',
    'team chat',
    'real-time messaging',
    'workplace collaboration'
  ],
  icons: {
    icon: '/favicon.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
