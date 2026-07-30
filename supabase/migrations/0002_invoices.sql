-- Facturas con líneas libres (ver docs/factura-referencia.md) — reemplaza el
-- supuesto original de "monto único calculado por pricing.ts". Marisol
-- factura otros servicios además de Caudal Relicto con la misma numeración,
-- y usa descuentos manuales por línea (monto fijo, no %).

alter table invoices
  drop constraint invoices_invoice_type_check,
  add constraint invoices_invoice_type_check
    check (invoice_type in ('deposit', 'final', 'full')),
  alter column amount drop not null,
  add column subtotal numeric(10,2),
  add column discount_total numeric(10,2) not null default 0;

create table invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  amount numeric(10,2) generated always as (
    (quantity * unit_price) - discount_amount
  ) stored,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index invoice_line_items_invoice_id_idx on invoice_line_items(invoice_id);

alter table invoice_line_items enable row level security;
create policy invoice_line_items_admin_all on invoice_line_items
  for all to authenticated using (true) with check (true);

-- Datos de pago manual mostrados en la factura (cheque / ATH Móvil / Venmo)
alter table professional_info
  add column check_payable_address text,
  add column ath_movil_phone text,
  add column venmo_handle text;

update professional_info
set
  check_payable_address = '3819 Avenida Isla Verde apto. 14A, Carolina PR 00979',
  ath_movil_phone = '787-553-3290';

-- PostgREST no expone nextval() directamente; se envuelve en una funcion
-- para poder llamarla via supabase.rpc() al numerar una factura nueva.
create function nextval_invoice_number()
returns bigint
language sql
security definer
as $$
  select nextval('invoice_number_seq');
$$;

grant execute on function nextval_invoice_number() to authenticated;
