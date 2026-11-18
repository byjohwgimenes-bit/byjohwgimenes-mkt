import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/briefing";
import { BrandingPortfolio } from "@/components/BrandingPortfolio";
import { SocialPortfolio } from "@/components/SocialPortfolio";
import { VideoPortfolio } from "@/components/VideoPortfolio";
import { SocialDesignGallery } from "@/components/SocialDesignGallery";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de branding, conteúdo e audiovisual — ByJohwGimenes." },
      {
        name: "description",
        content:
          "Branding, design, redes sociais, vídeos e anúncios. Atendimento personalizado para sua marca.",
      },
      { property: "og:title", content: "Serviços — ByJohwGimenes." },
      {
        property: "og:description",
        content: "Identidade, presença digital e produção audiovisual para o seu projeto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ServicesPage,
});
const additionalDescriptions: Record<string, string> = {
  [SERVICES[2]]:
    "Crio conteúdo para feed, stories, carrosséis e Reels, conectando a mensagem da marca aos interesses do público e aos objetivos da comunicação.",
  [SERVICES[7]]:
    "Edito imagens para que os materiais da sua marca tenham uma apresentação consistente e adequada aos canais em que serão utilizados.",
  [SERVICES[8]]:
    "Planejo e gerencio anúncios no Instagram e no Facebook para aproximar sua oferta do público desejado, de acordo com os objetivos e a verba de cada projeto.",
};
const serviceDescriptions: Record<string, { intro: string; items: string[] }> = {
  [SERVICES[3]]: {
    intro:
      "Design que dá forma à sua mensagem. Crio peças visuais que valorizam sua marca, apresentam suas ofertas com clareza e mantêm uma comunicação consistente em cada ponto de contato.",
    items: [
      "Criação de peças para redes sociais, anúncios e stories, alinhadas à identidade visual.",
      "Artes promocionais, institucionais e editoriais.",
      "Templates personalizados para uso recorrente.",
    ],
  },
  [SERVICES[4]]: {
    intro:
      "Seu negócio mais fácil de encontrar e conhecer. Organizo o Perfil da Empresa no Google para apresentar informações relevantes, valorizar seus serviços e facilitar o contato de quem procura por você.",
    items: [
      "Otimização completa do Perfil da Empresa no Google (antigo Google Meu Negócio).",
      "Inserção de fotos, produtos ou serviços, horários e localização.",
      "Publicações estratégicas para atrair novos clientes.",
    ],
  },
  [SERVICES[9]]: {
    intro:
      "Sua oferta em destaque para quem busca soluções como a sua. Estruturo campanhas no Google Ads com foco em tráfego qualificado, alinhadas aos objetivos e ao investimento disponível para o projeto.",
    items: [
      "Criação de campanhas de anúncios no Google.",
      "Acompanhamento básico do desempenho dos anúncios.",
    ],
  },
};
function ServicesPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="mb-4 text-sm font-bold text-primary">ESTRATÉGIA ENCONTRA CRIAÇÃO</p>
        <h1 className="text-4xl font-bold sm:text-5xl">Serviços</h1>
        <div className="mt-12 grid grid-cols-1">
          {SERVICES.slice(0, -1).map((s, i) =>
            s === SERVICES[0] ? (
              <BrandingPortfolio key={s} number={String(i + 1).padStart(2, "0")} />
            ) : s === SERVICES[1] ? (
              <SocialPortfolio key={s} number={String(i + 1).padStart(2, "0")} />
            ) : s === SERVICES[5] || s === SERVICES[6] ? (
              <VideoPortfolio
                key={s}
                number={String(i + 1).padStart(2, "0")}
                title={s}
                editing={s === SERVICES[6]}
              />
            ) : s === SERVICES[2] ? (
              <details key={s} className="group/content border-t">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="min-w-0 flex-1 text-lg font-bold">{s}</h2>
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span className="group-open/content:hidden">Ver projetos</span>
                    <span className="hidden group-open/content:inline">Fechar projetos</span>
                    <ChevronDown className="size-4 transition-transform group-open/content:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                  <p className="basis-full max-w-3xl text-base font-normal leading-relaxed text-muted-foreground">{additionalDescriptions[s]}</p>
                </summary>
                <div className="pb-8">
                  <SocialDesignGallery />
                  <Button asChild><Link to="/briefing">Quero esse serviço<ArrowUpRight aria-hidden="true" /></Link></Button>
                </div>
              </details>
            ) : serviceDescriptions[s] ? (
              <details key={s} className="border-t">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="min-w-0 flex-1 text-lg font-bold">{s}</h2>
                  <span className="text-sm font-semibold text-primary">Ver entregas</span>
                  <p className="basis-full max-w-3xl text-base font-normal leading-relaxed text-muted-foreground">
                    {serviceDescriptions[s].intro}
                  </p>
                </summary>
                <div className="pb-8">
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {serviceDescriptions[s].items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    As entregas são definidas conforme a necessidade e o escopo de cada projeto.
                  </p>
                  {s === SERVICES[3] && <SocialDesignGallery />}
                  {s === SERVICES[4] && (
                    <article className="mt-6 max-w-2xl overflow-hidden rounded-xl border bg-card">
                      <div className="flex h-36 items-center justify-center bg-black p-5">
                        <img src="/clientes/najar-imoveis.png" alt="Najar Imóveis" width={1536} height={1536} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">Exemplo do portfólio</p>
                        <h3 className="mt-2 text-xl font-bold">Najar Imóveis no Google</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Conheça o Perfil da Empresa da Najar Imóveis no Google e veja um exemplo da presença digital trabalhada por Johw.</p>
                        <Button asChild variant="outline" className="mt-5">
                          <a href="https://www.google.com/search?sca_esv=584265682&sxsrf=AM9HkKkXsv2asRbRYUy1BOgmjTpXfF0WBg%3A1700568049365&q=Roberto%20Najar%20Im%C3%B3veis&stick=H4sIAAAAAAAAAONgU1I1qLA0SU5JsTBONUtJNjGxMLG0MqgwTE5KMzJLSTI2SrEwN0w2W8QqFpSflFpUkq_gl5iVWKTgmXt4c1lqZjEAbPdsjkIAAAA&mat=CXztsALVW0ek&ved=2ahUKEwiEqP7ThdWCAxWJqZUCHXloBnkQrMcEegQICBAH" target="_blank" rel="noopener noreferrer" aria-label="Ver perfil da Najar Imóveis no Google (nova aba)">Ver perfil no Google<ArrowUpRight aria-hidden="true" /></a>
                        </Button>
                      </div>
                    </article>
                  )}
                  <Button asChild className="mt-6">
                    <Link to="/briefing">
                      Quero esse serviço
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </details>
            ) : (
              <div key={s} className="flex flex-wrap items-center gap-5 border-t py-6">
                <span className="text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-bold">{s}</h2>
                <p className="basis-full max-w-3xl leading-relaxed text-muted-foreground">
                  {additionalDescriptions[s]}
                </p>
              </div>
            ),
          )}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <p className="max-w-lg text-muted-foreground">
            Uma necessidade específica ou ainda buscando orientação? Vamos entender o seu projeto.
          </p>
          <Button asChild size="lg">
            <Link to="/briefing">
              Preencher briefing
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </PublicShell>
  );
}
