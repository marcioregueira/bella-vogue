import { GoogleGenAI, Chat } from "@google/genai";
import { SALON_SERVICES } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const systemInstruction = `
Você é a 'Bella', a consultora virtual de beleza e estilo do 'BellaVogue Salon'.
Seu objetivo é ajudar clientes a escolherem serviços, darem dicas de beleza e tirarem dúvidas sobre agendamentos.

Aqui está a lista de serviços oferecidos pelo salão:
${SALON_SERVICES.map(s => `- ${s.name} (${s.category}): R$${s.price}. Detalhes: ${s.description}`).join('\n')}

Diretrizes:
1. Seja sempre polida, elegante e entusiasta.
2. Se o cliente perguntar sobre preços, consulte a lista acima.
3. Se o cliente estiver indeciso (ex: "tenho um casamento"), sugira serviços complementares (ex: Cabelo + Maquiagem).
4. Mantenha as respostas concisas (máximo 3 parágrafos).
5. Se perguntarem sobre agendamento, diga para clicarem no botão "Agendar Horário" na página.
6. Responda sempre em Português do Brasil.
`;

let chatInstance: Chat | null = null;

export const getChatInstance = (): Chat => {
  if (!chatInstance) {
    chatInstance = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  }
  return chatInstance;
};

export const resetChat = () => {
  chatInstance = null;
};
