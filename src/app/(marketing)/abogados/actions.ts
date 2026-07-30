"use server"

import { createServiceClient } from "@/lib/supabase/service"

export type ReferralFormState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitReferral(
  _prevState: ReferralFormState,
  formData: FormData
): Promise<ReferralFormState> {
  const lawyerName = String(formData.get("lawyer_name") ?? "").trim()
  const lawFirm = String(formData.get("law_firm") ?? "").trim()
  const lawyerPhone = String(formData.get("lawyer_phone") ?? "").trim()
  const lawyerEmail = String(formData.get("lawyer_email") ?? "").trim()
  const clientName = String(formData.get("client_name") ?? "").trim()
  const clientPhone = String(formData.get("client_phone") ?? "").trim()
  const clientEmail = String(formData.get("client_email") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()

  if (!lawyerName || !lawyerEmail || !clientName) {
    return {
      status: "error",
      message: "Complete su nombre, correo, y el nombre del cliente que refiere.",
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(lawyerEmail)) {
    return { status: "error", message: "Escriba un correo electrónico válido." }
  }

  const supabase = createServiceClient()
  const { error } = await supabase.from("lawyer_referrals").insert({
    lawyer_name: lawyerName,
    law_firm: lawFirm || null,
    lawyer_phone: lawyerPhone || null,
    lawyer_email: lawyerEmail,
    client_name: clientName,
    client_phone: clientPhone || null,
    client_email: clientEmail || null,
    notes: notes || null,
  })

  if (error) {
    return { status: "error", message: "No se pudo enviar. Intente de nuevo." }
  }

  // TODO(Fase 0): notificar a Marisol por correo (Resend) cuando la cuenta exista.
  return {
    status: "success",
    message: "¡Gracias! Recibimos el caso y nos pondremos en contacto pronto.",
  }
}
