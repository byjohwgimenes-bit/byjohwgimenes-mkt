import { createFileRoute } from '@tanstack/react-router';
import { PublicShell } from '@/components/PublicShell';
import { Certifications } from '@/components/Certifications';
import { Button } from '@/components/ui/button';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { ClientBrands } from '@/components/ClientBrands';

export const Route=createFileRoute('/sobre-mim')({head:()=>({meta:[{title:'Sobre Johw — ByJohwGimenes.'},{name:'description',content:'Conheça Johnvanny Gimenes Martins, sua formação em Marketing e atuação em marca, conteúdo, audiovisual e IA.'},{property:'og:title',content:'Sobre Johw — ByJohwGimenes.'},{property:'og:description',content:'Marketing, marca, conteúdo e tecnologia na trajetória de Johw.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:About});

function About(){return <PublicShell>
  <section className="mx-auto max-w-6xl px-5 py-16">
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-12 lg:gap-16">
      <div className="min-w-0">
        <p className="text-sm font-bold text-primary">SOBRE MIM</p>
        <h1 className="mt-5 text-5xl font-bold sm:text-7xl">Sou Johw.</h1>
        <div className="mt-10 grid gap-6">
          <p className="text-xl leading-relaxed">Johnvanny Gimenes Martins, conhecido como Johw, formado em Marketing, com atuação em branding, redes sociais, criação de conteúdo e produção audiovisual.</p>
          <p className="leading-relaxed text-muted-foreground">Minha missão é transformar ideias em presença de marca através de identidades marcantes, estratégias inteligentes e conteúdos que conectam, ajudando empresas e empreendedores a organizar, valorizar e potencializar sua imagem.</p>
        </div>
        <div className="mt-8"><Button asChild variant="outline" size="lg"><a href="https://www.linkedin.com/in/johnvanny-gimenes-4125a543b/" target="_blank" rel="noopener noreferrer" aria-label="Ver perfil de Johnvanny Gimenes no LinkedIn (nova aba)"><Linkedin aria-hidden="true"/>Meu LinkedIn<ArrowUpRight aria-hidden="true"/></a></Button></div>
      </div>
      <figure className="mx-auto w-full max-w-[300px] md:max-w-none">
        <img src="/images/johw-sobre-mim.webp" alt="Retrato de corpo inteiro de Johw em pé, de camiseta preta e botas, com iluminação vermelha de recorte." width={800} height={1580} decoding="async" className="block h-auto w-full"/>
      </figure>
    </div>
  </section>
  <Certifications />
  <section className="mx-auto max-w-6xl px-5 py-14"><h2 className="text-3xl font-bold">O que conecta meu trabalho.</h2><p className="mt-6 max-w-4xl text-lg leading-loose">Social Media · Conteúdo · Estratégia digital · IA · Identidade visual · Meta e Google Ads · Fotografia · Vídeos · Tecnologia · Apps com IA</p></section>
  <ClientBrands />
</PublicShell>}
