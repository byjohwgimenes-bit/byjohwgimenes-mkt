import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ChevronDown, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const profiles = [
  {
    "name": "Najar Imóveis",
    "handle": "najarimoveis",
    "logo": "najar-imoveis",
    "description": "Mercado imobiliário",
    "caseStudy": true
  },
  {
    "name": "Meninos da Vila — Mogi das Cruzes",
    "handle": "meninosdavilamogi",
    "logo": "meninos-da-vila-mogi",
    "description": "Escola de futebol · Mogi das Cruzes",
    "caseStudy": false
  },
  {
    "name": "Meninos da Vila — Suzano",
    "handle": "meninosdavilasuzano",
    "logo": "meninos-da-vila-suzano",
    "description": "Escola de futebol · Suzano",
    "caseStudy": false
  },
  {
    "name": "K-Insights",
    "handle": "kinsightsoficial",
    "logo": "k-insights",
    "description": "Perfil acompanhado por Johw",
    "caseStudy": false
  },
  {
    "name": "F14 Soccer Cup 7",
    "handle": "f14soccercup7",
    "logo": "f14-soccer-cup-7",
    "description": "Futebol · Soccer Cup 7",
    "caseStudy": false
  }
];

export function SocialPortfolio({ number }: { number: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="col-span-full border-t" onToggle={event => setOpen(event.currentTarget.open)}>
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
        <span className="text-sm text-primary">{number}</span>
        <h2 className="min-w-0 flex-1 text-lg font-semibold">Gestão de redes sociais</h2>
        <span className="flex items-center gap-2 text-sm font-medium text-primary">
          {open ? 'Fechar' : 'Ver perfis'}<ChevronDown className={`size-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true"/>
        </span>
      </summary>
      {open && <div className="pb-10">
        <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">Conheça alguns dos perfis que acompanho e veja os conteúdos diretamente no Instagram.</p>
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map(profile => <article key={profile.handle} className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card">
            <div className="flex h-48 items-center justify-center bg-black p-5">
              <img src={`/clientes/${profile.logo}.png`} alt={`Logo de ${profile.name}`} loading="lazy" decoding="async" width={1536} height={1536} className="h-full w-full object-contain"/>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{profile.description}</p>
              <p className="mb-5 mt-2 break-all text-sm font-medium text-primary">@{profile.handle}</p>
              <Button asChild variant="outline" className="mt-auto w-full">
                <a href={`https://www.instagram.com/${profile.handle}/`} target="_blank" rel="noopener noreferrer" aria-label={`Conhecer Instagram de ${profile.name} (nova aba)`}><Instagram aria-hidden="true"/>Conhecer o Instagram<ArrowUpRight aria-hidden="true"/></a>
              </Button>
              {profile.caseStudy && <Link to="/cases/najar-imoveis" className="mt-4 rounded-sm text-center text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">Conhecer o case de sucesso</Link>}
            </div>
          </article>)}
        </div>
        <div className="mt-8 flex justify-center"><Button asChild size="lg"><Link to="/briefing">Quero esse serviço<ArrowUpRight aria-hidden="true"/></Link></Button></div>
      </div>}
    </details>
  );
}
