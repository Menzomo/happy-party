import Image from 'next/image'
import Link from 'next/link'
import { CalendarCheck, PackageCheck, Sparkles, Truck } from 'lucide-react'
import { getDecoracoesAtivas } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { DecoracaoCard } from '@/components/decoracao-card'

export default async function HomePage() {
  const decoracoes = await getDecoracoesAtivas()

  const passos = [
    {
      icon: Sparkles,
      titulo: 'Escolha a decoração',
      texto: 'Navegue pelo catálogo e encontre o tema perfeito para a festa.',
    },
    {
      icon: CalendarCheck,
      titulo: 'Reserve a data',
      texto: 'Selecione a data do evento e envie sua reserva em segundos.',
    },
    {
      icon: PackageCheck,
      titulo: 'Monte com facilidade',
      texto: 'Você recebe a decoração completa no sistema pegue e monte.',
    },
    {
      icon: Truck,
      titulo: 'Devolução simples',
      texto: 'Após a festa, é só combinar a devolução. Sem complicação.',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-600 text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                Decoração no sistema pegue e monte
              </span>
              <h1 className="mt-4 text-balance font-display text-4xl font-700 leading-tight text-foreground sm:text-5xl">
                Festas infantis inesquecíveis, do jeitinho que você sonhou
              </h1>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Alugue decorações temáticas encantadoras e monte você mesmo. Praticidade,
                economia e muito charme para o dia especial do seu filho.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-full font-600"
                  render={<Link href="#decoracoes">Ver decorações</Link>}
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full font-600"
                  render={
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver no Instagram
                    </a>
                  }
                />
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-lg">
              <Image
                src="/decoracoes/hero.png"
                alt="Decoração de festa infantil montada"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="border-y border-border/60 bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-center font-display text-2xl font-700 text-foreground sm:text-3xl">
              Como funciona
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
              Simples, rápido e sem preocupação. Em quatro passos a sua festa está pronta.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {passos.map((p) => (
                <div
                  key={p.titulo}
                  className="rounded-2xl border border-border/60 bg-card p-5 text-center"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-700 text-foreground">
                    {p.titulo}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <section id="decoracoes" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-700 text-foreground sm:text-3xl">
              Nossas decorações
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Escolha o tema favorito e reserve a data da sua festa.
            </p>
          </div>

          {decoracoes.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Em breve novas decorações por aqui. Acompanhe nosso Instagram!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {decoracoes.map((d) => (
                <DecoracaoCard key={d.id} decoracao={d} />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
