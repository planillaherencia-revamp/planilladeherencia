import { AdminNav } from "@/components/admin/admin-nav"

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </>
  )
}
