-- Caudal Relicto PR — esquema inicial
-- Sigue la estructura real del cuestionario de Marisol (ver
-- docs/cuestionario-referencia.md). Diseño de referencia:
--   - una tabla unica de bienes con codigo de tipo A-J (no una tabla por
--     categoria, como decia el plan original)
--   - todas las columnas de datos capturados son NULLABLE para permitir
--     guardado incremental campo por campo
--   - RLS: admin (Marisol, Supabase Auth) tiene acceso total; las rutas
--     publicas sin login pasan por Route Handlers server-side con la
--     service-role key, nunca con el anon key + RLS anonimo

create extension if not exists "pgcrypto";

-- ============================================================
-- Utilidad: updated_at automatico
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- Configuracion profesional de Marisol (fila unica)
-- ============================================================
create table professional_info (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Marisol Rodríguez',
  specialist_number text not null default '1020612',
  address_line1 text,
  address_line2 text,
  city text,
  state text default 'PR',
  postal_code text,
  phone text,
  email text,
  updated_at timestamptz not null default now()
);

insert into professional_info (full_name, specialist_number, phone, email)
values ('Marisol Rodríguez', '1020612', '787-553-3290', 'planillaherencia@gmail.com');

-- ============================================================
-- Clientes y casos
-- ============================================================
create table clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table cases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  status text not null default 'nuevo'
    check (status in ('nuevo','cotizado','deposito_recibido','en_proceso','completado','archivado')),
  access_token text not null unique default encode(gen_random_bytes(24), 'base64url'),
  questionnaire_status text not null default 'not_started'
    check (questionnaire_status in ('not_started','in_progress','completed')),
  filled_by text not null default 'client' check (filled_by in ('client','marisol')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger cases_set_updated_at before update on cases
  for each row execute function set_updated_at();
create index cases_client_id_idx on cases(client_id);
create index cases_access_token_idx on cases(access_token);

-- ============================================================
-- I. Administrador del caso (quien tramita, puede o no ser heredero)
-- ============================================================
create table administrators (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references cases(id) on delete cascade,
  full_name text,
  date_of_birth date,
  mailing_address text,
  city text,
  state text,
  postal_code text,
  citizenship text,
  ssn_last4 text,
  phone text,
  email text,
  relationship_to_decedent text
    check (relationship_to_decedent in (
      'heredero_forzoso','conyuge_superstite','albacea',
      'contador_partidor','administrador_judicial','otro'
    )),
  updated_at timestamptz not null default now()
);
create trigger administrators_set_updated_at before update on administrators
  for each row execute function set_updated_at();

-- ============================================================
-- II. El causante
-- ============================================================
create table decedents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references cases(id) on delete cascade,
  full_name text,
  name_variations text,
  last_known_address text,
  city text,
  state text,
  postal_code text,
  ssn_last4 text,
  date_of_birth date,
  place_of_birth text,
  citizenship text,
  born_in_pr boolean,
  pr_resident_at_death boolean,
  us_citizen boolean,
  date_of_death date,
  place_of_death text,
  occupation text,
  updated_at timestamptz not null default now()
);
create trigger decedents_set_updated_at before update on decedents
  for each row execute function set_updated_at();
-- date_of_death maneja dos reglas de negocio: el plazo de 12 meses y si los
-- bienes se valoran por base (>= 2018-01-01) o por tasacion (antes).

-- ============================================================
-- III. Padres del causante
-- ============================================================
create table decedent_parents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references cases(id) on delete cascade,
  mother_full_name text,
  mother_date_of_birth date,
  mother_place_of_birth text,
  mother_date_of_death date,
  father_full_name text,
  father_date_of_birth date,
  father_place_of_birth text,
  father_date_of_death date,
  updated_at timestamptz not null default now()
);
create trigger decedent_parents_set_updated_at before update on decedent_parents
  for each row execute function set_updated_at();

-- ============================================================
-- IV. Estado civil del causante
-- ============================================================
create table marital_status (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references cases(id) on delete cascade,
  status text check (status in ('soltero','casado','divorciado','viudo')),
  -- si casado o viudo
  spouse_full_name text,
  spouse_ssn_last4 text,
  spouse_date_of_birth date,
  spouse_place_of_birth text,
  spouse_alive boolean,
  spouse_date_of_death date,
  marriage_date date,
  marriage_place text,
  property_regime text
    check (property_regime in ('sociedad_gananciales','separacion_bienes','otro')),
  -- si divorciado
  divorce_date date,
  additional_notes text,
  updated_at timestamptz not null default now()
);
create trigger marital_status_set_updated_at before update on marital_status
  for each row execute function set_updated_at();
-- property_regime determina la columna Privativo/Ganancial de cada bien.

-- ============================================================
-- V. Herederos / beneficiarios (repetible)
-- ============================================================
create table heirs (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  full_name text,
  relationship_to_decedent text,
  date_of_birth date,
  address text,
  phone text,
  email text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index heirs_case_id_idx on heirs(case_id);

-- ============================================================
-- VI. Testamento y situacion del causante
-- ============================================================
create table will_info (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references cases(id) on delete cascade,
  has_will boolean,
  -- si tiene testamento
  will_type text check (will_type in ('cerrado','abierto','ologrado')),
  execution_date date,
  notary_name text,
  probate_case_number text, -- ológrafo
  -- si no tiene testamento
  heir_declaration_case_number text,
  -- otros datos
  has_property_outside_pr boolean,
  has_safety_deposit_box boolean,
  safety_deposit_bank text,
  safety_deposit_box_number text,
  had_tax_debt_at_death boolean,
  updated_at timestamptz not null default now()
);
create trigger will_info_set_updated_at before update on will_info
  for each row execute function set_updated_at();

-- ============================================================
-- VII. Bienes — tabla unica con codigo de tipo (A-J)
-- ============================================================
create table case_assets (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  item_number int not null default 1,
  -- A bienes raices, B efectivo, C acciones/valores, D hipotecas/pagares,
  -- E autos/aviones/embarcaciones, F caja de seguridad, G muebles/enseres,
  -- H arte/joyeria, I otros bienes muebles, J otros bienes inmuebles
  type_code text not null check (type_code in ('A','B','C','D','E','F','G','H','I','J')),
  description text,
  -- C compraventa, H herencia, D donacion, P permuta, O otros
  acquisition_code text check (acquisition_code in ('C','H','D','P','O')),
  identification_number text, -- catastro (inmuebles) o num. de cuenta (bancos/inversiones)
  located_in_pr boolean,
  ownership_type text check (ownership_type in ('privativo','ganancial')),
  participation_pct numeric(5,2),
  -- valor de base (fallecidos desde 2018-01-01) o de tasacion (antes)
  value_amount numeric(14,2),
  extra_data jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger case_assets_set_updated_at before update on case_assets
  for each row execute function set_updated_at();
create index case_assets_case_id_idx on case_assets(case_id);
create index case_assets_type_code_idx on case_assets(type_code);

-- ============================================================
-- VIII. Asesores profesionales del causante o la sucesion (opcional)
-- ============================================================
create table professional_advisors (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  role text not null check (role in ('contable','abogado','asesor_financiero','agente_seguros')),
  contact_name text,
  company_name text,
  address text,
  phone text,
  email text,
  created_at timestamptz not null default now()
);
create index professional_advisors_case_id_idx on professional_advisors(case_id);

-- ============================================================
-- Cotizaciones, facturas, pagos
-- ============================================================
create table quotes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  base_fee numeric(10,2) not null default 300,
  additional_properties_count int not null default 0,
  additional_property_fee numeric(10,2) not null default 50,
  hacienda_filing_fee numeric(10,2) not null default 25,
  total numeric(10,2) generated always as (
    base_fee + (additional_properties_count * additional_property_fee) + hacienda_filing_fee
  ) stored,
  status text not null default 'draft'
    check (status in ('draft','sent','accepted','rejected','expired')),
  notes text,
  sent_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger quotes_set_updated_at before update on quotes
  for each row execute function set_updated_at();
create index quotes_case_id_idx on quotes(case_id);

create sequence invoice_number_seq start 1;

create table invoices (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  quote_id uuid references quotes(id) on delete set null,
  invoice_number text not null unique,
  invoice_type text not null check (invoice_type in ('deposit','final')),
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending','paid','overdue','void')),
  due_date date,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger invoices_set_updated_at before update on invoices
  for each row execute function set_updated_at();
create index invoices_case_id_idx on invoices(case_id);

create table payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount numeric(10,2) not null,
  method text not null check (method in (
    'stripe','manual_check','manual_ath_movil','manual_cash','manual_other'
  )),
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  recorded_by text not null default 'system' check (recorded_by in ('system','marisol')),
  paid_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);
create index payments_invoice_id_idx on payments(invoice_id);
create unique index payments_stripe_session_unique
  on payments(stripe_checkout_session_id) where stripe_checkout_session_id is not null;

-- ============================================================
-- Documentos
-- ============================================================
create table documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  source text not null check (source in ('gmail','client_upload','manual_upload')),
  storage_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes int,
  gmail_message_id text,
  uploaded_by text,
  document_kind text, -- p.ej. certificado_defuncion, declaratoria_herederos, crim, escritura, estado_bancario
  created_at timestamptz not null default now()
);
create index documents_case_id_idx on documents(case_id);

-- Sugerencias de OCR (nunca se aplican solas — Marisol confirma cada campo)
create table document_extractions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  extracted_data jsonb not null,
  model text not null,
  status text not null default 'pending' check (status in ('pending','reviewed','applied','discarded')),
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index document_extractions_document_id_idx on document_extractions(document_id);

-- ============================================================
-- Correo (Gmail) — solo se guarda el refresh token
-- ============================================================
create table gmail_sync_state (
  id uuid primary key default gen_random_uuid(),
  google_refresh_token text,
  connected_at timestamptz
);

-- ============================================================
-- Formularios generados (SC 2745, etc.)
-- ============================================================
create table generated_forms (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  form_type text not null default 'SC2745',
  storage_path text not null,
  generated_from_snapshot jsonb,
  generated_at timestamptz not null default now()
);
create index generated_forms_case_id_idx on generated_forms(case_id);

-- ============================================================
-- Row Level Security
-- Admin (Marisol, autenticada via Supabase Auth) = acceso total.
-- Las rutas publicas sin login usan la service-role key desde Route
-- Handlers server-side (validan access_token antes de tocar datos), nunca
-- el anon key directo — por eso no hay politicas para 'anon'.
-- ============================================================
do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'clients','cases','administrators','decedents','decedent_parents',
      'marital_status','heirs','will_info','case_assets',
      'professional_advisors','quotes','invoices','payments','documents',
      'document_extractions','generated_forms','professional_info',
      'gmail_sync_state'
    ])
  loop
    execute format('alter table %I enable row level security', t);
    execute format(
      'create policy %I on %I for all to authenticated using (true) with check (true)',
      t || '_admin_all', t
    );
  end loop;
end $$;
