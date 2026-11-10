import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

const clients = [
  {
    "name": "Najar Imóveis",
    "image": "/clientes/najar-imoveis.png",
    "caseStudy": true
  },
  {
    "name": "Alexandre Barca",
    "image": "/clientes/alexandre-barca.png",
    "caseStudy": false
  },
  {
    "name": "Fabi Imóveis",
    "image": "/clientes/fabi-imoveis.png",
    "caseStudy": false
  },
  {
    "name": "GAS Imóveis",
    "image": "/clientes/gas-imoveis.png",
    "caseStudy": false
  },
  {
    "name": "Lourenço Consultoria",
    "image": "/clientes/lourenco-consultoria.png",
    "caseStudy": false
  },
  {
    "name": "F14 Soccer Cup 7",
    "image": "/clientes/f14-soccer-cup-7.png",
    "caseStudy": false
  },
  {
    "name": "Vinicius Taekwondo Team",
    "image": "/clientes/vinicius-taekwondo-team.png",
    "caseStudy": false
  },
  {
    "name": "Conceito Futsal",
    "image": "/clientes/conceito-futsal.png",
    "caseStudy": false
  },
  {
    "name": "Liv Lavanderia",
    "image": "/clientes/liv-lavanderia.png",
    "caseStudy": false
  },
  {
    "name": "Meninos da Vila — Mogi das Cruzes",
    "image": "/clientes/meninos-da-vila-mogi.png",
    "caseStudy": false
  },
  {
    "name": "K Insights",
    "image": "/clientes/k-insights.png",
    "caseStudy": false
  },
  {
    "name": "Polpas e Boas",
    "image": "/clientes/polpas-e-boas.png",
    "caseStudy": false
  },
  {
    "name": "Flobramel",
    "image": "/clientes/flobramel.png",
    "caseStudy": false
  },
  {
    "name": "Karen Claro Cabeleireira",
    "image": "/clientes/karen-claro-cabeleireira.png",
    "caseStudy": false
  },
  {
    "name": "Rotary Estética Automotiva",
    "image": "/clientes/rotary-estetica-automotiva.png",
    "caseStudy": false
  },
  {
    "name": "Meninos da Vila — Suzano",
    "image": "/clientes/meninos-da-vila-suzano.png",
    "caseStudy": false
  }
];

export function ClientBrands() {
  return (
    <section aria-labelledby="client-brands-title" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#FF3131]">Conexões que constroem marcas</p>
        <h2 id="client-brands-title" className="mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">Marcas que fazem parte da minha trajetória.</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-white/70">Clientes que já realizaram projetos comigo ou continuam contando com o trabalho da ByJohwGimenes.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {clients.map((client) => (
            <li key={client.image} className="flex min-w-0 flex-col rounded-2xl border border-white/15 p-3 sm:p-5">
              <div className="flex h-36 items-center justify-center sm:h-44">
                <img src={client.image} alt={client.name} loading="lazy" decoding="async" width={1536} height={1536} className="h-full w-full object-contain" />
              </div>
              <p className="mt-4 text-center text-sm leading-relaxed text-white/80">{client.name}</p>
              {client.caseStudy && <Link to="/cases/najar-imoveis" className="mt-3 inline-flex items-center justify-center gap-1 rounded-md py-2 text-sm font-semibold text-white underline decoration-[#FF3131] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3131]">Conhecer o case<ArrowUpRight size={16} aria-hidden="true" /></Link>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
