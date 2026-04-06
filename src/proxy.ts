import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Sistema Padrão Ouro de Proteção Edge
// Este middleware reforça a segurança global do sistema em tempo de requisição na borda.

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Reforço de Headers Dinâmicos: Remoção de rastros e injeção de segurança Edge
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 2. Mitigação Simples de Bot / User-Agent maliciosos (Redução de ruído primário)
  // Nota Arquitetural: Bots sofisticados burlam via U-A Spoofing. A defesa principal (DDoS/Scraping)
  // deve sempre residir no Web Application Firewall (WAF) do provedor de infra (Edge/Vercel/Cloudflare).
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const blocklist = ['curl', 'python-urllib', 'wget', 'postman', 'bot', 'spider', 'crawl', 'scraper', 'slurp', 'nikto'];
  if (blocklist.some((bot) => userAgent.includes(bot))) {
    return new NextResponse('Edge Firewall: Access Denied (Ação Suprimida)', { status: 403 });
  }

  // 3. O Rate Limiting (Antiga contagem em memória) foi deprecado pois em ambientes Serverless/Edge
  // a memória não é compartilhada entre requisições Isolates em escala, burlando a proteção real.
  // Recomenda-se configurar isso de forma declarativa via painel Vercel WAF ou Cloudflare Rate Limiting Rules!
  // Alternativamente via código: integrar com Edge KV Storage ou Upstash Redis.

  return response;
}

export const config = {
  // Ignorar arquivos estáticos e de otimização na borda
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/.*).*)'],
};
