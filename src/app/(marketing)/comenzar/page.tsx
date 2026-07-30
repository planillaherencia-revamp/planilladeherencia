import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { StartCaseForm } from "./start-case-form"

export const metadata: Metadata = {
  title: "Comience su caso",
  description:
    "Regístrese para comenzar su Planilla de Caudal Relicto. Le contactamos dentro de 1 a 2 días laborables.",
}

export default function ComenzarPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Reveal>
        <SectionHeading
          eyebrow="Comience su caso"
          title="Cuéntenos lo básico y nosotros la contactamos"
          description="No hace falta tener todo listo hoy. Con esto abrimos su caso; el resto lo completamos juntos."
          center
        />
      </Reveal>

      <Reveal delay={0.1}>
        <Card className="mx-auto mt-10 max-w-2xl border-border/70 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <StartCaseForm />
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-6 flex max-w-2xl items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Su información se maneja de forma privada y solo se usa para
            preparar su caso.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
