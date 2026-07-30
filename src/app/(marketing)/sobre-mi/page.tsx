import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conozca a Marisol Rodríguez, especialista en Planillas de Caudal Relicto en Puerto Rico.",
}

const initials = siteConfig.specialist.name
  .split(" ")
  .map((n) => n[0])
  .slice(0, 2)
  .join("")

const values = [
  {
    title: "Le explico todo en lenguaje claro",
    description:
      "Sin jerga legal ni respuestas a medias. Usted siempre va a saber qué necesita, por qué lo necesita y en qué punto va su caso.",
  },
  {
    title: "Trabajo su caso personalmente",
    description:
      "No pasa por un centro de llamadas. La persona que prepara su planilla es la misma con la que usted conversa.",
  },
  {
    title: "Respeto el momento por el que pasa",
    description:
      "Este trámite casi siempre llega en medio de una pérdida. Mi trabajo es quitarle ese peso de encima, no añadirle otro.",
  },
]

export default function SobreMiPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal>
            <Card className="overflow-hidden border-border/70 shadow-sm">
              <div className="relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-primary/90 to-primary">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,var(--accent)_0%,transparent_55%)] opacity-25"
                />
                <span className="relative font-heading text-7xl font-semibold text-primary-foreground">
                  {initials}
                </span>
              </div>
              <CardContent className="p-6 text-center">
                <h1 className="font-heading text-xl font-semibold">
                  {siteConfig.specialist.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {siteConfig.specialist.role}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    Especialista #{siteConfig.specialist.number}
                  </span>
                  <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Puerto Rico
                  </span>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Sobre mí
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              La persona que preparará su caso, no un formulario automático
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Soy <strong className="font-medium text-foreground">Marisol
                Rodríguez</strong>, especialista registrada ante el
                Departamento de Hacienda de Puerto Rico bajo el número{" "}
                {siteConfig.specialist.number}. Me dedico a preparar y radicar
                Planillas de Contribución sobre Caudal Relicto para familias
                de toda la isla.
              </p>
              <p>
                Sé que este proceso casi nunca llega en un buen momento.
                Cuando alguien fallece, la familia se encuentra de golpe con
                plazos, formularios y requisitos que nadie le explicó — y con
                una propiedad o una cuenta que no pueden tocar hasta resolver
                el trámite con Hacienda.
              </p>
              <p>
                Mi enfoque es sencillo: hacerme cargo de la parte técnica,
                explicarle en lenguaje claro lo que va pasando, y mantenerle
                informado del estatus de su caso sin que tenga que estar
                persiguiendo respuestas.
              </p>
              <p>
                Esta plataforma nació de ahí — de llevar ese mismo trato
                cercano a un proceso más rápido y organizado, sin perder el
                acompañamiento personal que siempre ha distinguido mi trabajo.
              </p>
            </div>
            <Link
              href="/comenzar"
              className={buttonVariants({ className: "mt-7", size: "lg" })}
            >
              Conversemos sobre su caso
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo trabajo"
            title="Tres cosas que puede esperar de mí"
            center
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <Card className="h-full border-border/70">
                <CardContent className="p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/25 text-accent-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Card className="overflow-hidden border-border/70">
            <CardContent className="grid gap-0 p-0 lg:grid-cols-[1fr_1fr]">
              <div className="relative min-h-56 lg:min-h-full">
                <Image
                  src="/img/planilla-docs.jpg"
                  alt="Documentos y formularios sobre un escritorio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="p-8 sm:p-10 lg:self-center">
                <h2 className="font-heading text-2xl font-semibold">
                  ¿Empezamos?
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Cuénteme brevemente sobre su caso y le explico exactamente
                  qué necesita, cuánto tomaría y qué costo tendría — sin
                  compromiso.
                </p>
                <Link
                  href="/comenzar"
                  className={buttonVariants({ className: "mt-6" })}
                >
                  Comenzar mi caso
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </>
  )
}
