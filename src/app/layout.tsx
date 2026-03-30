import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s | Assinaturas Corporativas",
    default: "Gerador de Assinaturas Corporativas | Jee Invest",
  },
  description: "Portal Multi-Tenant seguro e Padrão Ouro para padronização e geração de assinaturas de email corporativas. Sistema projetado para alta confiabilidade e compliance.",
  generator: "Next.js",
  applicationName: "Assinaturas Hub",
  referrer: "strict-origin-when-cross-origin",
  keywords: ["Assinatura", "Email", "Corporativo", "Jee Invest", "Multi-Tenant", "Gerador"],
  authors: [{ name: "Jee Invest Dev Team" }],
  creator: "Jee Invest Softwares",
  publisher: "Jee Invest BR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/assets/icone.svg",
    apple: "/assets/icone.svg",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Portal Assinaturas Jee",
    title: "Portal de Identidade Corporativa",
    description: "Gerador padrão Padrão Ouro de assinaturas de email Multi-Tenant",
    url: "https://assinaturas.jee.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal de Assinaturas | Jee Invest",
    description: "Sistema Multi-tenant para geração padronizada de assinaturas.",
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
