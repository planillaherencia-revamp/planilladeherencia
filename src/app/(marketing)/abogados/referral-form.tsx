"use client"

import { useActionState, useEffect, startTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitReferral, type ReferralFormState } from "./actions"

const initialState: ReferralFormState = { status: "idle" }

export function ReferralForm() {
  const [state, action, pending] = useActionState(submitReferral, initialState)

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message)
    } else if (state.status === "error" && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
      className="space-y-6"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Sus datos
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lawyer_name">Nombre completo</Label>
            <Input id="lawyer_name" name="lawyer_name" required autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="law_firm">Bufete (opcional)</Label>
            <Input id="law_firm" name="law_firm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lawyer_email">Correo electrónico</Label>
            <Input id="lawyer_email" name="lawyer_email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lawyer_phone">Teléfono</Label>
            <Input id="lawyer_phone" name="lawyer_phone" type="tel" />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Caso que refiere
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="client_name">Nombre del cliente</Label>
            <Input id="client_name" name="client_name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client_phone">Teléfono del cliente</Label>
            <Input id="client_phone" name="client_phone" type="tel" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="client_email">Correo del cliente (opcional)</Label>
            <Input id="client_email" name="client_email" type="email" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notas del caso (opcional)</Label>
            <Textarea id="notes" name="notes" rows={4} />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Enviando..." : "Someter caso"}
      </Button>
    </form>
  )
}
