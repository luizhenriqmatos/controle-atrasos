# ⏰ Controlo de Atrasos DVM

Sistema web moderno e seguro para monitorização de atrasos e remotos perdidos no escritório DVM.

## ✨ Funcionalidades

- ✅ **Interface moderna**: Design minimalista com tema preto/azul/branco
- 🔐 **Autenticação segura**: Proteção com senha e limite de tentativas
- 📱 **Responsivo**: Funciona em desktop, tablet e mobile
- 💾 **Persistência**: Dados salvos localmente em localStorage
- 📊 **Tabela dinâmica**: Edição em tempo real com validação
- 📥 **Exportação**: Backup de dados em JSON
- ⏱️ **Timeout automático**: Session timeout para segurança

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Storage**: localStorage
- **Package Manager**: npm

## 📂 Estrutura do Projeto

```
controle-atrasos/
├── src/
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais
├── index.html            # Template HTML
├── package.json          # Dependências
├── tsconfig.json         # Config TypeScript
├── vite.config.ts        # Config Vite
├── .env.example          # Variáveis de ambiente (exemplo)
├── .gitignore            # Arquivos ignorados no Git
├── README.md             # Este arquivo
└── DEPLOY_GUIDE.md       # Guia completo de deploy
```

## 🚀 Quick Start

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Dev Server
```bash
npm run dev
```

### 3. Abrir no Navegador
```
http://localhost:5173
```

### 4. Login
- Senha padrão: `admin123`

## 🔒 Segurança

### Implementações

- ✅ Validação e sanitização de entrada
- ✅ Limite de 5 tentativas de login
- ✅ Session timeout de 30 minutos
- ✅ Variáveis de ambiente para configurações sensíveis
- ✅ localStorage com fallback seguro
- ✅ Sem dependências de API externas (100% local)

### Boas Práticas

1. **Nunca commit `.env.local`** - Contém senhas/tokens
2. **Use hash bcrypt** para senha em produção
3. **Ative HTTPS** em produção
4. **Faça backups regulares** dos dados
5. **Atualize dependências** regularmente

## 📦 Dependências Principais

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.0.0",
  "typescript": "^5.0.0",
  "vite": "^4.3.0"
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor dev na porta 5173

# Build
npm run build         # Build otimizado para produção
npm run preview       # Preview do build em http://localhost:4173

# Qualidade de código
npm run type-check    # Verifica tipos TypeScript
npm run lint          # Lint do código (se configurado)
```

## 📊 Dados

### Armazenamento

Todos os dados são salvos em **localStorage** com chave `atrasos_escritorio`:

```javascript
{
  "atrasos_escritorio": [
    {
      "nome": "André",
      "atrasoData": "15 min - 26/05",
      "remotosPerdidos": 2
    },
    // ... mais colaboradores
  ]
}
```

### Exportação

- Clique em "📥 Exportar Dados" (modo admin)
- Download automático de JSON com timestamp
- Formato: `atrasos_YYYY-MM-DD.json`

### Limpeza

⚠️ **Irreversível!** Confirmar antes de deletar.

## 🌐 Deploy

Veja [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) para:
- Deploy em GitHub Pages (grátis)
- Deploy em Netlify (recomendado)
- Deploy em Vercel
- Deploy em servidor próprio

### Deploy Rápido (Netlify)

```bash
# 1. Push para GitHub
git push

# 2. Conectar repo no Netlify
# https://netlify.com/drop

# 3. Deploy automático!
```

## 🧪 Testando Localmente

### Login de Teste
- **Usuário**: (não aplicável)
- **Senha**: `admin123`

### Dados de Teste
- Pré-carregados 10 colaboradores
- Edite em modo admin
- Dados persistem entre sessões

## 🐛 Troubleshooting

### App não inicia
```bash
npm install
npm run dev
```

### localStorage vazio
- Verificar se browser permite storage local
- Verificar console para erros
- Limpar cache do browser

### Senha esquecida
- Em desenvolvimento: use `admin123`
- Em produção: sem recuperação (design intencional)
- Opção: Exportar dados, limpar localStorage, reimportar

## 📝 Notas de Desenvolvimento

### Code Style
- TypeScript strict mode ativado
- React Hooks para estado
- Componente funcional único (pode ser dividido em produção)

### Performance
- Build otimizado (~150KB, ~50KB gzipped)
- Sem frameworks CSS pesados
- localStorage é suficiente para dados locais

### Accessibility
- Atributos `aria-label` em botões
- Contraste adequado (WCAG AA)
- Suporta navegação por teclado

## 🚀 Roadmap

Melhorias futuras:
- [ ] Backend/API para sincronização multi-dispositivo
- [ ] Autenticação com OAuth/SSO
- [ ] Gráficos e analytics
- [ ] Notificações em tempo real
- [ ] Mobile app nativa
- [ ] Relatórios PDF
- [ ] Integração com calendário

## 📄 Licença

Privado - Uso exclusivo DVM

## 👥 Autores

- Desenvolvido para DVM
- Versão: 1.0.0
- Data: 26 de maio de 2026

## 📞 Suporte

Para problemas ou dúvidas:
1. Verificar [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)
2. Consultar console do navegador (F12)
3. Verificar localStorage (DevTools)

---

**Made with ❤️ using React + TypeScript + Vite**
