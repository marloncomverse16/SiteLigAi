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
    
    # Clone do repositório do GitHub
    git clone https://github.com/marloncomverse16/SiteLigAi.git "$PROJECT_NAME"
    
    if [ $? -eq 0 ]; then
        cd "$PROJECT_NAME"
        success "Projeto baixado com sucesso!"
    else
        error "Falha ao baixar o projeto do GitHub!"
    fi
    
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

# Configurar servidor e domínio
configure_server() {
    log "🌐 Configuração do Servidor"
    
    # Configurar porta
    echo -e "${YELLOW}Configure a porta do servidor (padrão: 3000)${NC}"
    read -p "Digite a porta (ou Enter para usar 3000): " server_port
    server_port=${server_port:-3000}
    
    if ! [[ "$server_port" =~ ^[0-9]+$ ]] || [ "$server_port" -lt 1024 ] || [ "$server_port" -gt 65535 ]; then
        warning "Porta inválida, usando 3000"
        server_port=3000
    fi
    
    success "Porta configurada: $server_port"
    
    # Configurar domínio
    echo ""
    echo -e "${YELLOW}Configure seu domínio (opcional)${NC}"
    echo -e "${CYAN}Exemplo: meusite.com, vendas.empresa.com${NC}"
    read -p "Digite seu domínio (ou Enter para pular): " domain_name
    
    # Configurar SSL
    ssl_enabled="false"
    if [ ! -z "$domain_name" ]; then
        echo ""
        echo -e "${YELLOW}Configurar SSL/HTTPS? (Recomendado para produção)${NC}"
        read -p "Ativar SSL? (s/n): " enable_ssl
        
        if [[ $enable_ssl == "s" || $enable_ssl == "S" || $enable_ssl == "sim" ]]; then
            ssl_enabled="true"
            success "SSL será configurado para $domain_name"
        fi
    fi
    
    # Salvar configurações do servidor
    cat > server-config.json << EOF
{
  "port": $server_port,
  "domain": "$domain_name",
  "ssl": $ssl_enabled,
  "installedAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")"
}
EOF
    
    success "Configurações do servidor salvas!"
}

# Configurar WhatsApp (opcional - pode ser feito via admin)
configure_whatsapp() {
    log "📱 Configuração do WhatsApp"
    echo -e "${YELLOW}Você pode configurar o WhatsApp agora ou depois via painel admin${NC}"
    
    if [ ! -z "$domain_name" ]; then
        if [ "$ssl_enabled" == "true" ]; then
            echo -e "${CYAN}Painel admin estará disponível em: https://$domain_name/admin${NC}"
        else
            echo -e "${CYAN}Painel admin estará disponível em: http://$domain_name/admin${NC}"
        fi
    else
        echo -e "${CYAN}Painel admin estará disponível em: http://localhost:$server_port/admin${NC}"
    fi
    
    echo ""
    read -p "Deseja configurar WhatsApp agora? (s/n): " configure_now
    
    if [[ $configure_now == "s" || $configure_now == "S" || $configure_now == "sim" ]]; then
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
                echo -e "${RED}❌ Número inválido! Use formato: 11999887766${NC}"
            fi
        done
    else
        success "WhatsApp será configurado via painel admin!"
        # Criar arquivo de configuração básico
        cat > ligai-config.json << EOF
{
  "whatsappNumber": "",
  "installedAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")",
  "version": "1.0.0",
  "configureViaAdmin": true
}
EOF
    fi
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
    
    # Ler configurações para exibir na mensagem
    if [ -f "server-config.json" ]; then
        SERVER_PORT=$(grep -o '"port": [0-9]*' server-config.json | cut -d' ' -f2)
        DOMAIN_NAME=$(grep -o '"domain": "[^"]*"' server-config.json | cut -d'"' -f4)
        SSL_ENABLED=$(grep -o '"ssl": [a-z]*' server-config.json | cut -d' ' -f2)
    else
        SERVER_PORT="5000"
        DOMAIN_NAME=""
        SSL_ENABLED="false"
    fi
    
    echo ""
    echo -e "${BOLD}🚀 Próximos passos:${NC}"
    echo -e "   1. ${YELLOW}cd SiteLigAi${NC}"
    echo -e "   2. ${YELLOW}npm run dev${NC}"
    
    # Mostrar URL baseado na configuração
    if [ ! -z "$DOMAIN_NAME" ]; then
        if [ "$SSL_ENABLED" == "true" ]; then
            echo -e "   3. Acesse: ${CYAN}https://$DOMAIN_NAME${NC}"
            echo -e "   4. Execute: ${YELLOW}./setup-ssl.sh${NC} (após DNS configurado)"
        else
            echo -e "   3. Acesse: ${CYAN}http://$DOMAIN_NAME${NC}"
        fi
    else
        echo -e "   3. Acesse: ${CYAN}http://localhost:$SERVER_PORT${NC}"
    fi
    
    echo ""
    echo -e "${BOLD}📱 Configure o WhatsApp:${NC}"
    if [ ! -z "$DOMAIN_NAME" ]; then
        if [ "$SSL_ENABLED" == "true" ]; then
            echo -e "   ${CYAN}https://$DOMAIN_NAME/admin${NC} ${YELLOW}← IMPORTANTE!${NC}"
        else
            echo -e "   ${CYAN}http://$DOMAIN_NAME/admin${NC} ${YELLOW}← IMPORTANTE!${NC}"
        fi
    else
        echo -e "   ${CYAN}http://localhost:$SERVER_PORT/admin${NC} ${YELLOW}← IMPORTANTE!${NC}"
    fi
    echo -e "   Configure seu número para ativar o botão 'Teste Grátis'"
    
    echo ""
    echo -e "${BOLD}🌐 Configurações do servidor:${NC}"
    echo -e "   Porta: ${CYAN}$SERVER_PORT${NC}"
    if [ ! -z "$DOMAIN_NAME" ]; then
        echo -e "   Domínio: ${CYAN}$DOMAIN_NAME${NC}"
        echo -e "   SSL: ${CYAN}$SSL_ENABLED${NC}"
    fi
    
    echo ""
    echo -e "${BOLD}💡 Recursos disponíveis:${NC}"
    echo -e "   ✅ Integração WhatsApp (configure via admin)"
    echo -e "   ✅ IA Vendedor 24/7"
    echo -e "   ✅ Prospecção automática"
    echo -e "   ✅ Interface responsiva"
    echo -e "   ✅ Porta personalizada ($SERVER_PORT)"
    if [ ! -z "$DOMAIN_NAME" ]; then
        echo -e "   ✅ Domínio configurado ($DOMAIN_NAME)"
    fi
    if [ "$SSL_ENABLED" == "true" ]; then
        echo -e "   ✅ SSL/HTTPS pronto para configurar"
    fi
    echo ""
    echo -e "${YELLOW}🎉 LigAI - Vendas instalado com sucesso!${NC}"
}

# Criar script de configuração SSL
setup_ssl() {
    if [ "$ssl_enabled" == "true" ] && [ ! -z "$domain_name" ]; then
        log "🔒 Configurando SSL..."
        
        cat > setup-ssl.sh << 'EOF'
#!/bin/bash

# Script de configuração SSL para LigAI - Vendas
# Execute este script após apontar seu domínio para este servidor

DOMAIN=$(jq -r '.domain' server-config.json)
PORT=$(jq -r '.port' server-config.json)

echo "🔒 Configurando SSL para $DOMAIN..."

# Instalar Certbot se não estiver instalado
if ! command -v certbot &> /dev/null; then
    echo "📦 Instalando Certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Instalar Nginx se não estiver instalado
if ! command -v nginx &> /dev/null; then
    echo "📦 Instalando Nginx..."
    sudo apt install -y nginx
fi

# Criar configuração do Nginx
sudo tee /etc/nginx/sites-available/$DOMAIN << EOL
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Ativar site
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Obter certificado SSL
echo "🔐 Obtendo certificado SSL..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "✅ SSL configurado com sucesso!"
echo "🌐 Seu site está disponível em: https://$DOMAIN"
EOF

        chmod +x setup-ssl.sh
        success "Script SSL criado: ./setup-ssl.sh"
        warning "Execute './setup-ssl.sh' após apontar seu domínio para este servidor"
    fi
}

# Função principal
main() {
    show_banner
    
    # Executar etapas da instalação
    check_prerequisites
    download_project
    install_dependencies
    setup_database
    configure_server
    configure_whatsapp
    setup_ssl
    finalize_installation
    show_success
}

# Executar instalação
main "$@"