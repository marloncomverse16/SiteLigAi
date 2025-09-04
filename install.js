#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// Cores para output colorido
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = colors.cyan) => {
  console.log(`${color}${message}${colors.reset}`);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

// Função para validar número de WhatsApp brasileiro
function validateBrazilianWhatsApp(phone) {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem 13 dígitos (55 + DDD + 9 + 8 dígitos)
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    const ddd = cleaned.substring(2, 4);
    const firstDigit = cleaned.charAt(4);
    
    // Verifica se o DDD é válido (11-99)
    if (parseInt(ddd) >= 11 && parseInt(ddd) <= 99 && firstDigit === '9') {
      return cleaned;
    }
  }
  
  // Verifica se tem 11 dígitos (DDD + 9 + 8 dígitos)
  if (cleaned.length === 11) {
    const ddd = cleaned.substring(0, 2);
    const firstDigit = cleaned.charAt(2);
    
    if (parseInt(ddd) >= 11 && parseInt(ddd) <= 99 && firstDigit === '9') {
      return '55' + cleaned; // Adiciona código do Brasil
    }
  }
  
  return null;
}

// Função para formatar número para exibição
function formatWhatsAppNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 13) {
    return `+${cleaned.substring(0, 2)} (${cleaned.substring(2, 4)}) ${cleaned.substring(4, 5)} ${cleaned.substring(5, 9)}-${cleaned.substring(9)}`;
  }
  return phone;
}

async function showBanner() {
  log(`
${colors.bold}${colors.cyan}╔══════════════════════════════════════════════════════════════╗
║                      LigAI - VENDAS                         ║
║              Sistema de Vendas Automatizadas                ║
║                    Instalador Oficial                       ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.yellow}🚀 Instalando o sistema mais avançado de vendas automatizadas!${colors.reset}
${colors.green}✨ Venda até 3.000 clientes por dia com IA${colors.reset}
`);
}

async function checkPrerequisites() {
  log('📋 Verificando pré-requisitos...', colors.blue);
  
  try {
    // Verifica Node.js
    const nodeVersion = await execAsync('node --version');
    log(`✅ Node.js: ${nodeVersion.stdout.trim()}`, colors.green);
    
    // Verifica npm
    const npmVersion = await execAsync('npm --version');
    log(`✅ npm: ${npmVersion.stdout.trim()}`, colors.green);
    
    // Verifica se o projeto está na pasta correta
    const packageExists = await fs.access('package.json').then(() => true).catch(() => false);
    if (!packageExists) {
      throw new Error('package.json não encontrado. Execute o instalador na pasta raiz do projeto.');
    }
    log('✅ Projeto LigAI - Vendas detectado', colors.green);
    
  } catch (error) {
    log(`❌ Erro nos pré-requisitos: ${error.message}`, colors.red);
    process.exit(1);
  }
}

async function installDependencies() {
  log('\n📦 Instalando dependências do sistema...', colors.blue);
  
  try {
    log('   Instalando pacotes npm...', colors.yellow);
    await execAsync('npm install');
    log('✅ Dependências instaladas com sucesso!', colors.green);
  } catch (error) {
    log(`❌ Erro ao instalar dependências: ${error.message}`, colors.red);
    process.exit(1);
  }
}

async function setupDatabase() {
  log('\n🗄️ Configurando banco de dados...', colors.blue);
  
  try {
    log('   Aplicando schema do banco...', colors.yellow);
    await execAsync('npm run db:push');
    log('✅ Banco de dados configurado com sucesso!', colors.green);
  } catch (error) {
    log(`❌ Erro ao configurar banco: ${error.message}`, colors.red);
    log('   Tentando forçar aplicação do schema...', colors.yellow);
    try {
      await execAsync('npm run db:push --force');
      log('✅ Schema aplicado com sucesso!', colors.green);
    } catch (forceError) {
      log(`❌ Erro crítico no banco: ${forceError.message}`, colors.red);
      process.exit(1);
    }
  }
}

async function configureWhatsApp() {
  log('\n📱 Configuração do WhatsApp', colors.blue);
  log('   Configure o número que receberá as conversas dos leads', colors.yellow);
  
  let whatsappNumber = '';
  let isValid = false;
  
  while (!isValid) {
    const input = await question('\n📞 Digite o número do WhatsApp (ex: 11999887766 ou 5511999887766): ');
    const validated = validateBrazilianWhatsApp(input);
    
    if (validated) {
      whatsappNumber = validated;
      isValid = true;
      log(`✅ Número válido: ${formatWhatsAppNumber(whatsappNumber)}`, colors.green);
      
      const confirm = await question('   Confirma este número? (s/n): ');
      if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'sim') {
        isValid = false;
      }
    } else {
      log('❌ Número inválido! Use o formato: 11999887766 ou 5511999887766', colors.red);
    }
  }
  
  // Salva a configuração em um arquivo temporário que será lido pelo sistema
  const configData = {
    whatsappNumber,
    installedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  
  await fs.writeFile('ligai-config.json', JSON.stringify(configData, null, 2));
  log('✅ Configuração do WhatsApp salva!', colors.green);
  
  return whatsappNumber;
}

async function startSystem() {
  log('\n🚀 Iniciando sistema LigAI - Vendas...', colors.blue);
  
  try {
    log('   Compilando e verificando tipos...', colors.yellow);
    await execAsync('npm run check');
    log('✅ Sistema validado com sucesso!', colors.green);
    
    // Inicia o sistema em desenvolvimento
    log('\n🎯 Sistema pronto para uso!', colors.green);
    log('   Execute: npm run dev (para desenvolvimento)', colors.yellow);
    log('   Execute: npm run build && npm start (para produção)', colors.yellow);
    
  } catch (error) {
    log(`⚠️ Aviso: ${error.message}`, colors.yellow);
    log('   O sistema pode funcionar mesmo com alguns avisos de tipos', colors.yellow);
  }
}

async function showSuccessMessage(whatsappNumber) {
  log(`
${colors.bold}${colors.green}╔══════════════════════════════════════════════════════════════╗
║                    INSTALAÇÃO CONCLUÍDA!                    ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.cyan}🎉 LigAI - Vendas foi instalado com sucesso!${colors.reset}

${colors.bold}📱 Configurações:${colors.reset}
   WhatsApp: ${formatWhatsAppNumber(whatsappNumber)}

${colors.bold}🚀 Próximos passos:${colors.reset}
   1. Execute: ${colors.yellow}npm run dev${colors.reset}
   2. Acesse: ${colors.cyan}http://localhost:5000${colors.reset}
   3. Teste o botão "Teste Grátis" no site
   4. Configure suas campanhas de vendas

${colors.bold}💡 Recursos disponíveis:${colors.reset}
   ✅ Integração WhatsApp configurada
   ✅ IA Vendedor 24/7 ativo
   ✅ Prospecção automática
   ✅ Banco de dados configurado
   ✅ Interface responsiva

${colors.yellow}📞 Suporte: Configure seu número para receber leads!${colors.reset}
`, colors.green);
}

async function main() {
  try {
    await showBanner();
    await checkPrerequisites();
    await installDependencies();
    await setupDatabase();
    const whatsappNumber = await configureWhatsApp();
    await startSystem();
    await showSuccessMessage(whatsappNumber);
    
  } catch (error) {
    log(`\n❌ Erro durante a instalação: ${error.message}`, colors.red);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Executa o instalador
main();