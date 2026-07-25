import type { Decoracao } from '@/lib/types'

// Catálogo de decorações do site. Como o site é estático (sem banco de
// dados), adicione, edite ou remova temas diretamente nesta lista.
const decoracoes: Decoracao[] = [
  {
    id: 'astronauta',
    nome: 'Astronauta',
    descricao: 'Decoração espacial encantadora para uma festa fora deste mundo.',
    tema: 'Espaço',
    preco: 250,
    imagem_url: '/decoracoes/astronauta.png',
    imagens: ['/decoracoes/astronauta.png'],
    ativo: true,
  },
  {
    id: 'circo',
    nome: 'Circo',
    descricao: 'Alegria e cores de circo para animar a festa da criançada.',
    tema: 'Circo',
    preco: 250,
    imagem_url: '/decoracoes/circo.png',
    imagens: ['/decoracoes/circo.png'],
    ativo: true,
  },
  {
    id: 'jardim',
    nome: 'Jardim Encantado',
    descricao: 'Flores e borboletas para uma decoração delicada e florida.',
    tema: 'Jardim',
    preco: 250,
    imagem_url: '/decoracoes/jardim.png',
    imagens: ['/decoracoes/jardim.png'],
    ativo: true,
  },
  {
    id: 'princesas',
    nome: 'Princesas',
    descricao: 'Um conto de fadas para a pequena princesa da festa.',
    tema: 'Princesas',
    preco: 250,
    imagem_url: '/decoracoes/princesas.png',
    imagens: ['/decoracoes/princesas.png'],
    ativo: true,
  },
  {
    id: 'safari',
    nome: 'Safari',
    descricao: 'Bichinhos fofos da savana para uma festa cheia de aventura.',
    tema: 'Safari',
    preco: 250,
    imagem_url: '/decoracoes/safari.png',
    imagens: ['/decoracoes/safari.png'],
    ativo: true,
  },
  {
    id: 'unicornio',
    nome: 'Unicórnio',
    descricao: 'Magia e cores pastel para uma festa cheia de encanto.',
    tema: 'Unicórnio',
    preco: 250,
    imagem_url: '/decoracoes/unicornio.png',
    imagens: ['/decoracoes/unicornio.png'],
    ativo: true,
  },
]

export async function getDecoracoesAtivas(): Promise<Decoracao[]> {
  return decoracoes.filter((d) => d.ativo)
}

export async function getDecoracaoById(id: string): Promise<Decoracao | null> {
  return decoracoes.find((d) => d.id === id) ?? null
}
