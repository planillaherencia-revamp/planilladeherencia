import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  convertido: "Convertido",
  descartado: "Descartado",
}

export default async function ReferidosPage() {
  const supabase = await createClient()
  const { data: referrals } = await supabase
    .from("lawyer_referrals")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold">
        Referidos de abogados
      </h1>

      <div className="mt-6 space-y-3">
        {!referrals || referrals.length === 0 ? (
          <Card className="border-border/70">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Aún no hay referidos.
            </CardContent>
          </Card>
        ) : (
          referrals.map((r) => (
            <Card key={r.id} className="border-border/70">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{r.client_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Referido por {r.lawyer_name}
                      {r.law_firm ? ` · ${r.law_firm}` : ""}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {statusLabels[r.status] ?? r.status}
                  </Badge>
                </div>
                <div className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                  <p>Abogado: {r.lawyer_email} {r.lawyer_phone ? `· ${r.lawyer_phone}` : ""}</p>
                  <p>
                    Cliente: {r.client_email ?? "sin correo"}{" "}
                    {r.client_phone ? `· ${r.client_phone}` : ""}
                  </p>
                </div>
                {r.notes && (
                  <p className="mt-3 rounded-md bg-secondary/40 p-3 text-sm">
                    {r.notes}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString("es-PR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
