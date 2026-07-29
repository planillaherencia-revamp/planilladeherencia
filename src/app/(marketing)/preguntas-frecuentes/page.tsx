import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionHeading } from "@/components/marketing/section"

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre la Planilla de Caudal Relicto y el Relevo de Herencia en Puerto Rico.",
}

const faqs = [
  {
    question: "¿Qué es la Planilla de Caudal Relicto?",
    answer:
      "Es el formulario que se rinde ante el Departamento de Hacienda para reportar los bienes que poseía una persona al momento de su fallecimiento. También se conoce como \"Planilla de Herencia\". Es el paso necesario para obtener el Relevo de Herencia.",
  },
  {
    question: "¿Qué es el Relevo de Herencia?",
    answer:
      "Es la Certificación de Gravamen que emite Hacienda una vez evaluada la planilla. Los herederos la necesitan para inscribir propiedad a su nombre, vender o refinanciar un inmueble, y para recibir certificados de ahorro, cuentas bancarias u otros bienes del difunto.",
  },
  {
    question: "¿Quién debe rendir la planilla?",
    answer:
      "Debe rendirse con respecto a personas que eran residentes de Puerto Rico al momento de su fallecimiento, y también respecto a personas no residentes que tenían propiedad localizada en Puerto Rico. La firma la persona que tenga posesión o dominio de los bienes: el viudo o viuda, los herederos, el administrador de bienes, el albacea testamentario, o su representante legal o contador.",
  },
  {
    question: "¿Cuánto tiempo tengo para rendir la planilla?",
    answer:
      "La Planilla de Contribución sobre Caudal Relicto debe rendirse antes de que transcurran nueve meses desde la fecha del fallecimiento.",
  },
  {
    question: "¿Qué pasa si ya rendí una planilla y necesito corregirla?",
    answer:
      "Se puede enmendar. Se completa una nueva planilla marcando el encasillado de \"Planilla Enmendada\", acompañada de un Comprobante de Rentas Internas de $25 y una carta explicando las razones de la enmienda. Si se aumenta el valor de una propiedad, se requiere el informe de tasación y un acta aclaratoria; si se añade una propiedad inmueble, se requiere certificación del CRIM. Si la enmienda añade bienes por más del 25% del valor originalmente informado, se pagan derechos adicionales equivalentes al 10% de la diferencia entre ambos montos.",
  },
  {
    question: "¿Cuánto cuesta el servicio?",
    answer:
      "La tarifa base es de $300 e incluye una propiedad inmueble, más $50 por cada propiedad inmueble adicional, más $25 de radicación ante Hacienda. Se paga un depósito del 50% para comenzar y el 50% restante al completar el caso. Le enviamos una cotización exacta luego de conocer los detalles de su caso.",
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
]

export default function FaqPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos preguntan"
          description="Si no encuentra la respuesta que busca, escríbanos directamente."
        />
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Accordion className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-heading text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <Link href="/contacto" className={buttonVariants({})}>
            Hacer otra pregunta
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
