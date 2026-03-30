import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Sistema Padrão Ouro de Proteção Edge
// Este middleware reforça a segurança global do sistema em tempo de requisição na borda.

const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const MAX_REQUESTS = 150; // limite de requests
const ipMap = new Map<string, { count: number; lastReset: number }>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Reforço de Headers Dinâmicos: Remoção de rastros e injeção de segurança Edge
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 2. Mitigação Simples de Bot / User-Agent maliciosos
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const blocklist = ['curl', 'python-urllib', 'wget', 'postman'];
  if (blocklist.some((bot) => userAgent.includes(bot))) {
    return new NextResponse('Edge Firewall: Access Denied (Ação Suprimida)', { status: 403 });
  }

  // 3. Rate Limiting em Memória (Borda)
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const agora = Date.now();
  const rateRecord = ipMap.get(ip);

  if (!rateRecord) {
    ipMap.set(ip, { count: 1, lastReset: agora });
  } else {
    if (agora - rateRecord.lastReset > RATE_LIMIT_WINDOW) {
      ipMap.set(ip, { count: 1, lastReset: agora });
    } else {
      rateRecord.count++;
      if (rateRecord.count > MAX_REQUESTS) {
        return new NextResponse('Edge Firewall: Rate Limit Exceeded (Muitas requisições - aguarde)', {
          status: 429,
          headers: { 'Retry-After': '60' },
        });
      }
    }
  }

  return response;
}

export const config = {
  // Ignorar arquivos estáticos e de otimização na borda
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/.*).*)'],
};
