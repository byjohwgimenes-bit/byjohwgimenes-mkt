import { useState } from 'react';
import { Award, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

const certificates = [
  {
    "id": "planejamento-marketing-vendas",
    "title": "Planejamento de Marketing e Vendas",
    "issuer": "SENAI São Paulo",
    "date": "2026-01-17",
    "hours": 12,
    "category": "marketing"
  },
  {
    "id": "fundamentos-marketing-digital",
    "title": "Fundamentos do Marketing Digital",
    "issuer": "SENAI São Paulo",
    "date": "2024-05-22",
    "hours": 12,
    "category": "marketing"
  },
  {
    "id": "prompting-responsavel",
    "title": "Prompting Responsável: Maximizar a IA no seu negócio",
    "issuer": "Santander Open Academy",
    "date": "2025-07-30",
    "hours": 8,
    "category": "ia",
    "note": "Conteúdo desenvolvido pela Microsoft Foundry."
  },
  {
    "id": "tecnico-marketing",
    "title": "Técnico em Marketing",
    "issuer": "Escola Técnica FAT",
    "date": "2025-06-10",
    "hours": 800,
    "category": "marketing",
    "featured": true
  },
  {
    "id": "publicidade-redes-sociais",
    "title": "Publicidade nas Redes Sociais",
    "issuer": "Santander Open Academy",
    "date": "2025-07-30",
    "hours": 8,
    "category": "conteudo"
  },
  {
    "id": "seo-marketing-conteudo",
    "title": "SEO e Marketing de Conteúdo",
    "issuer": "Santander Open Academy",
    "date": "2025-02-14",
    "hours": 8,
    "category": "conteudo"
  },
  {
    "id": "storytelling-marketing-digital",
    "title": "Storytelling para marketing digital",
    "issuer": "Santander Open Academy",
    "date": "2024-10-30",
    "hours": 8,
    "category": "conteudo",
    "note": "Conteúdo desenvolvido pela University of Chicago."
  },
  {
    "id": "automacao-n8n",
    "title": "Santander 2026 — Automação com N8N",
    "issuer": "DIO / Santander",
    "date": "2026-09-28",
    "hours": 26,
    "category": "ia"
  },
  {
    "id": "primeiro-app-ia",
    "title": "Santander — Construa seu primeiro App com IA",
    "issuer": "DIO / Santander",
    "date": "2026-10-27",
    "hours": 22,
    "category": "ia"
  },
  {
    "id": "imersao-ia",
    "title": "Imersão Inteligência Artificial na prática",
    "issuer": "Daxus",
    "date": "2026-07-09",
    "hours": 8,
    "category": "ia"
  },
  {
    "id": "foundations-marketing-ecommerce",
    "title": "Foundations of Digital Marketing and E-commerce",
    "issuer": "Google / Coursera",
    "date": "2024-10-30",
    "hours": null,
    "category": "marketing"
  },
  {
    "id": "automacao-marketing",
    "title": "Automação de Marketing",
    "issuer": "Santander Open Academy",
    "date": "2026-09-29",
    "hours": 8,
    "category": "ia"
  },
  {
    "id": "generative-ai",
    "title": "Generative AI",
    "issuer": "Santander Open Academy",
    "date": "2024-10-30",
    "hours": 8,
    "category": "ia",
    "note": "Conteúdo em vídeo desenvolvido pelo MIT Professional Education; certificado emitido pela Santander Open Academy."
  },
  {
    "id": "google-ia-marketing",
    "title": "Google: IA Prática para Marketing",
    "issuer": "Santander Open Academy",
    "date": "2026-01-13",
    "hours": 2,
    "category": "ia",
    "note": "Conteúdo desenvolvido pelo Google."
  },
  {
    "id": "marketing-empresarios",
    "title": "Marketing para Empresários",
    "issuer": "Actmob Marketing Digital",
    "date": "2023-11-09",
    "hours": 9,
    "category": "marketing"
  }
];
const categories = [
  {id:'all',label:'Todas'},
  {id:'marketing',label:'Marketing e negócios'},
  {id:'conteudo',label:'Conteúdo e redes sociais'},
  {id:'ia',label:'IA e automação'},
];
const dateLabel = (date:string) => new Date(date+'T12:00:00Z').toLocaleDateString('pt-BR',{month:'long',year:'numeric',timeZone:'UTC'});
export function Certifications() {
  const [category,setCategory]=useState('all');
  const [expanded,setExpanded]=useState(false);
  const ordered=[...certificates].sort((a,b)=>Number('featured' in b && b.featured)-Number('featured' in a && a.featured)||b.date.localeCompare(a.date));
  const filtered=ordered.filter(c=>category==='all'||c.category===category);
  const visible=expanded?filtered:filtered.slice(0,6);
  return <section id="formacao" className="border-y bg-muted/40">
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-xs font-bold tracking-widest text-primary">APRENDIZADO CONTÍNUO</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Formação e certificações.</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Marketing, criatividade e tecnologia conectados à minha prática profissional.</p></div>
        <p className="rounded-full border bg-background px-4 py-2 text-sm"><strong>{certificates.length}</strong> formações e certificações</p>
      </div>
      <div role="group" aria-label="Filtrar certificações por área" className="mt-8 flex flex-wrap gap-2">{categories.map(c=><button key={c.id} type="button" aria-pressed={category===c.id} onClick={()=>{setCategory(c.id);setExpanded(false);}} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${category===c.id?'border-foreground bg-foreground text-background':'bg-background hover:border-foreground'}`}>{c.label}</button>)}</div>
      <p className="sr-only" aria-live="polite">{filtered.length} certificações nesta categoria.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(c=><article key={c.id} className={`flex flex-col rounded-2xl border bg-background p-6 ${'featured' in c&&c.featured?'border-primary shadow-sm':''}`}>
        <div className="mb-5 flex items-center justify-between gap-3">{'featured' in c&&c.featured?<GraduationCap className="text-primary" size={27}/>:<Award className="text-primary" size={27}/>}<span className="text-xs text-muted-foreground">{'featured' in c&&c.featured?'Formação técnica':'Curso / certificação'}</span></div>
        <h3 className="text-xl font-bold leading-snug">{c.title}</h3>
        <p className="mt-3 text-sm font-semibold">{c.issuer}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"><time dateTime={c.date}>{dateLabel(c.date)}</time>{c.hours!==null&&<span>{c.hours} horas</span>}</div>
        {'note' in c&&<p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{c.note}</p>}
      </article>)}</div>
      {filtered.length>6&&<div className="mt-8 text-center"><button type="button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)} className="inline-flex items-center gap-2 rounded-full border bg-background px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{expanded?'Mostrar menos':`Ver todas as certificações (${filtered.length})`}{expanded?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</button></div>}
    </div>
  </section>;
}
