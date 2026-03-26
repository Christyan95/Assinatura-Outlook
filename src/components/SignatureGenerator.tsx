"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Copy, Settings, Check, LayoutDashboard, Leaf, Sprout, Building2 } from "lucide-react";
import clsx from "clsx";
import { BrandConfig } from "@/config/companies";

const IconMap = {
    LayoutDashboard,
    Leaf,
    Sprout,
    Building2
};

interface SignatureGeneratorProps {
    config: BrandConfig;
}

/**
 * SignatureGenerator - A centralized component to handle multi-tenant signature generation.
 * This ensures security (validation), responsiveness, and easy maintenance.
 */
export default function SignatureGenerator({ config }: SignatureGeneratorProps) {
    // Form State
    const [formData, setFormData] = useState({
        saudacao: "Atenciosamente,",
        nome: "",
        cargo: "",
        unidade: "",
        celular: ""
    });

    const [copied, setCopied] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");
    const signatureRef = useRef<HTMLDivElement>(null);

    // Get base URL for absolute image paths in signature
    useEffect(() => {
        if (typeof window !== "undefined") {
            const origin = process.env.NEXT_PUBLIC_ASSET_URL || window.location.origin;
            setBaseUrl(origin);
        }
    }, []);

    // Initial default values for preview ONLY (not inputs)
    const defaults = {
        nome: "Seu Nome",
        cargo: "SEU CARGO AQUI",
        celular: "(00) 0 0000-0000"
    };

    /**
     * Handles phone masking for (XX) X XXXX-XXXX
     */
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, "");
        
        // Apply DDD
        if (v.length > 0) {
            v = v.replace(/^(\d{2})/, "($1) ");
        }

        // Apply hyphen based on length (11 digits = mobile, 10 = landline)
        const rawDigits = e.target.value.replace(/\D/g, "");
        if (rawDigits.length > 2) {
            const body = rawDigits.substring(2);
            if (body.length > 4) {
                if (body.length <= 8) {
                    // (XX) XXXX-XXXX
                    v = v.substring(0, 5) + body.substring(0, 4) + "-" + body.substring(4, 8);
                } else {
                    // (XX) X XXXX-XXXX
                    v = v.substring(0, 5) + body.substring(0, 1) + " " + body.substring(1, 5) + "-" + body.substring(5, 9);
                }
            }
        }
        
        setFormData(prev => ({ 
            ...prev, 
            celular: v.substring(0, 16) 
        }));
    };

    /**
     * Copy the rendered HTML signature to clipboard
     * Using the Range/Selection method as it is consistently better for Outlook's 
     * specific rich-text rendering engine.
     */
    const copyToClipboard = () => {
        if (!signatureRef.current) return;

        try {
            const range = document.createRange();
            range.selectNodeContents(signatureRef.current);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                selection.removeAllRanges();
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            }
        } catch (err) {
            console.error("Erro ao copiar assinatura:", err);
        }
    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 relative font-sans text-white overflow-x-hidden">
            {/* Dynamic Brand Background */}
            <div className="fixed inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700" 
                    style={{ backgroundImage: `url('${config.background}')` }}
                />
                <div className={clsx("absolute inset-0 backdrop-blur-[4px] transition-colors duration-700", config.overlayColor)} />
            </div>

            <main className="relative z-10 w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start lg:items-center py-10">

                {/* --- Controls Section --- */}
                <div className="bg-black/30 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-4 ring-1 ring-white/10 animate-fade-in">
                    <div className="text-center pb-3 border-b border-white/10 mb-2">
                        {(() => {
                            const Icon = IconMap[config.brandIcon];
                            return (
                                <h1 className={clsx("text-xl font-bold flex items-center justify-center gap-2 drop-shadow-md", config.textColor)}>
                                    <Icon size={24} /> Gerador de Assinaturas
                                </h1>
                            );
                        })()}
                        <p className={clsx("mt-1 text-[10px] font-medium opacity-80 uppercase tracking-[0.2em]", config.accentColor)}>
                            {config.name}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <InputField 
                            label="Saudação Inicial" 
                            accentColor={config.accentColor} 
                            themeColor={config.themeColor}
                        >
                            <select
                                value={formData.saudacao}
                                onChange={(e) => updateField("saudacao", e.target.value)}
                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:ring-1 transition-all text-white appearance-none [color-scheme:dark]"
                                style={{ borderColor: `${config.themeColor}40` }}
                            >
                                <option value="Atenciosamente," className="bg-zinc-900 text-white">Atenciosamente,</option>
                                <option value="Cordialmente," className="bg-zinc-900 text-white">Cordialmente,</option>
                                <option value="Um abraço," className="bg-zinc-900 text-white">Um abraço,</option>
                                <option value="" className="bg-zinc-900 text-white">Nenhuma</option>
                            </select>
                        </InputField>

                        <InputField label="Nome Completo" accentColor={config.accentColor} themeColor={config.themeColor}>
                            <input
                                type="text"
                                value={formData.nome}
                                onChange={(e) => updateField("nome", e.target.value.substring(0, 50))}
                                placeholder="Ex: Ana Souza"
                                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-sm outline-none transition-all text-white placeholder:text-white/20"
                                style={{ borderColor: `${config.themeColor}40` }}
                            />
                        </InputField>

                        <InputField label="Cargo / Função" accentColor={config.accentColor} themeColor={config.themeColor}>
                            <input
                                type="text"
                                value={formData.cargo}
                                onChange={(e) => updateField("cargo", e.target.value.substring(0, 60))}
                                placeholder="Ex: Executivo Comercial"
                                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-sm outline-none transition-all text-white placeholder:text-white/20"
                                style={{ borderColor: `${config.themeColor}40` }}
                            />
                        </InputField>

                        <InputField label="Unidade / Setor" accentColor={config.accentColor} themeColor={config.themeColor}>
                            <select
                                value={formData.unidade}
                                onChange={(e) => updateField("unidade", e.target.value)}
                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-sm outline-none transition-all text-white [color-scheme:dark]"
                                style={{ borderColor: `${config.themeColor}40` }}
                            >
                                <option value="" className="bg-zinc-900 text-white">-- Opcional --</option>
                                {config.unidades.map(u => (
                                    <option key={u} value={u} className="bg-zinc-900 text-white">{u}</option>
                                ))}
                            </select>
                        </InputField>

                        <InputField label="WhatsApp / Celular" accentColor={config.accentColor} themeColor={config.themeColor}>
                            <input
                                type="text"
                                value={formData.celular}
                                onChange={handlePhoneChange}
                                placeholder="(00) 0 0000-0000"
                                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-sm outline-none transition-all text-white placeholder:text-white/20"
                                maxLength={16}
                                style={{ borderColor: `${config.themeColor}40` }}
                            />
                        </InputField>
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="mt-4 w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-white font-bold uppercase tracking-wide text-xs shadow-lg active:scale-95 transition-all hover:brightness-110"
                        style={{ backgroundColor: config.themeColor }}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? "Copiado!" : "Copiar Assinatura"}
                    </button>

                    <a
                        href="https://outlook.office.com/mail/options/accounts-category/signatures-subcategory"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wide text-xs hover:-translate-y-[1px] transition-all"
                    >
                        <Settings size={18} />
                        Configurar no Outlook
                    </a>
                </div>

                {/* --- Preview Section --- */}
                <div className="flex flex-col gap-4 h-full justify-center items-center lg:items-start">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl w-fit relative overflow-hidden ring-1 ring-black/5">
                        {/* Decorative glow */}
                        <div 
                            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none" 
                            style={{ background: config.themeColor }}
                        />

                        <div ref={signatureRef} className="relative z-10">
                            {/* --- HTML SIGNATURE START --- */}
                            {formData.saudacao && (
                                <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: "14px", color: "#666", marginBottom: "16px" }}>
                                    {formData.saudacao}
                                </div>
                            )}
                            <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: "#333", lineHeight: "1.2", border: "0" }}>
                                <tbody>
                                    <tr>
                                        <td valign="middle" style={{ paddingRight: "25px", borderRight: `2px solid ${config.signatureLineColor}`, textAlign: "center" }}>
                                            <img
                                                src={`${baseUrl}${config.logo}`}
                                                width="120"
                                                style={{ display: "block", width: "120px", margin: "0 auto" }}
                                                alt={`${config.name} Logo`}
                                            />
                                            <div style={{ marginTop: "12px" }}>
                                                <a href={`http://${config.website}`} target="_blank" rel="noopener noreferrer" style={{ color: config.themeColor, textDecoration: "none", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px" }}>
                                                    {config.website}
                                                </a>
                                            </div>
                                        </td>

                                        <td valign="middle" style={{ paddingLeft: "25px" }}>
                                            <div style={{ fontSize: "24px", fontWeight: "800", color: config.signatureTitleColor, letterSpacing: "-0.5px", textTransform: "uppercase" }}>
                                                {formData.nome || defaults.nome}
                                            </div>

                                            <table cellPadding="0" cellSpacing="0" style={{ marginTop: "8px", marginBottom: "12px", border: "0" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ backgroundColor: config.signatureBgColor, color: "#ffffff", padding: "4px 8px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", borderRadius: "4px" }}>
                                                            <span>{(formData.cargo || defaults.cargo).toUpperCase()}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {formData.unidade && (
                                                <div style={{ marginBottom: "8px", fontSize: "11px", color: "#666", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center" }}>
                                                    <span style={{ marginRight: "6px" }}>📍</span> <span>{formData.unidade}</span>
                                                </div>
                                            )}

                                            <div style={{ fontSize: "14px", color: "#444", marginTop: "4px" }}>
                                                <span style={{ fontWeight: "600", color: config.themeColor, marginRight: "6px" }}>📱</span>
                                                <span style={{ fontWeight: "600", color: "#333" }}>{formData.celular || defaults.celular}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* --- HTML SIGNATURE END --- */}
                        </div>
                    </div>
                </div>
            </main>

            {/* Toast Notification */}
            <div className={clsx(
                "fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl border transition-all duration-500 z-50",
                copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
            )}
            style={{ backgroundColor: `${config.themeColor}E6`, borderColor: `${config.themeColor}66` }}
            >
                ✅ Assinatura copiada com sucesso!
            </div>
        </div>
    );
}

/**
 * Helper component for labeled input fields
 */
function InputField({ label, accentColor, themeColor, children }: { label: string, accentColor: string, themeColor: string, children: ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5 group">
            <label className={clsx("text-[10px] uppercase font-bold tracking-wider opacity-60 group-focus-within:opacity-100 transition-opacity", accentColor)}>
                {label}
            </label>
            {children}
        </div>
    );
}
