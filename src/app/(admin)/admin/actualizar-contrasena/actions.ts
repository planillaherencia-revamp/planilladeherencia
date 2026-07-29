"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type SetPasswordState = {
  status: "idle" | "error"
  message?: string
}

export async function setPassword(
  _prevState: SetPasswordState,
  formData: FormData
): Promise<SetPasswordState> {
  const password = String(formData.get("password") ?? "")
  const confirm = String(formData.get("confirm") ?? "")

  if (password.length < 8) {
    return { status: "error", message: "La contraseña debe tener al menos 8 caracteres." }
  }
  if (password !== confirm) {
    return { status: "error", message: "Las contraseñas no coinciden." }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { status: "error", message: "Sesión inválida. Pide un nuevo enlace de invitación." }
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    return { status: "error", message: "No se pudo guardar la contraseña. Intenta de nuevo." }
  }

  redirect("/admin")
}
