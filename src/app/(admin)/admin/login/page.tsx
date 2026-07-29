import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Iniciar sesión",
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <Card className="w-full max-w-sm border-border/70">
        <CardContent className="p-8">
          <h1 className="font-heading text-xl font-semibold">
            Caudal Relicto PR
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Panel administrativo
          </p>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
