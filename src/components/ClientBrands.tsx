import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const clients = [
  {
    "name": "Najar Imóveis",
    "image": "/clientes/najar-imoveis.png",
    "caseStudy": true,
    "active": true,
    "services": [
      "Estratégia de marketing",
      "Identidade visual e comunicação da marca",
      "Gestão de redes sociais"
    ],
    "description": "Desde agosto de 2022, atuação na estratégia de marketing e criação visual da Najar Imóveis nas redes sociais, com aplicação da identidade da marca em posts, stories, banners, placas, e-mails e materiais gráficos."
  },
  {
    "name": "Alexandre Barca",
    "image": "/clientes/alexandre-barca.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Captação e edição de vídeos",
      "Identidade visual"
    ],
    "description": "Captação e edição de vídeos de uma cobertura e de um imóvel decorado, em uma produção conjunta com Fabi Imóveis e GAS Imóveis. Os materiais foram preparados para Reels e YouTube. Também houve apoio no desenvolvimento da identidade visual a partir do logotipo existente."
  },
  {
    "name": "Fabi Imóveis",
    "image": "/clientes/fabi-imoveis.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Captação e edição de vídeos"
    ],
    "description": "Produção conjunta com Alexandre Barca e GAS Imóveis: captação e edição de vídeos de uma cobertura e de um imóvel decorado, com versões para Reels e YouTube."
  },
  {
    "name": "GAS Imóveis",
    "image": "/clientes/gas-imoveis.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Captação e edição de vídeos"
    ],
    "description": "Produção conjunta com Alexandre Barca e Fabi Imóveis: captação e edição de vídeos de uma cobertura e de um imóvel decorado, adaptados para Reels e YouTube."
  },
  {
    "name": "Lourenço Consultoria",
    "image": "/clientes/lourenco-consultoria.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Criação de logotipo",
      "Identidade visual e manual de marca",
      "Design para redes sociais"
    ],
    "description": "Construção da identidade visual desde a criação do logotipo até o desenvolvimento do manual de branding. O trabalho também incluiu peças de design para as redes sociais."
  },
  {
    "name": "F14 Soccer Cup 7",
    "image": "/clientes/f14-soccer-cup-7.png",
    "caseStudy": false,
    "active": true,
    "services": [
      "Criação de logotipo e identidade visual",
      "Manual de marca",
      "Design e social media",
      "Gestão de redes sociais e tráfego pago",
      "Captação e edição de vídeos",
      "Perfil da Empresa no Google",
      "Edição do aplicativo do campeonato"
    ],
    "description": "Atuação no marketing do campeonato de futebol de base de sete jogadores, com construção da identidade visual e do manual de marca, criação de conteúdo, gestão das redes sociais e de tráfego, produção audiovisual, organização do Perfil da Empresa no Google e edição do aplicativo do campeonato. O trabalho acompanha as duas edições realizadas, em 2025 e 2026."
  },
  {
    "name": "Vinicius Taekwondo Team",
    "image": "/clientes/vinicius-taekwondo-team.png",
    "caseStudy": false,
    "active": true,
    "services": [
      "Captação e edição de vídeos em eventos",
      "Design gráfico",
      "Parceria de marca"
    ],
    "description": "Captação e edição de vídeos em eventos e criação de peças de design. A parceria também inclui a presença da logo ByJohwGimenes. nas camisas dos atletas e da comissão técnica."
  },
  {
    "name": "Conceito Futsal",
    "image": "/clientes/conceito-futsal.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Manual de identidade visual",
      "Captação e edição de vídeos",
      "Fotografia de mídia day"
    ],
    "description": "Desenvolvimento do manual de identidade visual a partir do logotipo existente. Também foram produzidos vídeos e fotos de mídia day com alunos e professores, destinados à comunicação comercial e à divulgação da escola."
  },
  {
    "name": "Liv Lavanderia",
    "image": "/clientes/liv-lavanderia.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Captação e edição de vídeos",
      "Perfil da Empresa no Google",
      "Criação e organização de Linktree",
      "Design para redes sociais"
    ],
    "description": "Produção e edição de vídeos, organização do Perfil da Empresa no Google e criação e organização do Linktree para a biografia das redes sociais. O trabalho incluiu peças de design para as redes."
  },
  {
    "name": "Meninos da Vila — Mogi das Cruzes",
    "image": "/clientes/meninos-da-vila-mogi.png",
    "caseStudy": false,
    "active": true,
    "services": [
      "Marketing e produção de conteúdo",
      "Design para redes sociais",
      "Captação e edição de vídeos",
      "Gestão de redes sociais",
      "Gestão de tráfego pago"
    ],
    "description": "Responsável pelo marketing e pela criação de conteúdo da escola, dos posts e peças visuais para as redes sociais à captação e edição de vídeos. A atuação também inclui gestão das redes sociais e de tráfego pago."
  },
  {
    "name": "Meninos da Vila — Suzano",
    "image": "/clientes/meninos-da-vila-suzano.png",
    "caseStudy": false,
    "active": true,
    "services": [
      "Marketing e produção de conteúdo",
      "Design para redes sociais",
      "Captação e edição de vídeos",
      "Gestão de redes sociais",
      "Gestão de tráfego pago"
    ],
    "description": "Responsável pelo marketing e pela criação de conteúdo da escola, dos posts e peças visuais para as redes sociais à captação e edição de vídeos. A atuação também inclui gestão das redes sociais e de tráfego pago."
  },
  {
    "name": "K Insights",
    "image": "/clientes/k-insights.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Criação de logotipo e identidade visual",
      "Manual de marca",
      "Design e social media",
      "Gestão de redes sociais e tráfego pago",
      "Captação e edição de vídeos",
      "Perfil da Empresa no Google",
      "Apresentação comercial"
    ],
    "description": "Construção da identidade visual, do logotipo ao manual de branding. A atuação incluiu design, social media, gestão das redes sociais e de tráfego, captação e edição de vídeos, organização do Perfil da Empresa no Google e criação e edição da apresentação comercial."
  },
  {
    "name": "Polpas e Boas",
    "image": "/clientes/polpas-e-boas.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Design para materiais comerciais",
      "Criação de estampas",
      "Design para redes sociais"
    ],
    "description": "Criação de peças de design para uso comercial, estampas e materiais de comunicação para as redes sociais."
  },
  {
    "name": "Flobramel",
    "image": "/clientes/flobramel.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Reconstrução da identidade visual",
      "Criação de logotipo",
      "Manual de marca",
      "Design de aplicações da marca"
    ],
    "description": "Reconstrução da identidade visual, incluindo criação do logotipo e desenvolvimento do manual de branding, com orientações de uso e peças de design para as aplicações da marca."
  },
  {
    "name": "Karen Claro Cabeleireira",
    "image": "/clientes/karen-claro-cabeleireira.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Criação de logotipo",
      "Design de tabela de serviços"
    ],
    "description": "Criação do logotipo e de uma peça de design com os serviços e seus valores, para apresentação comercial aos clientes."
  },
  {
    "name": "Rotary Estética Automotiva",
    "image": "/clientes/rotary-estetica-automotiva.png",
    "caseStudy": false,
    "active": false,
    "services": [
      "Reconstrução da identidade visual",
      "Criação de logotipo e manual de marca",
      "Design e social media",
      "Gestão de redes sociais e tráfego pago",
      "Perfil da Empresa no Google"
    ],
    "description": "Reconstrução da identidade visual, com criação do logotipo e desenvolvimento do manual de branding. O trabalho também incluiu design, social media, gestão das redes sociais e de tráfego pago, além da organização do Perfil da Empresa no Google."
  }
];

export function ClientBrands() {
  return (
    <section aria-labelledby="client-brands-title" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#FF3131]">Conexões que constroem marcas</p>
        <h2 id="client-brands-title" className="mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">Marcas que fazem parte da minha trajetória.</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-white/70">Clientes que já realizaram projetos comigo ou continuam contando com o trabalho da ByJohwGimenes. Clique em uma marca para conhecer os serviços realizados.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {clients.map((client) => (
            <li key={client.image} className="flex min-w-0 flex-col rounded-2xl border border-white/15 p-3 sm:p-5">
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" aria-label={`Ver serviços realizados para ${client.name}`} className="flex w-full cursor-pointer flex-col items-center rounded-xl text-center transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3131]">
                    <span className="flex h-36 w-full items-center justify-center sm:h-44">
                      <img src={client.image} alt="" loading="lazy" decoding="async" width={1536} height={1536} className="h-full w-full object-contain" />
                    </span>
                    <span className="mt-4 text-sm leading-relaxed text-white/80">{client.name}</span>
                    <span className="mt-2 text-xs text-white/60">{client.active ? 'Parceria atual' : 'Trabalho realizado'}</span>
                    <span className="my-3 text-sm font-semibold underline decoration-[#FF3131] underline-offset-4">Ver serviços</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border-white/20 bg-black p-5 text-white sm:max-w-xl sm:p-8">
                  <img src={client.image} alt={`Logo de ${client.name}`} className="mx-auto h-28 w-full max-w-64 object-contain" />
                  <span className="w-fit rounded-full border border-[#FF3131]/50 px-3 py-1 text-xs font-semibold text-white">{client.active ? 'Parceria atual' : 'Trabalho realizado — parceria encerrada'}</span>
                  <DialogTitle className="pr-5 text-2xl font-bold leading-tight">{client.name}</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-white/75">{client.description}</DialogDescription>
                  <div>
                    <h3 className="mb-3 font-bold">Serviços realizados</h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/85">
                      {client.services.map((service) => <li key={service}>{service}</li>)}
                    </ul>
                  </div>
                  {client.caseStudy && <Link to="/cases/najar-imoveis" className="inline-flex items-center gap-1 rounded-md py-2 font-semibold underline decoration-[#FF3131] underline-offset-4">Conhecer o case de sucesso<ArrowUpRight size={16} aria-hidden="true" /></Link>}
                </DialogContent>
              </Dialog>
              {client.caseStudy && <Link to="/cases/najar-imoveis" className="mt-auto inline-flex items-center justify-center gap-1 rounded-md py-2 text-sm font-semibold underline decoration-[#FF3131] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3131]">Conhecer o case<ArrowUpRight size={16} aria-hidden="true" /></Link>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
