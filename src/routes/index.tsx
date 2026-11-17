import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Fingerprint, Video, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicShell } from '@/components/PublicShell';
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
        <div className="brand-work-composition" aria-label="Trabalhos de identidade visual">
          <div className="brand-orbit" aria-hidden="true"/>
          <Link to="/servicos" className="brand-work brand-work-first" aria-label="Conhecer o projeto Conceito Futsal"><img src="/portfolio-pages/conceito-futsal/1.jpg" alt="Painel original de identidade visual Conceito Futsal" decoding="async"/></Link>
          <Link to="/servicos" className="brand-work brand-work-second" aria-label="Conhecer o projeto K-Insights"><img src="/portfolio-pages/k-insights/1.jpg" alt="Painel original de identidade visual K-Insights" decoding="async"/></Link>
        </div>
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
    </div>
  </PublicShell>;
}
