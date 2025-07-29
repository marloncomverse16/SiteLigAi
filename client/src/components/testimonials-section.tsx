import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    position: "Diretor Comercial, AutoPeças Pro",
    initials: "CM",
    content: "Em 30 dias o LigAI-Vendas aumentou nossas vendas em 180%. O Vendedor IA atende melhor que nossa equipe anterior e trabalha 24h!",
    rating: 5
  },
  {
    name: "Patricia Lima",
    position: "CEO, Fashion Store",
    initials: "PL",
    content: "Incrível! O sistema prospeita clientes automaticamente e nossa IA fecha vendas enquanto dormimos. Faturamento triplicou em 2 meses.",
    rating: 5
  },
  {
    name: "Roberto Souza",
    position: "Gerente, Imóveis Prime",
    initials: "RS",
    content: "O LigAI substitui uma equipe de 10 vendedores. Atende 3.000 clientes por dia e nossos custos operacionais caíram 70%.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-[var(--ligai-light)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-4">
            Resultados Reais de Quem Usa LigAI - Vendas
          </h2>
          <p className="text-xl text-[var(--ligai-gray)] max-w-3xl mx-auto">
            Empresas aumentaram vendas em até 300% e reduziram custos operacionais drasticamente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-orange-yellow rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.initials}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-[var(--ligai-dark)]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[var(--ligai-gray)] text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <p className="text-[var(--ligai-gray)] leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex text-[var(--ligai-yellow)]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
