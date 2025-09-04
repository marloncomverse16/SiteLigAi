import { useQuery } from "@tanstack/react-query";

interface WhatsAppConfig {
  whatsappNumber: string;
  whatsappUrl: string;
}

export function useWhatsAppConfig() {
  return useQuery<WhatsAppConfig>({
    queryKey: ['/api/whatsapp-config'],
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
}

export function openWhatsApp(whatsappUrl?: string) {
  if (whatsappUrl) {
    window.open(whatsappUrl, '_blank');
  } else {
    // Fallback para um número padrão ou mensagem de erro
    console.warn('WhatsApp não configurado');
  }
}