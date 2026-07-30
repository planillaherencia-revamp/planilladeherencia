"use client"

import { useActionState, startTransition } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { startCase, type StartCaseState } from "./actions"

const initialState: StartCaseState = { status: "idle" }

export function StartCaseForm() {
  const [state, action, pending] = useActionState(startCase, initialState)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/25 text-accent-foreground">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h2 className="font-heading text-xl font-semibold">
          ¡Su caso quedó registrado!
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">{state.message}</p>
      </div>
    )
  }

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
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="requester_name">Su nombre completo</Label>
            <Input id="requester_name" name="requester_name" required autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requester_email">Correo electrónico</Label>
            <Input id="requester_email" name="requester_email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requester_phone">Teléfono</Label>
            <Input id="requester_phone" name="requester_phone" type="tel" />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Sobre el causante
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="decedent_name">Nombre del causante</Label>
            <Input id="decedent_name" name="decedent_name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date_of_death">Fecha de fallecimiento</Label>
            <Input id="date_of_death" name="date_of_death" type="date" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">
              ¿Algo más que deba saber? (opcional)
            </Label>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Por ejemplo: propiedades, cuentas de banco, si ya tiene documentos listos..."
            />
          </div>
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Enviando..." : "Comenzar mi caso"}
      </Button>
    </form>
  )
}
