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

const documentsAlways = [
  "Certificado de defunción",
  "Declaratoria de herederos o testamento",
  "Certificación de valores contributivos del CRIM (sin deuda)",
  "Autorización firmada (Modelo SC 2745) con copia de identificación con foto vigente",
]

const documentsConditional = [
  "Número de catastro y escritura (o descripción registral de Karibe) de cada propiedad inmueble",
  "Estados bancarios más recientes de todas las cuentas",
  "Estados de cuentas de inversión, valores u otros",
  "Licencias de vehículos de motor, embarcaciones y similares",
  "Acta de apertura de caja de seguridad, si el causante tenía una",
  "Pólizas de seguro de vida, incapacidad u otras",
  "Informe de tasación a la fecha del fallecimiento, si el causante falleció antes del 1 de enero de 2018",
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
                    Documentos que hacen falta
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    No los necesita todos para empezar — le indicamos cuáles
                    aplican a su caso.
                  </p>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Siempre
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {documentsAlways.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-foreground/60" />
                        {doc}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Según los bienes del causante
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {documentsConditional.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                        {doc}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
                    Las certificaciones (CRIM, Registro Demográfico,
                    tribunales) tienen vigencia limitada. Si el proceso se
                    dilata, hay que solicitarlas de nuevo antes de radicar.
                  </p>
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
                    Recuerde: la planilla debe rendirse dentro de los doce (12)
                    meses siguientes al fallecimiento del causante. Entre más
                    pronto empecemos, mejor.
                  </p>
                </div>
              </div>
              <Link
                href="/comenzar"
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
