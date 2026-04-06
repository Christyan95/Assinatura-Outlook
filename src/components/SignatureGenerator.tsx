"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Copy, Settings, Check, AlertCircle, LayoutDashboard, Leaf, Sprout, Building2 } from "lucide-react";
import cn from "@/utils/classnames";
import { sanitizeName, sanitizePosition, formatPhone, sanitizePhone } from "@/utils/sanitizer";
import { validateForm, ValidationResult } from "@/utils/validation";
import { CONSTANTS } from "@/utils/constants";
import type { BrandConfig } from "@/config/companies";
import type { SignatureFormData, ToastState } from "@/types";

interface SignatureGeneratorProps {
    config: BrandConfig;
}

const IconMap: Record<string, React.ComponentType<{ size: number }>> = {
    LayoutDashboard,
    Leaf,
    Sprout,
    Building2
};

/**
 * SignatureGenerator - A centralized component to handle multi-tenant signature generation.
 * This ensures security (validation), responsiveness, and easy maintenance.
 */
export default function SignatureGenerator({ config }: SignatureGeneratorProps) {
    // Form State
    const [formData, setFormData] = useState<SignatureFormData>({
        saudacao: "Atenciosamente,",
        nome: "",
        cargo: "",
        unidade: "",
        celular: ""
    });

    const [copied, setCopied] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");
    const [formError, setFormError] = useState<ValidationResult | null>(null);
    const [toastState, setToastState] = useState<ToastState>({
        visible: false,
        message: "",
        type: "success"
    });
    const signatureRef = useRef<HTMLDivElement>(null);
    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Get base URL for absolute image paths in signature
    useEffect(() => {
        if (typeof window !== "undefined") {
            const origin = process.env.NEXT_PUBLIC_ASSET_URL || window.location.origin;
            setBaseUrl(origin);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }
        };
    }, []);

    // Initial default values for preview ONLY (not inputs)
    const defaults = {
        nome: "Seu Nome",
        cargo: "SEU CARGO AQUI",
        celular: "(00) 0 0000-0000"
    };

    /**
     * Handles phone input with proper masking
     * Allows partial input while typing
     */
    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const cleanDigits = sanitizePhone(input);
        
        if (!cleanDigits) {
            setFormData(prev => ({ ...prev, celular: "" }));
            return;
        }

        // Try to format if we have enough digits (8-11), otherwise show raw
        if (cleanDigits.length >= 8) {
            const formatted = formatPhone(cleanDigits);
            setFormData(prev => ({ 
                ...prev, 
                celular: formatted || cleanDigits
            }));
        } else {
            // Show partial input as user types (less than 8 digits)
            setFormData(prev => ({ 
                ...prev, 
                celular: cleanDigits
            }));
        }
    }, []);

    /**
     * Handles name input with sanitization
     */
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = sanitizeName(e.target.value);
        setFormData(prev => ({ ...prev, nome: sanitized }));
        setFormError(null);
    }, []);

    /**
     * Handles position input with sanitization
     */
    const handlePositionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = sanitizePosition(e.target.value);
        setFormData(prev => ({ ...prev, cargo: sanitized }));
        setFormError(null);
    }, []);

    /**
     * Validates form before copy
     */
    const validateAndShowError = (): boolean => {
        const validation = validateForm(formData);
        if (!validation.isValid) {
            setFormError(validation);
            showToast(validation.error || CONSTANTS.ERROR_MESSAGES.FORM_INCOMPLETE, "error");
            return false;
        }
        setFormError(null);
        return true;
    };

    /**
     * Shows toast notification
     */
    const showToast = useCallback((message: string, type: ToastState['type'] = 'success') => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }

        setToastState({
            visible: true,
            message,
            type
        });

        toastTimeoutRef.current = setTimeout(() => {
            setToastState(prev => ({ ...prev, visible: false }));
        }, CONSTANTS.COPY_TOAST_DURATION);
    }, []);

    /**
     * Copy the rendered HTML signature to clipboard
     * Using Range/Selection API for better Outlook compatibility
     */
    const copyToClipboard = useCallback(async () => {
        if (!validateAndShowError()) {
            return;
        }

        if (!signatureRef.current) {
            showToast(CONSTANTS.ERROR_MESSAGES.COPY_ERROR, "error");
            return;
        }

        try {
            const range = document.createRange();
            range.selectNodeContents(signatureRef.current);
            const selection = window.getSelection();

            if (!selection) {
                throw new Error('Selection API not available');
            }

            selection.removeAllRanges();
            selection.addRange(range);

            const successful = document.execCommand("copy");
            selection.removeAllRanges();

            if (successful) {
                setCopied(true);
                showToast(CONSTANTS.TOAST_MESSAGES.COPY_SUCCESS);
                
                setTimeout(() => setCopied(false), CONSTANTS.COPY_TOAST_DURATION);
            } else {
                throw new Error('execCommand failed');
            }
        } catch (err) {
            console.error("Erro ao copiar assinatura:", err);
            showToast(CONSTANTS.ERROR_MESSAGES.COPY_ERROR, "error");
        }
    }, [formData, showToast]);

    const updateField = useCallback((field: keyof SignatureFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 relative font-sans text-white overflow-x-hidden">
            {/* Dynamic Brand Background */}
            <div className="fixed inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700" 
                    style={{ backgroundImage: `url('${config.background}')` }}
                />
                <div className={cn("absolute inset-0 backdrop-blur-[4px] transition-colors duration-700", config.overlayColor)} />
            </div>

            <main className="relative z-10 w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start lg:items-center py-10">

                {/* --- Controls Section --- */}
                <div className="bg-black/30 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-4 ring-1 ring-white/10 animate-fade-in">
                    <div className="text-center pb-3 border-b border-white/10 mb-2">
                        {(() => {
                            const Icon = IconMap[config.brandIcon as keyof typeof IconMap];
                            return (
                                <h1 className={cn("text-xl font-bold flex items-center justify-center gap-2 drop-shadow-md", config.textColor)}>
                                    {Icon && <Icon size={24} />} Gerador de Assinaturas
                                </h1>
                            );
                        })()}
                        <p className={cn("mt-1 text-[10px] font-medium opacity-80 uppercase tracking-[0.2em]", config.accentColor)}>
                            {config.name}
                        </p>
                    </div>

                    {/* Error Display */}
                    {formError && formError.error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-xs">
                            <AlertCircle size={16} className="flex-shrink-0" />
                            <span>{formError.error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <InputField 
                            label="Saudação Inicial" 
                            accentColor={config.accentColor}
                        >
                            <select
                                value={formData.saudacao}
                                onChange={(e) => updateField("saudacao", e.target.value)}
                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:ring-1 transition-all text-white appearance-none [color-scheme:dark]"
                                style={{ borderColor: `${config.themeColor}40` }}
                                aria-label="Saudação inicial"
                            >
                                <option value="Atenciosamente," className="bg-zinc-900 text-white">Atenciosamente,</option>
                                <option value="Cordialmente," className="bg-zinc-900 text-white">Cordialmente,</option>
                                <option value="Um abraço," className="bg-zinc-900 text-white">Um abraço,</option>
                                <option value="" className="bg-zinc-900 text-white">Nenhuma</option>
                            </select>
                        </InputField>

                        <InputField 
                            label="Nome Completo *" 
                            accentColor={config.accentColor}
                            currentLength={formData.nome.length}
                            maxLength={CONSTANTS.INPUT_CONSTRAINTS.NOME_MAX}
                        >
                            <input
                                type="text"
                                value={formData.nome}
                                onChange={handleNameChange}
                                placeholder="Ex: Ana Souza"
                                className={cn(
                                    "w-full p-3 bg-black/20 border rounded-xl text-sm outline-none transition-all text-white placeholder:text-white/20",
                                    formError?.error ? "border-red-500/50" : "border-white/10"
                                )}
                                style={{ borderColor: formError?.error ? undefined : `${config.themeColor}40` }}
                                aria-label="Nome completo"
                                maxLength={CONSTANTS.INPUT_CONSTRAINTS.NOME_MAX}
                                required
                            />
                        </InputField>

                        <InputField 
                            label="Cargo / Função *" 
                            accentColor={config.accentColor}
                            currentLength={formData.cargo.length}
                            maxLength={CONSTANTS.INPUT_CONSTRAINTS.CARGO_MAX}
                        >
                            <input
                                type="text"
                                value={formData.cargo}
                                onChange={handlePositionChange}
                                placeholder="Ex: Executivo Comercial"
                                className={cn(
                                    "w-full p-3 bg-black/20 border rounded-xl text-sm outline-none transition-all text-white placeholder:text-white/20",
                                    formError?.error ? "border-red-500/50" : "border-white/10"
                                )}
                                style={{ borderColor: formError?.error ? undefined : `${config.themeColor}40` }}
                                aria-label="Cargo ou função"
                                maxLength={CONSTANTS.INPUT_CONSTRAINTS.CARGO_MAX}
                                required
                            />
                        </InputField>

                        <InputField label="Unidade / Setor" accentColor={config.accentColor}>
                            <select
                                value={formData.unidade}
                                onChange={(e) => updateField("unidade", e.target.value)}
                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-sm outline-none transition-all text-white [color-scheme:dark]"
                                style={{ borderColor: `${config.themeColor}40` }}
                                aria-label="Unidade ou setor"
                            >
                                <option value="" className="bg-zinc-900 text-white">-- Opcional --</option>
                                {config.unidades.map(u => (
                                    <option key={u} value={u} className="bg-zinc-900 text-white">{u}</option>
                                ))}
                            </select>
                        </InputField>

                        <InputField 
                            label="WhatsApp / Celular" 
                            accentColor={config.accentColor}
                            currentLength={formData.celular.length}
                            maxLength={CONSTANTS.INPUT_CONSTRAINTS.CELULAR_MAX}
                        >
                            <input
                                type="tel"
                                value={formData.celular}
                                onChange={handlePhoneChange}
                                placeholder="(00) 0 0000-0000"
                                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-sm outline-none transition-all text-white placeholder:text-white/20"
                                maxLength={CONSTANTS.INPUT_CONSTRAINTS.CELULAR_MAX}
                                aria-label="Telefone ou WhatsApp"
                            />
                        </InputField>
                    </div>

                    <button
                        onClick={copyToClipboard}
                        disabled={copied}
                        className={cn(
                            "mt-4 w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-white font-bold uppercase tracking-wide text-xs shadow-lg active:scale-95 transition-all hover:brightness-110 disabled:opacity-75",
                            copied && "cursor-default"
                        )}
                        style={{ backgroundColor: config.themeColor }}
                        aria-label={copied ? "Assinatura copiada" : "Copiar assinatura para clipboard"}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? "Copiado!" : "Copiar Assinatura"}
                    </button>

                    <a
                        href={CONSTANTS.OUTLOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wide text-xs hover:-translate-y-[1px] transition-all"
                        aria-label="Configurar assinatura no Outlook"
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
                                <div style={{ fontFamily: CONSTANTS.SIGNATURE.FONT_FAMILY, fontSize: "14px", color: "#666", marginBottom: "16px" }}>
                                    {formData.saudacao}
                                </div>
                            )}
                            <table cellPadding="0" cellSpacing="0" style={{ fontFamily: CONSTANTS.SIGNATURE.FONT_FAMILY, color: "#333", lineHeight: `${CONSTANTS.SIGNATURE.DEFAULT_LINE_HEIGHT}`, border: "0" }}>
                                <tbody>
                                    <tr>
                                        <td valign="middle" style={{ paddingRight: "25px", borderRight: `2px solid ${config.signatureLineColor}`, textAlign: "center" }}>
                                            <img
                                                src={`${baseUrl}${config.logo}`}
                                                width={CONSTANTS.SIGNATURE.LOGO_WIDTH}
                                                style={{ display: "block", width: `${CONSTANTS.SIGNATURE.LOGO_WIDTH}px`, margin: "0 auto" }}
                                                alt={`${config.name} Logo`}
                                            />
                                            <div style={{ marginTop: "12px" }}>
                                                <a href={`${CONSTANTS.OUTLOOK_PROTOCOL}${config.website}`} target="_blank" rel="noopener noreferrer" style={{ color: config.themeColor, textDecoration: "none", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px" }}>
                                                    {config.website}
                                                </a>
                                            </div>
                                        </td>

                                        <td valign="middle" style={{ paddingLeft: "25px" }}>
                                            <div style={{ fontSize: "24px", fontWeight: "800", color: config.signatureTitleColor, letterSpacing: "-0.5px", textTransform: "uppercase" }}>
                                                {(formData.nome || defaults.nome).toUpperCase()}
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
            <div className={cn(
                "fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl border transition-all duration-500 z-50",
                toastState.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
            )}
            style={{ 
                backgroundColor: toastState.type === "error" ? "rgba(239, 68, 68, 0.9)" : `${config.themeColor}E6`, 
                borderColor: toastState.type === "error" ? "rgba(239, 68, 68, 0.4)" : `${config.themeColor}66` 
            }}
            role="status"
            aria-live="polite"
            >
                {toastState.type === "error" ? <AlertCircle size={16} /> : "✅"}
                {" "}{toastState.message}
            </div>
        </div>
    );
}

/**
 * Helper component for labeled input fields
 */
function InputField({ label, accentColor, currentLength, maxLength, children }: { 
    label: string; 
    accentColor: string; 
    currentLength?: number;
    maxLength?: number;
    children: React.ReactNode 
}) {
    return (
        <div className="flex flex-col gap-1.5 group">
            <div className="flex justify-between items-end">
                <label className={cn("text-[10px] uppercase font-bold tracking-wider opacity-60 group-focus-within:opacity-100 transition-opacity", accentColor)}>
                    {label}
                </label>
                {maxLength !== undefined && currentLength !== undefined && (
                    <span className="text-[9px] font-mono text-white/40 group-focus-within:text-white/70 transition-colors">
                        {currentLength} / {maxLength}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}
