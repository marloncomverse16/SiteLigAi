import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, MessageCircle, Users, Zap, Bot } from "lucide-react";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const { toast } = useToast();

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Obrigado pelo interesse! Nossa equipe entrará em contato em breve.",
      });
      setFormData({ name: "", email: "", company: "" });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      leadMutation.mutate(formData);
    }
  };

  return (
    <section
      id="inicio"
      className="pt-16 bg-gradient-to-br from-[var(--ligai-light)] via-white to-[var(--ligai-light)] min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--ligai-dark)] leading-tight mb-6">
              Sistema de{" "}
              <span className="text-gradient-orange-yellow">
                Vendas Automatizadas
              </span>{" "}
              com IA
            </h1>
            <p className="text-xl text-[var(--ligai-gray)] leading-relaxed mb-8">
              O LigAI - Vendas atende até 3.000 clientes diariamente de forma automatizada. 
              Conecte seu WhatsApp, automatize prospecção e deixe nossa IA finalizar as vendas para você.
            </p>

            {/* Lead Form */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <Input
                  type="text"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none"
                  required
                />
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none"
                  required
                />
                <Input
                  type="text"
                  placeholder="Empresa (opcional)"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none md:hidden"
                />
                <Button
                  type="submit"
                  disabled={leadMutation.isPending}
                  className="gradient-orange-yellow text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300 md:col-span-1"
                >
                  {leadMutation.isPending ? "Enviando..." : "Teste Grátis"}
                </Button>
              </form>
              <div className="md:hidden mt-4">
                <Input
                  type="text"
                  placeholder="Empresa (opcional)"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none w-full"
                />
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800"
              alt="WhatsApp automation and AI sales system"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-scale-in">
              <div className="flex items-center space-x-3">
                <MessageCircle className="text-[var(--ligai-green)]" size={20} />
                <span className="text-sm font-semibold text-[var(--ligai-dark)]">
                  WhatsApp Conectado
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-scale-in">
              <div className="flex items-center space-x-3">
                <Bot className="text-[var(--ligai-orange)]" size={20} />
                <span className="text-sm font-semibold text-[var(--ligai-dark)]">
                  Vendedor IA Ativo
                </span>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-scale-in">
              <div className="flex items-center space-x-3">
                <Users className="text-[var(--ligai-teal)]" size={20} />
                <span className="text-sm font-semibold text-[var(--ligai-dark)]">
                  3.000 Clientes/Dia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
