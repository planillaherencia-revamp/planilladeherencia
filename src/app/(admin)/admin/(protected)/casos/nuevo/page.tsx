import { Card, CardContent } from "@/components/ui/card"
import { NewCaseForm } from "./new-case-form"

export default function NewCasePage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-heading text-2xl font-semibold">Nuevo caso</h1>
      <Card className="mt-6 border-border/70">
        <CardContent className="p-6">
          <NewCaseForm />
        </CardContent>
      </Card>
    </div>
  )
}
