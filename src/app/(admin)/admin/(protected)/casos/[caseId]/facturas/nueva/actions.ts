"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type NewInvoiceState = {
  status: "idle" | "error"
  message?: string
}

type LineItemInput = {
  description: string
  quantity: number
  unit_price: number
  discount_amount: number
}

export async function createInvoice(
  caseId: string,
  _prevState: NewInvoiceState,
  formData: FormData
): Promise<NewInvoiceState> {
  const invoiceType = String(formData.get("invoice_type") ?? "full")
  const dueDate = String(formData.get("due_date") ?? "").trim()
  const rawItems = String(formData.get("line_items") ?? "[]")

  let items: LineItemInput[]
  try {
    items = JSON.parse(rawItems)
  } catch {
    return { status: "error", message: "Datos de la factura inválidos." }
  }

  items = items.filter((item) => item.description?.trim())

  if (items.length === 0) {
    return { status: "error", message: "Añada al menos una línea con descripción." }
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
  const discountTotal = items.reduce((sum, item) => sum + item.discount_amount, 0)
  const amount = subtotal - discountTotal

  const supabase = await createClient()

  const { data: seq, error: seqError } = await supabase.rpc("nextval_invoice_number")
  if (seqError || !seq) {
    return { status: "error", message: "No se pudo generar el número de factura." }
  }
  const invoiceNumber = `CR-${new Date().getFullYear()}-${String(seq).padStart(4, "0")}`

  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      case_id: caseId,
      invoice_number: invoiceNumber,
      invoice_type: invoiceType,
      subtotal,
      discount_total: discountTotal,
      amount,
      due_date: dueDate || null,
    })
    .select("id")
    .single()

  if (invoiceError || !invoice) {
    return { status: "error", message: "No se pudo crear la factura. Intente de nuevo." }
  }

  const { error: lineItemsError } = await supabase.from("invoice_line_items").insert(
    items.map((item, index) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount_amount: item.discount_amount,
      sort_order: index,
    }))
  )

  if (lineItemsError) {
    return { status: "error", message: "La factura se creó pero fallaron las líneas. Contacte soporte." }
  }

  redirect(`/admin/casos/${caseId}/facturas/${invoice.id}`)
}
