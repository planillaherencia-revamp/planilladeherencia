import Link from "next/link"
import { ArrowRight, FileCheck2, ShieldCheck, Clock, HeartHandshake } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { HeroVisual } from "@/components/marketing/hero-visual"
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
      <Section className="relative overflow-hidden pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent)_0%,transparent_70%)] opacity-[0.15]"
        />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Caudal Relicto &middot; Puerto Rico
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Su Relevo de Herencia,{" "}
              <span className="text-primary">sin complicaciones</span>
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

          <HeroVisual />
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo que necesita para su Relevo de Herencia"
            description="Nos encargamos de la parte técnica y el papeleo, para que usted y su familia puedan enfocarse en lo importante."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Card className="h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Proceso"
            title="Así de sencillo trabajamos su caso"
            center
          />
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="text-center sm:text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/proceso" className={buttonVariants({ variant: "outline" })}>
            Ver el proceso completo
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Reveal>
          <Card className="overflow-hidden border-border/70">
            <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Costo estimado
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
                  Un precio claro, desde el inicio
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Le enviamos una cotización exacta luego de conocer los
                  detalles de su caso — sin cargos escondidos.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                <div>
                  <p className="font-heading text-3xl font-semibold text-foreground">
                    ${siteConfig.pricing.baseFee}
                  </p>
                  <p className="text-sm text-muted-foreground">base, 1 propiedad</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-semibold text-foreground">
                    +${siteConfig.pricing.additionalPropertyFee}
                  </p>
                  <p className="text-sm text-muted-foreground">c/u propiedad extra</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-semibold text-foreground">
                    {siteConfig.pricing.depositPercent}%
                  </p>
                  <p className="text-sm text-muted-foreground">depósito inicial</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <Reveal>
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
        </Reveal>
      </Section>
    </>
  )
}
