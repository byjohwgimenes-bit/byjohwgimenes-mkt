import { useState } from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, LoaderCircle, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { PORTFOLIO } from '@/lib/portfolio';
import { boundedPage, boundedZoom, MIN_ZOOM, MAX_ZOOM } from '@/lib/portfolio-reader';

type Project = (typeof PORTFOLIO)[number];

export function PortfolioReader({ project }: { project: Project }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const navigate = (next: number) => {
    const target = boundedPage(next, project.pages);
    if (target !== page) { setBusy(true); setError(false); setPage(target); }
  };
  return <DialogContent aria-describedby={undefined} className="flex h-[94dvh] w-[calc(100%-1rem)] max-w-6xl sm:max-w-6xl flex-col gap-0 overflow-hidden rounded-lg p-0" onKeyDown={(event) => {
    if (event.target instanceof HTMLInputElement) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      navigate(event.key === 'Home' ? 1 : event.key === 'End' ? project.pages : page + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }}>
    <header className="border-b px-4 py-5 pr-12"><DialogTitle className="leading-snug">{project.name}</DialogTitle></header>
    <div className="flex flex-wrap items-center justify-center gap-2 border-b p-2">
      <Button size="icon" variant="outline" title="Primeira página" aria-label="Primeira página" disabled={page === 1} onClick={() => navigate(1)}><ChevronFirst /></Button>
      <Button size="icon" variant="outline" title="Página anterior" aria-label="Página anterior" disabled={page === 1} onClick={() => navigate(page - 1)}><ChevronLeft /></Button>
      <span className="w-24 text-center text-sm tabular-nums" aria-live="polite">{page} / {project.pages}</span>
      <Button size="icon" variant="outline" title="Próxima página" aria-label="Próxima página" disabled={page === project.pages} onClick={() => navigate(page + 1)}><ChevronRight /></Button>
      <Button size="icon" variant="outline" title="Última página" aria-label="Última página" disabled={page === project.pages} onClick={() => navigate(project.pages)}><ChevronLast /></Button>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" title="Diminuir zoom" aria-label="Diminuir zoom" disabled={zoom === MIN_ZOOM} onClick={() => setZoom(boundedZoom(zoom - .25))}><ZoomOut /></Button>
        <Button variant="ghost" className="w-16 tabular-nums" title="Ajustar à largura" aria-label="Ajustar à largura" onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</Button>
        <Button size="icon" variant="outline" title="Aumentar zoom" aria-label="Aumentar zoom" disabled={zoom === MAX_ZOOM} onClick={() => setZoom(boundedZoom(zoom + .25))}><ZoomIn /></Button>
      </div>
    </div>
    <div className="relative min-h-0 flex-1 overflow-auto bg-muted" aria-busy={busy}>
      {(busy || error) && <div className="sticky left-0 top-0 z-10 flex min-h-16 items-center justify-center gap-3 bg-background p-4" role={error ? 'alert' : 'status'}>
        {error ? <><span>Não foi possível carregar o projeto.</span><Button variant="outline" onClick={() => { setBusy(true); setError(false); setRetry((value) => value + 1); }}><RotateCcw />Repetir</Button></> : <><LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" />Carregando página…</>}
      </div>}
      <div className="p-4" style={{ width: `${zoom * 100}%`, minWidth: '100%' }}>
        <img key={`${project.slug}-${page}-${retry}`} src={`/portfolio-pages/${project.slug}/${page}.jpg`} alt={`Página ${page} de ${project.pages} — ${project.name}`} decoding="async" onLoad={() => { setBusy(false); setError(false); }} onError={() => { setBusy(false); setError(true); }} style={{ width: '100%', maxWidth: 'none', height: 'auto' }} className={error ? 'hidden' : 'block bg-background'} />
      </div>
    </div>
  </DialogContent>;
}