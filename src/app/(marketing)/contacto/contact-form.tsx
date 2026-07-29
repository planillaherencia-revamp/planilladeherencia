"use client"

import { useActionState, useEffect, startTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm, type ContactFormState } from "./actions"

const initialState: ContactFormState = { status: "idle" }

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialState)

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
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="Su nombre completo" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" name="email" type="email" placeholder="usted@correo.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono (opcional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="(787) 000-0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">¿En qué le podemos ayudar?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Cuéntenos brevemente sobre su caso..."
          required
        />
      </div>
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  )
}
