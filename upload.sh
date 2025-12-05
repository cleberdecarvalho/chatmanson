#!/bin/bash

# Script para fazer upload via SFTP
# Edite as variáveis abaixo com suas credenciais

# ======================== CONFIGURAR AQUI ========================
FTP_USER="seu_usuario_ftp"
FTP_PASS="sua_senha_ftp"
FTP_HOST="innovalum.com.br"
FTP_DIR="/public_html/chatmanson"  # Ajuste conforme necessário
# ===================================================================

echo "🚀 Iniciando upload da versão estática..."
echo "Host: $FTP_HOST"
echo "Diretório: $FTP_DIR"
echo ""

# Criar conexão SFTP e fazer upload
lftp -e "
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $FTP_DIR
mirror -R dist/
quit
" 

echo "✅ Upload concluído!"
echo "Acesse: https://www.innovalum.com.br/chatmanson/"
