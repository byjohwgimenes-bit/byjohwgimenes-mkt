import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";

const works = [
  { slug: "najar-imoveis", name: "Najar Imóveis" },
  { slug: "meninos-da-vila-mogi", name: "Meninos da Vila — Mogi das Cruzes" },
  { slug: "meninos-da-vila-suzano", name: "Meninos da Vila — Suzano" },
  { slug: "f14-soccer-cup-7", name: "F14 Soccer Cup 7" },
  { slug: "k-insights", name: "K-Insights" },
];

export function SocialDesignGallery() {
  return (
    <section aria-label="Galeria de trabalhos para redes sociais" className="my-8 w-full min-w-0">
      <h3 className="text-xl font-bold">Design aplicado às redes sociais</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Uma seleção de composições com artes e perfis do meu portfólio. Clique para ampliar cada imagem.</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {works.map(work => (
          <Dialog key={work.slug}>
            <DialogTrigger asChild>
              <button type="button" aria-label={`Ampliar trabalhos de ${work.name}`} className="group min-w-0 overflow-hidden rounded-xl border bg-card text-left transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                <img src={`/portfolio-social/${work.slug}.jpg`} alt={`Composição de artes para redes sociais de ${work.name}`} width={2048} height={1549} loading="lazy" decoding="async" className="aspect-[2048/1549] h-auto w-full object-contain bg-white" />
                <span className="flex items-center justify-between gap-3 p-4 text-sm font-bold">{work.name}<Expand className="size-4 shrink-0 text-primary" aria-hidden="true"/></span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-xl p-4 sm:p-6">
              <DialogTitle className="pr-8 text-lg font-bold">{work.name}</DialogTitle>
              <DialogDescription>Trabalhos de design para redes sociais por ByJohwGimenes.</DialogDescription>
              <img src={`/portfolio-social/${work.slug}.jpg`} alt={`Composição completa de artes e perfil de ${work.name}`} width={2048} height={1549} decoding="async" className="max-h-[70dvh] h-auto w-full object-contain bg-white" />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
