import Image from 'next/image'
import Link from 'next/link'
import type { Decoracao } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ReservaDialog } from '@/components/reserva-dialog'

function formatPreco(preco: number | null) {
  if (preco == null) return 'Sob consulta'
  return preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function DecoracaoCard({ decoracao }: { decoracao: Decoracao }) {
  const img = decoracao.imagem_url ?? '/decoracoes/hero.png'

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Link href={`/decoracoes/${decoracao.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={img || "/placeholder.svg"}
          alt={`Decoração ${decoracao.nome}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {decoracao.tema && (
          <Badge className="absolute left-3 top-3 rounded-full bg-background/90 text-foreground shadow-sm hover:bg-background/90">
            {decoracao.tema}
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-700 text-foreground">
          <Link href={`/decoracoes/${decoracao.id}`} className="hover:text-primary">
            {decoracao.nome}
          </Link>
        </h3>
        {decoracao.descricao && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {decoracao.descricao}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <span className="block text-xs text-muted-foreground">a partir de</span>
            <span className="font-display text-lg font-700 text-primary">
              {formatPreco(decoracao.preco)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full font-600"
            nativeButton={false}
            render={<Link href={`/decoracoes/${decoracao.id}`}>Ver detalhes</Link>}
          />
        </div>

        <div className="mt-3">
          <ReservaDialog decoracao={decoracao} />
        </div>
      </div>
    </div>
  )
}
