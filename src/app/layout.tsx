import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { getSession } from "@/utils/auth"
import Image from 'next/image'
import svgLogo from '../../public/Logo.svg'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const montserratFont = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await getSession()
  console.log("session", session)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserratFont.variable} antialiased bg-[#F1F5F9] h-screen flex flex-col`}
      >
        <div className="h-16 bg-white py-3 px-4 flex justify-between items-center">
          <Image src={svgLogo} alt="logo" />

          <div className="flex items-center gap-4">
            <p className="font-montserrat font-medium text-muted-foreground text-sm">Welcome Nada</p>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://picsum.photos/200" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Providers session={session}>
          <div className="flex-grow">

            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
