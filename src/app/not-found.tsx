import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#0A0A0A] p-4 text-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[70%] w-[50%] rounded-[100%] bg-red-500/10 dark:bg-red-900/10 blur-[120px]" />
      </div>
      
      <div className="relative z-10 max-w-md w-full">
        <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-800">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-white">
          Página não encontrada
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Oops! A unidade de negócio ou recurso solicitado não pôde ser localizado em nossa rede corporativa.
        </p>
        
        <Link 
          href="/"
          className="mt-8 group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
        >
          <Home size={18} className="transition-transform group-hover:-translate-y-0.5" />
          Voltar ao Hub Central
        </Link>
      </div>
      
      <footer className="absolute bottom-6 w-full text-center text-xs text-zinc-500 dark:text-zinc-600 font-light tracking-wider">
        <p>Portal de Identidade Corporativa &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
