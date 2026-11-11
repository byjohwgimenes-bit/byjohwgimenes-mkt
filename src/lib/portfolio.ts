import rotary from '@/assets/portfolio/rotary.jpg.asset.json';
import lourenco from '@/assets/portfolio/lourenco-consultoria.jpg.asset.json';
import flobramel from '@/assets/portfolio/flobramel.jpg.asset.json';
import f14 from '@/assets/portfolio/f14-soccer-academy.jpg.asset.json';
import conceito from '@/assets/portfolio/conceito-futsal.jpg.asset.json';
import insights from '@/assets/portfolio/k-insights.jpg.asset.json';
import rotaryPdf from '@/assets/portfolio/rotary.pdf.asset.json';
import lourencoPdf from '@/assets/portfolio/lourenco-consultoria.pdf.asset.json';
import flobramelPdf from '@/assets/portfolio/flobramel.pdf.asset.json';
import f14Pdf from '@/assets/portfolio/f14-soccer-academy.pdf.asset.json';
import conceitoPdf from '@/assets/portfolio/conceito-futsal.pdf.asset.json';
import insightsPdf from '@/assets/portfolio/k-insights.pdf.asset.json';

export const ORIGINAL_PDFS = {
  rotary: rotaryPdf, 'lourenco-consultoria': lourencoPdf, flobramel: flobramelPdf,
  'f14-soccer-academy': f14Pdf, 'conceito-futsal': conceitoPdf, 'k-insights': insightsPdf,
} as const;

export const PORTFOLIO = [
  { slug: 'rotary', name: 'Rotary Estética Automotiva', category: 'Rebranding e manual da marca', summary: 'Logotipo, cores, tipografia e diretrizes para aplicações digitais e impressas.', pages: 38, size: '49,2 MB', bytes: 51579834, sha256: 'ac4099c61fec326bc25de1f9c8f5216df223265ba1a938b4284e5073ee0a4f07', cover: rotary.url },
  { slug: 'lourenco-consultoria', name: 'Lourenço Consultoria', category: 'Identidade visual', summary: 'Símbolo, versões da marca e orientações de uso em uma identidade de apresentação sofisticada.', pages: 16, size: '22,4 MB', bytes: 23486144, sha256: '8dd86402077938e9cd5b0868b911d836f5047ca539c301ea5e1aca004d3d9377', cover: lourenco.url },
  { slug: 'flobramel', name: 'Flobramel', category: 'Guia de identidade visual', summary: 'Cores, elementos gráficos e aplicações que conectam a identidade ao universo do mel e da sustentabilidade.', pages: 28, size: '32,7 MB', bytes: 34248223, sha256: 'ce66c2d9cb19051571ab99823bcb84aa0e161d73e354646dc65f08fd199015b2', cover: flobramel.url },
  { slug: 'f14-soccer-academy', name: 'F14 Soccer Academy', category: 'Guia da marca', summary: 'Conceito, logotipo, cores e tipografia para uma escola de futebol.', pages: 9, size: '6,4 MB', bytes: 6742370, sha256: '529d2e30d036914d6c809a1fad96558d33045c12334dedac8c0e699cb1539513', cover: f14.url },
  { slug: 'conceito-futsal', name: 'Conceito Futsal', category: 'Painel de identidade visual', summary: 'Logotipo, paleta de cores, tipografia e exemplos de aplicação para a marca esportiva.', pages: 1, size: '5,8 MB', bytes: 6088923, sha256: 'e3e7c2279704ae499656080afdc0035d780b20028b6af107f2b1c4ad8bc04238', cover: conceito.url },
  { slug: 'k-insights', name: 'K-Insights', category: 'Painel de identidade visual', summary: 'Versões do logotipo, paleta cromática, tipografia e aplicações em diferentes materiais.', pages: 1, size: '3,0 MB', bytes: 3132863, sha256: '7b4755d9020a8c8f27eb98c6dadafa3de7bbdee01f6c8405583d2f8ed65040bb', cover: insights.url },
] as const;