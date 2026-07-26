'use client'

import { useState } from 'react'
import { CalendarHeart, Info } from 'lucide-react'
import { siteConfig, whatsappLink } from '@/lib/config'
import type { Decoracao } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  decoracao: Decoracao
  trigger?: React.ReactElement
}

const FORMAS_PAGAMENTO: Record<string, string> = {
  sinal: '50% na reserva + restante na retirada',
  cartao: 'Cartão de crédito na retirada',
}

export function ReservaDialog({ decoracao, trigger }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    clienteNome: '',
    clienteTelefone: '',
    dataEvento: '',
    localEvento: '',
    pagamento: '',
  })

  const hoje = new Date().toISOString().split('T')[0]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const dataBr = form.dataEvento.split('-').reverse().join('/')
    const msg = `Olá, ${siteConfig.nome}! Gostaria de reservar a decoração *${decoracao.nome}*.
Nome: ${form.clienteNome}
Telefone: ${form.clienteTelefone}
Data do evento: ${dataBr}${form.localEvento ? `\nLocal: ${form.localEvento}` : ''}
Forma de pagamento: ${FORMAS_PAGAMENTO[form.pagamento]}`

    window.open(whatsappLink(msg), '_blank')
    setOpen(false)
    setForm({
      clienteNome: '',
      clienteTelefone: '',
      dataEvento: '',
      localEvento: '',
      pagamento: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button className="w-full rounded-full font-600">
              <CalendarHeart className="mr-2 h-4 w-4" />
              Reservar data
            </Button>
          )
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Reservar “{decoracao.nome}”
          </DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo. A reserva é registrada e finalizamos a
            confirmação pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clienteNome">Seu nome *</Label>
            <Input
              id="clienteNome"
              required
              value={form.clienteNome}
              onChange={(e) => setForm({ ...form, clienteNome: e.target.value })}
              placeholder="Como podemos te chamar?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteTelefone">Telefone / WhatsApp *</Label>
            <Input
              id="clienteTelefone"
              required
              inputMode="tel"
              value={form.clienteTelefone}
              onChange={(e) =>
                setForm({ ...form, clienteTelefone: e.target.value })
              }
              placeholder="(99) 99999-9999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataEvento">Data do evento *</Label>
            <Input
              id="dataEvento"
              type="date"
              required
              min={hoje}
              value={form.dataEvento}
              onChange={(e) => setForm({ ...form, dataEvento: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="localEvento">Local da festa</Label>
            <Input
              id="localEvento"
              value={form.localEvento}
              onChange={(e) => setForm({ ...form, localEvento: e.target.value })}
              placeholder="Bairro, salão, endereço..."
            />
          </div>
          <div className="flex gap-2 rounded-xl bg-sky-50 p-3 text-sm text-sky-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
            <p className="leading-relaxed">
              Pagamento de 50% na data da reserva e o restante no dia da
              retirada, ou cartão de crédito no dia da retirada da decoração.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pagamento">Forma de pagamento *</Label>
            <Select
              value={form.pagamento || null}
              onValueChange={(value) =>
                setForm({ ...form, pagamento: value ?? '' })
              }
              required
            >
              <SelectTrigger id="pagamento" className="w-full">
                <SelectValue placeholder="Escolha a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sinal">
                  50% na reserva + restante na retirada
                </SelectItem>
                <SelectItem value="cartao">
                  Cartão de crédito na retirada
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full rounded-full font-600">
            Enviar reserva
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
