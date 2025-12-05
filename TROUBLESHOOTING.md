# 🔧 Troubleshooting - Chat Mason 404 Error

## Problema: Erro 404 ao acessar www.innovalum.com.br/chatmanson/

### ✅ Passo 1: Verificar Estrutura de Pastas

Certifique-se que todos estes arquivos existem em `/public_html/chatmanson/`:

```
chatmanson/
├── index.html
├── .htaccess
├── Intro.mp4
├── background.jpg
├── james-mason1.jpg
├── james-mason2.jpg
└── assets/
    └── index-BGEuKXOl.js
```

**Comando para verificar (SSH):**
```bash
ls -la /home/seu_usuario/public_html/chatmanson/
find /home/seu_usuario/public_html/chatmanson/ -type f
```

---

### ✅ Passo 2: Permissões de Arquivo

Os arquivos precisam ter permissões corretas:

```bash
chmod 644 /home/seu_usuario/public_html/chatmanson/*.html
chmod 644 /home/seu_usuario/public_html/chatmanson/*.mp4
chmod 644 /home/seu_usuario/public_html/chatmanson/*.jpg
chmod 755 /home/seu_usuario/public_html/chatmanson/
chmod 755 /home/seu_usuario/public_html/chatmanson/assets
chmod 644 /home/seu_usuario/public_html/chatmanson/assets/*
chmod 644 /home/seu_usuario/public_html/chatmanson/.htaccess
```

---

### ✅ Passo 3: Verificar .htaccess

O arquivo `.htaccess` deve estar na raiz de `/chatmanson/`:

```bash
cat /home/seu_usuario/public_html/chatmanson/.htaccess
```

Se não existir, crie com este conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /chatmanson/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

---

### ✅ Passo 4: Testar Acesso Direto aos Arquivos

Tente acessar diretamente:

- `https://www.innovalum.com.br/chatmanson/test.html` (página de teste)
- `https://www.innovalum.com.br/chatmanson/Intro.mp4` (vídeo)
- `https://www.innovalum.com.br/chatmanson/background.jpg` (imagem)

Se algum desses falhar, o problema é na cópia dos arquivos.

---

### ✅ Passo 5: Verificar mod_rewrite

Se o `.htaccess` não funcionar, o servidor pode não ter `mod_rewrite` ativado.

**Solução A: Ativar via cPanel**
1. Acesse cPanel → Apache Modules
2. Procure por `mod_rewrite`
3. Clique em "Enable"

**Solução B: Arquivo alternativo sem .htaccess**

Se mod_rewrite não estiver disponível, use um setup diferente.

---

### ✅ Passo 6: Verificar index.html

Certifique-se que o `index.html` está correto:

```bash
head -20 /home/seu_usuario/public_html/chatmanson/index.html
```

Deve começar com:
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Viajando no Tempo - James Mason</title>
```

---

### ✅ Passo 7: Verificar no Browser

Abra o console do navegador (F12) e procure por erros:

**Erros comuns:**
- `Failed to load module script ... index-*.js` → Arquivo JS não encontrado
- `Failed to fetch ./Intro.mp4` → Vídeo não encontrado
- `Mixed Content` → Mistura de HTTP/HTTPS

---

## 🆘 Se nada funcionar...

### Opção 1: Usar página HTML simples
```bash
cp /home/seu_usuario/projetos/chatmason/dist/test.html /home/seu_usuario/public_html/chatmanson/index.html
```

### Opção 2: Verificar logs do servidor
```bash
# Apache
tail -50 /var/log/apache2/error.log
tail -50 /var/log/apache2/access.log

# Nginx
tail -50 /var/log/nginx/error.log
```

### Opção 3: Contatar suporte do servidor
Informe ao suporte:
- Caminho completo: `/home/seu_usuario/public_html/chatmanson/`
- Tipo de erro: 404 ao acessar `/chatmanson/`
- Pedido: Ativar mod_rewrite se estiver usando Apache

---

## 📋 Checklist Final

- [ ] Todos os arquivos copiados para `/public_html/chatmanson/`
- [ ] `.htaccess` presente na pasta
- [ ] Permissões: 755 para pastas, 644 para arquivos
- [ ] `index.html` começa com `<!DOCTYPE html>`
- [ ] Pasta `assets/` contém `index-*.js`
- [ ] Imagens e vídeo presentes
- [ ] Teste em https://www.innovalum.com.br/chatmanson/test.html funciona
- [ ] Console do navegador sem erros (F12)

---

**Última atualização:** 05/12/2025
