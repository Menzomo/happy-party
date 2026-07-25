import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PartyPopper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { sair } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PartyPopper className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-700 text-foreground">
              Painel Admin
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="font-600">
              <Link href="/" target="_blank">
                Ver site
              </Link>
            </Button>
            <form action={sair}>
              <Button type="submit" variant="outline" size="sm" className="rounded-full font-600">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
