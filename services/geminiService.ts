import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini Client
// IMPORTANT: process.env.API_KEY is assumed to be available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly creative but grounded
        maxOutputTokens: 300, // Keep responses relatively short
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  const session = getChatSession();
  
  try {
    const result = await session.sendMessageStream({ message });
    
    for await (const chunk of result) {
        // Correct way to access text from chunk as per guidelines
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            onChunk(c.text);
        }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n[System Error: Unable to connect to AI Digital Twin. Please try again later.]");
  }
};

export const resetChat = () => {
    chatSession = null;
};