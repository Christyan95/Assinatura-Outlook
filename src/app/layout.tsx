import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal de Assinaturas Corporativas",
  description: "Gerador padrão de assinaturas de email Multi-Tenant",
  icons: {
    icon: "/assets/icone.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-zinc-300 dark:selection:bg-zinc-800 text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-[#0A0A0A] transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
