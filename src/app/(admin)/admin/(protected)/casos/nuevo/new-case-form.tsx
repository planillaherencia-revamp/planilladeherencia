"use client"

import { useActionState, useEffect, startTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createCase, type NewCaseState } from "./actions"

const initialState: NewCaseState = { status: "idle" }

export function NewCaseForm() {
  const [state, action, pending] = useActionState(createCase, initialState)

  useEffect(() => {
    if (state.status === "error" && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="full_name">Nombre completo del cliente</Label>
        <Input id="full_name" name="full_name" required autoFocus />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>¿Quién va a llenar el cuestionario?</Label>
        <RadioGroup name="filled_by" defaultValue="client" className="gap-2">
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="client" />
            El cliente, por su enlace privado
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="marisol" />
            Yo lo lleno con la información que me provea
          </label>
        </RadioGroup>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Creando..." : "Crear caso"}
      </Button>
    </form>
  )
}
