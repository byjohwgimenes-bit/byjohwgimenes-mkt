import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/briefing";
import { BrandingPortfolio } from "@/components/BrandingPortfolio";
import { SocialPortfolio } from "@/components/SocialPortfolio";
import { VideoPortfolio } from "@/components/VideoPortfolio";
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
                <div className="max-w-3xl pb-8">
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {serviceDescriptions[s].items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    As entregas são definidas conforme a necessidade e o escopo de cada projeto.
                  </p>
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
