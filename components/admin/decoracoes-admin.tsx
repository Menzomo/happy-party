'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { excluirDecoracao } from '@/app/actions/admin'
import type { Decoracao } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DecoracaoFormDialog } from '@/components/admin/decoracao-form-dialog'

function formatPreco(preco: number | null) {
  if (preco == null) return 'Sob consulta'
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function ExcluirButton({ decoracao }: { decoracao: Decoracao }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const res = await excluirDecoracao(decoracao.id)
      if (res.ok) toast.success('Decoração excluída.')
      else toast.error(res.error ?? 'Erro ao excluir.')
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir decoração?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir “{decoracao.nome}”? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-full"
          >
            {isPending ? 'Excluindo...' : 'Sim, excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DecoracoesAdmin({ decoracoes }: { decoracoes: Decoracao[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-700 text-foreground">
            Decorações ({decoracoes.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Cadastre e gerencie as decorações disponíveis para locação.
          </p>
        </div>
        <DecoracaoFormDialog />
      </div>

      {decoracoes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Nenhuma decoração cadastrada ainda. Clique em “Nova decoração”.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decoracoes.map((d) => (
            <div
              key={d.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={d.imagem_url || '/placeholder.svg?height=300&width=400&query=decoracao'}
                  alt={d.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                {!d.ativo && (
                  <Badge className="absolute left-2 top-2 bg-muted text-muted-foreground">
                    Inativa
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-700 text-foreground">
                      {d.nome}
                    </h3>
                    {d.tema && (
                      <span className="text-xs text-muted-foreground">{d.tema}</span>
                    )}
                  </div>
                  <span className="whitespace-nowrap font-600 text-primary">
                    {formatPreco(d.preco)}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1 border-t border-border/60 pt-2">
                  <DecoracaoFormDialog
                    decoracao={d}
                    trigger={
                      <Button variant="ghost" size="sm" className="font-600">
                        <Pencil className="mr-1 h-4 w-4" />
                        Editar
                      </Button>
                    }
                  />
                  <div className="ml-auto">
                    <ExcluirButton decoracao={d} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
