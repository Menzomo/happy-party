// Informações de contato da marca.
// Atualize o número do WhatsApp (formato internacional, apenas dígitos) e o Instagram.
export const siteConfig = {
  nome: 'Happy Party',
  nomeCompleto: 'Happy Party Pegue e Monte',
  slogan: 'Decoração de festas infantis no sistema pegue e monte',
  // Ex.: 55 (Brasil) + DDD + número. Substitua pelo número real.
  whatsapp: '5554991690891',
  whatsappDisplay: '(54) 99169-0891',
  instagram: 'pegueemontehappy_',
  instagramUrl: 'https://www.instagram.com/pegueemontehappy_/',
  cidade: 'Cidade Nova, Caxias do Sul - RS',
  anoFundacao: 2025,
}

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
