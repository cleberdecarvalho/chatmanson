# 🚀 GUIA FINAL - Deploy Chat Mason (Versão Estática)

## ✅ Status: PRONTO PARA PRODUÇÃO

Todos os arquivos estão compilados e prontos em `/dist/`

## 📦 Arquivos para copiar para o servidor

**Copie ESTES arquivos para `/public_html/chatmanson/`:**

```
✅ index.html                 (HTML principal - corrigido)
✅ manifest.json              (PWA configuration - novo)
✅ .htaccess                  (Apache routing)
✅ Intro.mp4                  (5.2 MB)
✅ background.jpg             (68 KB)
✅ james-mason1.jpg           (28 KB)
✅ james-mason2.jpg           (24 KB)
✅ assets/
   └── index-BGEuKXOl.js      (212 KB - app bundled)
```

**Total: 5.5 MB**

---

## 🔧 Como fazer upload (3 opções)

### Opção 1: Via cPanel File Manager (Mais fácil)
1. Abra cPanel do seu domínio
2. Vá para **File Manager**
3. Navegue até `/public_html/`
4. Crie pasta `chatmanson`
5. Entre na pasta
6. Faça upload de cada arquivo/pasta

**Permissões:**
- Pastas: 755
- Arquivos: 644

### Opção 2: Via FTP/SFTP
```bash
# Conectar
sftp usuario@innovalum.com.br

# Navegar
cd /public_html/chatmanson

# Copiar arquivos
put index.html
put manifest.json
put .htaccess
put Intro.mp4
put background.jpg
put james-mason1.jpg
put james-mason2.jpg
put -r assets/

quit
```

### Opção 3: Via SSH (terminal)
```bash
cd /home/cleber/projetos/chatmason/dist/
scp * usuario@innovalum.com.br:/public_html/chatmanson/
scp -r assets/ usuario@innovalum.com.br:/public_html/chatmanson/

# Depois, via SSH
ssh usuario@innovalum.com.br
chmod 755 /public_html/chatmanson/
chmod 644 /public_html/chatmanson/*
chmod 755 /public_html/chatmanson/assets
chmod 644 /public_html/chatmanson/assets/*
```

---

## ✅ Após fazer upload

### 1️⃣ Teste os arquivos
```
https://www.innovalum.com.br/chatmanson/files.html
```

Tudo deve estar ✅ verde

### 2️⃣ Acesse o app principal
```
https://www.innovalum.com.br/chatmanson/
```

### 3️⃣ Abra o console (F12)
Não deve ter erros em vermelho

---

## 🐛 Se houver problemas

### Problema: Erro 404
**Solução:**
1. Verifique se `index.html` existe na pasta
2. Verifique se `.htaccess` existe e tem permissão 644
3. Se ainda falhar, contate suporte para ativar `mod_rewrite`

### Problema: Console mostra erro de manifest
**Solução:** ✅ JÁ CORRIGIDO - manifest.json agora está válido

### Problema: Página em branco
**Solução:**
1. Abra F12 e veja a aba Console
2. Procure por erros em vermelho
3. Verifique se `assets/index-BGEuKXOl.js` existe
4. Teste acesso direto: `https://www.innovalum.com.br/chatmanson/assets/index-BGEuKXOl.js`

### Problema: Vídeo não carrega
**Solução:**
- Verifique se `Intro.mp4` existe
- Teste acesso direto: `https://www.innovalum.com.br/chatmanson/Intro.mp4`

---

## 📋 Checklist Pre-Deploy

- [ ] Copiei todos os 7 itens da lista acima
- [ ] Criei pasta `/public_html/chatmanson/`
- [ ] Permissões corretas (755 pastas, 644 arquivos)
- [ ] Acessei `https://www.innovalum.com.br/chatmanson/files.html` - tudo ✅
- [ ] Acessei `https://www.innovalum.com.br/chatmanson/` - funcionando
- [ ] Abri F12 - sem erros em vermelho
- [ ] Testei video - está tocando
- [ ] Testei imagens - carregam
- [ ] API key Groq está funcionando - recebi respostas do James Mason

---

## 🔐 API Key (Importante!)

A chave Groq da API já está no arquivo `.env.local` e foi compilada no JavaScript.

**Para alterar a chave:**
1. Edite `.env.local` localmente
2. Execute `npm run build`
3. Copie novamente os arquivos para o servidor

---

## 📂 Localização dos arquivos

**Localmente:** `/home/cleber/projetos/chatmason/dist/`

**No servidor:** `/home/seu_usuario/public_html/chatmanson/`

**URL pública:** `https://www.innovalum.com.br/chatmanson/`

---

## 🎯 URLs Úteis

| URL | Função |
|-----|--------|
| `/` | App principal |
| `/files.html` | Verificar arquivos |
| `/debug.html` | Debug avançado |
| `/test.html` | Teste simples |
| `/manifest.json` | PWA config |

---

**Versão:** 2.0  
**Data:** 05/12/2025  
**Status:** ✅ Pronto para produção  
**Próximo passo:** Copiar para servidor e testar
