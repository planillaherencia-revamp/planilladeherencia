"use client"

import { useActionState, useEffect, startTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setPassword, type SetPasswordState } from "./actions"

const initialState: SetPasswordState = { status: "idle" }

export function SetPasswordForm() {
  const [state, action, pending] = useActionState(setPassword, initialState)

  useEffect(() => {
    if (state.status === "error" && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
      className="mt-6 space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="password">Nueva contraseña</Label>
        <Input id="password" name="password" type="password" required minLength={8} autoFocus />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirmar contraseña</Label>
        <Input id="confirm" name="confirm" type="password" required minLength={8} />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Guardando..." : "Guardar y entrar"}
      </Button>
    </form>
  )
}
