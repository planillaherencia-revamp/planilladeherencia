import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Building2,
  CalendarClock,
  FileCheck2,
  HeartHandshake,
  Landmark,
  MonitorSmartphone,
  ScrollText,
  ShieldCheck,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { siteConfig } from "@/lib/site-config"

const trustStrip = [
  {
    icon: CalendarClock,
    stat: "12 meses",
    label:
      "es el plazo para rendir la planilla desde el fallecimiento del causante",
  },
  {
    icon: ShieldCheck,
    stat: `#${siteConfig.specialist.number}`,
    label: "especialista registrada ante el Departamento de Hacienda",
  },
  {
    icon: MonitorSmartphone,
    stat: "En línea",
    label: "todo el proceso desde su celular o computadora, a su ritmo",
  },
]

const services = [
  {
    icon: ScrollText,
    title: "Planilla de Caudal Relicto",
    description:
      "Reportamos ante Hacienda todos los bienes que poseía el causante al momento de su fallecimiento — muebles e inmuebles, tangibles e intangibles.",
  },
  {
    icon: Landmark,
    title: "Relevo de Herencia",
    description:
      "Gestionamos la Certificación de Gravamen que sus herederos necesitan para inscribir la propiedad, venderla, refinanciarla o liberar cuentas bancarias.",
  },
  {
    icon: FileCheck2,
    title: "Planillas enmendadas",
    description:
      "Si ya se rindió una planilla y falta información o cambió el valor de un bien, preparamos la enmienda con toda la documentación de respaldo.",
  },
]

const steps = [
  {
    number: "01",
    title: "Cuéntenos su caso",
    description:
      "Un cuestionario que se adapta a usted: solo le preguntamos por los bienes que realmente tuvo el causante.",
  },
  {
    number: "02",
    title: "Reciba su cotización",
    description:
      "Calculamos el costo exacto según los bienes reportados. Sin cargos escondidos ni sorpresas.",
  },
  {
    number: "03",
    title: "Trabajamos su planilla",
    description:
      "Organizamos sus documentos, preparamos la planilla y la radicamos ante el Departamento de Hacienda.",
  },
  {
    number: "04",
    title: "Reciba su Relevo",
    description:
      "Le entregamos la Certificación de Gravamen, lista para usar ante el registro, el banco o el comprador.",
  },
]

const differentiators = [
  {
    icon: HeartHandshake,
    title: "Le hablamos claro",
    description:
      "Nada de jerga legal. Le explicamos qué necesita, por qué lo necesita y en qué punto va su caso.",
  },
  {
    icon: Building2,
    title: "Conocemos a Hacienda",
    description:
      "Sabemos qué pide el Departamento y cómo lo pide, para que su planilla no se devuelva por detalles evitables.",
  },
  {
    icon: ShieldCheck,
    title: "Su información, protegida",
    description:
      "Documentos y datos del causante se manejan de forma confidencial, en un expediente privado por caso.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-14 pb-10 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,var(--accent)_0%,transparent_70%)] opacity-20"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Caudal Relicto &middot; Puerto Rico
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Su Planilla de Herencia,{" "}
            <span className="text-primary">sin complicaciones</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Cuando fallece un ser querido, sus bienes no pueden transferirse
            hasta radicar la Planilla de Caudal Relicto ante Hacienda. Nosotros
            nos encargamos de todo el proceso — con lenguaje claro y
            acompañamiento personal en cada paso.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contacto" className={buttonVariants({ size: "lg" })}>
              Comience su caso
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/proceso"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Ver cómo funciona
            </Link>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 shadow-xl sm:aspect-[21/9]">
              <Image
                src="/img/hero-familia.jpg"
                alt="Familia unida al atardecer frente al mar"
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
              <div className="rounded-xl border border-white/20 bg-white/85 p-4 shadow-lg backdrop-blur-sm dark:bg-card/85">
                <p className="text-sm font-semibold text-foreground">
                  El patrimonio de una familia no se detiene en el papeleo
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Le ayudamos a completarlo correctamente, la primera vez.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Trust strip */}
      <Section className="py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {trustStrip.map(({ icon: Icon, stat, label }, i) => (
            <Reveal key={stat} delay={i * 0.08}>
              <div className="flex gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold leading-tight text-foreground">
                    {stat}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Qué es */}
      <Section className="bg-secondary/40">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-lg">
              <Image
                src="/img/planilla-docs.jpg"
                alt="Formularios y documentos sobre un escritorio"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              ¿Qué es?
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              La &ldquo;Planilla de Herencia&rdquo;, explicada sin enredos
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                La <strong className="font-medium text-foreground">Planilla
                de Contribución sobre Caudal Relicto</strong> es el formulario
                que se radica ante el Departamento de Hacienda para reportar
                los bienes que poseía el causante al momento de su
                fallecimiento.
              </p>
              <p>
                Es el paso indispensable para recibir el{" "}
                <strong className="font-medium text-foreground">Relevo</strong>{" "}
                — la Certificación de Gravamen. Sin ese documento, los
                herederos no pueden inscribir la propiedad a su nombre, ni
                venderla o refinanciarla, ni cobrar cuentas bancarias,
                certificados de ahorro o pólizas a nombre del causante.
              </p>
              <p className="rounded-lg border border-border/70 bg-card p-4 text-sm">
                <strong className="font-medium text-foreground">
                  Importante:
                </strong>{" "}
                la planilla debe rendirse dentro de los{" "}
                <strong className="font-medium text-foreground">
                  doce (12) meses
                </strong>{" "}
                siguientes al fallecimiento, para causantes fallecidos a partir
                del 1 de enero de 2018. Para fallecimientos anteriores a esa
                fecha aplican formularios y plazos distintos.
              </p>
            </div>
            <Link
              href="/preguntas-frecuentes"
              className={buttonVariants({
                variant: "outline",
                className: "mt-6",
              })}
            >
              Ver preguntas frecuentes
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Servicios */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo que necesita, de principio a fin"
            description="Nos encargamos de la parte técnica y del papeleo con Hacienda, para que usted y su familia puedan enfocarse en lo importante."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Card className="group h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <CardContent className="p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/25 text-accent-foreground transition-colors duration-300 group-hover:bg-accent/40">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8 text-center">
          <Link
            href="/servicios"
            className={buttonVariants({ variant: "outline" })}
          >
            Ver todos los servicios
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      {/* Proceso */}
      <Section className="bg-secondary/40">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Proceso
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Cuatro pasos, y nosotros hacemos el resto
            </h2>
            <p className="mt-4 text-muted-foreground">
              No hace falta que tenga todos los documentos listos hoy. Empiece
              con lo que tenga a mano — vamos completando su caso poco a poco.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-lg">
              <Image
                src="/img/firma-documento.jpg"
                alt="Persona firmando documentos"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-1">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className="flex gap-5 rounded-xl p-4 transition-colors duration-300 hover:bg-card">
                  <span className="font-heading text-2xl font-semibold text-primary/40">
                    {step.number}
                  </span>
                  <div className="border-l border-border/70 pl-5">
                    <h3 className="font-heading text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.35} className="pt-4 pl-4">
              <Link
                href="/proceso"
                className={buttonVariants({ variant: "outline" })}
              >
                Ver el proceso completo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Diferenciadores */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Por qué con nosotros"
            title="Un proceso técnico, con trato humano"
            center
          />
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {differentiators.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary ring-1 ring-primary/15">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Precio */}
      <Section className="pt-0">
        <Reveal>
          <Card className="border-border/70 bg-secondary/40">
            <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Inversión
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
                  Un precio claro, desde el primer día
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Le enviamos una cotización exacta una vez conocemos los
                  bienes del causante. Comienza con {siteConfig.pricing.depositPercent}% de
                  depósito y paga el resto al completarse su caso.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-8 lg:gap-10">
                <div>
                  <p className="font-heading text-3xl font-semibold text-foreground">
                    ${siteConfig.pricing.baseFee}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    base, 1 propiedad
                    <br />
                    inmueble incluida
                  </p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-semibold text-foreground">
                    +${siteConfig.pricing.additionalPropertyFee}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    por cada propiedad
                    <br />
                    adicional
                  </p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-semibold text-foreground">
                    +${siteConfig.pricing.haciendaFilingFee}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    radicación ante
                    <br />
                    Hacienda
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Section>

      {/* CTA final */}
      <Section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-10"
        >
          <Image
            src="/img/hogar-atardecer.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              ¿Tiene dudas sobre el caso de su familia?
            </h2>
            <p className="max-w-xl text-primary-foreground/85">
              Escríbanos sin compromiso. Le explicamos qué necesita para
              comenzar y cuánto tomaría su caso en particular.
            </p>
            <Link
              href="/contacto"
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              Comience su caso
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
