import { z } from 'zod';

/**
 * Validação Padrão Ouro (Zod Schema) para a configuração de marcas corporativas.
 * Isso garante proteção contra vazamento de atributos, injeções, erros de schema (no caso da lista advir de API).
 */
export const BrandConfigSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  name: z.string().min(2, "Nome deve possuir pelo menos 2 caracteres"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug deve ser kebab-case, seguro para URL"),
  description: z.string(),
  themeColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Cor de tema deve ser Hexadecimal"),
  textColor: z.string(),
  accentColor: z.string(),
  signatureLineColor: z.string(),
  signatureBgColor: z.string(),
  signatureTitleColor: z.string(),
  logo: z.string().startsWith("/", "Logo deve ser um caminho absoluto interno"),
  background: z.string(),
  overlayColor: z.string(),
  website: z.string().url("Website deve ser uma URL válida").or(z.string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Domínio inválido")),
  unidades: z.array(z.string()),
  brandIcon: z.enum(["LayoutDashboard", "Sprout", "Leaf", "Building2"]),
});

/**
 * Interface definition inferida via Zod (Proteção Avançada Estrita).
 * Must be a plain object (serializable) for RSC to Client handoff.
 */
export type BrandConfig = z.infer<typeof BrandConfigSchema>;

/**
 * Centralized list of supported companies
 */
export const companies: BrandConfig[] = [
    {
        id: "tivor",
        slug: "tivor",
        name: "Tivor",
        description: "Soluções contábeis e conectividade estratégica para impulsionar o seu negócio com segurança e inovação.",
        themeColor: "#054bbd",
        textColor: "text-[#054bbd]",
        accentColor: "text-blue-400",
        signatureLineColor: "#054bbd",
        signatureBgColor: "#054bbd",
        signatureTitleColor: "#054bbd",
        logo: "/assets/tivor-logo.png",
        background: "/assets/tivor-fundo.png",
        overlayColor: "bg-blue-950/80",
        website: "www.tivor.agr.br",
        unidades: ["Centro de Soluções Corporativas - CSC"],
        brandIcon: "LayoutDashboard"
    },
    {
        id: "hortsoy",
        slug: "hortsoy",
        name: "HortSoy",
        description: "Cultivando o futuro do agronegócio através de inovação, tecnologia e excelência.",
        themeColor: "#15803d",
        textColor: "text-[#15803d]",
        accentColor: "text-emerald-400",
        signatureLineColor: "#15803d",
        signatureBgColor: "#15803d",
        signatureTitleColor: "#15803d",
        logo: "/assets/hortsoy-logo.png",
        background: "/assets/hortsoy-fundo.png",
        overlayColor: "bg-emerald-950/80",
        website: "www.hortsoy.com.br",
        unidades: [
            "Santa Juliana - MG",
            "Patrocínio - MG",
            "Ibiá - MG",
            "Araxá - MG",
            "São Gotardo - MG",
            "Iraí de Minas - MG",
            "Patos de Minas - MG",
            "Coromandel - MG",
            "Uberaba - MG",
            "Passos - MG",
            "Carmo Rio Claro - MG",
            "Piumhi - MG",
            "Bambuí - MG",
            "Conceição das Alagoas - MG",
            "Sacramento - MG",
            "Centro de Soluções Corporativas - CSC"
        ],
        brandIcon: "Sprout"
    },
    {
        id: "cleanfarm",
        slug: "cleanfarm",
        name: "CleanFarm",
        description: "Tecnologia verde e inteligência operacional para a agricultura sustentável e de precisão.",
        themeColor: "#059669",
        textColor: "text-[#059669]",
        accentColor: "text-green-400",
        signatureLineColor: "#059669",
        signatureBgColor: "#059669",
        signatureTitleColor: "#059669",
        logo: "/assets/cleanfarm-logo.png",
        background: "/assets/cleanfarm-fundo.png",
        overlayColor: "bg-green-950/80",
        website: "www.cleanfarm.com.br",
        unidades: [],
        brandIcon: "Leaf"
    },
    {
        id: "jee",
        slug: "jee",
        name: "Jee",
        description: "Excelência B2B integrada em tecnologia, contabilidade corporativa e inteligência financeira.",
        themeColor: "#000000",
        textColor: "text-zinc-100",
        accentColor: "text-zinc-400",
        signatureLineColor: "#000000",
        signatureBgColor: "#000000",
        signatureTitleColor: "#000000",
        logo: "/assets/jee-logo.png",
        background: "/assets/jee-fundo.png",
        overlayColor: "bg-black/75",
        website: "www.jee.com.br",
        unidades: ["Centro de Soluções Corporativas - CSC"],
        brandIcon: "Building2"
    }
];

export const getCompanyBySlug = (slug: string) => companies.find(c => c.slug === slug);
