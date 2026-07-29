import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Banknote,
  Briefcase,
  Car,
  Check,
  Gem,
  HeartPulse,
  Home,
  LineChart,
  Receipt,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Preparación de la Planilla de Caudal Relicto, gestión del Relevo de Herencia y planillas enmendadas en Puerto Rico.",
}

const assetCategories = [
  { icon: Home, label: "Propiedad inmueble", detail: "Residencial, comercial, solares y fincas" },
  { icon: Banknote, label: "Cuentas de banco", detail: "Cuentas corrientes, ahorros y certificados" },
  { icon: Car, label: "Vehículos de motor", detail: "Autos, guaguas, motoras y embarcaciones" },
  { icon: LineChart, label: "Valores e inversiones", detail: "Cuentas de retiro, acciones y bonos" },
  { icon: HeartPulse, label: "Pólizas de seguro de vida", detail: "Beneficios pagaderos al caudal" },
  { icon: Briefcase, label: "Intereses en negocios", detail: "Participaciones en corporaciones y sociedades" },
  { icon: Gem, label: "Propiedad personal", detail: "Joyas, arte y otros bienes de valor" },
  { icon: Receipt, label: "Deudas y obligaciones", detail: "Hipotecas, préstamos y gastos deducibles" },
]

const services = [
  {
    title: "Planilla de Contribución sobre Caudal Relicto",
    description:
      "Preparamos su Planilla de Herencia reportando todos los bienes que poseía el causante al momento de su fallecimiento — muebles e inmuebles, tangibles e intangibles, dondequiera que estén localizados.",
    points: [
      "Aplica a residentes de Puerto Rico al momento del fallecimiento",
      "También aplica a no residentes con propiedad localizada en Puerto Rico",
      "Debe rendirse dentro de los nueve meses siguientes al fallecimiento",
      "La firma el administrador, heredero, viudo(a), albacea o representante legal",
    ],
  },
  {
    title: "Relevo de Herencia (Certificación de Gravamen)",
    description:
      "Gestionamos ante Hacienda el documento que sus herederos necesitan para poder disponer legalmente de los bienes heredados y ponerlos a su nombre.",
    points: [
      "Necesario para inscribir bienes inmuebles a nombre del heredero",
      "Requerido por los bancos para liberar cuentas y certificados",
      "Indispensable para vender o refinanciar la propiedad heredada",
      "Preparado con los datos de su especialista ya registrados",
    ],
  },
  {
    title: "Planillas enmendadas",
    description:
      "Si ya se rindió una planilla y se omitió información, cambió el valor de algún bien, o hace falta añadir una propiedad, preparamos la enmienda con toda la documentación de respaldo requerida.",
    points: [
      "Incluye la carta explicativa de las razones de la enmienda",
      "Le orientamos sobre comprobantes, tasaciones y certificaciones del CRIM",
      "Le explicamos si aplican derechos adicionales antes de someterla",
    ],
  },
]

export default function ServiciosPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo relacionado a su Caudal Relicto, en un solo lugar"
            description="Desde la primera planilla hasta el Relevo de Herencia, nos encargamos del papeleo con Hacienda para que usted no tenga que descifrarlo sola."
          />
        </Reveal>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <Card className="border-border/70 transition-shadow duration-300 hover:shadow-md">
                <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <ul className="space-y-2.5 self-center">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent/30">
                          <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                        </span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Reveal>
          <SectionHeading
            eyebrow="Bienes que cubrimos"
            title="Solo le preguntamos por lo que aplica a su caso"
            description="Nuestro cuestionario se adapta a los bienes que realmente tuvo el causante — si no hubo vehículos ni cuentas de inversión, no perderá tiempo respondiendo esas preguntas."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assetCategories.map(({ icon: Icon, label, detail }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/25 text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3.5 text-sm font-semibold">{label}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  {detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Card className="overflow-hidden border-border/70">
            <CardContent className="grid gap-0 p-0 lg:grid-cols-2">
              <div className="p-6 sm:p-10 lg:self-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Inversión
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
                  Un costo claro, desde el inicio
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Le enviamos una cotización exacta luego de conocer los
                  detalles de su caso — sin cargos escondidos.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex justify-between gap-4 border-b border-border/60 pb-3">
                    <span className="text-muted-foreground">
                      Tarifa base (incluye 1 propiedad inmueble)
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      ${siteConfig.pricing.baseFee}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-border/60 pb-3">
                    <span className="text-muted-foreground">
                      Cada propiedad inmueble adicional
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      +${siteConfig.pricing.additionalPropertyFee}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-border/60 pb-3">
                    <span className="text-muted-foreground">
                      Radicación ante Hacienda
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      +${siteConfig.pricing.haciendaFilingFee}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Depósito inicial</span>
                    <span className="font-medium whitespace-nowrap">
                      {siteConfig.pricing.depositPercent}% &middot; resto al completar
                    </span>
                  </li>
                </ul>
                <Link
                  href="/contacto"
                  className={buttonVariants({ className: "mt-7" })}
                >
                  Solicitar cotización
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-64 lg:min-h-full">
                <Image
                  src="/img/hogar-atardecer.jpg"
                  alt="Hogar familiar al atardecer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </>
  )
}
