import { createClient } from '@/lib/supabase/server'
import type { Decoracao } from '@/lib/types'

export async function getDecoracoesAtivas(): Promise<Decoracao[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('decoracoes')
    .select('*')
    .eq('ativo', true)
    .order('criado_em', { ascending: false })

  if (error) {
    console.log('[v0] Erro ao buscar decoracoes:', error.message)
    return []
  }
  return (data ?? []) as Decoracao[]
}

export async function getDecoracaoById(id: string): Promise<Decoracao | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('decoracoes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.log('[v0] Erro ao buscar decoracao:', error.message)
    return null
  }
  return data as Decoracao
}
