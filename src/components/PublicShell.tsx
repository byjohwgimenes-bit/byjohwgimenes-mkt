import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { settingsQuery } from '@/lib/site-data';
import { whatsappLink } from '@/lib/whatsapp';
import type { ReactNode } from 'react';

// Official assets only. Add imported fullLogo/symbol URLs here after the user's upload.
const officialLogos: {full:string|null;symbol:string|null}={full:null,symbol:null};
export function Brand({symbol=false}:{symbol?:boolean}) {
 const src=symbol?officialLogos.symbol:officialLogos.full;
 return src?<img src={src} alt="ByJohwGimenes MKT" className={symbol?'max-h-12 w-12 object-contain':'max-h-12 max-w-60 object-contain'} />:<span className="font-display text-base font-bold sm:text-lg">ByJohwGimenes <span className="text-primary">MKT</span></span>;
}
export function WhatsAppContact({large=false}:{large?:boolean}) {
 const {data:settings}=useQuery(settingsQuery);const link=whatsappLink(settings?.whatsapp_number,'Olá, Johw! Gostaria de conversar sobre meu projeto.');
 return link?<Button asChild variant="outline" size={large?'lg':'default'}><a href={link} target="_blank" rel="noopener noreferrer"><MessageCircle/>Falar pelo WhatsApp<ArrowUpRight className="size-4"/></a></Button>:<p className="text-sm text-muted-foreground">WhatsApp ainda não configurado.</p>;
}
export function PublicShell({children}:{children:ReactNode}) {
 const {data:settings}=useQuery(settingsQuery);
 return <div className="min-h-screen"><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4">Ir ao conteúdo</a><header className="border-b bg-background"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5"><Link to="/" aria-label="ByJohwGimenes MKT — início"><Brand/></Link><nav className="flex items-center gap-4 text-sm sm:gap-7" aria-label="Navegação principal"><Link to="/" activeOptions={{exact:true}} activeProps={{className:'text-primary'}} className="hover:text-primary">Johw</Link><Link to="/servicos" activeProps={{className:'text-primary'}} className="hover:text-primary">Serviços</Link><Link to="/contato" activeProps={{className:'text-primary'}} className="hover:text-primary">Contato</Link><Button asChild size="sm" className="hidden sm:inline-flex"><Link to="/briefing">Iniciar briefing<ArrowUpRight/></Link></Button></nav></div></header><main id="main">{children}</main><footer className="bg-ink text-ink-foreground"><div className="mx-auto max-w-6xl px-5 py-12"><div className="flex flex-wrap items-start justify-between gap-8"><Brand symbol/><nav className="flex flex-wrap gap-5 text-sm"><Link to="/servicos">Serviços</Link><Link to="/briefing">Briefing</Link><Link to="/contato">Contato</Link></nav><div className="space-y-2 text-sm text-ink-muted">{settings?.contact_email&&<a className="block" href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>}{settings?.instagram&&<p>{settings.instagram}</p>}</div></div><div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-sidebar-border pt-5 text-xs text-ink-muted"><p>© {new Date().getFullYear()} ByJohwGimenes MKT</p><Link to="/admin">Área restrita</Link></div></div></footer></div>;
}
