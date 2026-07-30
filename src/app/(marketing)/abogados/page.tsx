import type { Metadata } from "next"
import Image from "next/image"
import { Clock, HandHeart, MessageSquare, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"
import { ReferralForm } from "./referral-form"

export const metadata: Metadata = {
  title: "Para abogados",
  description:
    "Refiera sus casos de Caudal Relicto a Marisol Rodríguez — especialista registrada ante Hacienda. Sin comisión, solo un traspaso simple y confiable.",
}

const reasons = [
  {
    icon: ShieldCheck,
    title: "Especialista registrada",
    description:
      "Registrada ante el Departamento de Hacienda como Especialista en Planillas (#1020612). El trámite queda en manos competentes.",
  },
  {
    icon: Clock,
    title: "Usted no pierde tiempo en esto",
    description:
      "Me encargo del cuestionario, los documentos, la planilla y la radicación en SURI. Usted se enfoca en su práctica.",
  },
  {
    icon: MessageSquare,
    title: "Le mantengo al tanto",
    description:
      "Si necesita saber en qué va el caso de su cliente, le contesto directamente — sin intermediarios ni vueltas.",
  },
]

export default function AbogadosPage() {
  return (
    <>
      <Section className="relative overflow-hidden pt-16 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent)_0%,transparent_70%)] opacity-15"
        />
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Para abogados
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Refiérame sus casos de Caudal Relicto
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Cuando un cliente necesita resolver la Planilla de Caudal
              Relicto y usted prefiere no manejar ese trámite directamente,
              me lo puede referir. Yo preparo y radico la planilla, gestiono
              el Relevo de Herencia, y le devuelvo un cliente con su asunto
              resuelto — sin comisión de por medio, solo un traspaso simple
              entre colegas.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-lg">
              <Image
                src="/img/firma-documento.jpg"
                alt="Persona firmando documentos legales"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué referirme un caso"
            title="Un traspaso simple, sin comisión"
            center
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Card className="h-full border-border/70">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/25 text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">
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
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/25 text-accent-foreground">
                <HandHeart className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
                Someter caso
              </h2>
              <p className="mt-2 text-muted-foreground">
                Con sus datos y los básicos del cliente basta para empezar —
                yo tomo el resto de la información directamente con el
                cliente.
              </p>
            </div>
            <Card className="mt-8 border-border/70 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <ReferralForm />
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
