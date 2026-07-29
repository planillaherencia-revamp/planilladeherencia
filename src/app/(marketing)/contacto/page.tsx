import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbanos sobre su caso de Caudal Relicto en Puerto Rico. Le orientamos sin compromiso.",
}

const details = [
  {
    icon: Mail,
    label: "Correo electrónico",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: siteConfig.contactPhone,
    href: `tel:+1${siteConfig.contactPhone.replace(/-/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Área de servicio",
    value: "Todo Puerto Rico",
  },
  {
    icon: Clock,
    label: "Tiempo de respuesta",
    value: "Le contestamos dentro de 1 a 2 días laborables",
  },
  {
    icon: ShieldCheck,
    label: "Confidencialidad",
    value: "Su información se maneja de forma privada y segura",
  },
]

export default function ContactoPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Reveal>
        <SectionHeading
          eyebrow="Contacto"
          title="Pregúntenos cómo"
          description="Cuéntenos brevemente sobre su caso y le explicamos los próximos pasos, sin compromiso."
        />
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <Reveal className="space-y-3">
          {details.map(({ icon: Icon, label, value, href }) => (
            <Card key={label} className="border-border/70">
              <CardContent className="flex items-start gap-3.5 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-accent-foreground">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm leading-snug text-muted-foreground">
                      {value}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="border-border/70 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
