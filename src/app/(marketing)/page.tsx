import Link from "next/link"
import { ArrowRight, FileCheck2, ShieldCheck, Clock, HeartHandshake } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { siteConfig } from "@/lib/site-config"

const trustPoints = [
  { icon: ShieldCheck, label: "Especialista certificada" },
  { icon: Clock, label: "Proceso claro y a tiempo" },
  { icon: HeartHandshake, label: "Trato cercano y confidencial" },
]

const services = [
  {
    icon: FileCheck2,
    title: "Planilla de Caudal Relicto",
    description:
      "Preparamos y radicamos su Planilla de Contribución sobre Caudal Relicto ante Hacienda, con todos los bienes del difunto debidamente reportados.",
  },
  {
    icon: FileCheck2,
    title: "Relevo de Herencia (SC 2745)",
    description:
      "Gestionamos la Certificación de Gravamen que sus herederos necesitan para inscribir propiedad, vender, refinanciar o cobrar cuentas y pólizas.",
  },
  {
    icon: FileCheck2,
    title: "Planillas enmendadas",
    description:
      "Si ya rindió una planilla y hace falta corregir o añadir información, la enmendamos con la documentación de respaldo requerida.",
  },
]

const steps = [
  {
    number: "1",
    title: "Cuéntenos su caso",
    description: "Complete un cuestionario sencillo, a su ritmo — solo le preguntamos sobre lo que aplica a su caso.",
  },
  {
    number: "2",
    title: "Reciba su cotización",
    description: "Calculamos el costo exacto según los bienes reportados, sin sorpresas.",
  },
  {
    number: "3",
    title: "Trabajamos su planilla",
    description: "Reunimos los documentos y preparamos todo lo necesario para la radicación.",
  },
  {
    number: "4",
    title: "Reciba su Relevo",
    description: "Radicamos ante Hacienda y le entregamos su Certificación de Gravamen.",
  },
]

export default function HomePage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Caudal Relicto &middot; Puerto Rico
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Su Relevo de Herencia, sin complicaciones
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              {siteConfig.description} Le acompañamos en cada paso, con
              lenguaje claro y sin tener que ir de oficina en oficina.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contacto" className={buttonVariants({ size: "lg" })}>
                Pregúntenos cómo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/proceso"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Cómo funciona
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {trustPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <dt className="text-sm font-medium text-foreground">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <Card className="border-border/70 bg-card shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Costo estimado
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-semibold text-foreground">
                  ${siteConfig.pricing.baseFee}
                </span>
                <span className="text-muted-foreground">base, 1 propiedad incluida</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex justify-between border-b border-border/60 pb-3">
                  <span>Cada propiedad inmueble adicional</span>
                  <span className="font-medium text-foreground">
                    +${siteConfig.pricing.additionalPropertyFee}
                  </span>
                </li>
                <li className="flex justify-between border-b border-border/60 pb-3">
                  <span>Radicación ante Hacienda</span>
                  <span className="font-medium text-foreground">
                    +${siteConfig.pricing.haciendaFilingFee}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Depósito para comenzar</span>
                  <span className="font-medium text-foreground">
                    {siteConfig.pricing.depositPercent}%
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                El otro {100 - siteConfig.pricing.depositPercent}% se paga al completar su caso. Cotización
                exacta luego de conocer los detalles de su caso.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que necesita para su Relevo de Herencia"
          description="Nos encargamos de la parte técnica y el papeleo, para que usted y su familia puedan enfocarse en lo importante."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/70">
              <CardContent className="p-6">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Proceso"
          title="Así de sencillo trabajamos su caso"
          center
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="text-center sm:text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/proceso" className={buttonVariants({ variant: "outline" })}>
            Ver el proceso completo
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            ¿Necesita información?
          </h2>
          <p className="max-w-xl text-primary-foreground/85">
            Escríbanos y le explicamos qué necesita para comenzar su Planilla
            de Caudal Relicto, sin compromiso.
          </p>
          <Link
            href="/contacto"
            className={buttonVariants({ size: "lg", variant: "secondary" })}
          >
            Pregúntenos cómo
          </Link>
        </div>
      </Section>
    </>
  )
}
