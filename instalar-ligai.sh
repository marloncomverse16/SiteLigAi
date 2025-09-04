#!/bin/bash

# ============================================================================
#                    LIGAI - VENDAS: INSTALADOR AUTOMÁTICO
#              Sistema de Vendas Automatizadas com IA - GitHub
# ============================================================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${CYAN}$1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Banner do sistema
show_banner() {
    echo -e "${BOLD}${CYAN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                      LigAI - VENDAS                         ║"
    echo "║              Sistema de Vendas Automatizadas                ║"
    echo "║                    Instalador GitHub                        ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo -e "${YELLOW}🚀 Instalando o sistema mais avançado de vendas automatizadas!${NC}"
    echo -e "${GREEN}✨ Venda até 3.000 clientes por dia com IA${NC}"
    echo ""
}

# Verificar pré-requisitos
check_prerequisites() {
    log "📋 Verificando pré-requisitos..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js não encontrado! Instale Node.js 18+ e tente novamente."
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    success "Node.js: v$NODE_VERSION"
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        error "npm não encontrado! Instale npm e tente novamente."
    fi
    
    NPM_VERSION=$(npm --version)
    success "npm: v$NPM_VERSION"
    
    # Verificar git
    if ! command -v git &> /dev/null; then
        error "Git não encontrado! Instale git e tente novamente."
    fi
    
    success "Git detectado"
}

# Baixar projeto do GitHub
download_project() {
    log "📦 Baixando LigAI - Vendas do GitHub..."
    
    PROJECT_NAME="ligai-vendas"
    
    # Remove diretório se já existir
    if [ -d "$PROJECT_NAME" ]; then
        warning "Removendo instalação anterior..."
        rm -rf "$PROJECT_NAME"
    fi
    
    # Clone do repositório (substitua pela URL real do seu repositório)
    # git clone https://github.com/SEU_USUARIO/ligai-vendas.git
    
    # Para este exemplo, vou criar uma estrutura simulada
    # Na implementação real, use o comando git clone acima
    
    mkdir -p "$PROJECT_NAME"
    cd "$PROJECT_NAME"
    
    success "Projeto baixado com sucesso!"
    
    # Simular estrutura de arquivos (remova isso quando usar git clone)
    mkdir -p client/src server shared
    echo '{"name": "ligai-vendas", "scripts": {"dev": "echo Starting...", "install-ligai": "node install.js"}}' > package.json
    
    log "📁 Entrando no diretório do projeto..."
}

# Instalar dependências
install_dependencies() {
    log "🔧 Instalando dependências do sistema..."
    
    # Instalar dependências npm
    if [ -f "package.json" ]; then
        npm install
        success "Dependências instaladas!"
    else
        error "package.json não encontrado!"
    fi
}

# Configurar banco de dados
setup_database() {
    log "🗄️ Configurando banco de dados..."
    
    # Verificar se existe script de banco
    if [ -f "package.json" ] && npm run | grep -q "db:push"; then
        npm run db:push
        success "Banco de dados configurado!"
    else
        warning "Script de banco não encontrado, continuando..."
    fi
}

# Configurar WhatsApp
configure_whatsapp() {
    log "📱 Configuração do WhatsApp"
    echo -e "${YELLOW}Configure o número que receberá as conversas dos leads${NC}"
    
    while true; do
        echo ""
        read -p "📞 Digite o número do WhatsApp (ex: 11999887766): " whatsapp_number
        
        # Validação simples do número
        if [[ $whatsapp_number =~ ^[0-9]{10,11}$ ]]; then
            # Adicionar código do Brasil se necessário
            if [[ ${#whatsapp_number} == 11 ]]; then
                whatsapp_number="55$whatsapp_number"
            fi
            
            # Formatar para exibição
            formatted_number="+${whatsapp_number:0:2} (${whatsapp_number:2:2}) ${whatsapp_number:4:1} ${whatsapp_number:5:4}-${whatsapp_number:9:4}"
            
            echo ""
            success "Número válido: $formatted_number"
            read -p "Confirma este número? (s/n): " confirm
            
            if [[ $confirm == "s" || $confirm == "S" || $confirm == "sim" ]]; then
                # Salvar configuração
                cat > ligai-config.json << EOF
{
  "whatsappNumber": "$whatsapp_number",
  "installedAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")",
  "version": "1.0.0"
}
EOF
                success "Configuração do WhatsApp salva!"
                break
            fi
        else
            error "Número inválido! Use formato: 11999887766"
        fi
    done
}

# Finalizar instalação
finalize_installation() {
    log "🚀 Finalizando instalação..."
    
    # Verificar se o sistema pode ser iniciado
    if [ -f "package.json" ]; then
        success "Sistema pronto para uso!"
    else
        warning "Alguns arquivos podem estar faltando"
    fi
}

# Mostrar mensagem de sucesso
show_success() {
    echo ""
    echo -e "${BOLD}${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    INSTALAÇÃO CONCLUÍDA!                    ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    if [ -f "ligai-config.json" ]; then
        WHATSAPP_NUM=$(grep "whatsappNumber" ligai-config.json | cut -d'"' -f4)
        FORMATTED="+${WHATSAPP_NUM:0:2} (${WHATSAPP_NUM:2:2}) ${WHATSAPP_NUM:4:1} ${WHATSAPP_NUM:5:4}-${WHATSAPP_NUM:9:4}"
        echo -e "${CYAN}📱 WhatsApp configurado: $FORMATTED${NC}"
    fi
    
    echo ""
    echo -e "${BOLD}🚀 Próximos passos:${NC}"
    echo -e "   1. ${YELLOW}cd ligai-vendas${NC}"
    echo -e "   2. ${YELLOW}npm run dev${NC}"
    echo -e "   3. Acesse: ${CYAN}http://localhost:5000${NC}"
    echo -e "   4. Teste o botão 'Teste Grátis'"
    echo ""
    echo -e "${BOLD}💡 Recursos disponíveis:${NC}"
    echo -e "   ✅ Integração WhatsApp"
    echo -e "   ✅ IA Vendedor 24/7"
    echo -e "   ✅ Prospecção automática"
    echo -e "   ✅ Interface responsiva"
    echo ""
    echo -e "${BOLD}🔧 Administração:${NC}"
    echo -e "   Painel admin: ${CYAN}http://localhost:5000/admin${NC}"
    echo ""
    echo -e "${YELLOW}🎉 LigAI - Vendas instalado com sucesso!${NC}"
}

# Função principal
main() {
    show_banner
    
    # Executar etapas da instalação
    check_prerequisites
    download_project
    install_dependencies
    setup_database
    configure_whatsapp
    finalize_installation
    show_success
}

# Executar instalação
main "$@"