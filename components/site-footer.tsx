import Link from 'next/link'
import { Camera, PartyPopper } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function SiteFooter() {
  return (
    <footer id="contato" className="mt-20 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PartyPopper className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-700 text-foreground">
              {siteConfig.nomeCompleto}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.slogan}. Transformamos a festa do seu filho em um momento
            mágico e inesquecível.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-700 uppercase tracking-wide text-foreground">
            Navegação
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/#decoracoes" className="transition-colors hover:text-primary">
                Decorações
              </Link>
            </li>
            <li>
              <Link href="/#como-funciona" className="transition-colors hover:text-primary">
                Como funciona
              </Link>
            </li>
            <li>
              <Link href="/admin" className="transition-colors hover:text-primary">
                Área administrativa
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-700 uppercase tracking-wide text-foreground">
            Fale conosco
          </h3>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Camera className="h-4 w-4" />
            @{siteConfig.instagram}
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.nomeCompleto}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
