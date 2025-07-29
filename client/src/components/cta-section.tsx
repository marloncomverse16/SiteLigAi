import { Button } from "@/components/ui/button";

export default function CtaSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 gradient-orange-yellow">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Pronto para Vender Automaticamente?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Não perca mais vendas! Configure o LigAI - Vendas hoje e tenha um vendedor IA trabalhando 24h para você.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection("inicio")}
            className="bg-white text-[var(--ligai-orange)] px-8 py-4 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Começar Vendas Automáticas
          </Button>
          <Button
            onClick={() => scrollToSection("contato")}
            variant="outline"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[var(--ligai-orange)] transition-all duration-300"
          >
            Ver Demonstração ao Vivo
          </Button>
        </div>
      </div>
    </section>
  );
}
