create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- First signed-in user (created via the Users panel; public signup is disabled) may claim admin only if no admin exists.
create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(auth.uid(), 'admin');
  end if;
  insert into public.user_roles(user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke execute on function public.claim_first_admin() from anon, public;
grant execute on function public.claim_first_admin() to authenticated;

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;

-- Settings (single row)
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  whatsapp_number text,
  contact_email text,
  instagram text,
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "settings public read" on public.site_settings for select to anon, authenticated using (true);
create policy "settings admin write" on public.site_settings for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.site_settings(id) values (1);

-- Plans
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price text,
  deliveries text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);
grant select on public.plans to anon, authenticated;
grant insert, update, delete on public.plans to authenticated;
grant all on public.plans to service_role;
alter table public.plans enable row level security;
create policy "plans public read" on public.plans for select to anon, authenticated using (true);
create policy "plans admin write" on public.plans for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.plans(name, description, sort_order) values
 ('Plano Essencial', 'Para quem está começando a organizar a presença nas redes sociais.', 1),
 ('Plano Presença', 'Para negócios que querem manter uma frequência de publicações com planejamento.', 2),
 ('Plano Estratégico', 'Para negócios que buscam um acompanhamento mais próximo do planejamento de conteúdo.', 3);

-- Leads
create type public.lead_status as enum ('novo','em_atendimento','proposta_enviada','cliente','nao_avancou');
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  business_name text not null check (char_length(business_name) between 2 and 120),
  segment text not null check (char_length(segment) between 2 and 100),
  city text not null check (char_length(city) between 2 and 100),
  whatsapp text not null check (char_length(whatsapp) between 8 and 20),
  instagram text check (instagram is null or char_length(instagram) <= 100),
  plan_interest text not null check (char_length(plan_interest) <= 120),
  goal text not null check (char_length(goal) between 2 and 200),
  needs text check (needs is null or char_length(needs) <= 1500),
  consent boolean not null,
  status lead_status not null default 'novo',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;
grant all on public.leads to service_role;
alter table public.leads enable row level security;
create policy "public can submit lead" on public.leads for insert to anon, authenticated
  with check (consent = true and status = 'novo' and internal_notes is null);
create policy "admin reads leads" on public.leads for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin updates leads" on public.leads for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin deletes leads" on public.leads for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create trigger leads_touch before update on public.leads for each row execute function public.touch_updated_at();

-- Clients (one per lead)
create type public.client_status as enum ('ativo','pausado','encerrado');
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references public.leads(id) on delete restrict,
  plan text,
  start_date date,
  status client_status not null default 'ativo',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.clients to authenticated;
grant all on public.clients to service_role;
alter table public.clients enable row level security;
create policy "admin all clients" on public.clients for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger clients_touch before update on public.clients for each row execute function public.touch_updated_at();

-- Deliveries & reminders
create type public.delivery_status as enum ('pendente','em_andamento','concluido');
create table public.deliveries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  description text not null,
  due_date date,
  status delivery_status not null default 'pendente',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.deliveries to authenticated;
grant all on public.deliveries to service_role;
alter table public.deliveries enable row level security;
create policy "admin all deliveries" on public.deliveries for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger deliveries_touch before update on public.deliveries for each row execute function public.touch_updated_at();

-- Convert lead to client atomically
create or replace function public.convert_lead_to_client(_lead_id uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare _cid uuid; _plan text;
begin
  if not public.has_role(auth.uid(),'admin') then raise exception 'forbidden'; end if;
  select id into _cid from public.clients where lead_id = _lead_id;
  if _cid is not null then
    update public.leads set status='cliente' where id=_lead_id;
    return _cid;
  end if;
  select plan_interest into _plan from public.leads where id=_lead_id;
  if not found then raise exception 'lead not found'; end if;
  insert into public.clients(lead_id, plan, start_date) values (_lead_id, _plan, current_date) returning id into _cid;
  update public.leads set status='cliente' where id=_lead_id;
  return _cid;
end $$;
revoke execute on function public.convert_lead_to_client(uuid) from anon, public;
grant execute on function public.convert_lead_to_client(uuid) to authenticated;