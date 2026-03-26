"use client";

import { CompanyCard } from "@/components/CompanyCard";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { companies } from "@/config/companies";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden transition-colors duration-300">

      {/* Theme Toggle Button */}
      {mounted && (
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="absolute top-6 right-6 lg:top-8 lg:right-10 z-50 p-3 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:scale-110 active:scale-95 transition-all outline-none"
          title="Alternar Tema"
        >
          {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}

      {/* Background Ambience - Responsive Light/Dark */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[70%] w-[50%] rounded-[100%] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[70%] w-[50%] rounded-[100%] bg-emerald-500/10 dark:bg-emerald-900/10 blur-[120px] animate-pulse-slow delay-1000" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 lg:px-8 py-20 flex flex-col items-center justify-center">
        {/* Cabeçalho */}
        <div className="mx-auto max-w-4xl text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-black/5 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02] backdrop-blur-sm shadow-inner transition-colors duration-300">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Portal de Identidade Corporativa</span>
          </div>
          <h1 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-white md:text-6xl lg:text-7xl text-center">
            Gerador de <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-zinc-800 dark:from-zinc-200 dark:via-white dark:to-zinc-400">Assinaturas</span>
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-light max-w-3xl mx-auto">
            Selecione a unidade de negócio desejada para criar, configurar e padronizar sua assinatura de email corporativo de forma rápida e eficiente.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 items-stretch justify-items-center">
          {companies.map((company, index) => (
            <div key={company.slug} className="w-full h-full min-h-[400px]">
              <CompanyCard company={company} index={index} />
            </div>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center text-xs text-zinc-500 dark:text-zinc-600 font-light tracking-wider">
        <p>
          &copy; {new Date().getFullYear()} Jee Invest BR. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
