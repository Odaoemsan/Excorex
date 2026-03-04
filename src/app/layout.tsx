import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: '🎁 هدية 200 USDT - مستخدمي Excorx',
  description: 'عرض خاص وحصري لمستخدمي منصة Excorx النشطين',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
