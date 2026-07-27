import type { Decoracao } from '@/lib/types'

// Catálogo de decorações do site. Como o site é estático (sem banco de
// dados), adicione, edite ou remova temas diretamente nesta lista.
const decoracoes: Decoracao[] = [
  {
    id: 'carros',
    nome: 'Carros',
    descricao: 'Decoração com o Relâmpago McQueen para animar a festa dos pequenos fãs de corrida.',
    tema: 'Carros',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-carros.jpeg',
    imagens: ['/decoracoes/peguemonte-carros.jpeg'],
    ativo: true,
  },
  {
    id: 'frozen',
    nome: 'Frozen',
    descricao: 'Elsa, Anna, Kristoff e Olaf em uma decoração gelada e encantadora.',
    tema: 'Frozen',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-frozen.jpeg',
    imagens: ['/decoracoes/peguemonte-frozen.jpeg'],
    ativo: true,
  },
  {
    id: 'homem-aranha',
    nome: 'Homem-Aranha',
    descricao: 'Teias, cores vibrantes e o Homem-Aranha para uma festa cheia de ação.',
    tema: 'Homem-Aranha',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-homen-aranha.jpeg',
    imagens: ['/decoracoes/peguemonte-homen-aranha.jpeg'],
    ativo: true,
  },
  {
    id: 'neutro',
    nome: 'Preto e Dourado',
    descricao: 'Decoração elegante em preto e dourado, ideal para aniversários de qualquer idade.',
    tema: 'Elegante',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-neutro.jpeg',
    imagens: ['/decoracoes/peguemonte-neutro.jpeg'],
    ativo: true,
  },
  {
    id: 'patrulha-canina',
    nome: 'Patrulha Canina',
    descricao: 'Chase, Skye, Marshall e a equipe canina em uma decoração animada e colorida.',
    tema: 'Patrulha Canina',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-patrulha-canina.jpeg',
    imagens: ['/decoracoes/peguemonte-patrulha-canina.jpeg'],
    ativo: true,
  },
  {
    id: 'poderoso-chefinho',
    nome: 'Poderoso Chefinho',
    descricao: 'Tema Boss Baby, com maleta e terninho, para uma festa cheia de charme.',
    tema: 'Poderoso Chefinho',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-poderoso-chefinho.jpeg',
    imagens: ['/decoracoes/peguemonte-poderoso-chefinho.jpeg'],
    ativo: true,
  },
  {
    id: 'stitch',
    nome: 'Stitch',
    descricao: 'Stitch e sua companheira em tons de azul e rosa, uma decoração fofa e tropical.',
    tema: 'Stitch',
    preco: 100,
    imagem_url: '/decoracoes/peguemonte-stich.jpeg',
    imagens: ['/decoracoes/peguemonte-stich.jpeg'],
    ativo: true,
  },
  {
    id: 'cha-de-bebe-feminino',
    nome: 'Chá de Bebê Feminino',
    descricao: 'Ursinho fofo e balões em tons de rosa para celebrar a chegada da princesinha.',
    tema: 'Chá de Bebê Feminino',
    preco: 100,
    imagem_url: '/decoracoes/cha-de-bebe-feminino.jpeg',
    imagens: ['/decoracoes/cha-de-bebe-feminino.jpeg'],
    ativo: true,
  },
  {
    id: 'cha-de-bebe-masculino',
    nome: 'Chá de Bebê Masculino',
    descricao: 'Ursinho fofo e balões em tons de azul para celebrar a chegada do príncipe.',
    tema: 'Chá de Bebê Masculino',
    preco: 100,
    imagem_url: '/decoracoes/cha-de-bebe-masculino.jpeg',
    imagens: ['/decoracoes/cha-de-bebe-masculino.jpeg'],
    ativo: true,
  },
]

export async function getDecoracoesAtivas(): Promise<Decoracao[]> {
  return decoracoes.filter((d) => d.ativo)
}

export async function getDecoracaoById(id: string): Promise<Decoracao | null> {
  return decoracoes.find((d) => d.id === id) ?? null
}
