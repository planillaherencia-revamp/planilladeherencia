"use server"

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !message) {
    return { status: "error", message: "Por favor complete su nombre, correo y mensaje." }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Por favor escriba un correo electrónico válido." }
  }

  // TODO(Fase 0): una vez exista la cuenta de Resend, enviar este mensaje por
  // correo a siteConfig.contactEmail en vez de solo registrarlo en el log.
  console.log("[contacto] Nuevo mensaje", { name, email, phone, message })

  return {
    status: "success",
    message: "¡Gracias! Recibimos su mensaje y le responderemos pronto.",
  }
}
