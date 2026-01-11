import type { Metadata } from "next";
import "./globals.css";
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: "MyAthlete - Fitness Management System",
  description: "Comprehensive CRM tool for gyms and fitness centers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
