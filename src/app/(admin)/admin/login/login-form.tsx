"use client"

import { useActionState, useEffect, startTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, type LoginState } from "./actions"

const initialState: LoginState = { status: "idle" }

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState)

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
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" name="email" type="email" required autoFocus />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  )
}
