import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings, MessageCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Função para validar número de WhatsApp brasileiro
function validateBrazilianWhatsApp(phone: string): string | null {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    const ddd = cleaned.substring(2, 4);
    const firstDigit = cleaned.charAt(4);
    
    if (parseInt(ddd) >= 11 && parseInt(ddd) <= 99 && firstDigit === '9') {
      return cleaned;
    }
  }
  
  if (cleaned.length === 11) {
    const ddd = cleaned.substring(0, 2);
    const firstDigit = cleaned.charAt(2);
    
    if (parseInt(ddd) >= 11 && parseInt(ddd) <= 99 && firstDigit === '9') {
      return '55' + cleaned;
    }
  }
  
  return null;
}

// Função para formatar número
function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 13) {
    return `+${cleaned.substring(0, 2)} (${cleaned.substring(2, 4)}) ${cleaned.substring(4, 5)} ${cleaned.substring(5, 9)}-${cleaned.substring(9)}`;
  }
  return phone;
}

export default function AdminPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar configuração atual do WhatsApp
  const { data: whatsappConfig, isLoading } = useQuery({
    queryKey: ['/api/whatsapp-config'],
    retry: false,
  });

  // Mutação para salvar configurações
  const saveSettingMutation = useMutation({
    mutationFn: async (data: { key: string; value: string }) => {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save setting');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Configuração salva!",
        description: "O número do WhatsApp foi atualizado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/whatsapp-config'] });
      setWhatsappNumber("");
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a configuração. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSaveWhatsApp = () => {
    const validated = validateBrazilianWhatsApp(whatsappNumber);
    
    if (!validated) {
      toast({
        title: "Número inválido",
        description: "Digite um número brasileiro válido (ex: 11999887766 ou 5511999887766)",
        variant: "destructive",
      });
      return;
    }

    saveSettingMutation.mutate({
      key: "whatsapp_number",
      value: validated,
    });
  };

  const currentWhatsApp = whatsappConfig && 'whatsappNumber' in whatsappConfig ? whatsappConfig.whatsappNumber : undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="text-[var(--ligai-orange)]" />
            Painel Administrativo - LigAI Vendas
          </h1>
          <p className="text-gray-600 mt-2">
            Configure o sistema de vendas automatizadas
          </p>
        </div>

        <div className="grid gap-6">
          {/* Configuração WhatsApp */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-green-600" size={24} />
                Configuração do WhatsApp
              </CardTitle>
              <CardDescription>
                Configure o número que receberá as conversas dos leads interessados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentWhatsApp && (
                <Alert>
                  <MessageCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Número atual:</strong> {formatWhatsAppNumber(currentWhatsApp)}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="whatsapp">Número do WhatsApp</Label>
                <div className="flex gap-2">
                  <Input
                    id="whatsapp"
                    type="text"
                    placeholder="Ex: 11999887766 ou 5511999887766"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="flex-1"
                    data-testid="input-whatsapp-number"
                  />
                  <Button
                    onClick={handleSaveWhatsApp}
                    disabled={!whatsappNumber.trim() || saveSettingMutation.isPending}
                    className="bg-[var(--ligai-orange)] hover:bg-[var(--ligai-orange)]/90"
                    data-testid="button-save-whatsapp"
                  >
                    <Save size={16} className="mr-1" />
                    {saveSettingMutation.isPending ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Formato: Somente números brasileiros com DDD (11-99) iniciados com 9
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Status do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
              <CardDescription>
                Informações sobre o funcionamento do LigAI - Vendas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">WhatsApp</h3>
                  <p className="text-sm text-green-600">
                    {currentWhatsApp ? "✅ Configurado" : "❌ Não configurado"}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Banco de Dados</h3>
                  <p className="text-sm text-blue-600">
                    {!isLoading ? "✅ Conectado" : "🔄 Verificando..."}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800">IA Vendedor</h3>
                  <p className="text-sm text-orange-600">✅ Ativo 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = "/"}
            className="mr-4"
            data-testid="button-voltar-site"
          >
            ← Voltar ao Site
          </Button>
          {currentWhatsApp && (
            <Button
              onClick={() => window.open(`https://wa.me/${currentWhatsApp}?text=Teste de configuração LigAI - Vendas`, '_blank')}
              className="bg-green-600 hover:bg-green-700"
              data-testid="button-test-whatsapp"
            >
              <MessageCircle size={16} className="mr-1" />
              Testar WhatsApp
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}