# 🚀 LigAI - Vendas: Instalador Automático

Sistema completo de vendas automatizadas com IA que vende até 3.000 clientes por dia!

## 📋 Instalação Rápida

### Método 1: Instalador Automático (Recomendado)

```bash
node install.js
```

O instalador vai:
✅ Verificar pré-requisitos (Node.js, npm)
✅ Instalar todas as dependências
✅ Configurar banco de dados PostgreSQL
✅ Solicitar número do WhatsApp
✅ Configurar integração WhatsApp completa
✅ Validar instalação

### Método 2: Instalação Manual

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados
npm run db:push

# 3. Configurar WhatsApp via painel admin
npm run dev
# Acesse: http://localhost:5000/admin
```

## 🎯 Como Usar

### 1. Executar o Sistema

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

### 2. Configurar WhatsApp

- **Via Instalador**: O número é solicitado durante a instalação
- **Via Admin**: Acesse `http://localhost:5000/admin`
- **Formato**: 11999887766 ou 5511999887766

### 3. Testar Funcionalidade

1. Acesse o site: `http://localhost:5000`
2. Clique no botão **"Teste Grátis"** no header
3. O WhatsApp deve abrir com mensagem automática

## 📱 Funcionalidades

### ✅ Sistema Completo
- **WhatsApp Integration**: Botão "Teste Grátis" conecta direto no WhatsApp
- **IA Vendedor**: Sistema de vendas 24/7 automatizado
- **Banco de Dados**: PostgreSQL com persistência completa
- **Interface Admin**: Painel para configurações em `/admin`
- **Landing Page**: Site responsivo para conversão

### ✅ Validações
- **Números Brasileiros**: Valida DDD (11-99) + 9 + 8 dígitos
- **Formato Automático**: Aceita com ou sem código do país (+55)
- **Mensagem Personalizada**: Texto automático para leads

## 🔧 Configurações Avançadas

### Banco de Dados
```bash
# Aplicar mudanças no schema
npm run db:push

# Forçar atualização (se necessário)
npm run db:push --force
```

### WhatsApp
- Configure via `/admin` ou durante instalação
- URL automática: `https://wa.me/NUMERO?text=MENSAGEM`
- Mensagem padrão sobre LigAI - Vendas

### Endpoints API
- `GET /api/whatsapp-config` - Configuração atual
- `POST /api/settings` - Salvar configurações
- `GET /api/leads` - Leads capturados
- `GET /api/contacts` - Contatos do formulário

## 🚀 Próximos Passos

1. **Execute o instalador**: `node install.js`
2. **Configure seu WhatsApp**: Durante instalação ou via `/admin`
3. **Teste o sistema**: Clique em "Teste Grátis"
4. **Lance suas campanhas**: O sistema está pronto!

## 📞 Suporte

- **Painel Admin**: `http://localhost:5000/admin`
- **Teste WhatsApp**: Funcionalidade integrada no site
- **Logs**: Console do servidor mostra todas as operações

---

**🎉 LigAI - Vendas: Vendas Automatizadas com IA que Realmente Funciona!**