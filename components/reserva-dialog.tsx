'use client'

import { useState } from 'react'
import { CalendarHeart } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'

type Props = {
  decoracao: Decoracao
  trigger?: React.ReactNode
}

export function ReservaDialog({ decoracao, trigger }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    clienteNome: '',
    clienteTelefone: '',
    dataEvento: '',
    localEvento: '',
    observacoes: '',
  })

  const hoje = new Date().toISOString().split('T')[0]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const dataBr = form.dataEvento.split('-').reverse().join('/')
    const msg = `Olá, ${siteConfig.nome}! Gostaria de reservar a decoração *${decoracao.nome}*.
Nome: ${form.clienteNome}
Telefone: ${form.clienteTelefone}
Data do evento: ${dataBr}${form.localEvento ? `\nLocal: ${form.localEvento}` : ''}${
      form.observacoes ? `\nObservações: ${form.observacoes}` : ''
    }`

    window.open(whatsappLink(msg), '_blank')
    setOpen(false)
    setForm({
      clienteNome: '',
      clienteTelefone: '',
      dataEvento: '',
      localEvento: '',
      observacoes: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="w-full rounded-full font-600">
            <CalendarHeart className="mr-2 h-4 w-4" />
            Reservar data
          </Button>
        )}
      </DialogTrigger>
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
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={form.observacoes}
              onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
              placeholder="Tema, idade da criança, cores preferidas..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full rounded-full font-600">
            Enviar reserva
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
