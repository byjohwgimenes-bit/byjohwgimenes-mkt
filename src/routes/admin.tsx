import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel administrativo — ByJohwGimenes MKT" },
      { name: "description", content: "Área restrita da ByJohwGimenes MKT." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel — ByJohwGimenes MKT" },
      { property: "og:description", content: "Área restrita." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const qc = useQueryClient();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "SIGNED_OUT") { qc.clear(); setIsAdmin(null); }
    });
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, [qc]);

  useEffect(() => {
    if (!session) return;
    setIsAdmin(null);
    supabase.rpc("claim_first_admin").then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session?.user.id]);

  if (session === undefined) return <Center>Carregando…</Center>;
  if (!session) return <Login />;
  if (isAdmin === null) return <Center>Verificando acesso…</Center>;
  if (!isAdmin)
    return (
      <Center>
        <p>Esta conta não tem acesso de administrador.</p>
        <Button className="mt-4" variant="secondary" onClick={() => supabase.auth.signOut()}>Sair</Button>
      </Center>
    );
  return <AdminPanel email={session.user.email ?? ""} />;
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-muted p-6 text-center"><div>{children}</div></div>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr("E-mail ou senha inválidos.");
  }
  return (
    <div className="grid min-h-screen place-items-center bg-ink p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-lg border-2 border-primary bg-card p-8">
        <h1 className="text-2xl font-extrabold">Área restrita</h1>
        <p className="text-sm text-muted-foreground">Acesso exclusivo do administrador. Não há cadastro público.</p>
        <div><Label htmlFor="email">E-mail</Label><Input id="email" type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><Label htmlFor="pw">Senha</Label><Input id="pw" type="password" className="mt-1.5" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" className="w-full font-semibold" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</Button>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:underline">Voltar ao site</Link>
      </form>
    </div>
  );
}
