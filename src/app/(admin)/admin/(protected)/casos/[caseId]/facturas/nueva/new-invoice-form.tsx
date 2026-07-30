"use client"

import { useActionState, useEffect, useState, startTransition } from "react"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createInvoice, type NewInvoiceState } from "./actions"

type LineItem = {
  description: string
  quantity: number
  unit_price: number
  discount_amount: number
}

const emptyItem: LineItem = {
  description: "",
  quantity: 1,
  unit_price: 0,
  discount_amount: 0,
}

const initialState: NewInvoiceState = { status: "idle" }

export function NewInvoiceForm({ caseId }: { caseId: string }) {
  const boundAction = createInvoice.bind(null, caseId)
  const [state, action, pending] = useActionState(boundAction, initialState)
  const [items, setItems] = useState<LineItem[]>([{ ...emptyItem }])

  useEffect(() => {
    if (state.status === "error" && state.message) {
      toast.error(state.message)
    }
  }, [state])

  const updateItem = (index: number, patch: Partial<LineItem>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    )
  }

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }])
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index))

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0)
  const discountTotal = items.reduce((sum, i) => sum + i.discount_amount, 0)
  const total = subtotal - discountTotal

  return (
    <form
      action={(formData) => {
        formData.set("line_items", JSON.stringify(items))
        startTransition(() => action(formData))
      }}
      className="space-y-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="invoice_type">Tipo de factura</Label>
          <select
            id="invoice_type"
            name="invoice_type"
            defaultValue="full"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            <option value="full">Pago único</option>
            <option value="deposit">Depósito (50%)</option>
            <option value="final">Balance final</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="due_date">Fecha límite (opcional)</Label>
          <Input id="due_date" name="due_date" type="date" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="hidden gap-3 px-1 text-xs font-medium text-muted-foreground sm:grid sm:grid-cols-[1fr_80px_100px_100px_100px_32px]">
          <span>Descripción</span>
          <span>Cant.</span>
          <span>Precio</span>
          <span>Descuento</span>
          <span>Monto</span>
          <span />
        </div>
        {items.map((item, index) => {
          const amount = item.quantity * item.unit_price - item.discount_amount
          return (
            <div
              key={index}
              className="grid gap-2 rounded-lg border border-border/70 p-3 sm:grid-cols-[1fr_80px_100px_100px_100px_32px] sm:items-center sm:border-0 sm:p-0"
            >
              <Input
                placeholder="Descripción del servicio"
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
              />
              <Input
                type="number"
                min={0}
                step="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(index, { quantity: Number(e.target.value) || 0 })
                }
              />
              <Input
                type="number"
                min={0}
                step="0.01"
                value={item.unit_price}
                onChange={(e) =>
                  updateItem(index, { unit_price: Number(e.target.value) || 0 })
                }
              />
              <Input
                type="number"
                min={0}
                step="0.01"
                value={item.discount_amount}
                onChange={(e) =>
                  updateItem(index, { discount_amount: Number(e.target.value) || 0 })
                }
              />
              <p className="text-sm font-medium">${amount.toFixed(2)}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="h-4 w-4" />
          Añadir línea
        </Button>
      </div>

      <div className="ml-auto max-w-xs space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Descuentos</span>
          <span>-${discountTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-border/60 pt-1.5 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creando..." : "Crear factura"}
      </Button>
    </form>
  )
}
