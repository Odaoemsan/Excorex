import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'مشروع جديد',
  description: 'موقع قيد الإنشاء',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
