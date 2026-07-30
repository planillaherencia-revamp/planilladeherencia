export const siteConfig = {
  name: "Caudal Relicto PR",
  tagline: "Su Relevo de Herencia, sin complicaciones",
  description:
    "Preparamos y radicamos su Planilla de Caudal Relicto ante el Departamento de Hacienda de Puerto Rico — con acompañamiento personal en cada paso.",
  contactEmail: "planillaherencia@gmail.com",
  contactPhone: "787-553-3290",
  specialist: {
    name: "Marisol Rodríguez",
    number: "1020612",
    role: "Especialista en Planillas de Caudal Relicto",
  },
  pricing: {
    baseFee: 300,
    additionalPropertyFee: 50,
    haciendaFilingFee: 25,
    depositPercent: 50,
  },
} as const

export const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/proceso", label: "Cómo funciona" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
] as const
