import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecureSight - CCTV Monitoring Dashboard',
  description: 'Advanced CCTV monitoring with computer vision threat detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#111] text-white min-h-screen`}>
        <Navbar />
        <main className="px-4 py-4">
        {children}
        </main>
      </body>
    </html>
  );
}
