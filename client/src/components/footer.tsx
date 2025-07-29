import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import logoPath from "@assets/Captura de tela 2025-04-28 170154_1753808208588.png";

export default function Footer() {
  return (
    <footer className="bg-[var(--ligai-dark)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src={logoPath} 
                alt="LigAI - Vendas" 
                className="h-12 w-auto"
                style={{ 
                  backgroundColor: 'transparent',
                  filter: 'drop-shadow(0 0 0 transparent)',
                  WebkitFilter: 'drop-shadow(0 0 0 transparent)'
                }}
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Sistema de vendas automatizadas com IA que atende até 3.000 clientes por dia. 
              Conecte seu WhatsApp, automatize prospecção e deixe nossa IA vender para você.
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
                  Integração WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Vendedor IA
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Prospecção Automática
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Relatórios de Vendas
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[var(--ligai-orange)] transition-colors duration-300"
                >
                  Chat em Tempo Real
                </a>
              </li>
            </ul>
          </div>


        </div>

        <div className="border-t border-[var(--ligai-gray)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2024 LigAI - Vendas. Todos os direitos reservados.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
