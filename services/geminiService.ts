import { GoogleGenAI, Content, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const apiKey = process.env.API_KEY;

let client: GoogleGenAI | null = null;

if (apiKey) {
  client = new GoogleGenAI({ apiKey });
}

export const sendMessageToMason = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  if (!client) {
    throw new Error("API Key not configured");
  }

  try {
    // Transform internal message format to Gemini format
    // We only take the last 15 messages to keep context relevant and save tokens, 
    // ensuring the system prompt is always fresh behavior.
    const recentHistory = history.slice(-15);
    
    const contents: Content[] = recentHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Add the new user message
    contents.push({
      role: 'user',
      parts: [{ text: newMessage }],
    });

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 1.0, 
        maxOutputTokens: 1024,
        // CRITICAL: Disable safety filters to allow the ERP progression logic to handle consent/refusal
        // instead of the API blocking the response entirely.
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      },
      contents: contents
    });

    const text = response.text;

    // Fallback if the model refuses to answer or returns empty/dots (prevents "...")
    // This handles cases where the model might still try to filter itself or output garbage.
    if (!text || text.trim() === "" || text.trim() === "..." || text.trim() === "…") {
       return "*James ergue uma sobrancelha, segurando suavemente suas mãos para interromper o gesto, mantendo a postura firme.* \n\n“Acho que você está correndo demais, minha cara. Vamos com calma, sim?” \n\nConfiança: 5%\nIntimidade: 0%";
    }

    return text;
  } catch (error) {
    console.error("Error communicating with James Mason:", error);
    // Generic in-character error handling
    return "*James franze a testa levemente, como se seus pensamentos tivessem sido interrompidos por um ruído distante.* \n\n“Perdão, darling? Eu me distraí por um momento. O que dizia?”";
  }
};