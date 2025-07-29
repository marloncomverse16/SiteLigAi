import { MessageCircle, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const solutions = [
  {
    icon: MessageCircle,
    title: "Integração WhatsApp",
    subtitle: "Conecte e automatize seu WhatsApp",
    description: "Conecte seu WhatsApp Cloud ou via QR Code. A integração Cloud é recomendada pois evita bloqueios do WhatsApp e garante estabilidade total para suas operações de vendas.",
    features: [
      "WhatsApp Cloud API - sem bloqueios",
      "Conexão via QR Code para testes",
      "Estabilidade garantida 24/7"
    ],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
    alt: "Modern smartphone with WhatsApp automation interface"
  },
  {
    icon: Bot,
    title: "Vendedor IA Inteligente",
    subtitle: "IA que vende enquanto você dorme",
    description: "Nosso Vendedor IA é treinado especificamente sobre sua empresa e produtos. Ele atende clientes, responde dúvidas e finaliza vendas automaticamente, trabalhando 24 horas por dia.",
    features: [
      "Atendimento personalizado 24/7",
      "Treinado com dados da sua empresa",
      "Finaliza vendas automaticamente"
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
    alt: "AI robot and automation technology interface",
    reverse: true
  },
  {
    icon: BarChart3,
    title: "Prospecção e Relatórios",
    subtitle: "Encontre clientes e acompanhe resultados",
    description: "Prospecção automática por segmento e localização, com dados completos dos clientes. Relatórios detalhados de vendas, custos, faturamento e métricas para otimizar sua estratégia.",
    features: [
      "Prospecção automática segmentada",
      "Dados completos: telefone, email, endereço",
      "Relatórios de vendas e faturamento"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
    alt: "Advanced analytics dashboard with sales data visualization"
  }
];

export default function SolutionsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="solucoes" className="py-20 bg-gradient-to-br from-[var(--ligai-light)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-4">
            3 Pilares da Automação de Vendas
          </h2>
          <p className="text-xl text-[var(--ligai-gray)] max-w-3xl mx-auto">
            Sistema completo que conecta, prospeita, atende e vende automaticamente para até 3.000 clientes por dia.
          </p>
        </div>

        {solutions.map((solution, index) => (
          <div key={index} className="mb-20">
            <div className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${solution.reverse ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`mb-12 lg:mb-0 animate-fade-in ${solution.reverse ? 'lg:order-2' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-orange-yellow rounded-lg flex items-center justify-center mr-4">
                    <solution.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--ligai-dark)]">
                    {solution.title}
                  </h3>
                </div>
                <h4 className="text-xl font-semibold text-[var(--ligai-dark)] mb-4">
                  {solution.subtitle}
                </h4>
                <p className="text-[var(--ligai-gray)] leading-relaxed mb-6">
                  {solution.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-[var(--ligai-gray)]">
                      <Check className="text-[var(--ligai-green)] mr-3 flex-shrink-0" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => scrollToSection("contato")}
                  className="gradient-orange-yellow text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                >
                  {index === 0 ? "Conectar WhatsApp" : index === 1 ? "Ativar Vendedor IA" : "Ver Demonstração"}
                </Button>
              </div>
              <div className={`relative animate-slide-up ${solution.reverse ? 'lg:order-1' : ''}`}>
                <img
                  src={solution.image}
                  alt={solution.alt}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
