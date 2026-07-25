'use client'

import { useActionState, useEffect, useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { salvarDecoracao, type DecoracaoFormState } from '@/app/actions/admin'
import type { Decoracao } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/image-upload'

type Props = {
  decoracao?: Decoracao
  trigger?: React.ReactNode
}

const initialState: DecoracaoFormState = { ok: false }

export function DecoracaoFormDialog({ decoracao, trigger }: Props) {
  const [open, setOpen] = useState(false)
  const [imagemUrl, setImagemUrl] = useState(decoracao?.imagem_url ?? '')
  const [ativo, setAtivo] = useState(decoracao?.ativo ?? true)
  const [state, formAction, isPending] = useActionState(
    salvarDecoracao,
    initialState,
  )

  useEffect(() => {
    if (state.ok) {
      toast.success('Decoração salva!')
      setOpen(false)
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="rounded-full font-600">
            <Plus className="mr-2 h-4 w-4" />
            Nova decoração
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {decoracao ? 'Editar decoração' : 'Nova decoração'}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {decoracao && <input type="hidden" name="id" value={decoracao.id} />}
          <input type="hidden" name="imagem_url" value={imagemUrl} />
          <input type="hidden" name="ativo" value={ativo ? 'true' : 'false'} />

          <div className="space-y-2">
            <Label>Foto</Label>
            <ImageUpload value={imagemUrl} onChange={setImagemUrl} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              name="nome"
              required
              defaultValue={decoracao?.nome}
              placeholder="Ex.: Unicórnio Mágico"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="tema">Tema</Label>
              <Input
                id="tema"
                name="tema"
                defaultValue={decoracao?.tema ?? ''}
                placeholder="Ex.: Unicórnio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                name="preco"
                inputMode="decimal"
                defaultValue={decoracao?.preco ?? ''}
                placeholder="350,00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              name="descricao"
              rows={3}
              defaultValue={decoracao?.descricao ?? ''}
              placeholder="Descreva o que está incluso na decoração..."
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-600 text-foreground">
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Exibir no site (ativo)
          </label>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full font-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar decoração'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
