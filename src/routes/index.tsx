import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Fingerprint, Video, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicShell } from '@/components/PublicShell';
export const Route=createFileRoute('/')({head:()=>({meta:[{title:'ByJohwGimenes. — Design que inspira. Ideias que conectam.'},{name:'description',content:'Johw: branding, estratégia digital, conteúdo e audiovisual. Conheça sua trajetória e converse sobre seu projeto.'},{property:'og:title',content:'ByJohwGimenes. — Design que inspira. Ideias que conectam.'},{property:'og:description',content:'Identidade visual, estratégia digital e conteúdo com Johw.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Index});
function Index() {
  const services = [
    { icon: Fingerprint, title: 'Branding e identidade' },
    { icon: Layers, title: 'Estratégia e conteúdo' },
    { icon: Video, title: 'Audiovisual e criação' },
  ];
  return <PublicShell>
    <div className="brand-home">
      <section className="brand-hero" aria-labelledby="home-title">
        <h1 id="home-title" className="font-bold">Design que inspira.<br/>Ideias que conectam.</h1>
        <p className="brand-hero-description">Identidade visual, estratégia digital e conteúdo para fortalecer a presença da sua marca.</p>
        <div className="brand-actions">
          <Button asChild size="lg" className="brand-cta"><Link to="/briefing">Vamos conversar <ArrowUpRight size={19}/></Link></Button>
          <Link className="brand-text-link" to="/servicos">Conhecer serviços <ArrowUpRight size={17}/></Link>
        </div>
      </section>
      <section className="brand-services" aria-labelledby="services-title">
        <h2 id="services-title" className="brand-eyebrow font-bold">SERVIÇOS</h2>
        <div className="brand-service-grid">{services.map(({icon:Icon,title}) =>
          <Link to="/servicos" className="brand-service-card" key={title}>
            <Icon size={24} aria-hidden="true"/>
            <h3 className="font-bold">{title}</h3>
            <ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
        )}</div>
      </section>
      <section className="brand-case-block" aria-labelledby="case-title">
        <div><p className="brand-eyebrow font-bold">CASE EM DESTAQUE</p><h2 id="case-title" className="font-bold">Najar Imóveis</h2><p>Estratégia de marketing e criação visual nas redes sociais desde agosto de 2022.</p></div>
        <Link className="brand-text-link" to="/cases/najar-imoveis">Conhecer o case <ArrowUpRight size={18}/></Link>
      </section>
    </div>
  </PublicShell>;
}
