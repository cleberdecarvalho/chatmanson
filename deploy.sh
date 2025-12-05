#!/bin/bash

# Script para atualizar arquivos no servidor via SFTP
# Use este script após executar `npm run build`

echo "📦 Preparando upload dos arquivos..."
echo ""

# Verificar se dist/ existe
if [ ! -d "dist" ]; then
    echo "❌ Pasta 'dist' não encontrada. Execute 'npm run build' primeiro."
    exit 1
fi

# ===== CONFIGURAR COM SUAS CREDENCIAIS =====
FTP_USER="seu_usuario_ftp"
FTP_PASS="sua_senha_ftp"
FTP_HOST="innovalum.com.br"
FTP_PATH="/public_html/chatmanson"  # Ajuste conforme necessário
# ===========================================

echo "🔐 Conectando ao servidor: $FTP_HOST"
echo "📂 Caminho remoto: $FTP_PATH"
echo ""

# Criar arquivo de script SFTP
cat > /tmp/sftp_commands.txt << EOF
cd $FTP_PATH
put dist/index.html
put dist/.htaccess
put dist/test.html
put dist/Intro.mp4
put dist/background.jpg
put dist/james-mason1.jpg
put dist/james-mason2.jpg
put dist/assets/index-*.js
quit
EOF

# Executar SFTP
lftp -u "$FTP_USER,$FTP_PASS" -e "source /tmp/sftp_commands.txt" "$FTP_HOST"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Upload concluído com sucesso!"
    echo "🌐 Acesse: https://www.innovalum.com.br/chatmanson/"
    echo "🧪 Teste: https://www.innovalum.com.br/chatmanson/test.html"
else
    echo ""
    echo "❌ Erro no upload. Verifique suas credenciais."
fi

# Limpar
rm -f /tmp/sftp_commands.txt
