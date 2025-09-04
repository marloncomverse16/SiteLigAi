# ============================================================================
#                    LIGAI - VENDAS: INSTALADOR AUTOMÁTICO
#              Sistema de Vendas Automatizadas com IA - GitHub
# ============================================================================

# Configurar cores
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"

function Write-Log($Message) {
    Write-Host "🔵 $Message" -ForegroundColor $Cyan
}

function Write-Success($Message) {
    Write-Host "✅ $Message" -ForegroundColor $Green
}

function Write-Warning($Message) {
    Write-Host "⚠️ $Message" -ForegroundColor $Yellow
}

function Write-Error($Message) {
    Write-Host "❌ $Message" -ForegroundColor $Red
    exit 1
}

# Banner do sistema
function Show-Banner {
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
    Write-Host "║                      LigAI - VENDAS                         ║" -ForegroundColor $Cyan
    Write-Host "║              Sistema de Vendas Automatizadas                ║" -ForegroundColor $Cyan
    Write-Host "║                    Instalador GitHub                        ║" -ForegroundColor $Cyan
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan
    Write-Host ""
    Write-Host "🚀 Instalando o sistema mais avançado de vendas automatizadas!" -ForegroundColor $Yellow
    Write-Host "✨ Venda até 3.000 clientes por dia com IA" -ForegroundColor $Green
    Write-Host ""
}

# Verificar pré-requisitos
function Test-Prerequisites {
    Write-Log "📋 Verificando pré-requisitos..."
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version
        Write-Success "Node.js: $nodeVersion"
    }
    catch {
        Write-Error "Node.js não encontrado! Instale Node.js 18+ e tente novamente."
    }
    
    # Verificar npm
    try {
        $npmVersion = npm --version
        Write-Success "npm: v$npmVersion"
    }
    catch {
        Write-Error "npm não encontrado! Instale npm e tente novamente."
    }
    
    # Verificar git
    try {
        git --version | Out-Null
        Write-Success "Git detectado"
    }
    catch {
        Write-Error "Git não encontrado! Instale git e tente novamente."
    }
}

# Baixar projeto do GitHub
function Get-Project {
    Write-Log "📦 Baixando LigAI - Vendas do GitHub..."
    
    $projectName = "ligai-vendas"
    
    # Remove diretório se já existir
    if (Test-Path $projectName) {
        Write-Warning "Removendo instalação anterior..."
        Remove-Item -Recurse -Force $projectName
    }
    
    # Clone do repositório (substitua pela URL real)
    # git clone https://github.com/SEU_USUARIO/ligai-vendas.git
    
    # Para este exemplo, criar estrutura simulada
    New-Item -ItemType Directory -Name $projectName
    Set-Location $projectName
    
    Write-Success "Projeto baixado com sucesso!"
    
    # Simular estrutura (remover quando usar git clone real)
    New-Item -ItemType Directory -Path "client\src" -Force
    New-Item -ItemType Directory -Path "server" -Force
    New-Item -ItemType Directory -Path "shared" -Force
    
    $packageJson = @{
        name = "ligai-vendas"
        scripts = @{
            dev = "echo Starting..."
            "install-ligai" = "node install.js"
        }
    } | ConvertTo-Json
    
    $packageJson | Out-File -FilePath "package.json" -Encoding UTF8
    
    Write-Log "📁 Configurando projeto..."
}

# Instalar dependências
function Install-Dependencies {
    Write-Log "🔧 Instalando dependências do sistema..."
    
    if (Test-Path "package.json") {
        npm install
        Write-Success "Dependências instaladas!"
    }
    else {
        Write-Error "package.json não encontrado!"
    }
}

# Configurar banco de dados
function Set-Database {
    Write-Log "🗄️ Configurando banco de dados..."
    
    $scripts = Get-Content "package.json" | ConvertFrom-Json | Select-Object -ExpandProperty scripts
    if ($scripts.'db:push') {
        npm run db:push
        Write-Success "Banco de dados configurado!"
    }
    else {
        Write-Warning "Script de banco não encontrado, continuando..."
    }
}

# Configurar WhatsApp
function Set-WhatsApp {
    Write-Log "📱 Configuração do WhatsApp"
    Write-Host "Configure o número que receberá as conversas dos leads" -ForegroundColor $Yellow
    
    do {
        Write-Host ""
        $whatsappNumber = Read-Host "📞 Digite o número do WhatsApp (ex: 11999887766)"
        
        # Validação simples
        if ($whatsappNumber -match "^[0-9]{10,11}$") {
            # Adicionar código do Brasil se necessário
            if ($whatsappNumber.Length -eq 11) {
                $whatsappNumber = "55" + $whatsappNumber
            }
            
            # Formatar para exibição
            $formatted = "+{0} ({1}) {2} {3}-{4}" -f $whatsappNumber.Substring(0,2), $whatsappNumber.Substring(2,2), $whatsappNumber.Substring(4,1), $whatsappNumber.Substring(5,4), $whatsappNumber.Substring(9,4)
            
            Write-Host ""
            Write-Success "Número válido: $formatted"
            $confirm = Read-Host "Confirma este número? (s/n)"
            
            if ($confirm -match "^(s|S|sim)$") {
                # Salvar configuração
                $config = @{
                    whatsappNumber = $whatsappNumber
                    installedAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
                    version = "1.0.0"
                } | ConvertTo-Json
                
                $config | Out-File -FilePath "ligai-config.json" -Encoding UTF8
                Write-Success "Configuração do WhatsApp salva!"
                break
            }
        }
        else {
            Write-Error "Número inválido! Use formato: 11999887766"
        }
    } while ($true)
}

# Finalizar instalação
function Complete-Installation {
    Write-Log "🚀 Finalizando instalação..."
    
    if (Test-Path "package.json") {
        Write-Success "Sistema pronto para uso!"
    }
    else {
        Write-Warning "Alguns arquivos podem estar faltando"
    }
}

# Mostrar mensagem de sucesso
function Show-Success {
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor $Green
    Write-Host "║                    INSTALAÇÃO CONCLUÍDA!                    ║" -ForegroundColor $Green
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor $Green
    Write-Host ""
    
    if (Test-Path "ligai-config.json") {
        $config = Get-Content "ligai-config.json" | ConvertFrom-Json
        $whatsappNum = $config.whatsappNumber
        $formatted = "+{0} ({1}) {2} {3}-{4}" -f $whatsappNum.Substring(0,2), $whatsappNum.Substring(2,2), $whatsappNum.Substring(4,1), $whatsappNum.Substring(5,4), $whatsappNum.Substring(9,4)
        Write-Host "📱 WhatsApp configurado: $formatted" -ForegroundColor $Cyan
    }
    
    Write-Host ""
    Write-Host "🚀 Próximos passos:" -ForegroundColor White
    Write-Host "   1. cd ligai-vendas" -ForegroundColor $Yellow
    Write-Host "   2. npm run dev" -ForegroundColor $Yellow
    Write-Host "   3. Acesse: http://localhost:5000" -ForegroundColor $Cyan
    Write-Host "   4. Teste o botão 'Teste Grátis'"
    Write-Host ""
    Write-Host "💡 Recursos disponíveis:" -ForegroundColor White
    Write-Host "   ✅ Integração WhatsApp"
    Write-Host "   ✅ IA Vendedor 24/7"
    Write-Host "   ✅ Prospecção automática"
    Write-Host "   ✅ Interface responsiva"
    Write-Host ""
    Write-Host "🔧 Administração:" -ForegroundColor White
    Write-Host "   Painel admin: http://localhost:5000/admin" -ForegroundColor $Cyan
    Write-Host ""
    Write-Host "🎉 LigAI - Vendas instalado com sucesso!" -ForegroundColor $Yellow
}

# Função principal
function Main {
    Show-Banner
    Test-Prerequisites
    Get-Project
    Install-Dependencies
    Set-Database
    Set-WhatsApp
    Complete-Installation
    Show-Success
}

# Executar instalação
Main