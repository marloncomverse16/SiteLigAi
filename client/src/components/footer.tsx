import { Brain, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--ligai-dark)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 gradient-orange-yellow rounded-lg flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <span className="ml-3 text-2xl font-bold text-white">LigAI</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Transforme sua gestão empresarial com inteligência artificial. 
              Automatize processos, otimize recursos e tome decisões mais inteligentes.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-[var(--ligai-gray)] rounded-lg flex items-center justify-center hover:bg-[var(--ligai-orange)] transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[var(--ligai-gray)] rounded-lg flex items-center justify-center hover:bg-[var(--ligai-orange)] transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[var(--ligai-gray)] rounded-lg flex items-center justify-center hover:bg-[var(--ligai-orange)] transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[var(--ligai-gray)] rounded-lg flex items-center justify-center hover:bg-[var(--ligai-orange)] transition-colors duration-300"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Soluções</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Business Intelligence
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Automação de Vendas
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Gestão Financeira
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  CRM Inteligente
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Relatórios Automáticos
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Suporte</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Documentação
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Status do Sistema
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--ligai-gray)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2024 LigAI. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-gray-300">
              <a 
                href="#" 
                className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
