import { notFound } from "next/navigation"
import { Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { CopyLinkButton } from "./copy-link-button"

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

  const { data: caseRecord } = await supabase
    .from("cases")
    .select("id, status, access_token, filled_by, questionnaire_status, created_at, clients(full_name, email, phone)")
    .eq("id", caseId)
    .single()

  if (!caseRecord) notFound()

  const client = Array.isArray(caseRecord.clients)
    ? caseRecord.clients[0]
    : caseRecord.clients

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
      </div>

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

      <Card className="mt-4 border-dashed border-border">
        <CardContent className="p-5 text-sm text-muted-foreground">
          El cuestionario completo (bienes, herederos, testamento, documentos)
          se construye en el siguiente paso.
        </CardContent>
      </Card>
    </div>
  )
}
