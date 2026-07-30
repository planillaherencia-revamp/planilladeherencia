import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { NewInvoiceForm } from "./new-invoice-form"

export default async function NewInvoicePage({
  params,
}: {
  params: Promise<{ caseId: string }>
}) {
  const { caseId } = await params
  const supabase = await createClient()

  const { data: caseRecord } = await supabase
    .from("cases")
    .select("id, clients(full_name)")
    .eq("id", caseId)
    .single()

  if (!caseRecord) notFound()

  const client = Array.isArray(caseRecord.clients)
    ? caseRecord.clients[0]
    : caseRecord.clients

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold">Nueva factura</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Para {client?.full_name}
      </p>
      <Card className="mt-6 border-border/70">
        <CardContent className="p-6">
          <NewInvoiceForm caseId={caseId} />
        </CardContent>
      </Card>
    </div>
  )
}
