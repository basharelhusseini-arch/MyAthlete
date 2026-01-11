import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: {
    default: "MyAthlete - All-in-One Fitness Platform",
    template: "%s | MyAthlete",
  },
  description: "Uniting client management, AI-powered workouts, and AI-driven nutrition planning in one comprehensive platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
