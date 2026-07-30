import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PrintButton } from "./print-button"

const invoiceTypeLabels: Record<string, string> = {
  full: "Pago único",
  deposit: "Depósito (50%)",
  final: "Balance final",
}

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ caseId: string; invoiceId: string }>
}) {
  const { invoiceId } = await params
  const supabase = await createClient()

  const [{ data: invoice }, { data: professional }] = await Promise.all([
    supabase
      .from("invoices")
      .select(
        "id, invoice_number, invoice_type, status, subtotal, discount_total, amount, due_date, created_at, cases(clients(full_name, email, phone)), invoice_line_items(description, quantity, unit_price, discount_amount, amount, sort_order)"
      )
      .eq("id", invoiceId)
      .single(),
    supabase.from("professional_info").select("*").limit(1).single(),
  ])

  if (!invoice) notFound()

  const caseRecord = Array.isArray(invoice.cases) ? invoice.cases[0] : invoice.cases
  const client = Array.isArray(caseRecord?.clients)
    ? caseRecord.clients[0]
    : caseRecord?.clients

  const items = [...(invoice.invoice_line_items ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  )

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <h1 className="font-heading text-xl font-semibold">
          Factura {invoice.invoice_number}
        </h1>
        <PrintButton />
      </div>

      <div className="rounded-xl border border-border/70 bg-white p-8 text-foreground shadow-sm print:border-0 print:p-0 print:shadow-none">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-heading text-lg font-semibold">
              {professional?.full_name} @ Caudal Relicto PR
            </p>
            <p className="text-sm text-muted-foreground">{professional?.phone}</p>
            <p className="text-sm text-muted-foreground">{professional?.email}</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-2xl font-semibold">Factura</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {invoice.invoice_number}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg bg-secondary/40 p-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Facturar a
            </p>
            <p className="mt-1 font-medium">{client?.full_name}</p>
            <p className="text-muted-foreground">{client?.email}</p>
            <p className="text-muted-foreground">{client?.phone}</p>
          </div>
          <div className="text-right">
            <p>
              <span className="text-muted-foreground">Tipo: </span>
              {invoiceTypeLabels[invoice.invoice_type] ?? invoice.invoice_type}
            </p>
            <p>
              <span className="text-muted-foreground">Fecha: </span>
              {new Date(invoice.created_at).toLocaleDateString("es-PR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            {invoice.due_date && (
              <p>
                <span className="text-muted-foreground">Vence: </span>
                {new Date(invoice.due_date).toLocaleDateString("es-PR")}
              </p>
            )}
          </div>
        </div>

        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="pb-2">Descripción</th>
              <th className="pb-2 text-right">Cant.</th>
              <th className="pb-2 text-right">Precio</th>
              <th className="pb-2 text-right">Descuento</th>
              <th className="pb-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-border/40">
                <td className="py-2.5">{item.description}</td>
                <td className="py-2.5 text-right">{item.quantity}</td>
                <td className="py-2.5 text-right">${item.unit_price.toFixed(2)}</td>
                <td className="py-2.5 text-right">
                  {item.discount_amount > 0 ? `-$${item.discount_amount.toFixed(2)}` : "—"}
                </td>
                <td className="py-2.5 text-right font-medium">
                  ${item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto mt-4 max-w-xs space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${Number(invoice.subtotal ?? 0).toFixed(2)}</span>
          </div>
          {Number(invoice.discount_total) > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Descuentos</span>
              <span>-${Number(invoice.discount_total).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between rounded-md bg-secondary/40 p-2 text-base font-semibold">
            <span>Total</span>
            <span>${Number(invoice.amount ?? 0).toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-sm">
          <p className="font-semibold">Instrucciones de pago</p>
          <div className="mt-2 space-y-1 text-muted-foreground">
            {professional?.check_payable_address && (
              <p>
                Puede enviar su pago mediante cheque a:{" "}
                {professional.check_payable_address}
              </p>
            )}
            {professional?.ath_movil_phone && (
              <p>ATH Móvil: {professional.ath_movil_phone}</p>
            )}
            {professional?.venmo_handle && <p>Venmo: {professional.venmo_handle}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
