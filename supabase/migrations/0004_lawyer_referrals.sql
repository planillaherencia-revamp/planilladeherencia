-- Referidos de abogados desde /abogados. Formulario publico sin login,
-- inserta via service-role key desde un Route Handler (mismo patron que el
-- resto de las rutas publicas: nunca anon key + RLS anonimo).

create table lawyer_referrals (
  id uuid primary key default gen_random_uuid(),
  lawyer_name text not null,
  law_firm text,
  lawyer_phone text,
  lawyer_email text not null,
  client_name text not null,
  client_phone text,
  client_email text,
  notes text,
  status text not null default 'nuevo' check (status in ('nuevo','contactado','convertido','descartado')),
  created_at timestamptz not null default now()
);
create index lawyer_referrals_status_idx on lawyer_referrals(status);

alter table lawyer_referrals enable row level security;
create policy lawyer_referrals_admin_all on lawyer_referrals
  for all to authenticated using (true) with check (true);
