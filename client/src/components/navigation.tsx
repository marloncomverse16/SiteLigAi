import { useState, useEffect } from "react";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 gradient-orange-yellow rounded-lg flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <span className="ml-3 text-2xl font-bold text-[var(--ligai-dark)]">
                  LigAI
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("recursos")}
                className="text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection("solucoes")}
                className="text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Soluções
              </button>
              <button
                onClick={() => scrollToSection("depoimentos")}
                className="text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Contato
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("inicio")}
              className="gradient-orange-yellow text-white px-6 py-2 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300"
            >
              Teste Grátis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <button
              onClick={() => scrollToSection("inicio")}
              className="block text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium w-full text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("recursos")}
              className="block text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium w-full text-left"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToSection("solucoes")}
              className="block text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium w-full text-left"
            >
              Soluções
            </button>
            <button
              onClick={() => scrollToSection("depoimentos")}
              className="block text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium w-full text-left"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block text-[var(--ligai-gray)] hover:text-[var(--ligai-orange)] transition-colors duration-300 px-3 py-2 text-sm font-medium w-full text-left"
            >
              Contato
            </button>
            <Button className="w-full mt-4 gradient-orange-yellow text-white px-6 py-2 rounded-lg font-semibold">
              Teste Grátis
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
