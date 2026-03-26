import { notFound } from "next/navigation";
import { getCompanyBySlug, companies } from "@/config/companies";
import SignatureGenerator from "@/components/SignatureGenerator";

interface PageProps {
    params: Promise<{ company: string }>;
}

/**
 * Generate static params for all companies to ensure fast SSG
 */
export async function generateStaticParams() {
    return companies.map((company) => ({
        company: company.slug,
    }));
}

/**
 * Dynamic Page for each company
 */
export default async function CompanyPage({ params }: PageProps) {
    const { company: slug } = await params;
    const config = getCompanyBySlug(slug);

    if (!config) {
        notFound();
    }

    return <SignatureGenerator config={config} />;
}
