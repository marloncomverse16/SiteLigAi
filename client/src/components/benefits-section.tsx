import { Target, Clock, DollarSign, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Prospecte clientes automaticamente",
    description: "Sistema encontra e qualifica leads por segmento e localização, entregando dados completos para sua estratégia de vendas."
  },
  {
    icon: Clock,
    title: "Venda 24 horas por dia",
    description: "Vendedor IA trabalha sem parar, atendendo até 3.000 clientes diariamente enquanto você foca no crescimento do negócio."
  },
  {
    icon: DollarSign,
    title: "Aumente o faturamento",
    description: "Finalize mais vendas com IA treinada, reduza custos operacionais e escale suas vendas sem contratar mais vendedores."
  },
  {
    icon: TrendingUp,
    title: "Monitore resultados em tempo real",
    description: "Relatórios completos de vendas, leads, custos e faturamento para tomar decisões baseadas em dados reais."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-4">
            O LigAI - Vendas é a solução perfeita para empresas que querem vender mais
          </h2>
          <p className="text-xl text-[var(--ligai-gray)] max-w-3xl mx-auto">
            Transforme sua estratégia de vendas com automação inteligente e resultados comprovados
          </p>
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
