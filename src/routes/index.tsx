import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, CalendarCheck, MessageCircle, PenTool, Sparkles, ClipboardList, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { CUSTOM_PLAN, plansQuery, settingsQuery } from "@/lib/site-data";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ByJohwGimenes MKT — Planos de social media para pequenos negócios" },
      { name: "description", content: "Planejamento e conteúdo para sua marca se comunicar com clareza nas redes sociais. Conheça os planos mensais." },
      { property: "og:title", content: "ByJohwGimenes MKT — Planos de social media" },
      { property: "og:description", content: "Planejamento e conteúdo para pequenos negócios nas redes sociais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#contato", label: "Contato" },
];

function Logo() {
  // Espaço reservado para a logo oficial: substitua este bloco por <img src={logo} alt="ByJohwGimenes MKT" />
  return (
    <a href="#" className="flex items-center gap-2 font-display text-lg font-extrabold text-ink-foreground">
      <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">BJ</span>
      ByJohwGimenes <span className="text-primary">MKT</span>
    </a>
  );
}

function Index() {
  const { data: plans = [] } = useQuery(plansQuery);
  const { data: settings } = useQuery(settingsQuery);
  const [plan, setPlan] = useState("");
  const wa = whatsappLink(settings?.whatsapp_number, "Olá! Vim pelo site da ByJohwGimenes MKT e gostaria de saber mais sobre os planos.");

  const choose = (p: string) => {
    setPlan(p);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-sidebar-border bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Logo />
          <nav className="hidden gap-7 text-sm font-medium text-ink-muted md:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="hover:text-primary">{n.label}</a>)}
          </nav>
          <Button asChild size="sm" className="hidden font-semibold sm:inline-flex"><a href="#planos">Quero conhecer os planos</a></Button>
        </div>
      </header>

      <section className="grid-lines relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sidebar-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="size-3.5" /> Social media para pequenos negócios
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] md:text-7xl">
            Seu negócio merece uma presença digital que <span className="text-primary">faça sentido.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">
            Planejamento e conteúdo para ajudar sua marca a se comunicar com clareza nas redes sociais.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg"><a href="#planos">Conhecer os planos <ArrowRight /></a></Button>
            {wa ? (
              <Button asChild variant="inkOutline" size="lg"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar pelo WhatsApp</a></Button>
            ) : (
              <Button variant="inkOutline" size="lg" onClick={() => choose("")}><MessageCircle /> Falar pelo WhatsApp</Button>
            )}
          </div>
          {!wa && <p className="mt-3 text-xs text-ink-muted">WhatsApp em configuração — deixe seu contato pelo formulário.</p>}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">Sem tempo para pensar no que postar?</h2>
          <p className="mt-4 text-muted-foreground">
            Muitos pequenos negócios sabem que precisam estar nas redes, mas o dia a dia não deixa espaço para planejar conteúdo, criar artes e manter uma frequência de publicações.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: CalendarCheck, t: "Planejamento", d: "Organizamos o que comunicar e quando, de acordo com o seu negócio." },
            { icon: PenTool, t: "Criação de conteúdo", d: "Textos e artes pensados para a sua marca falar com clareza." },
            { icon: Handshake, t: "Acompanhamento próximo", d: "Entregas combinadas com você, sem fórmulas prontas." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="flex gap-4 rounded-lg border bg-card p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent"><I className="size-5" /></span>
              <div><h3 className="font-bold">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-16 border-y bg-muted">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">Como funciona</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              "Você conta sobre o seu negócio.",
              "Escolhe um plano ou solicita uma proposta.",
              "Conversa com a ByJohwGimenes MKT pelo WhatsApp.",
              "Após o acordo, as entregas são alinhadas com você.",
            ].map((s, i) => (
              <li key={s} className="rounded-lg border-2 border-ink bg-card p-5">
                <span className="font-display text-5xl font-black text-primary [-webkit-text-stroke:1.5px_var(--ink)]">{i + 1}</span>
                <p className="mt-3 font-semibold">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20">
        <h2 className="text-3xl font-extrabold md:text-4xl">Planos</h2>
        <p className="mt-3 text-muted-foreground">Escolha um ponto de partida. Os detalhes são ajustados na conversa.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <article key={p.id} className={`flex flex-col rounded-lg border-2 border-ink p-6 ${i === 1 ? "bg-ink text-ink-foreground shadow-pop" : "bg-card"}`}>
              <h3 className="text-2xl font-extrabold">{p.name}</h3>
              <p className={`mt-3 flex-1 text-sm ${i === 1 ? "text-ink-muted" : "text-muted-foreground"}`}>{p.description}</p>
              <div className="mt-6 space-y-1 text-sm">
                {p.price || p.deliveries ? (
                  <>
                    {p.price && <p className="font-display text-xl font-bold">{p.price}</p>}
                    {p.deliveries && <p className="whitespace-pre-line">{p.deliveries}</p>}
                  </>
                ) : (
                  <p className="font-semibold">Valores e entregas sob consulta</p>
                )}
              </div>
              <Button variant={i === 1 ? "default" : "secondary"} className="mt-6 font-semibold" onClick={() => choose(p.name)}>
                Quero este plano
              </Button>
            </article>
          ))}
        </div>
        <button onClick={() => choose(CUSTOM_PLAN)} className="mt-6 flex w-full items-center justify-between rounded-lg border-2 border-dashed border-ink p-5 text-left font-semibold hover:bg-accent">
          <span className="flex items-center gap-3"><ClipboardList className="size-5" /> Quero uma proposta personalizada</span>
          <ArrowRight className="size-5" />
        </button>
      </section>

      <section id="contato" className="scroll-mt-16 bg-primary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-extrabold md:text-4xl">Vamos conversar sobre o seu negócio?</h2>
            <p className="mt-4">Explique sua necessidade e, depois de enviar, continue a conversa pelo WhatsApp com uma mensagem já preenchida.</p>
            <p className="mt-6 text-sm">Seus dados são usados apenas para responder a esta solicitação e não são compartilhados.</p>
          </div>
          <div className="md:col-span-3"><LeadForm plan={plan} onPlanChange={setPlan} /></div>
        </div>
      </section>

      <footer className="bg-ink text-ink-muted">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <Logo />
          <nav className="flex flex-wrap gap-5 text-sm">
            {nav.map((n) => <a key={n.href} href={n.href} className="hover:text-primary">{n.label}</a>)}
          </nav>
          <div className="space-y-1 text-sm">
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">WhatsApp</a>}
            {settings?.contact_email && <a href={`mailto:${settings.contact_email}`} className="block hover:text-primary">{settings.contact_email}</a>}
            {settings?.instagram && <span className="block">{settings.instagram}</span>}
            {!wa && !settings?.contact_email && !settings?.instagram && <span>Contato em configuração</span>}
          </div>
        </div>
        <div className="border-t border-sidebar-border py-4 text-center text-xs">
          © {new Date().getFullYear()} ByJohwGimenes MKT · <Link to="/admin" className="hover:text-primary">Área restrita</Link>
        </div>
      </footer>
    </div>
  );
}
