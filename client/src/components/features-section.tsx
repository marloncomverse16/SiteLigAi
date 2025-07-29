import { 
  MessageCircle, 
  Bot, 
  Target, 
  Users, 
  FileText, 
  Eye 
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Integração WhatsApp",
    description: "Conecte WhatsApp Cloud ou QR Code. Integração Cloud evita bloqueios e garante estabilidade total."
  },
  {
    icon: Target,
    title: "Prospecção Automática",
    description: "Captação automática de clientes por segmento e localização com dados completos: telefone, email, endereço."
  },
  {
    icon: Bot,
    title: "Vendedor IA Inteligente",
    description: "IA treinada sobre sua empresa e produtos que atende clientes e finaliza vendas automaticamente."
  },
  {
    icon: Users,
    title: "Atendimento em Massa",
    description: "Capacidade para atender até 3.000 clientes diariamente com mensagens personalizadas e automáticas."
  },
  {
    icon: FileText,
    title: "Relatórios Completos",
    description: "Métricas de vendas, leads, custos, faturamento e estimativas com análises detalhadas de performance."
  },
  {
    icon: Eye,
    title: "Monitoramento em Tempo Real",
    description: "Chat integrado para acompanhar conversas e identificar clientes que precisam de atenção humana."
  }
];

export default function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-4">
            Recursos Principais do LigAI - Vendas
          </h2>
          <p className="text-xl text-[var(--ligai-gray)] max-w-3xl mx-auto">
            Sistema completo de vendas automatizadas que trabalha 24/7 para fazer sua empresa vender mais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[var(--ligai-light)] p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--ligai-orange)] group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 gradient-orange-yellow rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--ligai-dark)] mb-4">
                {feature.title}
              </h3>
              <p className="text-[var(--ligai-gray)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
