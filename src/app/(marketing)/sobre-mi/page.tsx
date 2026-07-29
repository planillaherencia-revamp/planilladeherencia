import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Conozca a la especialista detrás de Caudal Relicto PR.",
}

export default function SobreMiPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Card className="border-border/70">
            <CardContent className="p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary font-heading text-2xl font-semibold text-primary-foreground">
                {siteConfig.specialist.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h1 className="mt-4 font-heading text-2xl font-semibold">
                {siteConfig.specialist.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Especialista en Caudal Relicto
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Especialista #{siteConfig.specialist.number}
              </div>
            </CardContent>
          </Card>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Sobre mí
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              La persona que preparará su caso, no un formulario automático
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                Ayudo a familias en Puerto Rico a resolver el proceso de
                Caudal Relicto desde hace años, trabajando de cerca con cada
                cliente para preparar planillas correctas y evitar demoras
                innecesarias con el Departamento de Hacienda.
              </p>
              <p>
                Sé que este proceso ocurre casi siempre en un momento
                difícil. Por eso mi enfoque es sencillo: explicarle todo en
                lenguaje claro, mantenerlo informado sobre el estatus de su
                caso, y encargarme del papeleo para que usted no tenga que
                descifrarlo sola.
              </p>
              <p>
                Esta plataforma es la forma en que llevo ese mismo trato
                cercano a un proceso más rápido y organizado — sin perder el
                acompañamiento personal que siempre ha distinguido mi
                trabajo.
              </p>
            </div>
            <Link href="/contacto" className={buttonVariants({ className: "mt-6" })}>
              Conversemos sobre su caso
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
