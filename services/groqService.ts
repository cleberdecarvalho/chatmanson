import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

// ==================================================================================
// CONFIGURAÇÃO DE API KEY
// Use uma das seguintes opções:
// 1. Crie um arquivo .env.local na raiz do projeto com: VITE_GROQ_API_KEY=sua_chave
// 2. Configure a variável de ambiente: VITE_GROQ_API_KEY
// 3. Na inicialização, defina: process.env.VITE_GROQ_API_KEY
// ==================================================================================

const apiKey = import.meta.env.VITE_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

export const sendMessageToMason = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  if (!apiKey) {
    console.error("ERRO: Chave da API Groq ausente.");
    console.error("Configure a variável VITE_GROQ_API_KEY em .env.local");
    return "*James olha para você confuso, servindo-se de um copo de uísque.* \n\n(Erro de Configuração: API Key não configurada. Crie um arquivo .env.local na raiz do projeto com sua chave Groq. Veja .env.local.example para mais detalhes.)";
  }

  try {
    // Formata as mensagens para o padrão OpenAI/Groq
    // O array 'history' vindo do App.tsx JÁ CONTÉM a última mensagem do usuário.
    const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user', 
            content: msg.text
        }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            // Atualizado para o modelo mais recente pois o 3.1 foi descontinuado
            model: "llama-3.3-70b-versatile",
            messages: apiMessages,
            temperature: 1.0, 
            max_tokens: 4096,
            top_p: 1,
            stream: false
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erro na API Groq:", JSON.stringify(errorData, null, 2));
        throw new Error(`Groq API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || "";

    if (!text || text.trim() === "") {
       return "*James ergue uma sobrancelha, um sorriso enigmático nos lábios enquanto observa sua tentativa de deixá-lo sem palavras.* \n\n“Interessante... mas você vai precisar de mais do que silêncio para me conquistar, darling.” \n\nConfiança: 5%\nIntimidade: 0%";
    }

    return text;

  } catch (error) {
    console.error("Falha na comunicação com James Mason (Groq):", error);
    return "*James franze a testa levemente, servindo-se de um copo de uísque para disfarçar uma momentânea confusão.* \n\n“Perdão, darling? Sinto que nos desconectamos por um breve segundo. O que você dizia?”";
  }
};