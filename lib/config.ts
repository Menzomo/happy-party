// Informações de contato da marca.
// Atualize o número do WhatsApp (formato internacional, apenas dígitos) e o Instagram.
export const siteConfig = {
  nome: 'Happy Party',
  nomeCompleto: 'Happy Party Pegue e Monte',
  slogan: 'Decoração de festas infantis no sistema pegue e monte',
  // Ex.: 55 (Brasil) + DDD + número. Substitua pelo número real.
  whatsapp: '5599999999999',
  instagram: 'pegueemontehappy_',
  instagramUrl: 'https://www.instagram.com/pegueemontehappy_/',
}

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
