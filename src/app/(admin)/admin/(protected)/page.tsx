import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
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

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: cases } = await supabase
    .from("cases")
    .select("status")

  const counts = Object.fromEntries(
    Object.keys(statusLabels).map((status) => [
      status,
      cases?.filter((c) => c.status === status).length ?? 0,
    ])
  )

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Panel</h1>
        <Link href="/admin/casos/nuevo" className={buttonVariants()}>
          Nuevo caso
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(statusLabels).map(([status, label]) => (
          <Card key={status} className="border-border/70">
            <CardContent className="p-4">
              <p className="font-heading text-2xl font-semibold">
                {counts[status]}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/admin/casos"
          className="text-sm font-medium text-primary hover:underline"
        >
          Ver todos los casos →
        </Link>
      </div>
    </div>
  )
}
