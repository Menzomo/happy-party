'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return supabase
}

export type DecoracaoFormState = { ok: boolean; error?: string }

export async function salvarDecoracao(
  _prev: DecoracaoFormState,
  formData: FormData,
): Promise<DecoracaoFormState> {
  const supabase = await requireUser()

  const id = (formData.get('id') as string) || null
  const nome = (formData.get('nome') as string)?.trim()
  const tema = (formData.get('tema') as string)?.trim() || null
  const descricao = (formData.get('descricao') as string)?.trim() || null
  const precoRaw = (formData.get('preco') as string)?.replace(',', '.')
  const preco = precoRaw ? Number(precoRaw) : null
  const imagem_url = (formData.get('imagem_url') as string)?.trim() || null
  const ativo = formData.get('ativo') === 'on' || formData.get('ativo') === 'true'

  if (!nome) {
    return { ok: false, error: 'O nome da decoração é obrigatório.' }
  }
  if (preco != null && Number.isNaN(preco)) {
    return { ok: false, error: 'Preço inválido.' }
  }

  const payload = { nome, tema, descricao, preco, imagem_url, ativo }

  if (id) {
    const { error } = await supabase.from('decoracoes').update(payload).eq('id', id)
    if (error) {
      console.log('[v0] Erro ao atualizar decoracao:', error.message)
      return { ok: false, error: 'Não foi possível atualizar.' }
    }
  } else {
    const { error } = await supabase.from('decoracoes').insert(payload)
    if (error) {
      console.log('[v0] Erro ao inserir decoracao:', error.message)
      return { ok: false, error: 'Não foi possível cadastrar.' }
    }
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}

export async function excluirDecoracao(id: string) {
  const supabase = await requireUser()
  const { error } = await supabase.from('decoracoes').delete().eq('id', id)
  if (error) {
    console.log('[v0] Erro ao excluir decoracao:', error.message)
    return { ok: false, error: 'Não foi possível excluir.' }
  }
  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}

export async function atualizarStatusReserva(id: string, status: string) {
  const supabase = await requireUser()
  const { error } = await supabase.from('reservas').update({ status }).eq('id', id)
  if (error) {
    console.log('[v0] Erro ao atualizar reserva:', error.message)
    return { ok: false, error: 'Não foi possível atualizar o status.' }
  }
  revalidatePath('/admin')
  return { ok: true }
}

export async function sair() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}
