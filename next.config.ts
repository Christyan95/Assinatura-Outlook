import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configurações Avançadas Next 16+ */
  reactStrictMode: true,
  poweredByHeader: false, // Remoção de assinaturas tecnológicas Server
  compress: true, // Compressão otimizada
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const cspScriptSrc = isDev
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
      : "script-src 'self' 'unsafe-inline';";

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
            // Política de segurança Dinâmica (Tags inseguras reativadas isoladamente no ambiente dev para Turbopack e Localhost)
            value: `default-src 'self'; ${cspScriptSrc} style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; block-all-mixed-content;`,
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // Mitigação Spectre
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin', // Liberado para que os logos renderizem corretamente nos webmails (Outlook/Gmail)
          },
        ],
      },
    ];
  },
};

export default nextConfig;

