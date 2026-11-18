import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTFOLIO } from "@/lib/portfolio";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PortfolioReader } from "@/components/PortfolioReader";

export function BrandingPortfolio({ number }: { number: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="col-span-full border-t"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
        <span className="text-sm text-primary">{number}</span>
        <h2 className="min-w-0 flex-1 text-lg font-semibold">Branding e identidade visual</h2>
        <span className="flex items-center gap-2 text-sm font-medium text-primary">
          {open ? "Fechar" : "Ver projetos"}
          <ChevronDown
            className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </summary>
      {open && (
        <div className="pb-10">
          <div className="mb-8 max-w-3xl space-y-4">
            <p className="text-xl font-bold">
              Uma identidade que traduz a essência do seu negócio.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Criação de logotipos com personalidade, propósito e reconhecimento.</li>
              <li>
                Desenvolvimento de uma identidade visual consistente com o posicionamento da marca.
              </li>
              <li>
                Definição de paleta de cores, tipografia e elementos gráficos que trabalham em
                conjunto.
              </li>
              <li>
                Manual da marca para orientar aplicações e preservar a consistência visual, quando
                previsto no projeto.
              </li>
            </ul>
            <p className="leading-relaxed text-muted-foreground">
              Em um período inferior a um ano, desenvolvi mais de 12 identidades visuais únicas e
              estratégicas, cada uma pensada para representar com autenticidade a essência de cada
              negócio.
            </p>
            <h3 className="pt-2 text-lg font-bold">Conheça alguns trabalhos</h3>
          </div>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((project) => (
              <article
                key={project.slug}
                className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card text-card-foreground"
              >
                <div className="relative aspect-[4/3] shrink-0 bg-muted">
                  <img
                    src={project.cover}
                    alt={`Primeira página do PDF de ${project.name}`}
                    loading="lazy"
                    decoding="async"
                    width={1000}
                    height={750}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 text-xs font-medium text-primary">{project.category}</p>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mb-4 mt-4 text-xs text-muted-foreground">
                    {project.pages} {project.pages === 1 ? "página" : "páginas"} · {project.size}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mt-auto w-full"
                        aria-label={`Ver projeto de ${project.name}`}
                      >
                        Ver projeto
                        <ArrowUpRight aria-hidden="true" />
                      </Button>
                    </DialogTrigger>
                    <PortfolioReader project={project} />
                  </Dialog>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link to="/briefing">
                Quero um projeto assim
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </details>
  );
}
