import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configurações Avançadas Next 16+ */
  reactStrictMode: true,
  poweredByHeader: false, // Remoção de assinaturas tecnológicas Server
  compress: true, // Compressão otimizada
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // Aumentado para 2 anos
          },
          {
            key: 'Content-Security-Policy',
            // Política restritiva de segurança Padrão Ouro - ajustável conforme liberação de origens e recursos de terceiros
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content;",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // Mitigação Spectre
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

