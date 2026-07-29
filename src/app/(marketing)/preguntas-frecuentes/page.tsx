import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircleQuestion } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/marketing/reveal"

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre la Planilla de Caudal Relicto y el Relevo de Herencia en Puerto Rico.",
}

const faqs = [
  {
    question: "¿Qué es la Planilla de Caudal Relicto?",
    answer:
      "Es el formulario que se rinde ante el Departamento de Hacienda para reportar los bienes que poseía el causante al momento de su fallecimiento. También se le conoce como «Planilla de Herencia». Es el paso necesario para obtener el Relevo de Herencia.",
  },
  {
    question: "¿Qué es el Relevo de Herencia?",
    answer:
      "Es la Certificación de Gravamen que emite Hacienda una vez evaluada la planilla. Los herederos la necesitan para inscribir la propiedad a su nombre, vender o refinanciar un inmueble, y para recibir certificados de ahorro, cuentas bancarias u otros bienes que estaban a nombre del causante.",
  },
  {
    question: "¿Quién debe rendir la planilla?",
    answer:
      "Debe rendirse respecto a personas que eran residentes de Puerto Rico al momento de su fallecimiento, y también respecto a personas no residentes que tenían propiedad localizada en Puerto Rico. La firma quien tenga posesión o dominio de los bienes incluibles en el caudal: el viudo o viuda, los herederos, el administrador de bienes, el albacea testamentario, o su representante legal o contador.",
  },
  {
    question: "¿Cuánto tiempo tengo para rendir la planilla?",
    answer:
      "La Planilla de Contribución sobre Caudal Relicto debe rendirse antes de que transcurran nueve meses desde la fecha del fallecimiento del causante.",
  },
  {
    question: "¿Qué pasa si ya se rindió una planilla y necesito corregirla?",
    answer:
      "Se puede enmendar. Se completa una nueva planilla marcando el encasillado de «Planilla Enmendada», acompañada de un Comprobante de Rentas Internas de $25 y una carta explicando las razones de la enmienda. Si se aumenta el valor de una propiedad, se requiere el informe de tasación y un acta aclaratoria; si se añade una propiedad inmueble, se requiere certificación del CRIM. Si la enmienda añade bienes por más del 25% del valor originalmente informado, se pagan derechos adicionales equivalentes al 10% de la diferencia entre ambos montos.",
  },
  {
    question: "¿Qué bienes hay que reportar?",
    answer:
      "Todos los bienes y derechos sobre propiedad mueble o inmueble, tangible o intangible, dondequiera que esté localizada la propiedad: bienes inmuebles, cuentas de banco y certificados, vehículos, valores e inversiones, cuentas de retiro, pólizas de seguro de vida, intereses en negocios y propiedad personal de valor. También se reportan deudas y gastos deducibles del caudal.",
  },
  {
    question: "¿Cuánto cuesta el servicio?",
    answer:
      "La tarifa base es de $300 e incluye una propiedad inmueble, más $50 por cada propiedad inmueble adicional, más $25 de radicación ante Hacienda. Se paga un depósito del 50% para comenzar y el 50% restante al completarse el caso. Le enviamos una cotización exacta luego de conocer los detalles de su caso.",
  },
  {
    question: "¿Necesito tener todos los documentos listos antes de empezar?",
    answer:
      "No. Puede comenzar el cuestionario con la información que tenga disponible e irla completando poco a poco — sus respuestas se guardan automáticamente. Le iremos indicando qué documentos hacen falta según los bienes que reporte.",
  },
  {
    question: "¿Cómo les envío mis documentos?",
    answer:
      "De la forma que le resulte más cómoda: por un enlace privado creado exclusivamente para su caso, subiéndolos usted misma en cualquier momento, o enviándolos por correo electrónico.",
  },
  {
    question: "¿Tengo que ir a alguna oficina?",
    answer:
      "No hace falta. Todo el proceso — cuestionario, envío de documentos, cotización y pago — se puede completar en línea desde su celular o computadora. Si prefiere conversar por teléfono en algún punto, con gusto coordinamos.",
  },
]

export default function FaqPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo que más nos preguntan"
            description="Si no encuentra la respuesta que busca, escríbanos directamente y con gusto le orientamos."
            center
          />
        </Reveal>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Reveal>
          <Card className="mx-auto max-w-3xl border-border/70">
            <CardContent className="px-6 py-2 sm:px-8">
              <Accordion>
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.question} value={`item-${i}`}>
                    <AccordionTrigger className="py-4 text-left font-heading text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pr-6 leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border/70 bg-secondary/40 p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/25 text-accent-foreground">
              <MessageCircleQuestion className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-semibold">
                ¿Su pregunta no está aquí?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Cada caso es distinto. Escríbanos y le contestamos con lo que
                aplica al suyo en particular.
              </p>
            </div>
            <Link href="/contacto" className={buttonVariants({})}>
              Hacer una pregunta
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
