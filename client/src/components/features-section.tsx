import { 
  PieChart, 
  Bot, 
  DollarSign, 
  Users, 
  FileText, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: PieChart,
    title: "Analytics Inteligente",
    description: "Análise avançada de dados com IA para insights precisos sobre sua operação empresarial."
  },
  {
    icon: Bot,
    title: "Automação de Processos",
    description: "Automatize tarefas repetitivas e optimize fluxos de trabalho com nossa IA avançada."
  },
  {
    icon: DollarSign,
    title: "Gestão Financeira",
    description: "Controle financeiro completo com previsões inteligentes e alertas automáticos."
  },
  {
    icon: Users,
    title: "CRM Inteligente",
    description: "Gestão de relacionamento com clientes potencializada por inteligência artificial."
  },
  {
    icon: FileText,
    title: "Relatórios Automáticos",
    description: "Relatórios detalhados gerados automaticamente com insights acionáveis."
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção de dados empresariais com criptografia e monitoramento contínuo."
  }
];

export default function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-4">
            Recursos Principais do LigAI
          </h2>
          <p className="text-xl text-[var(--ligai-gray)] max-w-3xl mx-auto">
            Gerencie todos os aspectos da sua empresa com inteligência artificial avançada
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
