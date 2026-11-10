import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicShell } from '@/components/PublicShell';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
export const Route=createFileRoute('/cases_/najar-imoveis')({head:()=>({meta:[{title:'Case Najar Imóveis — ByJohwGimenes.'},{name:'description',content:'Estratégia de marketing e criação visual nas redes da Najar Imóveis, com atuação de Johw desde agosto de 2022.'},{property:'og:title',content:'CASE DE SUCESSO — Najar Imóveis'},{property:'og:description',content:'A trajetória de marketing e criação visual com Najar Imóveis desde agosto de 2022.'},{property:'og:type',content:'article'},{name:'twitter:card',content:'summary'}]}),component:Najar});
function Najar() {
  return <PublicShell><article className="mx-auto max-w-6xl px-5 py-16">
    <Link to="/cases" className="text-sm text-muted-foreground">← Todos os cases</Link>
    <p className="mt-10 text-sm font-semibold text-primary">CASE DE SUCESSO</p>
    <h1 className="mt-5 max-w-4xl text-5xl font-bold sm:text-7xl">Najar Imóveis</h1>
    <p className="mt-6 max-w-2xl text-xl leading-relaxed">Design estratégico, identidade e consistência para fortalecer a presença de uma marca no digital.</p>
    <section className="mt-14 grid gap-8 md:grid-cols-[1fr_2fr]">
      <h2 className="text-3xl font-bold">Estratégia e criação desde 2022</h2>
      <p className="leading-relaxed">Desde agosto de 2022, sou responsável por toda a estratégia de marketing e criação visual da Najar Imóveis nas redes sociais.</p>
    </section>
    <section className="mt-12 grid gap-8 border-t pt-10 md:grid-cols-[1fr_2fr]">
      <h2 className="text-3xl font-bold">Uma comunicação com identidade</h2>
      <div className="space-y-5 leading-relaxed"><p>O perfil no Instagram, que tinha cerca de 2.500 seguidores, passou por uma transformação completa após o rebranding da empresa.</p><p>Estruturei toda a comunicação com um padrão visual consistente, aplicando a identidade da marca em posts, stories, banners, placas, e-mails e materiais gráficos.</p></div>
    </section>
    <section className="mt-12 border-t pt-10">
      <h2 className="text-3xl font-bold">Resultados apresentados</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6"><p className="text-4xl font-bold text-primary">+10 mil</p><h3 className="mt-3 text-xl font-semibold">Seguidores no Instagram</h3><p className="mt-3 text-muted-foreground">Evolução a partir de cerca de 2.500 seguidores, com crescimento orgânico e diário informado por Johw.</p></div>
        <div className="rounded-lg border p-6"><p className="text-4xl font-bold text-primary">450–600 mil</p><h3 className="mt-3 text-xl font-semibold">Contas alcançadas por mês</h3><p className="mt-3 text-muted-foreground">Faixa de alcance mensal informada para o perfil da Najar Imóveis.</p></div>
        <div className="rounded-lg border p-6"><p className="text-2xl font-bold text-primary">Presença de marca</p><h3 className="mt-3 text-xl font-semibold">Reconhecimento no mercado local</h3><p className="mt-3 text-muted-foreground">Uma presença digital que Johw descreve como consolidada e referência no setor imobiliário local.</p></div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Dados e avaliação fornecidos por Johw para este case. O período de referência das métricas e a composição do alcance entre orgânico e pago ainda não foram especificados.</p>
    </section>
    <section className="mt-12 grid gap-8 border-t pt-10 md:grid-cols-[1fr_2fr]">
      <h2 className="text-3xl font-bold">Por que é um case de sucesso?</h2>
      <div className="space-y-5 leading-relaxed"><p>O projeto reúne estratégia de marketing e uma identidade visual aplicada de forma consistente em diferentes pontos de contato. Essa continuidade conecta a comunicação das redes sociais aos materiais da empresa.</p><p>A evolução do perfil e o alcance informado acompanham essa trajetória. Mais do que peças isoladas, o trabalho apresenta uma comunicação organizada e reconhecível.</p><p>Esse case demonstra como design estratégico e consistência visual podem elevar o valor e a autoridade de uma marca no digital.</p></div>
    </section>
    <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t pt-10"><h2 className="text-3xl font-bold">Vamos construir a presença da sua marca?</h2><Button asChild size="lg"><Link to="/briefing">Iniciar briefing<ArrowUpRight/></Link></Button></div>
  </article></PublicShell>;
}
