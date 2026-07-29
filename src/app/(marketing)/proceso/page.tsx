import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "El proceso paso a paso para preparar su Planilla de Caudal Relicto y obtener su Relevo de Herencia en Puerto Rico.",
}

const steps = [
  {
    number: "01",
    title: "Cuéntenos su caso",
    description:
      "Complete un cuestionario en línea sobre el causante y sus bienes. No hace falta tenerlo todo a mano de una vez: sus respuestas se guardan automáticamente y solo le preguntamos por las categorías de bienes que apliquen a su caso.",
  },
  {
    number: "02",
    title: "Reciba su cotización",
    description:
      "Con la información de los bienes reportados calculamos el costo exacto de su caso y se la enviamos para su aprobación, sin cargos escondidos.",
  },
  {
    number: "03",
    title: "Confirme y pague el depósito",
    description:
      "Al aceptar la cotización se genera su factura. Con el depósito inicial comenzamos a trabajar su caso de inmediato.",
  },
  {
    number: "04",
    title: "Envíe sus documentos",
    description:
      "Suba sus documentos por un enlace privado creado solo para su caso, o envíelos por correo electrónico — nosotros nos encargamos de organizarlos en su expediente.",
  },
  {
    number: "05",
    title: "Preparamos y radicamos su planilla",
    description:
      "Completamos la Planilla de Contribución sobre Caudal Relicto con todos los bienes y deducciones aplicables, y la radicamos ante el Departamento de Hacienda.",
  },
  {
    number: "06",
    title: "Reciba su Relevo",
    description:
      "Le entregamos la Certificación de Gravamen, lista para inscribir la propiedad, vender, refinanciar o presentar ante el banco. El balance final se paga al completarse su caso.",
  },
]

const documents = [
  "Certificado de defunción del causante",
  "Declaratoria de herederos o testamento",
  "Escrituras y recibos del CRIM de las propiedades",
  "Estados de cuentas bancarias a la fecha del fallecimiento",
  "Títulos de vehículos y pólizas de seguro",
  "Evidencia de deudas y gastos funerarios",
]

export default function ProcesoPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="De la primera pregunta a su Relevo de Herencia"
            description="Un proceso pensado para que no tenga que ir de oficina en oficina — todo se puede hacer desde su celular o computadora, a su propio ritmo."
          />
        </Reveal>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-[1.4rem] top-3 bottom-3 w-px bg-border"
            />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.06}>
                  <div className="relative flex gap-5">
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card font-heading text-sm font-semibold text-primary shadow-sm">
                      {step.number}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-heading text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-lg">
                <Image
                  src="/img/firma-documento.jpg"
                  alt="Persona firmando documentos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Card className="border-border/70">
                <CardContent className="p-6">
                  <h3 className="font-heading text-base font-semibold">
                    Documentos que suelen hacer falta
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    No los necesita todos para empezar — le indicamos cuáles
                    aplican a su caso.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {documents.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-foreground/60" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Reveal>
          <Card className="border-border/70">
            <CardContent className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/25 text-accent-foreground">
                  <AlertCircle className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                    ¿Listo para comenzar?
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Recuerde: la planilla debe rendirse dentro de los nueve
                    meses siguientes al fallecimiento del causante. Entre más
                    pronto empecemos, mejor.
                  </p>
                </div>
              </div>
              <Link
                href="/contacto"
                className={buttonVariants({ size: "lg", className: "shrink-0" })}
              >
                Pregúntenos cómo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </>
  )
}
