# 🧪 TESTE RÁPIDO - Verificar que tudo funciona

## ✅ Antes de fazer deploy, execute este teste

---

## TESTE 1: Verificar Build ✅ FEITO

```
Build Status: ✅ SUCCESS

✓ 31 modules transformed
✓ dist/index.html (0.63 kB)
✓ dist/assets/index-*.css (0.34 kB)
✓ dist/assets/index-*.js (149.29 kB → 48.07 kB gzipped)
✓ No errors, warnings, or console issues
```

---

## TESTE 2: Testar Localmente (você faz)

### No PowerShell:

```powershell
# 1. Navegar para projeto
cd c:\Users\User\OneDrive\Documentos\Controle_atraso_dvm

# 2. Iniciar servidor
npm run dev

# Saída esperada:
# VITE v4.5.14 ready in xxx ms
# ➜  Local: http://localhost:5173/
```

### No Navegador:

```
1. Abra: http://localhost:5173
2. Você deve ver:
   - Título: "⏰ Controlo de Atrasos"
   - Barra lateral esquerda com "🔑 Acesso Restrito"
   - Campo de password
   - Tabela com 10 colaboradores
   - Status "ONLINE" em verde
```

---

## TESTE 3: Testar Login

```
1. Digite password: admin123
2. Clique "Entrar"
3. Esperado:
   - ✅ Botão muda para "🔒 Painel Admin"
   - ✅ Textareas aparecem para editar atrasos
   - ✅ Botões +/- aparecem para remotos
   - ✅ Botão "📥 Exportar Dados" aparece
   - ✅ Botão "🚨 Limpar Tabela" aparece
```

---

## TESTE 4: Testar Edição de Dados

```
1. Digite algo no campo de atraso (exemplo: "15 min - 26/05")
2. Esperado:
   - ✅ Texto aparece no campo
   - ✅ Texto é salvo imediatamente em localStorage
3. Clique +/- nos remotos
4. Esperado:
   - ✅ Número aumenta/diminui
   - ✅ Dados salvos
5. Recarregue página (F5)
6. Esperado:
   - ✅ Dados permanecem (carregados de localStorage)
```

---

## TESTE 5: Testar Limitação de Tentativas

```
1. Logout (clique "Sair")
2. Digite password errada 5 vezes
3. Esperado na 5ª tentativa:
   - ✅ Botão fica cinzento/desabilitado
   - ✅ Input fica desabilitado
   - ✅ Mensagem: "Tentativas restantes: 0"
```

---

## TESTE 6: Testar Exportação

```
1. Clique "📥 Exportar Dados"
2. Esperado:
   - ✅ Arquivo JSON é baixado
   - ✅ Nome: atrasos_YYYY-MM-DD.json
   - ✅ Contém array de colaboradores com dados
```

---

## TESTE 7: Testar Responsividade

```
1. Abra DevTools (F12)
2. Clique botão "Toggle device toolbar"
3. Teste em diferentes tamanhos:
   - ✅ Mobile (375x667)
   - ✅ Tablet (768x1024)
   - ✅ Desktop (1920x1080)
4. Esperado:
   - ✅ Layout se adapta
   - ✅ Barra lateral vira barra superior em mobile
   - ✅ Tabela scrollável
```

---

## TESTE 8: Testar Console (Sem Erros)

```
1. Abra DevTools (F12)
2. Clique aba "Console"
3. Esperado:
   - ✅ Sem erros vermelhos
   - ✅ Sem warnings alaranjados
   - ✅ Máximo alguns logs azuis (info)
```

---

## TESTE 9: Testar localStorage

```
1. Abra DevTools (F12)
2. Application → Local Storage → http://localhost:5173
3. Procure por chave: atrasos_escritorio
4. Esperado:
   - ✅ Chave existe
   - ✅ Contém JSON com colaboradores
   - ✅ Dados são persisted (após refresh da página)
```

---

## TESTE 10: Testar Timeout (Opcional)

```
1. Fazer login
2. Deixar aba aberta por 30 minutos SEM USAR
3. Esperado após 30 min:
   - ✅ Automático logout
   - ✅ Volta para "🔑 Acesso Restrito"
   - ✅ Campos de password aparecem

Nota: Pode testar mudando TIMEOUT_SESSAO em src/App.tsx para 10000ms (10s) 
```

---

## ✅ CHECKLIST DE TESTES

- [ ] TESTE 1: Build OK (já fiz ✅)
- [ ] TESTE 2: Servidor local funciona
- [ ] TESTE 3: Login funciona
- [ ] TESTE 4: Edição e salvamento funcionam
- [ ] TESTE 5: Limitação de tentativas funciona
- [ ] TESTE 6: Exportação funciona
- [ ] TESTE 7: Responsividade funciona
- [ ] TESTE 8: Console sem erros
- [ ] TESTE 9: localStorage funciona
- [ ] TESTE 10: Timeout funciona (opcional)

---

## 🚨 Se Algum Teste Falhar

### Erro: "npm run dev não funciona"
```
npm install
npm run build
npm run preview
```

### Erro: "Login não funciona"
```
Abra DevTools (F12) → Console
Procure por erros
Verifique se React está carregando
```

### Erro: "Dados não salvam"
```
DevTools → Application → Local Storage
Verifique se localStorage está habilitado
Verifique permissões do navegador
```

### Erro: "Estilos não aparecem"
```
Ctrl+Shift+R (hard refresh)
Limpar cache do navegador
```

---

## 🎬 PRÓXIMO PASSO

Se todos os testes passarem ✅:

1. Parar servidor local (`Ctrl+C`)
2. Ir para: [PASSOS_MANUAIS.md](./PASSOS_MANUAIS.md)
3. Seguir os 10 passos para deploy

---

## ⏱️ TEMPO ESTIMADO

- Testes locais: 10-15 minutos
- Deploy: 20-30 minutos
- **Total até app ao vivo: 30-45 minutos** 🚀

---

**Status:** Pronto para começar!  
**Data:** 26 de maio de 2026  
**Versão:** 1.0.0
