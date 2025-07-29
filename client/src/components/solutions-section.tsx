import { Brain, ShoppingCart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "Business Intelligence",
    subtitle: "Transforme dados em decisões inteligentes",
    description: "O LigAI coleta e analisa dados de toda sua operação, fornecendo insights em tempo real para tomada de decisão estratégica. Com dashboards personalizáveis e relatórios automáticos.",
    features: [
      "Dashboards em tempo real personalizáveis",
      "Análise preditiva com machine learning",
      "Relatórios automatizados e alertas inteligentes"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
    alt: "Business analytics dashboard with charts and graphs"
  },
  {
    icon: ShoppingCart,
    title: "Automação de Vendas",
    subtitle: "Acelere seu processo de vendas com IA",
    description: "Automatize follow-ups, qualifique leads e aumente conversões. O LigAI identifica oportunidades e otimiza sua estratégia de vendas automaticamente.",
    features: [
      "Lead scoring automático e inteligente",
      "Sequências de follow-up personalizadas",
      "Previsão de vendas com alta precisão"
    ],
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
    alt: "Customer service technology interface with AI chatbot",
    reverse: true
  },
  {
    icon: Settings,
    title: "Gestão de Recursos",
    subtitle: "Otimize recursos e reduza custos",
    description: "Gerencie equipes, projetos e recursos com eficiência máxima. O LigAI aloca automaticamente recursos baseado em prioridades e disponibilidade.",
    features: [
      "Alocação inteligente de recursos humanos",
      "Controle de custos em tempo real",
      "Otimização automática de cronogramas"
    ],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
    alt: "Modern office technology with automation systems"
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
            Mais de 10 Módulos Integrados
          </h2>
          <p className="text-xl text-[var(--ligai-gray)] max-w-3xl mx-auto">
            Controle todos os aspectos da sua empresa, desde vendas até recursos humanos, com facilidade e precisão.
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
                  {index === 0 ? "Teste Agora" : index === 1 ? "Conhecer Módulo" : "Saiba Mais"}
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
