import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarHeart, Check } from 'lucide-react'
import { getDecoracaoById } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ReservaDialog } from '@/components/reserva-dialog'

function formatPreco(preco: number | null) {
  if (preco == null) return 'Sob consulta'
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default async function DecoracaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const decoracao = await getDecoracaoById(id)

  if (!decoracao || !decoracao.ativo) {
    notFound()
  }

  const galeria =
    decoracao.imagens && decoracao.imagens.length > 0
      ? decoracao.imagens
      : [decoracao.imagem_url ?? '/decoracoes/hero.png']

  const inclui = [
    'Painel temático',
    'Arco / guirlanda de balões',
    'Apoios e adereços decorativos',
    'Suporte para montagem',
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Link
          href="/#decoracoes"
          className="inline-flex items-center gap-2 text-sm font-600 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar às decorações
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-sm">
              <Image
                src={galeria[0] || '/placeholder.svg'}
                alt={`Decoração ${decoracao.nome}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {galeria.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {galeria.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-xl border border-border/60"
                  >
                    <Image
                      src={img || '/placeholder.svg'}
                      alt={`${decoracao.nome} foto ${i + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {decoracao.tema && (
              <Badge className="rounded-full">{decoracao.tema}</Badge>
            )}
            <h1 className="mt-3 font-display text-3xl font-700 text-foreground">
              {decoracao.nome}
            </h1>
            <div className="mt-3">
              <span className="block text-sm text-muted-foreground">
                Valor da locação a partir de
              </span>
              <span className="font-display text-3xl font-700 text-primary">
                {formatPreco(decoracao.preco)}
              </span>
            </div>

            {decoracao.descricao && (
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {decoracao.descricao}
              </p>
            )}

            <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/30 p-5">
              <h2 className="font-display text-base font-700 text-foreground">
                O que está incluso
              </h2>
              <ul className="mt-3 space-y-2">
                {inclui.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <Check className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <ReservaDialog
                decoracao={decoracao}
                trigger={
                  <Button size="lg" className="w-full rounded-full font-600 sm:w-auto">
                    <CalendarHeart className="mr-2 h-5 w-5" />
                    Reservar esta decoração
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
