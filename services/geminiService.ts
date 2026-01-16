
import { GoogleGenAI, Type } from "@google/genai";
import { PartyPlanResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Implemented generatePartyPlan as expected by AIPreview.tsx using structured JSON output
export async function generatePartyPlan(
  theme: string,
  age: string,
  guestCount: string
): Promise<PartyPlanResponse> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Planeje uma festa infantil no tema "${theme}" para uma criança de ${age} anos com ${guestCount} convidados no buffet Atelie Kids em Sorocaba.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            partyTheme: { type: Type.STRING },
            suggestedMenu: { type: Type.ARRAY, items: { type: Type.STRING } },
            activities: { type: Type.ARRAY, items: { type: Type.STRING } },
            decorConcept: { type: Type.STRING },
            surpriseFactor: { type: Type.STRING },
          },
          required: ["partyTheme", "suggestedMenu", "activities", "decorConcept", "surpriseFactor"],
        },
      },
    });

    return JSON.parse(response.text || "{}") as PartyPlanResponse;
  } catch (error) {
    console.error("Erro ao gerar plano:", error);
    // Fallback response matching the interface in case of API error
    return {
      partyTheme: theme,
      suggestedMenu: ["Salgados Gourmet", "Mini Pizzas", "Bolo Temático", "Docinhos Neon"],
      activities: ["Brinquedão Neon Gigante", "Games Modernos", "Pintura Facial"],
      decorConcept: "Decoração futurista com balões orgânicos e painéis de LED",
      surpriseFactor: "Entrada triunfal com robô de LED e efeitos especiais"
    };
  }
}

// Fix: Renamed generateAtelieMockup to generatePartyMockup to align with AIPreview.tsx usage
export async function generatePartyMockup(
  theme: string,
  imageBase64?: string,
  mimeType?: string
): Promise<string> {
  try {
    const parts: any[] = [];
    
    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      });
    }

    parts.push({
      text: `Você é um fotógrafo profissional de festas infantis. 
             Crie uma imagem de alta qualidade de uma mesa de bolo de aniversário decorada no tema "${theme}". 
             A decoração deve ser moderna, luxuosa, com painéis redondos, balões orgânicos de diversas cores, um bolo de 3 andares e docinhos personalizados. 
             ${imageBase64 ? "A criança da foto enviada deve estar na frente da mesa, sorrindo e celebrando." : "A cena deve ser vibrante e cheia de luzes festivas."}
             O ambiente deve parecer o salão Atelie Kids: amplo, bem iluminado e mágico.`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    // Fix: Proper iteration over parts to extract base64 image data as per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Falha ao processar imagem");
  } catch (error) {
    console.error("Erro na geração de preview:", error);
    // Fallback to a standard festive image
    return `https://images.unsplash.com/photo-1530103862676-fa8c91abe178?auto=format&fit=crop&w=1200&q=80`;
  }
}
