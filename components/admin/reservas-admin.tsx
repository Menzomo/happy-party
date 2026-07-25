'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { atualizarStatusReserva } from '@/app/actions/admin'
import type { Reserva } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const STATUS = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'confirmada', label: 'Confirmada' },
  { value: 'concluida', label: 'Concluída' },
  { value: 'cancelada', label: 'Cancelada' },
]

function statusColor(status: string) {
  switch (status) {
    case 'confirmada':
      return 'bg-secondary text-secondary-foreground'
    case 'concluida':
      return 'bg-accent text-accent-foreground'
    case 'cancelada':
      return 'bg-destructive/10 text-destructive'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

function formatData(data: string) {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
}

function StatusSelect({ reserva }: { reserva: Reserva }) {
  const [isPending, startTransition] = useTransition()

  function handleChange(status: string) {
    startTransition(async () => {
      const res = await atualizarStatusReserva(reserva.id, status)
      if (res.ok) toast.success('Status atualizado.')
      else toast.error(res.error ?? 'Erro ao atualizar.')
    })
  }

  return (
    <Select defaultValue={reserva.status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="h-8 w-36 rounded-full text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ReservasAdmin({ reservas }: { reservas: Reserva[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-700 text-foreground">
          Reservas ({reservas.length})
        </h2>
        <p className="text-sm text-muted-foreground">
          Acompanhe os pedidos de reserva enviados pelos clientes.
        </p>
      </div>

      {reservas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Nenhuma reserva recebida ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {reservas.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-700 text-foreground">
                    {r.cliente_nome}
                  </span>
                  <Badge className={statusColor(r.status)}>
                    {STATUS.find((s) => s.value === r.status)?.label ?? r.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {r.decoracao_nome ?? 'Decoração removida'} · {formatData(r.data_evento)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tel: {r.cliente_telefone}
                  {r.local_evento ? ` · ${r.local_evento}` : ''}
                </p>
                {r.observacoes && (
                  <p className="text-sm italic text-muted-foreground">
                    “{r.observacoes}”
                  </p>
                )}
              </div>
              <StatusSelect reserva={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
