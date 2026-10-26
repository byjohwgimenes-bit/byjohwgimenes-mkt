import { Fragment, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { plansQuery, settingsQuery } from "@/lib/site-data";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type LeadStatus = Database["public"]["Enums"]["lead_status"];
type ClientStatus = Database["public"]["Enums"]["client_status"];
type DeliveryStatus = Database["public"]["Enums"]["delivery_status"];

export const LEAD_STATUS: Record<LeadStatus, string> = {
  novo: "Novo", em_atendimento: "Em atendimento", proposta_enviada: "Proposta enviada", cliente: "Cliente", nao_avancou: "Não avançou",
};
const CLIENT_STATUS: Record<ClientStatus, string> = { ativo: "Ativo", pausado: "Pausado", encerrado: "Encerrado" };
const DELIVERY_STATUS: Record<DeliveryStatus, string> = { pendente: "Pendente", em_andamento: "Em andamento", concluido: "Concluído" };

const sel = "h-9 rounded-md border border-input bg-background px-2 text-sm";
const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

function useLeads() {
  return useQuery({ queryKey: ["admin", "leads"], queryFn: async () => {
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) throw error; return data;
  }});
}
function useClients() {
  return useQuery({ queryKey: ["admin", "clients"], queryFn: async () => {
    const { data, error } = await supabase.from("clients").select("*, lead:leads(name, business_name, whatsapp, city, instagram, segment)").order("created_at", { ascending: false });
    if (error) throw error; return data;
  }});
}
function useDeliveries() {
  return useQuery({ queryKey: ["admin", "deliveries"], queryFn: async () => {
    const { data, error } = await supabase.from("deliveries").select("*, client:clients(id, lead:leads(business_name))").order("due_date", { ascending: true, nullsFirst: false });
    if (error) throw error; return data;
  }});
}

export function AdminPanel({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="font-display text-lg font-extrabold">ByJohwGimenes <span className="text-primary">MKT</span> · Painel</span>
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <span className="hidden sm:inline">{email}</span>
            <Button size="sm" onClick={() => supabase.auth.signOut()}>Sair</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">
        <Tabs defaultValue="overview">
          <TabsList className="flex h-auto flex-wrap justify-start">
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="deliveries">Entregas e lembretes</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><Overview /></TabsContent>
          <TabsContent value="leads"><Leads /></TabsContent>
          <TabsContent value="clients"><Clients /></TabsContent>
          <TabsContent value="deliveries"><Deliveries /></TabsContent>
          <TabsContent value="settings"><Settings /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Overview() {
  const { data: leads = [] } = useLeads();
  const { data: clients = [] } = useClients();
  const { data: deliveries = [] } = useDeliveries();
  const stats = [
    ["Total de leads", leads.length],
    ["Leads novos", leads.filter((l) => l.status === "novo").length],
    ["Em atendimento", leads.filter((l) => l.status === "em_atendimento").length],
    ["Clientes ativos", clients.filter((c) => c.status === "ativo").length],
  ] as const;
  const pending = deliveries.filter((d) => d.status !== "concluido").slice(0, 6);
  return (
    <div className="mt-6 space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-lg border-2 border-ink bg-card p-5">
            <p className="text-sm text-muted-foreground">{l}</p>
            <p className="font-display text-4xl font-black">{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card p-5">
        <h2 className="text-lg font-bold">Próximas entregas e lembretes</h2>
        <p className="text-xs text-muted-foreground">Lembretes aparecem apenas aqui no painel — não há envio automático de notificações.</p>
        {pending.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Nenhum item pendente.</p> : (
          <ul className="mt-4 divide-y">
            {pending.map((d) => (
              <li key={d.id} className="flex flex-wrap justify-between gap-2 py-2 text-sm">
                <span><b>{d.client?.lead?.business_name}</b> — {d.description}</span>
                <span className="text-muted-foreground">{d.due_date ? new Date(d.due_date + "T00:00").toLocaleDateString("pt-BR") : "Sem data"} · {DELIVERY_STATUS[d.status]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Leads() {
  const { data: leads = [], isLoading } = useLeads();
  const [open, setOpen] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<LeadStatus | "">("");
  const list = filter ? leads.filter((l) => l.status === filter) : leads;
  return (
    <div className="mt-6 rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <h2 className="font-bold">Leads</h2>
        <select className={sel} value={filter} onChange={(e) => setFilter(e.target.value as LeadStatus | "")}>
          <option value="">Todos os status</option>
          {Object.entries(LEAD_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      {isLoading ? <p className="p-4 text-sm">Carregando…</p> : list.length === 0 ? <p className="p-4 text-sm text-muted-foreground">Nenhum lead ainda.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left"><tr>{["Nome", "Negócio", "Plano", "Data", "Status", ""].map((h) => <th key={h} className="px-4 py-2 font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {list.map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="px-4 py-2">{l.name}</td>
                  <td className="px-4 py-2">{l.business_name}</td>
                  <td className="px-4 py-2">{l.plan_interest}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{fmt(l.created_at)}</td>
                  <td className="px-4 py-2"><Badge variant={l.status === "novo" ? "default" : "secondary"}>{LEAD_STATUS[l.status]}</Badge></td>
                  <td className="px-4 py-2"><Button size="sm" variant="outline" onClick={() => setOpen(l)}>Detalhes</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {open && <LeadDialog lead={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function LeadDialog({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const qc = useQueryClient();
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.internal_notes ?? "");
  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("leads").update({ status, internal_notes: notes || null }).eq("id", lead.id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Lead atualizado"); qc.invalidateQueries({ queryKey: ["admin"] }); onClose(); },
    onError: () => toast.error("Não foi possível salvar"),
  });
  const convert = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("convert_lead_to_client", { _lead_id: lead.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Lead convertido em cliente"); qc.invalidateQueries({ queryKey: ["admin"] }); onClose(); },
    onError: () => toast.error("Não foi possível converter"),
  });
  const rows: [string, string | null][] = [
    ["Negócio", lead.business_name], ["Segmento", lead.segment], ["Cidade", lead.city], ["WhatsApp", lead.whatsapp],
    ["Instagram", lead.instagram], ["Plano de interesse", lead.plan_interest], ["Objetivo", lead.goal], ["Necessidades", lead.needs],
    ["Recebido em", fmt(lead.created_at)],
  ];
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{lead.name}</DialogTitle></DialogHeader>
        <dl className="grid grid-cols-3 gap-x-3 gap-y-2 text-sm">
          {rows.map(([k, v]) => <Fragment key={k}><dt className="text-muted-foreground">{k}</dt><dd className="col-span-2 whitespace-pre-line">{v || "—"}</dd></Fragment>)}
        </dl>
        <div className="space-y-3">
          <div><Label>Status</Label>
            <select className={`${sel} mt-1.5 w-full`} value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)}>
              {Object.entries(LEAD_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div><Label>Observações internas</Label><Textarea className="mt-1.5" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => save.mutate()} disabled={save.isPending}>Salvar</Button>
            <Button variant="secondary" onClick={() => convert.mutate()} disabled={convert.isPending}>
              {lead.status === "cliente" ? "Abrir como cliente" : "Converter em cliente"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">A conversão aproveita os dados do lead e não cria duplicados. Contrato e cobrança são feitos manualmente.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Clients() {
  const { data: clients = [], isLoading } = useClients();
  const qc = useQueryClient();
  const update = useMutation({
    mutationFn: async (v: { id: string; plan: string | null; start_date: string | null; status: ClientStatus; notes: string | null }) => {
      const { id, ...rest } = v;
      const { error } = await supabase.from("clients").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Cliente atualizado"); qc.invalidateQueries({ queryKey: ["admin"] }); },
    onError: () => toast.error("Não foi possível salvar"),
  });
  if (isLoading) return <p className="mt-6 text-sm">Carregando…</p>;
  if (clients.length === 0) return <p className="mt-6 rounded-lg border bg-card p-5 text-sm text-muted-foreground">Nenhum cliente ainda. Converta um lead na aba Leads.</p>;
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {clients.map((c) => <ClientCard key={c.id} c={c} onSave={(v) => update.mutate({ id: c.id, ...v })} />)}
    </div>
  );
}

type ClientRow = ReturnType<typeof useClients>["data"] extends (infer T)[] | undefined ? T : never;
function ClientCard({ c, onSave }: { c: ClientRow; onSave: (v: { plan: string | null; start_date: string | null; status: ClientStatus; notes: string | null }) => void }) {
  const [plan, setPlan] = useState(c.plan ?? "");
  const [start, setStart] = useState(c.start_date ?? "");
  const [status, setStatus] = useState<ClientStatus>(c.status);
  const [notes, setNotes] = useState(c.notes ?? "");
  return (
    <div className="space-y-3 rounded-lg border-2 border-ink bg-card p-5">
      <div>
        <h3 className="text-lg font-bold">{c.lead?.business_name}</h3>
        <p className="text-sm text-muted-foreground">{c.lead?.name} · {c.lead?.city} · {c.lead?.whatsapp}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><Label>Plano contratado</Label><Input className="mt-1.5" value={plan} onChange={(e) => setPlan(e.target.value)} /></div>
        <div><Label>Data de início</Label><Input type="date" className="mt-1.5" value={start} onChange={(e) => setStart(e.target.value)} /></div>
      </div>
      <div><Label>Situação</Label>
        <select className={`${sel} mt-1.5 w-full`} value={status} onChange={(e) => setStatus(e.target.value as ClientStatus)}>
          {Object.entries(CLIENT_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div><Label>Observações internas</Label><Textarea className="mt-1.5" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
      <Button size="sm" onClick={() => onSave({ plan: plan || null, start_date: start || null, status, notes: notes || null })}>Salvar</Button>
    </div>
  );
}

function Deliveries() {
  const { data: deliveries = [] } = useDeliveries();
  const { data: clients = [] } = useClients();
  const qc = useQueryClient();
  const [form, setForm] = useState({ client_id: "", description: "", due_date: "", status: "pendente" as DeliveryStatus, notes: "" });
  const create = useMutation({
    mutationFn: async () => {
      if (!form.client_id || form.description.trim().length < 2) throw new Error("invalid");
      const { error } = await supabase.from("deliveries").insert({ ...form, description: form.description.trim(), due_date: form.due_date || null, notes: form.notes || null });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Item cadastrado"); setForm({ client_id: "", description: "", due_date: "", status: "pendente", notes: "" }); qc.invalidateQueries({ queryKey: ["admin"] }); },
    onError: (e) => toast.error(e.message === "invalid" ? "Escolha o cliente e descreva o item" : "Não foi possível salvar"),
  });
  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: DeliveryStatus }) => {
      const { error } = await supabase.from("deliveries").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("deliveries").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });
  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-3 rounded-lg border-2 border-ink bg-card p-5">
        <h2 className="font-bold">Nova entrega ou lembrete</h2>
        <p className="text-xs text-muted-foreground">Cadastro manual. Os lembretes são exibidos no painel; não há notificações automáticas.</p>
        <div className="grid gap-3 md:grid-cols-3">
          <div><Label>Cliente</Label>
            <select className={`${sel} mt-1.5 w-full`} value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })}>
              <option value="">Selecione…</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.lead?.business_name}</option>)}
            </select>
          </div>
          <div><Label>Data prevista</Label><Input type="date" className="mt-1.5" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
          <div><Label>Status</Label>
            <select className={`${sel} mt-1.5 w-full`} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as DeliveryStatus })}>
              {Object.entries(DELIVERY_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <div><Label>Descrição</Label><Input className="mt-1.5" maxLength={300} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div><Label>Observações</Label><Textarea className="mt-1.5" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <Button onClick={() => create.mutate()} disabled={create.isPending || clients.length === 0}>Cadastrar</Button>
        {clients.length === 0 && <p className="text-xs text-muted-foreground">Converta um lead em cliente para cadastrar entregas.</p>}
      </div>
      <div className="rounded-lg border bg-card">
        {deliveries.length === 0 ? <p className="p-4 text-sm text-muted-foreground">Nenhum item cadastrado.</p> : (
          <ul className="divide-y">
            {deliveries.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                <div>
                  <p><b>{d.client?.lead?.business_name}</b> — {d.description}</p>
                  <p className="text-muted-foreground">{d.due_date ? new Date(d.due_date + "T00:00").toLocaleDateString("pt-BR") : "Sem data"}{d.notes ? ` · ${d.notes}` : ""}</p>
                </div>
                <div className="flex gap-2">
                  <select className={sel} value={d.status} onChange={(e) => setStatus.mutate({ id: d.id, status: e.target.value as DeliveryStatus })}>
                    {Object.entries(DELIVERY_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <Button size="sm" variant="ghost" onClick={() => confirm("Excluir este item?") && remove.mutate(d.id)}>Excluir</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Settings() {
  const qc = useQueryClient();
  const { data: settings } = useQuery(settingsQuery);
  const { data: plans = [] } = useQuery(plansQuery);
  const [wa, setWa] = useState<string | null>(null);
  const [mail, setMail] = useState<string | null>(null);
  const [ig, setIg] = useState<string | null>(null);
  const saveSettings = useMutation({
    mutationFn: async () => {
      const num = (wa ?? settings?.whatsapp_number ?? "").replace(/\D/g, "");
      if (num && (num.length < 10 || num.length > 15)) throw new Error("wa");
      const { error } = await supabase.from("site_settings").update({
        whatsapp_number: num || null,
        contact_email: (mail ?? settings?.contact_email ?? "").trim() || null,
        instagram: (ig ?? settings?.instagram ?? "").trim() || null,
      }).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Configurações salvas"); qc.invalidateQueries({ queryKey: ["settings"] }); },
    onError: (e) => toast.error(e.message === "wa" ? "Número inválido: use código do país + DDD + número (ex.: 5511900000000)" : "Não foi possível salvar"),
  });
  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-3 rounded-lg border-2 border-ink bg-card p-5">
        <h2 className="font-bold">Contato</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div><Label>WhatsApp comercial (com código do país)</Label><Input className="mt-1.5" placeholder="5511900000000" value={wa ?? settings?.whatsapp_number ?? ""} onChange={(e) => setWa(e.target.value)} /></div>
          <div><Label>E-mail de contato (opcional)</Label><Input className="mt-1.5" type="email" value={mail ?? settings?.contact_email ?? ""} onChange={(e) => setMail(e.target.value)} /></div>
          <div><Label>Instagram (opcional)</Label><Input className="mt-1.5" placeholder="@byjohwgimenes" value={ig ?? settings?.instagram ?? ""} onChange={(e) => setIg(e.target.value)} /></div>
        </div>
        <Button onClick={() => saveSettings.mutate()} disabled={saveSettings.isPending}>Salvar contato</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => <PlanEditor key={p.id} plan={p} />)}
      </div>
    </div>
  );
}

function PlanEditor({ plan }: { plan: { id: string; name: string; description: string; price: string | null; deliveries: string | null } }) {
  const qc = useQueryClient();
  const [v, setV] = useState({ name: plan.name, description: plan.description, price: plan.price ?? "", deliveries: plan.deliveries ?? "" });
  const save = useMutation({
    mutationFn: async () => {
      if (v.name.trim().length < 2) throw new Error("name");
      const { error } = await supabase.from("plans").update({ name: v.name.trim(), description: v.description.trim(), price: v.price.trim() || null, deliveries: v.deliveries.trim() || null }).eq("id", plan.id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Plano salvo"); qc.invalidateQueries({ queryKey: ["plans"] }); },
    onError: () => toast.error("Não foi possível salvar o plano"),
  });
  return (
    <div className="space-y-3 rounded-lg border bg-card p-5">
      <div><Label>Nome do plano</Label><Input className="mt-1.5" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} /></div>
      <div><Label>Descrição</Label><Textarea className="mt-1.5" rows={3} value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} /></div>
      <div><Label>Valor (deixe vazio = sob consulta)</Label><Input className="mt-1.5" placeholder="Ex.: R$ 000/mês" value={v.price} onChange={(e) => setV({ ...v, price: e.target.value })} /></div>
      <div><Label>Entregas (deixe vazio = sob consulta)</Label><Textarea className="mt-1.5" rows={3} value={v.deliveries} onChange={(e) => setV({ ...v, deliveries: e.target.value })} /></div>
      <Button size="sm" onClick={() => save.mutate()} disabled={save.isPending}>Salvar plano</Button>
    </div>
  );
}
