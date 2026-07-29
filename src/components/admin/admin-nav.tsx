"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "@/app/(admin)/admin/actions"

const links = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/casos", label: "Casos" },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border/60 bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-heading text-sm font-semibold">
            Caudal Relicto PR
          </Link>
          <nav className="hidden gap-4 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground",
                  pathname === link.href && "font-medium text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </form>
      </div>
    </header>
  )
}
