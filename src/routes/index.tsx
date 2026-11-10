import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Fingerprint, Video, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicShell, WhatsAppContact } from '@/components/PublicShell';
export const Route=createFileRoute('/')({head:()=>({meta:[{title:'ByJohwGimenes. — Design que inspira. Ideias que conectam.'},{name:'description',content:'Johw: branding, estratégia digital, conteúdo e audiovisual. Conheça sua trajetória e converse sobre seu projeto.'},{property:'og:title',content:'ByJohwGimenes. — Design que inspira. Ideias que conectam.'},{property:'og:description',content:'Identidade visual, estratégia digital e conteúdo com Johw.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Index});
function Index() {
  const services = [
    {icon:Fingerprint,title:'Branding e identidade',text:'Uma linguagem visual consistente para expressar o valor da sua marca.'},
    {icon:Layers,title:'Estratégia e conteúdo',text:'Redes sociais, conteúdo e anúncios conectados aos objetivos do seu negócio.'},
    {icon:Video,title:'Audiovisual e criação',text:'Captação, edição de vídeos e design para dar forma às suas ideias.'},
  ];
  return <PublicShell>
    <div className="brand-home">
      <section className="brand-hero">
        <div className="brand-orbits" aria-hidden="true"/>
        <div className="brand-hero-copy">
          <p className="brand-eyebrow"><span/> ESTRATÉGIA · DESIGN · CONTEÚDO</p>
          <h1>Ideias que conectam.<br/>Marcas que <em>se destacam.</em></h1>
          <p className="brand-hero-description">Identidade, estratégia digital e criação para transformar o jeito como sua marca se apresenta ao mundo.</p>
          <div className="brand-actions"><Link className="brand-cta" to="/briefing">Vamos conversar <ArrowUpRight size={19}/></Link><Link className="brand-text-link" to="/cases">Conheça meu trabalho <ArrowUpRight size={17}/></Link></div>
          <p className="brand-hero-caption">ByJohwGimenes. — Marketing com direção criativa.</p>
        </div>
        <div className="brand-hero-art" aria-hidden="true"><div className="brand-art-ring"/><div className="brand-art-card"><span>ESTRATÉGIA</span><span>IDENTIDADE</span><span>CONEXÃO<span className="brand-art-dot">.</span></span><ArrowUpRight size={64}/></div><div className="brand-art-label">CRIATIVIDADE COM PROPÓSITO</div></div>
      </section>
      <div className="brand-disciplines" aria-label="Áreas de atuação"><span>BRANDING</span><span>SOCIAL MEDIA</span><span>DESIGN</span><span>AUDIOVISUAL</span><span>ANÚNCIOS</span></div>
      <section className="brand-case-block">
        <div><p className="brand-eyebrow">CASE DE SUCESSO</p><h2>Uma marca.<br/>Uma transformação.<br/><span>Najar Imóveis.</span></h2><p>Estratégia de marketing e criação visual desde agosto de 2022. Uma comunicação consistente, do Instagram aos materiais da empresa.</p><Link className="brand-cta" to="/cases/najar-imoveis">Conhecer a história <ArrowUpRight size={19}/></Link></div>
        <div className="brand-case-results"><div><strong>Desde 2022</strong><span>Estratégia e criação visual</span></div><div><strong>+10 mil</strong><span>Seguidores informados no case</span></div><div><strong>Identidade</strong><span>Consistência em cada ponto de contato</span></div><p>Resultados fornecidos por Johw. Consulte os detalhes e as limitações na página do case.</p></div>
      </section>
      <section className="brand-services"><div className="brand-section-heading"><p className="brand-eyebrow">O QUE POSSO FAZER PELA SUA MARCA</p><h2>Da ideia à presença.</h2><p>Escolha o apoio que seu projeto precisa. Podemos combinar diferentes serviços.</p></div><div className="brand-service-grid">{services.map(({icon:Icon,title,text},i)=><Link to="/servicos" className="brand-service-card" key={title}><span className="brand-service-number">0{i+1}</span><Icon size={32}/><h3>{title}</h3><p>{text}</p><span className="brand-service-link">Explorar serviços <ArrowUpRight size={18}/></span></Link>)}</div></section>
      <section className="brand-about"><div><p className="brand-eyebrow">PRAZER, JOHW.</p><h2>Um olhar criativo.<br/>Uma direção estratégica.</h2><p>Sou Johnvanny Gimenes Martins, conhecido como Johw. Formado em Marketing, conecto branding, redes sociais, conteúdo e audiovisual para ajudar empresas e empreendedores a comunicar seu valor.</p><Link className="brand-text-link" to="/sobre-mim">Conheça minha trajetória <ArrowUpRight size={18}/></Link></div><div className="brand-process">{['Conte sobre seu negócio','Selecione os serviços','Vamos desenhar o próximo passo'].map((text,i)=><div key={text}><span>0{i+1}</span><p>{text}</p><ArrowUpRight size={20}/></div>)}<Link className="brand-cta" to="/briefing">Preencher meu briefing <ArrowUpRight size={19}/></Link><WhatsAppContact/></div></section>
    </div>
  </PublicShell>;
}
