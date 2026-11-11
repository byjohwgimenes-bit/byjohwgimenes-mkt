import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, PDFDocumentLoadingTask, RenderTask } from 'pdfjs-dist';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, LoaderCircle, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ORIGINAL_PDFS, type PORTFOLIO } from '@/lib/portfolio';
import { boundedPage, boundedZoom, MIN_ZOOM, MAX_ZOOM } from '@/lib/portfolio-reader';

type Project = (typeof PORTFOLIO)[number];

export function PortfolioReader({ project }: { project: Project }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.max(1, entry.contentRect.width - 32));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let disposed = false;
    let task: PDFDocumentLoadingTask | undefined;
    const controller = new AbortController();
    setPdf(null);
    setBusy(true);
    setError(false);
    async function load() {
      try {
        const [engine, worker] = await Promise.all([
          import('pdfjs-dist'),
          import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
        ]);
        if (disposed) return;
        engine.GlobalWorkerOptions.workerSrc = worker.default;
        const response = await fetch(ORIGINAL_PDFS[project.slug].url, { signal: controller.signal });
        if (!response.ok) throw new Error('PDF unavailable');
        const data = new Uint8Array(await response.arrayBuffer());
        if (data.byteLength !== project.bytes || new TextDecoder().decode(data.subarray(0, 5)) !== '%PDF-') throw new Error('Incomplete PDF');
        if (disposed) return;
        const loadingTask = engine.getDocument({ data, useWasm: false });
        task = loadingTask;
        const document = await loadingTask.promise;
        if (disposed) return;
        if (document.numPages !== project.pages) throw new Error('Unexpected page count');
        setPdf(document);
      } catch {
        if (!disposed) { setError(true); setBusy(false); }
      }
    }
    void load();
    return () => { disposed = true; controller.abort(); void task?.destroy(); };
  }, [project, retry]);

  useEffect(() => {
    if (!pdf || !width) return;
    let disposed = false;
    let task: RenderTask | undefined;
    setBusy(true);
    setError(false);
    viewportRef.current?.scrollTo(0, 0);
    async function render() {
      try {
        const pdfPage = await pdf?.getPage(page);
        const canvas = canvasRef.current;
        if (disposed || !canvas || !pdfPage) return;
        const original = pdfPage.getViewport({ scale: 1 });
        const scale = Math.min(width / original.width, 1.6) * zoom;
        const viewport = pdfPage.getViewport({ scale });
        const density = Math.min(window.devicePixelRatio || 1, 2, 4096 / Math.max(viewport.width, viewport.height));
        canvas.width = Math.ceil(viewport.width * density);
        canvas.height = Math.ceil(viewport.height * density);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        task = pdfPage.render({ canvas, viewport, transform: [density, 0, 0, density, 0, 0] });
        await task.promise;
        if (!disposed) setBusy(false);
      } catch {
        if (!disposed) { setError(true); setBusy(false); }
      }
    }
    void render();
    return () => { disposed = true; task?.cancel(); };
  }, [pdf, page, zoom, width]);

  const navigate = (next: number) => setPage(boundedPage(next, project.pages));
  return <DialogContent aria-describedby={undefined} className="flex h-[94dvh] w-[calc(100%-1rem)] max-w-6xl flex-col gap-0 overflow-hidden rounded-lg p-0" onKeyDown={(event) => {
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
    <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-auto bg-muted" aria-busy={busy}>
      {(busy || error) && <div className="sticky left-0 top-0 z-10 flex min-h-16 items-center justify-center gap-3 bg-background p-4" role={error ? 'alert' : 'status'}>
        {error ? <><span>Não foi possível carregar o projeto.</span><Button variant="outline" onClick={() => setRetry((value) => value + 1)}><RotateCcw />Repetir</Button></> : <><LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" />Carregando página…</>}
      </div>}
      <div className="flex min-w-full w-max justify-center p-4">
        <canvas ref={canvasRef} role="img" aria-label={`Página ${page} de ${project.pages} — ${project.name}`} className={busy || error ? 'invisible' : 'block bg-background'} />
      </div>
    </div>
  </DialogContent>;
}