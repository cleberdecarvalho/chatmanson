# 🚀 Chat Mason - Arquivos Estáticos Prontos

## 📦 O que está em `dist/`

Tudo que você precisa está aqui:

```
dist/
├── index.html              ← Versão principal (com error handling)
├── index-safe.html         ← Versão alternativa (mais segura)
├── diagnose.html           ← Ferramenta de diagnóstico
├── test.html               ← Teste básico
├── .htaccess              ← Configuração Apache (SPA routing)
├── Intro.mp4              ← Vídeo introdutório
├── background.jpg         ← Imagem de fundo
├── james-mason1.jpg       ← Foto 1
├── james-mason2.jpg       ← Foto 2
└── assets/
    └── index-BGEuKXOl.js   ← App bundled (React + Lógica)
```

## 🎯 Passo a Passo para Deploy

### 1️⃣ Se você está com ERRO 404

**Acesse PRIMEIRO a página de diagnóstico:**
```
https://www.innovalum.com.br/chatmanson/diagnose.html
```

Isso vai te mostrar exatamente qual é o problema:
- ✅ Se todos os arquivos aparecerem verdes = problema é o roteamento
- ❌ Se algum arquivo aparecer vermelho = não foi copiado corretamente

### 2️⃣ Copiar arquivos corretamente

Via cPanel/FTP, copie **TODOS** para `/public_html/chatmanson/`:

```
✅ index.html
✅ .htaccess  (importante!)
✅ Intro.mp4
✅ background.jpg
✅ james-mason1.jpg
✅ james-mason2.jpg
✅ assets/index-BGEuKXOl.js
```

**Permissões via SSH:**
```bash
chmod 755 /home/user/public_html/chatmanson/
chmod 755 /home/user/public_html/chatmanson/assets/
chmod 644 /home/user/public_html/chatmanson/*
chmod 644 /home/user/public_html/chatmanson/.htaccess
chmod 644 /home/user/public_html/chatmanson/assets/*
```

### 3️⃣ Verificar via Browser

1. Acesse `https://www.innovalum.com.br/chatmanson/diagnose.html`
2. Todos os arquivos devem estar ✅ verdes
3. Se sim, agora tente `https://www.innovalum.com.br/chatmanson/`

## 🆘 Cenários Possíveis

### Cenário 1: Arquivo não encontrado (RED)
**Problema:** Arquivo não foi copiado ou caminho errado
**Solução:** 
- Verifique via FTP/cPanel se o arquivo existe
- Copie novamente
- Verifique permissões (755 para pastas, 644 para arquivos)

### Cenário 2: Todos verdes, mas index.html retorna 404
**Problema:** `mod_rewrite` não está ativado
**Solução A (cPanel):**
- Vá em "Apache Modules"
- Ative `mod_rewrite`

**Solução B (Sem mod_rewrite):**
- Renomeie `index-safe.html` para `index.html`
- Delete o `.htaccess`
- Tente novamente

### Cenário 3: Página carrega mas está em branco
**Problema:** JavaScript está falhando
**Solução:**
- Abra F12 (Console do navegador)
- Procure por erros em vermelho
- Compartilhe os erros para que eu possa ajudar

## 📋 Checklist Final

- [ ] Pasta `/chatmanson/` criada em `/public_html/`
- [ ] Todos os 6 arquivos copiados (index.html, .htaccess, Intro.mp4, background.jpg, james-mason1.jpg, james-mason2.jpg)
- [ ] Pasta `assets/` existe com `index-BGEuKXOl.js` dentro
- [ ] Permissões corretas (755 pastas, 644 arquivos)
- [ ] `diagnose.html` mostra todos ✅ verdes
- [ ] Pode acessar `https://www.innovalum.com.br/chatmanson/`
- [ ] App carrega sem erros no console (F12)

## 🔗 URLs Importantes

- **App Principal:** https://www.innovalum.com.br/chatmanson/
- **Diagnóstico:** https://www.innovalum.com.br/chatmanson/diagnose.html
- **Teste Simples:** https://www.innovalum.com.br/chatmanson/test.html
- **Seguro (backup):** https://www.innovalum.com.br/chatmanson/index-safe.html

## 💬 Se ainda houver problemas

1. Acesse `diagnose.html`
2. Tire print dos erros
3. Abra F12 no navegador e copie os erros do console
4. Compartilhe comigo

---

**Versão:** 1.0  
**Data:** 05/12/2025  
**Status:** ✅ Pronto para produção
