import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import NavBar from './Navbar';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';

const montserratFont = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserratFont.variable} antialiased bg-[#F1F5F9] h-screen flex flex-col`}
      >
        <Providers>
          <NavBar />
          <div className="flex-grow">{children}</div>
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
