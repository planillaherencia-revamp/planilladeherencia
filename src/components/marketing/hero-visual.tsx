"use client"

import { motion } from "motion/react"
import { FileCheck2, Home, ShieldCheck, Users } from "lucide-react"

const cards = [
  {
    icon: Home,
    title: "Propiedad",
    detail: "Inscrita a nombre de sus herederos",
    className: "left-0 top-6 sm:left-4",
    delay: 0.1,
  },
  {
    icon: FileCheck2,
    title: "Planilla radicada",
    detail: "Ante el Departamento de Hacienda",
    className: "right-0 top-0 sm:right-2",
    delay: 0.25,
  },
  {
    icon: Users,
    title: "Familia tranquila",
    detail: "Sin ir de oficina en oficina",
    className: "left-4 bottom-2 sm:left-10",
    delay: 0.4,
  },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        aria-hidden
        className="absolute inset-[-15%] rounded-full bg-[radial-gradient(circle_at_30%_20%,var(--accent)_0%,transparent_55%),radial-gradient(circle_at_70%_75%,var(--primary)_0%,transparent_50%)] opacity-25 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full items-center justify-center"
      >
        <div className="flex h-56 w-56 items-center justify-center rounded-full border border-border/60 bg-card shadow-sm sm:h-64 sm:w-64">
          <ShieldCheck className="h-20 w-20 text-primary" strokeWidth={1.25} />
        </div>

        {cards.map(({ icon: Icon, title, detail, className, delay }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute w-44 rounded-xl border border-border/70 bg-card p-3.5 shadow-md ${className}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs font-semibold leading-tight">{title}</p>
                <p className="text-[0.7rem] leading-tight text-muted-foreground">
                  {detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
