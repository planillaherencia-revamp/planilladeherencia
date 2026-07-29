import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Preparación de la Planilla de Caudal Relicto, Relevo de Herencia (SC 2745) y planillas enmendadas en Puerto Rico.",
}

const assetCategories = [
  "Propiedad inmueble (residencial, comercial, solares)",
  "Cuentas de banco y certificados de ahorro",
  "Vehículos de motor",
  "Valores e inversiones (cuentas de retiro, acciones, bonos)",
  "Pólizas de seguro de vida",
  "Intereses en negocios",
  "Propiedad personal (joyas, arte, otros bienes)",
  "Deudas y obligaciones del caudal",
]

const services = [
  {
    title: "Planilla de Contribución sobre Caudal Relicto",
    description:
      "Preparamos su Planilla de Herencia reportando todos los bienes del difunto — muebles e inmuebles, tangibles e intangibles — según lo requiere el Departamento de Hacienda.",
    points: [
      "Aplica a residentes de Puerto Rico al momento del fallecimiento",
      "También aplica a no residentes con propiedad localizada en Puerto Rico",
      "Debe rendirse dentro de los nueve meses siguientes al fallecimiento",
    ],
  },
  {
    title: "Relevo de Herencia (SC 2745)",
    description:
      "Gestionamos la Certificación de Gravamen — el documento que sus herederos necesitan para inscribir la propiedad, venderla, refinanciarla, o cobrar cuentas y pólizas a nombre del difunto.",
    points: [
      "Necesario para inscribir bienes inmuebles a nombre del heredero",
      "Requerido por bancos para liberar cuentas y certificados",
      "Preparado con los datos de su especialista ya registrados",
    ],
  },
  {
    title: "Planillas enmendadas",
    description:
      "Si ya se rindió una planilla y se omitió información, cambió el valor de algún bien, o hace falta añadir una propiedad, preparamos la enmienda con la documentación de respaldo requerida.",
    points: [
      "Incluye la carta explicativa de los cambios",
      "Le orientamos sobre comprobantes y tasaciones necesarias",
      "Le explicamos si aplican derechos adicionales antes de someterla",
    ],
  },
]

export default function ServiciosPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo relacionado a su Caudal Relicto, en un solo lugar"
          description="Desde la primera planilla hasta el Relevo de Herencia, nos encargamos del papeleo con Hacienda para que usted no tenga que hacerlo sola."
        />
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border-border/70">
              <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <h3 className="font-heading text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{service.description}</p>
                </div>
                <ul className="space-y-2 self-center">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Bienes que cubrimos"
          title="Solo le preguntamos por lo que aplica a su caso"
          description="Nuestro cuestionario se adapta a los bienes del difunto — si no hay vehículos ni cuentas de inversión, no perderá tiempo respondiendo esas preguntas."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {assetCategories.map((category) => (
            <div
              key={category}
              className="flex items-start gap-2 rounded-lg border border-border/70 bg-card p-4 text-sm"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="border-border/70">
          <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Precio
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold">
                Un costo claro, desde el inicio
              </h2>
              <p className="mt-4 text-muted-foreground">
                Le enviamos una cotización exacta luego de conocer los
                detalles de su caso — sin cargos escondidos.
              </p>
              <Link
                href="/contacto"
                className={buttonVariants({ className: "mt-6" })}
              >
                Solicitar cotización
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-border/60 pb-3">
                <span className="text-muted-foreground">
                  Tarifa base (incluye 1 propiedad inmueble)
                </span>
                <span className="font-medium">${siteConfig.pricing.baseFee}</span>
              </li>
              <li className="flex justify-between border-b border-border/60 pb-3">
                <span className="text-muted-foreground">
                  Cada propiedad inmueble adicional
                </span>
                <span className="font-medium">
                  +${siteConfig.pricing.additionalPropertyFee}
                </span>
              </li>
              <li className="flex justify-between border-b border-border/60 pb-3">
                <span className="text-muted-foreground">
                  Radicación ante Hacienda
                </span>
                <span className="font-medium">
                  +${siteConfig.pricing.haciendaFilingFee}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Depósito inicial</span>
                <span className="font-medium">
                  {siteConfig.pricing.depositPercent}% &middot; resto al completar
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
