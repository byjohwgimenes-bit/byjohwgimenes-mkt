import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ChevronDown, Film, Instagram, Play, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const videos = [
  {
    "id": "DesKBdkMSz6",
    "title": "Reel 01",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DesKBdkMSz6/"
  },
  {
    "id": "DeIG6FAs4dL",
    "title": "Reel 02",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DeIG6FAs4dL/"
  },
  {
    "id": "DdFGW8YByGu",
    "title": "Reel 03",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DdFGW8YByGu/"
  },
  {
    "id": "C_wChspP1bP",
    "title": "Reel 04",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/C_wChspP1bP/"
  },
  {
    "id": "DfVXy0nx62Q",
    "title": "Reel 05",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DfVXy0nx62Q/"
  },
  {
    "id": "DeP0PsOpeh_",
    "title": "Reel 06",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DeP0PsOpeh_/"
  },
  {
    "id": "DeFNDigp8E7",
    "title": "Reel 07",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DeFNDigp8E7/"
  },
  {
    "id": "DchOwCfJaSF",
    "title": "Reel 08",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DchOwCfJaSF/"
  },
  {
    "id": "DXajGoQkVFS",
    "title": "Reel 09",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DXajGoQkVFS/"
  },
  {
    "id": "DYnRVUCM66V",
    "title": "Reel 10",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DYnRVUCM66V/"
  },
  {
    "id": "2lWVG6fAGgo",
    "title": "Vídeo no YouTube",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=2lWVG6fAGgo"
  }
];
type Video = (typeof videos)[number];

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const youtube = video.platform === 'youtube';
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card">
    <div className="relative aspect-video bg-black text-white">
      {youtube && playing
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 h-full w-full border-0"/>
        : youtube
          ? <button type="button" className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary" onClick={() => setPlaying(true)} aria-label="Reproduzir vídeo do YouTube dentro do app"><Play className="size-12 text-primary" aria-hidden="true"/><span className="text-sm">Reproduzir vídeo</span></button>
          : <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary" aria-label={`Assistir ${video.title} no Instagram (nova aba)`}><Instagram className="size-12 text-primary" aria-hidden="true"/><span className="text-sm">Assistir no Instagram<ArrowUpRight className="ml-1 inline size-4" aria-hidden="true"/></span></a>}
    </div>
    <div className="flex flex-1 flex-col p-5">
      <p className="flex items-center gap-2 text-xs font-medium text-primary">{youtube ? <Youtube className="size-4" aria-hidden="true"/> : <Instagram className="size-4" aria-hidden="true"/>}{youtube ? 'YouTube' : 'Instagram Reels'}</p>
      <h3 className="mt-2 text-xl font-semibold">{video.title}</h3>
      <p className="mb-5 mt-2 text-sm text-muted-foreground">Captação e edição por Johw.</p>
      <Button asChild variant="outline" className="mt-auto w-full"><a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${video.title} no ${youtube ? 'YouTube' : 'Instagram'} (nova aba)`}>Abrir no {youtube ? 'YouTube' : 'Instagram'}<ArrowUpRight aria-hidden="true"/></a></Button>
    </div>
  </article>;
}

export function VideoPortfolio({ number, title, editing = false }: { number: string; title: string; editing?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  // Shared original links; each service highlights a different selection without duplicating videos.
  const ordered = editing ? [...videos.slice(3, 6), ...videos.slice(0, 3), ...videos.slice(6)] : videos;
  const visible = showAll ? ordered : ordered.slice(0, 3);
  return <details className="col-span-full border-t" onToggle={event => { setOpen(event.currentTarget.open); if (!event.currentTarget.open) setShowAll(false); }}>
    <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
      <span className="text-sm text-primary">{number}</span><h2 className="min-w-0 flex-1 text-lg font-semibold">{title}</h2>
      <span className="flex items-center gap-2 text-sm font-medium text-primary">{open ? 'Fechar' : 'Ver vídeos'}<ChevronDown className={`size-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true"/></span>
    </summary>
    {open && <div className="pb-10">
      <p className="mb-6 flex max-w-2xl items-start gap-3 leading-relaxed text-muted-foreground"><Film className="mt-1 size-5 shrink-0" aria-hidden="true"/><span>{editing ? 'Conheça trabalhos com edição realizada por Johw, que também assina a captação.' : 'Conheça trabalhos com captação realizada por Johw, que também assina a edição.'} Os Reels abrem no Instagram em outra aba. O vídeo do YouTube pode ser reproduzido aqui.</span></p>
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map(video => <VideoCard key={video.id} video={video}/>)}</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="outline" aria-expanded={showAll} onClick={() => setShowAll(value => !value)}>{showAll ? 'Mostrar apenas destaques' : `Ver mais trabalhos (+${videos.length - 3})`}</Button>
        <Button asChild><Link to="/briefing">Quero esse serviço<ArrowUpRight aria-hidden="true"/></Link></Button>
      </div>
    </div>}
  </details>;
}
