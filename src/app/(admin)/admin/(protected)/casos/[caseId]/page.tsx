import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { CopyLinkButton } from "./copy-link-button"

const invoiceTypeLabels: Record<string, string> = {
  full: "Pago único",
  deposit: "Depósito",
  final: "Balance final",
}

const invoiceStatusLabels: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagada",
  overdue: "Vencida",
  void: "Anulada",
}

const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  cotizado: "Cotizado",
  deposito_recibido: "Depósito recibido",
  en_proceso: "En proceso",
  completado: "Completado",
  archivado: "Archivado",
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>
}) {
  const { caseId } = await params
  const supabase = await createClient()

  const [{ data: caseRecord }, { data: invoices }] = await Promise.all([
    supabase
      .from("cases")
      .select(
        "id, status, access_token, filled_by, questionnaire_status, notes, created_at, clients(full_name, email, phone), decedents(full_name, date_of_death)"
      )
      .eq("id", caseId)
      .single(),
    supabase
      .from("invoices")
      .select("id, invoice_number, invoice_type, status, amount, created_at")
      .eq("case_id", caseId)
      .order("created_at", { ascending: false }),
  ])

  if (!caseRecord) notFound()

  const client = Array.isArray(caseRecord.clients)
    ? caseRecord.clients[0]
    : caseRecord.clients
  const decedent = Array.isArray(caseRecord.decedents)
    ? caseRecord.decedents[0]
    : caseRecord.decedents

  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/c/${caseRecord.access_token}`

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            {client?.full_name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Caso creado el{" "}
            {new Date(caseRecord.created_at).toLocaleDateString("es-PR")}
          </p>
        </div>
        <Badge variant="secondary">
          {statusLabels[caseRecord.status] ?? caseRecord.status}
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="border-border/70">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contacto
            </p>
            <p className="mt-2 text-sm">{client?.email ?? "Sin correo"}</p>
            <p className="text-sm">{client?.phone ?? "Sin teléfono"}</p>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cuestionario
            </p>
            <p className="mt-2 text-sm">
              {caseRecord.filled_by === "client"
                ? "Lo llena el cliente"
                : "Lo llena Marisol"}
            </p>
            <p className="text-sm text-muted-foreground">
              Estatus: {caseRecord.questionnaire_status}
            </p>
          </CardContent>
        </Card>
        {decedent?.full_name && (
          <Card className="border-border/70">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Causante
              </p>
              <p className="mt-2 text-sm font-medium">{decedent.full_name}</p>
              {decedent.date_of_death && (
                <p className="text-sm text-muted-foreground">
                  Falleció el{" "}
                  {new Date(decedent.date_of_death).toLocaleDateString("es-PR")}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {caseRecord.notes && (
        <Card className="mt-4 border-border/70">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Notas del cliente
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {caseRecord.notes}
            </p>
          </CardContent>
        </Card>
      )}

      {caseRecord.filled_by === "client" && (
        <Card className="mt-4 border-border/70">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Enlace privado del cliente
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {publicUrl}
              </p>
            </div>
            <CopyLinkButton url={publicUrl} />
          </CardContent>
        </Card>
      )}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Facturas</h2>
        <Link
          href={`/admin/casos/${caseId}/facturas/nueva`}
          className={buttonVariants({ size: "sm" })}
        >
          Nueva factura
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-3 space-y-2">
        {!invoices || invoices.length === 0 ? (
          <Card className="border-border/70">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Aún no hay facturas para este caso.
            </CardContent>
          </Card>
        ) : (
          invoices.map((inv) => (
            <Link key={inv.id} href={`/admin/casos/${caseId}/facturas/${inv.id}`}>
              <Card className="border-border/70 transition-colors hover:bg-secondary/40">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">{inv.invoice_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {invoiceTypeLabels[inv.invoice_type] ?? inv.invoice_type} ·{" "}
                      {new Date(inv.created_at).toLocaleDateString("es-PR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                      {invoiceStatusLabels[inv.status] ?? inv.status}
                    </Badge>
                    <span className="text-sm font-semibold">
                      ${Number(inv.amount ?? 0).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
