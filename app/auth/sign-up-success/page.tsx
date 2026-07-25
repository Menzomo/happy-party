import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-secondary/30 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="rounded-2xl text-center">
          <CardHeader>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MailCheck className="h-6 w-6" />
            </span>
            <CardTitle className="mt-2 font-display text-2xl">
              Confirme seu e-mail
            </CardTitle>
            <CardDescription>
              Enviamos um link de confirmação para o seu e-mail. Confirme para
              acessar a área administrativa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-full font-600">
              <Link href="/auth/login">Ir para o login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
