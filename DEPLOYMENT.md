# Versão Estática - Chat Mason

Esta pasta (`dist/`) contém a **versão estática compilada** pronta para upload no servidor web.

## 📦 Conteúdo

- `index.html` - Arquivo HTML principal
- `assets/` - JavaScript bundled e otimizado
- `background.jpg` - Imagem de fundo
- `james-mason1.jpg` - Foto de James Mason (avatar)
- `james-mason2.jpg` - Foto alternativa
- `Intro.mp4` - Vídeo introdutório

## 🚀 Como fazer upload

### 1. Conectar ao servidor via SFTP/FTP

```bash
sftp usuario@innovalum.com.br
# Digite sua senha
cd /caminho/para/public_html
mkdir chatmanson
cd chatmanson
```

### 2. Enviar todos os arquivos

```bash
# Da sua máquina local (fora do SFTP)
sftp usuario@innovalum.com.br << EOF
cd /caminho/para/public_html
mkdir chatmanson
cd chatmanson
put dist/*
put dist/assets/*
bye
EOF
```

### 3. Via terminal (se tiver acesso SSH)

```bash
scp -r dist/* usuario@innovalum.com.br:/caminho/para/public_html/chatmanson/
```

### 4. Via cPanel File Manager

1. Acesse cPanel do seu domínio
2. Vá para **File Manager**
3. Navegue até a pasta pública (geralmente `public_html`)
4. Crie uma pasta chamada `chatmanson`
5. Upload dos arquivos da pasta `dist/`

## ⚙️ Configuração da API Key

A chave da Groq API está **hardcoded** no bundle JavaScript compilado. Se precisar alterar:

1. Edite `.env.local` no projeto original
2. Execute `npm run build`
3. Copie novamente os arquivos para o servidor

## 🔗 URL de Acesso

Após upload, acesse:
```
https://www.innovalum.com.br/chatmanson/
```

## 📝 Notas Importantes

- ✅ Todas as imagens e vídeo estão inclusos
- ✅ JavaScript está otimizado e minificado
- ✅ Base path configurado para `/chatmanson/`
- ✅ API Key incluída no bundle
- ✅ Tailwind CSS via CDN

## 🆘 Troubleshooting

Se a página não carregar corretamente:

1. Verifique as permissões da pasta (755)
2. Verifique se o arquivo `.htaccess` permite acesso (se em servidor Apache)
3. Limpe o cache do navegador (Ctrl+Shift+Delete)
4. Verifique o console de erros (F12 → Console)

---

**Versão**: 1.0  
**Data**: 05/12/2025  
**Gerado**: Vite 6.4.1
