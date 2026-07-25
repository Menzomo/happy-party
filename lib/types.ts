export type Decoracao = {
  id: string
  nome: string
  descricao: string | null
  tema: string | null
  preco: number | null
  imagem_url: string | null
  imagens: string[]
  ativo: boolean
  criado_em: string
}

export type Reserva = {
  id: string
  decoracao_id: string | null
  decoracao_nome: string | null
  cliente_nome: string
  cliente_telefone: string
  data_evento: string
  local_evento: string | null
  observacoes: string | null
  status: string
  criado_em: string
}
