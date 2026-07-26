'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <Image
              src="/decoracoes/logo.png"
              alt={`Logo ${siteConfig.nome}`}
              fill
              sizes="40px"
              className="object-contain"
            />
          </span>
          <span className="font-display text-lg font-700 leading-none text-foreground">
            {siteConfig.nome}
            <span className="block text-xs font-500 text-muted-foreground">
              Pegue e Monte
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#decoracoes"
            className="text-sm font-600 text-foreground/80 transition-colors hover:text-primary"
          >
            Decorações
          </Link>
          <Link
            href="/#como-funciona"
            className="text-sm font-600 text-foreground/80 transition-colors hover:text-primary"
          >
            Como funciona
          </Link>
          <Link
            href="/#contato"
            className="text-sm font-600 text-foreground/80 transition-colors hover:text-primary"
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
          >
            <Camera className="h-5 w-5" />
          </a>
          <Button
            size="sm"
            className="rounded-full font-600"
            nativeButton={false}
            render={<Link href="/#decoracoes">Reservar data</Link>}
          />
        </div>
      </div>
    </header>
  )
}
