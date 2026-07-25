import { createClient } from '@/lib/supabase/server'
import type { Decoracao, Reserva } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DecoracoesAdmin } from '@/components/admin/decoracoes-admin'
import { ReservasAdmin } from '@/components/admin/reservas-admin'

export default async function AdminPage() {
  const supabase = await createClient()

  const [{ data: decoracoes }, { data: reservas }] = await Promise.all([
    supabase.from('decoracoes').select('*').order('criado_em', { ascending: false }),
    supabase.from('reservas').select('*').order('criado_em', { ascending: false }),
  ])

  const listaDecoracoes = (decoracoes ?? []) as Decoracao[]
  const listaReservas = (reservas ?? []) as Reserva[]
  const pendentes = listaReservas.filter((r) => r.status === 'pendente').length

  return (
    <div>
      <h1 className="font-display text-2xl font-700 text-foreground">
        Gerenciamento
      </h1>
      <p className="mt-1 text-muted-foreground">
        Controle as decorações do catálogo e as reservas dos clientes.
      </p>

      <Tabs defaultValue="reservas" className="mt-6">
        <TabsList className="rounded-full">
          <TabsTrigger value="reservas" className="rounded-full">
            Reservas
            {pendentes > 0 && (
              <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                {pendentes}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="decoracoes" className="rounded-full">
            Decorações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reservas" className="mt-6">
          <ReservasAdmin reservas={listaReservas} />
        </TabsContent>
        <TabsContent value="decoracoes" className="mt-6">
          <DecoracoesAdmin decoracoes={listaDecoracoes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
