import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbanos sobre su caso de Caudal Relicto en Puerto Rico.",
}

export default function ContactoPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Contacto"
        title="Pregúntenos cómo"
        description="Cuéntenos brevemente sobre su caso y le explicamos los próximos pasos, sin compromiso."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <Card className="border-border/70">
            <CardContent className="flex items-start gap-3 p-5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">Correo electrónico</p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="flex items-start gap-3 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">Área de servicio</p>
                <p className="text-sm text-muted-foreground">Puerto Rico</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/70">
          <CardContent className="p-6 sm:p-8">
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
