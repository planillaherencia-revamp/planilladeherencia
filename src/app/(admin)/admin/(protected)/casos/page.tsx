import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  cotizado: "Cotizado",
  deposito_recibido: "Depósito recibido",
  en_proceso: "En proceso",
  completado: "Completado",
  archivado: "Archivado",
}

export default async function CasosPage() {
  const supabase = await createClient()
  const { data: cases } = await supabase
    .from("cases")
    .select("id, status, created_at, clients(full_name, email)")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Casos</h1>
        <Link href="/admin/casos/nuevo" className={buttonVariants()}>
          Nuevo caso
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {!cases || cases.length === 0 ? (
          <Card className="border-border/70">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Aún no hay casos.{" "}
              <Link href="/admin/casos/nuevo" className="text-primary hover:underline">
                Crea el primero
              </Link>
              .
            </CardContent>
          </Card>
        ) : (
          cases.map((c) => {
            const client = Array.isArray(c.clients) ? c.clients[0] : c.clients
            return (
              <Link key={c.id} href={`/admin/casos/${c.id}`}>
                <Card className="border-border/70 transition-colors hover:bg-secondary/40">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">
                        {client?.full_name ?? "(sin nombre)"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {client?.email ?? "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">
                        {statusLabels[c.status] ?? c.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString("es-PR")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
