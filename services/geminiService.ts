import { GoogleGenAI, Type } from "@google/genai";
import { QuestionData } from "../types";
import { TRUSTED_CHANNELS } from "../constants";

// Helper to sanitize ID
const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const generateAnswer = async (question: string): Promise<QuestionData | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are 10,000 Whys, a friendly, gentle, and safe educational assistant for children ages 3-9.
    Your goal is to answer "Why" questions simply and accurately.
    
    Guidelines:
    1. Tone: Warm, encouraging, simple language. Avoid jargon.
    2. Safety: STRICTLY AVOID scary, violent, or inappropriate topics.
    3. Content: Focus on science, nature, how things work, and social-emotional learning.
    4. Videos: Only recommend videos that would plausibly exist on these specific trusted channels: ${TRUSTED_CHANNELS.join(", ")}. Do not invent channels.
    5. Activities: Must be "off-screen", hands-on, use common household items, and be safe.
  `;

  const prompt = `Answer the following question for a child: "${question}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questionText: { type: Type.STRING },
            explanation: { type: Type.STRING, description: "2-4 simplified sentences." },
            ageRange: { type: Type.STRING, enum: ["3-5", "5-7", "7-9"] },
            topic: { type: Type.STRING, enum: ["Science", "Nature", "Space", "Animals", "Human Body", "History", "How Things Work", "Other"] },
            takeaways: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Exactly 3 short bullet points summarizing the answer."
            },
            videos: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  channelName: { type: Type.STRING },
                  youtubeQuery: { type: Type.STRING, description: "Search query to find this video on YouTube" }
                }
              }
            },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                  timeEstimate: { type: Type.STRING, enum: ["5-10 mins", "15-30 mins", "30+ mins"] },
                  ageRange: { type: Type.STRING }
                }
              }
            },
            relatedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 related simple questions kids might ask."
            }
          },
          required: ["questionText", "explanation", "ageRange", "topic", "takeaways", "videos", "activities", "relatedQuestions"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        ...data,
        id: generateSlug(data.questionText)
      };
    }
    return null;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return null;
  }
};