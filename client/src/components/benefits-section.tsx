import { Database, TrendingUp, Lightbulb, Shield } from "lucide-react";

const benefits = [
  {
    icon: Database,
    title: "Colete informações estratégicas",
    description: "Ao coletar informações dos seus processos, você estará mais preparado para gerenciar sua empresa."
  },
  {
    icon: TrendingUp,
    title: "Gerencie com eficiência",
    description: "Processos bem gerenciados reduzem custos, aumentam segurança e impulsionam a produtividade."
  },
  {
    icon: Lightbulb,
    title: "Tome decisões assertivas",
    description: "Com informações precisas e análise objetiva, você pode tomar as melhores decisões para sua empresa."
  },
  {
    icon: Shield,
    title: "Evite perdas financeiras",
    description: "Reduza custos, aumente segurança e proteja seus dados de forma rápida e inteligente."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-4">
            O LigAI é a solução perfeita para empresas que buscam excelência na gestão
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 gradient-orange-yellow rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ligai-dark)] mb-4">
                {benefit.title}
              </h3>
              <p className="text-[var(--ligai-gray)] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
