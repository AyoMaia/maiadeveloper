# Guia Completo - Configuração PM2 para Projetos Next.js

Este guia ensina como configurar e rodar múltiplas versões do projeto (main e dev) usando PM2.

## O que é PM2?

PM2 é um gerenciador de processos para Node.js que mantém suas aplicações rodando em background, reinicia automaticamente em caso de erros e facilita o gerenciamento de múltiplas aplicações.

---

## Pré-requisitos

Antes de começar, certifique-se de ter:

1. Node.js instalado
2. PM2 instalado globalmente:
```bash
npm install -g pm2
```

---

## Estrutura dos Projetos

```
/var/www/
├── landing/           # Branch main - Porta 3000
└── landing-dev/       # Branch dev  - Porta 3001
```

---

## Passo 1: Preparar o Projeto Landing (Branch Main)

### 1.1 - Navegar até o diretório
```bash
cd /var/www/landing
```

### 1.2 - Instalar dependências
```bash
npm install
```

### 1.3 - Fazer o build de produção
```bash
npm run build
```

### 1.4 - Iniciar com PM2
```bash
pm2 start npm --name "landing" -- run start
```

**Explicação do comando:**
- `pm2 start` - inicia um novo processo
- `npm` - o executável que será rodado
- `--name "landing"` - nome que aparecerá no PM2
- `-- run start` - argumentos passados para o npm (equivale a `npm run start`)

---

## Passo 2: Preparar o Projeto Landing-Dev (Branch Dev)

### 2.1 - Navegar até o diretório
```bash
cd /var/www/landing-dev
```

### 2.2 - Instalar dependências
```bash
npm install
```

### 2.3 - Configurar a porta 3001

Crie ou edite os arquivos `.env` e `.env.local` na raiz do projeto:

```bash
echo "PORT=3001" > .env
echo "PORT=3001" > .env.local
```

### 2.4 - Fazer o build de produção
```bash
npm run build
```

### 2.5 - Criar arquivo de configuração PM2

Crie o arquivo `ecosystem.config.js` na raiz do projeto:

```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'landing-dev',
    script: 'npm',
    args: 'run start',
    cwd: '/var/www/landing-dev',
    env: {
      PORT: 3001,
      NODE_ENV: 'production'
    }
  }]
};
EOF
```

**Explicação do arquivo:**
- `name` - nome do processo no PM2
- `script` - comando a ser executado
- `args` - argumentos para o comando
- `cwd` - diretório de trabalho
- `env` - variáveis de ambiente (aqui definimos a porta 3001)

### 2.6 - Iniciar com PM2
```bash
pm2 start ecosystem.config.js
```

---

## Passo 3: Verificar os Processos Rodando

### 3.1 - Listar todos os processos
```bash
pm2 list
```

Você verá algo como:
```
┌────┬─────────────┬─────────┬─────────┬──────────┬────────┐
│ id │ name        │ mode    │ pid     │ uptime   │ status │
├────┼─────────────┼─────────┼─────────┼──────────┼────────┤
│ 0  │ landing     │ fork    │ 20372   │ 3h       │ online │
│ 5  │ landing-dev │ fork    │ 33058   │ 10m      │ online │
└────┴─────────────┴─────────┴─────────┴──────────┴────────┘
```

### 3.2 - Verificar se as portas estão rodando
```bash
ss -tlnp | grep -E ':(3000|3001)'
```

Resultado esperado:
```
LISTEN 0  511  *:3000  *:*  users:(("next-server",pid=20384))
LISTEN 0  511  *:3001  *:*  users:(("next-server",pid=33075))
```

### 3.3 - Testar acesso local
```bash
# Testar landing (porta 3000)
curl http://localhost:3000

# Testar landing-dev (porta 3001)
curl http://localhost:3001
```

---

## Comandos PM2 Essenciais

### Gerenciar processos específicos

```bash
# Parar um processo
pm2 stop landing
pm2 stop landing-dev

# Reiniciar um processo
pm2 restart landing
pm2 restart landing-dev

# Remover um processo
pm2 delete landing
pm2 delete landing-dev

# Ver detalhes de um processo
pm2 describe landing
pm2 describe landing-dev
```

### Ver logs

```bash
# Logs em tempo real de todos os processos
pm2 logs

# Logs de um processo específico
pm2 logs landing
pm2 logs landing-dev

# Ver últimas 50 linhas do log
pm2 logs landing --lines 50

# Ver logs sem seguir (nostream)
pm2 logs landing --nostream
```

### Monitoramento

```bash
# Ver uso de CPU e memória em tempo real
pm2 monit

# Ver informações do sistema
pm2 info
```

---

## Passo 4: Salvar Configuração (Auto-Start)

Para que os processos iniciem automaticamente após reiniciar o servidor:

### 4.1 - Salvar a lista atual de processos
```bash
pm2 save
```

### 4.2 - Configurar PM2 para iniciar no boot
```bash
pm2 startup
```

**IMPORTANTE:** O comando acima mostrará uma linha que você precisa copiar e executar. Será algo como:
```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

Copie e execute esse comando exatamente como mostrado.

### 4.3 - Salvar novamente
```bash
pm2 save
```

---

## Atualizar o Projeto

Quando você fizer alterações no código e precisar atualizar:

### Para o projeto Landing (branch main)
```bash
cd /var/www/landing
git pull origin main
npm install
npm run build
pm2 restart landing
```

### Para o projeto Landing-dev (branch dev)
```bash
cd /var/www/landing-dev
git pull origin dev
npm install
npm run build
pm2 restart landing-dev
```

---

## Solução de Problemas

### Processo não inicia ou fica reiniciando

1. Verifique os logs:
```bash
pm2 logs landing-dev --lines 50
```

2. Verifique se o build foi feito:
```bash
ls -la /var/www/landing-dev/.next
```

3. Se não existir pasta `.next`, faça o build:
```bash
cd /var/www/landing-dev
npm run build
```

### Porta já em uso

Se aparecer erro `EADDRINUSE`:

1. Verifique o que está rodando na porta:
```bash
ss -tlnp | grep :3001
```

2. Pare o processo PM2 e inicie novamente:
```bash
pm2 stop landing-dev
pm2 start ecosystem.config.js
```

### Resetar tudo e começar do zero

```bash
# Parar todos os processos
pm2 stop all

# Remover todos os processos
pm2 delete all

# Limpar lista salva
pm2 save --force

# Agora siga novamente os passos 1 e 2 deste guia
```

---

## Acesso Externo (IP Público)

Para acessar os projetos via IP público:

1. **IP do servidor:** Use `curl -4 ifconfig.me` para descobrir

2. **Liberar portas no Firewall da Cloud:**
   - AWS: Security Groups
   - Google Cloud: Firewall Rules
   - Azure: Network Security Group
   - DigitalOcean/Vultr: Cloud Firewall

3. **Portas a liberar:**
   - 3000 (landing)
   - 3001 (landing-dev)

Após liberar, acesse:
- Landing: `http://SEU_IP:3000`
- Landing-dev: `http://SEU_IP:3001`

---

## Resumo Rápido

```bash
# Iniciar landing (porta 3000)
cd /var/www/landing
npm install && npm run build
pm2 start npm --name "landing" -- run start

# Iniciar landing-dev (porta 3001)
cd /var/www/landing-dev
echo "PORT=3001" > .env
npm install && npm run build
pm2 start ecosystem.config.js

# Salvar configuração
pm2 save

# Ver status
pm2 list
pm2 logs
```

---

## Referências

- Documentação PM2: https://pm2.keymetrics.io/docs/usage/quick-start/
- Next.js Deployment: https://nextjs.org/docs/deployment
