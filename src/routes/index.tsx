import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Fingerprint, Video, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicShell } from '@/components/PublicShell';
import { HeroPortrait } from '@/components/HeroPortrait';
export const Route=createFileRoute('/')({head:()=>({meta:[{title:'ByJohwGimenes. — Design que inspira. Ideias que conectam.'},{name:'description',content:'Johw: branding, estratégia digital, conteúdo e audiovisual. Conheça sua trajetória e converse sobre seu projeto.'},{property:'og:title',content:'ByJohwGimenes. — Design que inspira. Ideias que conectam.'},{property:'og:description',content:'Identidade visual, estratégia digital e conteúdo com Johw.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Index});
function Index() {
  const services = [
    { icon: Fingerprint, title: 'Branding e identidade', description: 'Marcas com personalidade e uma identidade que faz sentido.' },
    { icon: Layers, title: 'Estratégia e conteúdo', description: 'Presença digital com direção, consistência e conexão.' },
    { icon: Video, title: 'Audiovisual e criação', description: 'Ideias ganham forma em vídeos e materiais visuais.' },
  ];
  const brands = [
    { name: 'Najar Imóveis', image: 'najar-imoveis', to: '/cases/najar-imoveis' },
    { name: 'Meninos da Vila Mogi', image: 'meninos-da-vila-mogi', to: '/servicos' },
    { name: 'Meninos da Vila Suzano', image: 'meninos-da-vila-suzano', to: '/servicos' },
    { name: 'F14 Soccer Cup7', image: 'f14-soccer-cup-7', to: '/servicos' },
    { name: 'K-Insights', image: 'k-insights', to: '/servicos' },
  ] as const;
  return <PublicShell appearance="home">
    <div className="brand-home">
      <section className="brand-hero" aria-labelledby="home-title">
        <div className="brand-hero-copy"><h1 id="home-title" className="font-bold">Design que inspira.<br/><span>Ideias que conectam.</span></h1>
        <p className="brand-hero-description">Identidade visual, estratégia digital e conteúdo para fortalecer a presença da sua marca.</p>
        <div className="brand-actions">
          <Button asChild size="lg" className="brand-cta"><Link to="/briefing">Vamos conversar <ArrowUpRight size={19}/></Link></Button>
          <Link className="brand-text-link" to="/servicos">Conhecer serviços <ArrowUpRight size={17}/></Link>
        </div>
        </div>
        <HeroPortrait />
        <div className="brand-trust">
          <p className="brand-trust-label">Marcas que confiam<br className="brand-trust-break"/> no meu trabalho</p>
          <div className="brand-trust-logos">{brands.map(brand => <Link key={brand.image} to={brand.to} className="brand-logo-plate" title={brand.name}><img src={`/clientes/${brand.image}.png`} alt={brand.name} loading="lazy" decoding="async"/></Link>)}</div>
        </div>
      </section>
      <section className="brand-services" aria-labelledby="services-title">
        <h2 id="services-title" className="brand-eyebrow font-bold">SERVIÇOS</h2>
        <div className="brand-service-grid">{services.map(({icon:Icon,title,description},index) =>
          <Link to="/servicos" className={`brand-service-card${index === 1 ? ' brand-service-featured' : ''}`} key={title}>
            <div className="brand-service-top"><Icon size={26} aria-hidden="true"/><ArrowUpRight size={22} aria-hidden="true"/></div>
            <h3 className="font-bold">{title}</h3>
            <p>{description}</p>
          </Link>
        )}</div>
      </section>
      <section className="brand-case-block" aria-labelledby="case-title">
        <Link to="/cases/najar-imoveis" className="brand-case-logo" aria-label="Ver case Najar Imóveis"><img src="/clientes/najar-imoveis.png" alt="Najar Imóveis" loading="lazy"/></Link>
        <div><p className="brand-eyebrow font-bold">CASE EM DESTAQUE</p><h2 id="case-title" className="font-bold">Najar Imóveis</h2><p>Estratégia de marketing e criação visual nas redes sociais desde agosto de 2022.</p></div>
        <Link className="brand-text-link" to="/cases/najar-imoveis">Conhecer o case <ArrowUpRight size={18}/></Link>
      </section>
      <section aria-labelledby="work-process-title" className="mt-12 border-t border-white/15 pt-10">
        <p className="brand-eyebrow font-bold text-primary">DO PRIMEIRO CONTATO À ENTREGA</p>
        <h2 id="work-process-title" className="mt-3 text-3xl font-bold sm:text-4xl">Como funciona meu trabalho</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">Cada projeto começa com uma conversa sobre o que sua marca precisa. Veja como construímos esse caminho juntos.</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {title: 'Briefing', description: 'Você apresenta seu negócio, seus objetivos e os serviços de que precisa.'},
            {title: 'Conversa', description: 'Conversamos para esclarecer dúvidas e entender as prioridades do projeto.'},
            {title: 'Proposta', description: 'Definimos as entregas, o investimento e os prazos de acordo com a sua necessidade.'},
            {title: 'Criação', description: 'Desenvolvo a estratégia e os materiais conforme o escopo aprovado, com alinhamentos ao longo do processo.'},
            {title: 'Entrega', description: 'Você recebe os materiais ou acompanha os serviços contratados, conforme o combinado.'},
          ].map((step, index) => <li key={step.title} className="min-w-0 rounded-xl border border-white/15 p-5">
            <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
          </li>)}
        </ol>
        <Button asChild size="lg" className="brand-cta mt-8"><Link to="/briefing">Começar meu briefing<ArrowUpRight size={18} aria-hidden="true"/></Link></Button>
      </section>
    </div>
  </PublicShell>;
}
