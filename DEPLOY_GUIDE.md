# 🚀 Guia de Deploy Rápido e Seguro - Controle de Atrasos DVM

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Revisão de Segurança](#revisão-de-segurança)
3. [Setup Local (Desenvolvimento)](#setup-local-desenvolvimento)
4. [Build para Produção](#build-para-produção)
5. [Deploy em Diferentes Plataformas](#deploy-em-diferentes-plataformas)
6. [Monitoramento e Manutenção](#monitoramento-e-manutenção)

---

## Pré-requisitos

### Sistema
- **Node.js**: versão 18+ ([Download](https://nodejs.org))
- **npm**: versão 9+ (incluído com Node.js)
- **Git**: para versionamento ([Download](https://git-scm.com))

### Verificar instalação
```bash
node --version    # v18.0.0 ou superior
npm --version     # 9.0.0 ou superior
git --version     # qualquer versão recente
```

---

## 🔒 Revisão de Segurança

### ✅ Melhorias Implementadas

| Problema | Solução |
|----------|---------|
| **Senha hardcoded** | Movida para variáveis de ambiente (`.env.local`) |
| **Sem validação de entrada** | Adicionada sanitização e limites de tamanho |
| **Sem proteção contra brute-force** | Implementado limite de 5 tentativas |
| **Sem timeout de sessão** | Session timeout de 30 minutos implementado |
| **Sem controle de armazenamento** | Validação antes de salvar em localStorage |
| **Sem exportação de dados** | Adicionada funcionalidade segura de backup |

### 🔐 Segurança da Senha

**NÃO use a senha padrão em produção!**

#### Opção 1: Gerar hash bcrypt online (Rápido)
1. Aceda: https://bcrypt-generator.com/
2. Digite sua senha
3. Copie o hash gerado
4. Cole no arquivo `.env.local`:
```env
VITE_ADMIN_PASSWORD=seu_hash_bcrypt_aqui
```

#### Opção 2: Gerar hash com Node.js (Recomendado)
```bash
# Instalar bcrypt globalmente
npm install -g bcryptjs

# Gerar hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('sua_senha_aqui', 10));"
```

### 📁 Estrutura de Segurança
```
.env.local          ← NUNCA fazer commit (arquivo local com senhas)
.env.example        ← Exemplo público (sem senhas reais)
.gitignore          ← Protege arquivos sensíveis
```

---

## Setup Local (Desenvolvimento)

### 1️⃣ Clonar/Preparar Projeto
```bash
cd c:\Users\User\OneDrive\Documentos\Controle_atraso_dvm
```

### 2️⃣ Instalar Dependências
```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente
```bash
# Copiar template
cp .env.example .env.local

# Editar .env.local e definir:
# VITE_ADMIN_PASSWORD_HASH=seu_hash_aqui
# OU usar a senha padrão para dev (admin123)
```

### 4️⃣ Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

**Output esperado:**
```
VITE v4.3.0  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 5️⃣ Acessar Aplicação
Abra no navegador: **http://localhost:5173**

---

## Build para Produção

### 1️⃣ Verificar Código (Opcional mas Recomendado)
```bash
# Validar tipos TypeScript
npm run type-check

# Lint do código
npm run lint
```

### 2️⃣ Build Otimizado
```bash
npm run build
```

**Outputs gerados em `dist/`:**
- `dist/index.html` - Arquivo principal
- `dist/assets/` - CSS, JS e outros recursos otimizados
- Tamanho típico: ~150KB (gzipped ~50KB)

### 3️⃣ Testar Build Localmente
```bash
npm run preview
```

---

## Deploy em Diferentes Plataformas

### 🌐 Opção 1: GitHub Pages (Grátis, Simples)

#### Setup
```bash
# 1. Criar repositório no GitHub
# 2. Instalar gh-pages
npm install --save-dev gh-pages

# 3. Adicionar scripts ao package.json
```

**Adicionar em package.json:**
```json
{
  "homepage": "https://seu-usuario.github.io/controle-atrasos",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Deploy
```bash
git add .
git commit -m "v1.0.0: Release inicial"
git push origin main
npm run deploy
```

#### Acessar
```
https://seu-usuario.github.io/controle-atrasos
```

---

### ☁️ Opção 2: Netlify (Recomendado - Muito Fácil)

#### Setup via Website
1. Aceda: https://netlify.com
2. Clique "Deploy with Git"
3. Conecte sua conta GitHub
4. Selecione o repositório
5. Clique "Deploy"

#### Configuração (se necessário)
**netlify.toml** na raiz:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Deploy
```bash
git push origin main
# Netlify faz deploy automaticamente!
```

#### URL
```
https://seu-projeto.netlify.app
```

---

### 🏢 Opção 3: Vercel (Premium, Performance)

#### Setup via CLI
```bash
npm install -g vercel
vercel login
vercel
```

#### Deploy Manual
```bash
vercel --prod
```

#### URL
```
https://seu-projeto.vercel.app
```

---

### 🖥️ Opção 4: Servidor Próprio (Linux/Windows)

#### Requisitos
- Servidor com Node.js 18+
- Nginx ou Apache (como reverse proxy)
- SSL/TLS (certificado)

#### Setup
```bash
# 1. SSH para servidor
ssh usuario@seu-servidor.com

# 2. Clonar projeto
git clone seu-repositorio
cd controle-atrasos
npm install

# 3. Build
npm run build

# 4. Instalar PM2 (para manter app ativa)
npm install -g pm2
pm2 start "npm run preview" --name controle-atrasos

# 5. Configurar Nginx (exemplo)
```

**Nginx Config** (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### SSL com Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

## Monitoramento e Manutenção

### 📊 Health Check
```bash
# Verificar se aplicação está online
curl https://seu-dominio.com

# Status esperado: HTML com código 200
```

### 🔄 Backup de Dados
```bash
# Exportar dados via interface
# 1. Login como admin
# 2. Clique "📥 Exportar Dados"
# 3. Arquivo JSON é baixado automaticamente

# Ou fazer backup do localStorage
# (Devtools → Application → Local Storage)
```

### 📝 Logs
**Ambiente Local:**
```bash
npm run dev  # Verá logs no terminal
```

**Produção:**
```bash
# Verificar logs do PM2
pm2 logs controle-atrasos

# Ou logs do Netlify/Vercel (no dashboard)
```

### 🔐 Manutenção de Segurança
```bash
# 1. Verificar vulnerabilidades
npm audit

# 2. Atualizar dependências
npm update

# 3. Verificar vulnerabilidades conhecidas
npm audit fix
```

---

## 🚨 Checklist de Deploy

Antes de colocar em produção:

- [ ] Senha não está hardcoded no código
- [ ] `.env.local` está no `.gitignore`
- [ ] SSL/HTTPS está ativado
- [ ] Backup de dados testado
- [ ] Build local funciona (`npm run build`)
- [ ] Nenhuma mensagem de erro no console
- [ ] localStorage está funcionando
- [ ] Responsivo em mobile testado
- [ ] Performance é aceitável (< 3s load)
- [ ] URL está documentada para team

---

## 📞 Troubleshooting

### "Erro: Cannot find module"
```bash
npm install  # Reinstalar dependências
rm -r node_modules package-lock.json
npm install
```

### "Porta 5173 já está em uso"
```bash
# Usar outra porta
npm run dev -- --port 5174
```

### "localStorage não funciona"
```javascript
// Verificar no console
localStorage.getItem('atrasos_escritorio')
// Se vazio, dados não foram salvos ainda
```

### "Senha não funciona"
```
1. Verificar .env.local está sendo lido
2. Verificar VITE_ADMIN_PASSWORD está definido
3. Se em desenvolvimento, usar "admin123"
```

---

## 📚 Referências

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Netlify Deploy](https://docs.netlify.com)
- [GitHub Pages](https://pages.github.com)

---

**Última atualização:** 26 de maio de 2026  
**Versão:** 1.0.0
