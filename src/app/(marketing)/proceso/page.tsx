import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "El proceso paso a paso para preparar su Planilla de Caudal Relicto y obtener su Relevo de Herencia.",
}

const steps = [
  {
    number: "1",
    title: "Cuéntenos su caso",
    description:
      "Complete un cuestionario en línea sobre el difunto y sus bienes. No hace falta tenerlo todo a mano de una vez — sus respuestas se guardan automáticamente y solo le preguntamos sobre las categorías de bienes que apliquen a su caso.",
  },
  {
    number: "2",
    title: "Reciba su cotización",
    description:
      "Con la información de sus bienes calculamos el costo exacto de su caso y se la enviamos para su aprobación, sin cargos escondidos.",
  },
  {
    number: "3",
    title: "Confirme y pague el depósito",
    description:
      "Al aceptar la cotización, se genera su factura. Con el depósito inicial comenzamos a trabajar su caso de inmediato.",
  },
  {
    number: "4",
    title: "Envíe sus documentos",
    description:
      "Suba sus documentos por un enlace privado creado solo para su caso, o envíelos por correo — nosotros nos encargamos de organizarlos.",
  },
  {
    number: "5",
    title: "Preparamos y radicamos su planilla",
    description:
      "Completamos la Planilla de Caudal Relicto y, cuando aplica, el formulario SC 2745 para su Relevo de Herencia, y la radicamos ante el Departamento de Hacienda.",
  },
  {
    number: "6",
    title: "Reciba su Certificación de Gravamen",
    description:
      "Le entregamos su Relevo, listo para inscribir propiedad, vender, refinanciar, o presentar ante el banco. Pague el balance final al completarse su caso.",
  },
]

export default function ProcesoPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De la primera pregunta a su Relevo de Herencia"
          description="Un proceso pensado para que no tenga que ir de oficina en oficina — todo se puede hacer desde su celular o computadora, a su propio ritmo."
        />
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {steps.map((step) => (
            <Card key={step.number} className="border-border/70">
              <CardContent className="flex gap-4 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Card className="border-border/70">
          <CardContent className="flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold">
                ¿Lista para comenzar?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Recuerde: la planilla debe rendirse dentro de los nueve meses
                siguientes al fallecimiento. Entre más pronto empecemos,
                mejor.
              </p>
            </div>
            <Link href="/contacto" className={buttonVariants({ size: "lg" })}>
              Pregúntenos cómo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
