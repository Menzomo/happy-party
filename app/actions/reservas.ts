'use server'

import { createClient } from '@/lib/supabase/server'

export type ReservaInput = {
  decoracaoId: string | null
  decoracaoNome: string
  clienteNome: string
  clienteTelefone: string
  dataEvento: string
  localEvento: string
  observacoes: string
}

export async function criarReserva(input: ReservaInput) {
  if (!input.clienteNome.trim() || !input.clienteTelefone.trim() || !input.dataEvento) {
    return { ok: false, error: 'Preencha nome, telefone e data do evento.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('reservas').insert({
    decoracao_id: input.decoracaoId,
    decoracao_nome: input.decoracaoNome,
    cliente_nome: input.clienteNome.trim(),
    cliente_telefone: input.clienteTelefone.trim(),
    data_evento: input.dataEvento,
    local_evento: input.localEvento.trim() || null,
    observacoes: input.observacoes.trim() || null,
    status: 'pendente',
  })

  if (error) {
    console.log('[v0] Erro ao criar reserva:', error.message)
    return { ok: false, error: 'Não foi possível salvar a reserva. Tente novamente.' }
  }

  return { ok: true }
}
