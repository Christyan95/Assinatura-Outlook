"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import cn from "@/utils/classnames";
import type { BrandConfig } from "@/config/companies";
import { CONSTANTS } from "@/utils/constants";

interface CompanyCardProps {
    company: BrandConfig;
    index: number;
}

export function CompanyCard({ company, index }: CompanyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: CONSTANTS.ANIMATION_DELAYS.FADE_DURATION,
                delay: index * CONSTANTS.ANIMATION_DELAYS.CARD_STAGGER,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="h-full w-full"
        >
            <Link href={`/${company.slug}`} className="block h-full cursor-pointer group relative">
                <motion.div
                    whileHover={{ y: -CONSTANTS.ANIMATION_DELAYS.HOVER_Y_OFFSET }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                        "relative h-full w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-[#111111]/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-xl p-8 transition-colors duration-500",
                        "hover:border-black/10 dark:hover:border-white/10 hover:bg-white dark:hover:bg-[#151515] flex flex-col justify-between"
                    )}
                >
                    {/* Soft Hover Glow specific to the brand color */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                            background: `radial-gradient(800px circle at 50% 0%, ${company.themeColor}15, transparent 50%)`
                        }}
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="relative z-20 mb-8 w-full flex justify-center"
                        >
                            <div className="relative w-56 h-32 md:w-64 md:h-36">
                                {/* Aura preta suave no Light Mode, aura branca no Dark Mode */}
                                <div className="absolute inset-0 bg-black/25 dark:bg-white/60 blur-2xl rounded-full scale-110 pointer-events-none transition-all duration-500" />
                                <Image
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    fill
                                    className={cn(
                                        "object-contain drop-shadow-xl p-2 relative z-10 transition-all duration-300",
                                        company.id === 'jee' && "brightness-0 dark:invert"
                                    )}
                                />
                            </div>
                        </motion.div>

                        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light tracking-wide leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors duration-300">
                            {company.description}
                        </p>
                    </div>

                    <div className="relative z-10 mt-6 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-center transform group-hover:border-black/10 dark:group-hover:border-white/10 transition-colors duration-500">
                        <span
                            className={cn(
                                "text-xs font-semibold uppercase tracking-widest transition-colors duration-300",
                                company.id === 'jee' && "text-black dark:text-white"
                            )}
                            style={{ color: company.id !== 'jee' ? company.themeColor : undefined }}
                        >
                            Acessar Gerador
                        </span>
                        <svg 
                            className={cn(
                                "w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300",
                                company.id === 'jee' && "text-black dark:text-white"
                            )} 
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                            style={{ color: company.id !== 'jee' ? company.themeColor : undefined }}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Gradient Border Base highlight */}
                    <div
                        className={cn(
                            "absolute bottom-0 left-0 w-full h-[3px] opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-500",
                            company.id === 'jee' && "text-black dark:text-white"
                        )}
                        style={{ 
                            background: company.id === 'jee'
                                ? `linear-gradient(90deg, transparent, currentColor, transparent)`
                                : `linear-gradient(90deg, transparent, ${company.themeColor}, transparent)` 
                        }}
                    />
                </motion.div>
            </Link>
        </motion.div>
    );
}
