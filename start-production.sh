#!/bin/bash

# Script de inicialização para produção - LigAI Vendas
# Carrega configurações personalizadas e inicia o servidor

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🚀 Iniciando LigAI - Vendas em modo produção...${NC}"

# Verificar se existe configuração do servidor
if [ -f "server-config.json" ]; then
    PORT=$(grep -o '"port": [0-9]*' server-config.json | cut -d' ' -f2)
    DOMAIN=$(grep -o '"domain": "[^"]*"' server-config.json | cut -d'"' -f4)
    SSL=$(grep -o '"ssl": [a-z]*' server-config.json | cut -d' ' -f2)
    
    echo -e "${GREEN}📋 Configurações carregadas:${NC}"
    echo -e "   Porta: ${CYAN}$PORT${NC}"
    if [ ! -z "$DOMAIN" ]; then
        echo -e "   Domínio: ${CYAN}$DOMAIN${NC}"
        echo -e "   SSL: ${CYAN}$SSL${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ Usando configurações padrão (porta 5000)${NC}"
fi

# Build do projeto
echo -e "${CYAN}🔨 Fazendo build do projeto...${NC}"
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
    
    # Iniciar servidor de produção
    echo -e "${CYAN}🌐 Iniciando servidor...${NC}"
    npm start
else
    echo -e "${RED}❌ Erro no build do projeto!${NC}"
    exit 1
fi