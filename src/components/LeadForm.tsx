import { useState } from "react";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CUSTOM_PLAN, plansQuery, settingsQuery } from "@/lib/site-data";
import { buildLeadMessage, whatsappLink } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  business_name: z.string().trim().min(2, "Informe o nome do negócio").max(120),
  segment: z.string().trim().min(2, "Informe o segmento").max(100),
  city: z.string().trim().min(2, "Informe a cidade").max(100),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{8,20}$/, "Informe um WhatsApp válido, com DDD"),
  instagram: z.string().trim().max(100).optional(),
  plan_interest: z.string().min(1, "Escolha um plano"),
  goal: z.string().trim().min(2, "Conte seu principal objetivo").max(200),
  needs: z.string().trim().max(1500).optional(),
  consent: z.literal(true, { message: "É preciso autorizar o uso dos dados para o contato" }),
});
type Form = z.input<typeof schema>;

const empty: Form = {
  name: "", business_name: "", segment: "", city: "", whatsapp: "",
  instagram: "", plan_interest: "", goal: "", needs: "", consent: false as unknown as true,
};

export function LeadForm({ plan, onPlanChange }: { plan: string; onPlanChange: (p: string) => void }) {
  const { data: plans = [] } = useQuery(plansQuery);
  const { data: settings } = useQuery(settingsQuery);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const values = { ...form, plan_interest: plan };
  const set = (k: keyof Form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const d = parsed.data;
    const { error } = await supabase.from("leads").insert({
      ...d,
      instagram: d.instagram || null,
      needs: d.needs || null,
    });
    setSending(false);
    if (error) {
      setSubmitError("Não foi possível enviar agora. Tente novamente em instantes.");
      return;
    }
    setSentMessage(buildLeadMessage(d));
  }

  if (sentMessage !== null) {
    const link = whatsappLink(settings?.whatsapp_number, sentMessage);
    return (
      <div className="rounded-lg border-2 border-ink bg-card p-6 shadow-pop md:p-8">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-8 text-ink" />
          <h3 className="text-2xl font-bold">Recebemos sua solicitação!</h3>
        </div>
        <p className="mt-3 text-muted-foreground">
          Seus dados foram enviados. Para agilizar, continue a conversa pelo WhatsApp. Revise a mensagem abaixo — você pode editá-la antes de enviar.
        </p>
        <Label htmlFor="wa-msg" className="mt-5 block">Mensagem para o WhatsApp</Label>
        <Textarea id="wa-msg" rows={8} className="mt-2" value={sentMessage} onChange={(e) => setSentMessage(e.target.value)} />
        {link ? (
          <Button asChild variant="hero" size="lg" className="mt-5 w-full sm:w-auto">
            <a href={link} target="_blank" rel="noopener noreferrer"><MessageCircle /> Continuar no WhatsApp</a>
          </Button>
        ) : (
          <p className="mt-5 rounded-md bg-muted p-4 text-sm">
            O contato por WhatsApp ainda está em configuração. Sua solicitação foi registrada e retornaremos pelo número informado.
          </p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">O WhatsApp abre com a mensagem preenchida; nada é enviado automaticamente.</p>
      </div>
    );
  }

  const field = (k: keyof Form, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} className="mt-1.5" value={String(form[k] ?? "")} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-lg border-2 border-ink bg-card p-6 shadow-pop md:grid-cols-2 md:p-8">
      {field("name", "Seu nome *", { autoComplete: "name", maxLength: 100 })}
      {field("business_name", "Nome do negócio *", { maxLength: 120 })}
      {field("segment", "Segmento ou tipo de negócio *", { placeholder: "Ex.: confeitaria, salão, loja", maxLength: 100 })}
      {field("city", "Cidade *", { placeholder: "Ex.: Mogi das Cruzes", maxLength: 100 })}
      {field("whatsapp", "WhatsApp para contato *", { type: "tel", placeholder: "(11) 90000-0000", maxLength: 20 })}
      {field("instagram", "Instagram do negócio (opcional)", { placeholder: "@seunegocio", maxLength: 100 })}
      <div className="md:col-span-2">
        <Label htmlFor="plan_interest">Plano de interesse *</Label>
        <select
          id="plan_interest"
          value={plan}
          onChange={(e) => onPlanChange(e.target.value)}
          className="mt-1.5 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="">Selecione…</option>
          {plans.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
          <option value={CUSTOM_PLAN}>{CUSTOM_PLAN}</option>
        </select>
        {errors.plan_interest && <p className="mt-1 text-sm text-destructive">{errors.plan_interest}</p>}
      </div>
      <div className="md:col-span-2">{field("goal", "Principal objetivo com as redes sociais *", { placeholder: "Ex.: ter uma frequência de posts", maxLength: 200 })}</div>
      <div className="md:col-span-2">
        <Label htmlFor="needs">Conte um pouco sobre suas necessidades</Label>
        <Textarea id="needs" rows={4} maxLength={1500} className="mt-1.5" value={form.needs ?? ""} onChange={(e) => set("needs", e.target.value)} />
      </div>
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <Checkbox checked={!!form.consent} onCheckedChange={(c) => set("consent", c === true)} className="mt-0.5" />
          <span>Autorizo a ByJohwGimenes MKT a usar estes dados apenas para entrar em contato sobre esta solicitação. *</span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-destructive">{errors.consent}</p>}
      </div>
      {submitError && <p className="text-sm text-destructive md:col-span-2">{submitError}</p>}
      <div className="md:col-span-2">
        <Button type="submit" variant="hero" size="lg" disabled={sending} className="w-full sm:w-auto">
          {sending ? "Enviando…" : "Enviar meu interesse"}
        </Button>
      </div>
    </form>
  );
}
