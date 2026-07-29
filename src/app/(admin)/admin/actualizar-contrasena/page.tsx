import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { SetPasswordForm } from "./set-password-form"

export const metadata: Metadata = {
  title: "Crear contraseña",
}

export default function SetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <Card className="w-full max-w-sm border-border/70">
        <CardContent className="p-8">
          <h1 className="font-heading text-xl font-semibold">
            Contraseña
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Crea o actualiza tu contraseña de acceso al panel.
          </p>
          <SetPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
