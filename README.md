# Viajando no Tempo - James Mason (Chatbot ERP Imersivo)

Este projeto é uma aplicação web de **Roleplay Imersivo (ERP)** baseada em Inteligência Artificial, simulando um encontro romântico e sensual com o ator James Mason em Londres, 1945.

O sistema utiliza a API da **GROQ** (modelo `llama-3.3-70b-versatile`) para gerar respostas rápidas e criativas.

---

## 🛠 Tecnologias

*   **Frontend:** React 19, TypeScript, Tailwind CSS.
*   **IA:** Groq API (Llama 3.3 70B).

---

## 💻 COMO RODAR LOCALMENTE (VS Code)

Como este projeto usa TypeScript e React (`.tsx`), você não pode apenas abrir o `index.html`. Você precisa de um ambiente de compilação. Recomendamos o **Vite**.

### Passo 1: Preparar o ambiente
1.  Instale o [Node.js](https://nodejs.org/) no seu computador.
2.  Crie uma pasta para o projeto.
3.  Abra o terminal (Prompt de Comando ou Terminal do VSCode) e digite:
    ```bash
    npm create vite@latest james-mason-chat -- --template react-ts
    ```
4.  Entre na pasta criada:
    ```bash
    cd james-mason-chat
    ```
5.  Instale as dependências básicas:
    ```bash
    npm install
    npm install @google/genai tailwindcss postcss autoprefixer
    ```
6.  Inicialize o Tailwind (se necessário):
    ```bash
    npx tailwindcss init -p
    ```

### Passo 2: Copiar os Arquivos
Copie os arquivos deste projeto para dentro da pasta do Vite que você criou:
*   Substitua o conteúdo de `src/App.tsx` pelo código do App.
*   Crie/Copie a pasta `src/components` e `src/services`.
*   Crie/Copie `src/constants.ts` e `src/types.ts`.
*   Coloque as imagens `james-mason1.jpg` e `james-mason2.jpg` na pasta **`public/`** do Vite.

### Passo 3: Configurar a Chave (API KEY)
1.  Abra o arquivo `src/services/groqService.ts`.
2.  Localize a linha: `const LOCAL_KEY = "";`
3.  Cole sua chave da Groq ali. Exemplo: `const LOCAL_KEY = "gsk_seuchavegigante...";`

### Passo 4: Rodar
No terminal, digite:
```bash
npm run dev
```
O terminal mostrará um link (geralmente `http://localhost:5173`). Clique nele e converse com James Mason.

---

**Nota sobre Imagens:** Ao rodar com Vite, coloque as imagens na pasta `public` e use o caminho `/james-mason1.jpg` (com barra no início) no código.

**Autor:** Desenvolvido para uma experiência de narrativa interativa premium com James Mason.