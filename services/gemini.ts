import { GoogleGenAI, Type } from "@google/genai";
import { SensitivityData, PlayStyle } from "../types";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSensitivitySettings = async (
  deviceModel: string,
  playStyle: PlayStyle
): Promise<SensitivityData> => {
  try {
    const prompt = `
      Act as "TO COBRAS", a legendary Free Fire Esports Coach known for aggressive and precise settings.
      Generate the optimal sensitivity settings for a player using the device: "${deviceModel}".
      The player's playstyle is: "${playStyle}".
      
      Consider the device's touch sampling rate, screen size (PPI), and typical FPS limits.
      Provide values between 0 and 100.
      
      For 'General' sensitivity, prefer higher values (above 90) for modern devices to enable quick 360s.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            general: { type: Type.NUMBER, description: "General sensitivity (0-100)" },
            redDot: { type: Type.NUMBER, description: "Red Dot sensitivity (0-100)" },
            scope2x: { type: Type.NUMBER, description: "2x Scope sensitivity (0-100)" },
            scope4x: { type: Type.NUMBER, description: "4x Scope sensitivity (0-100)" },
            sniperScope: { type: Type.NUMBER, description: "Sniper Scope sensitivity (0-100)" },
            freeLook: { type: Type.NUMBER, description: "Free Look sensitivity (0-100)" },
          },
          required: ["general", "redDot", "scope2x", "scope4x", "sniperScope", "freeLook"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SensitivityData;
    }
    
    throw new Error("No data returned from AI");
  } catch (error) {
    console.error("Failed to generate sensitivity:", error);
    // Fallback in case of API error for demo purposes
    return {
      general: 98,
      redDot: 95,
      scope2x: 88,
      scope4x: 78,
      sniperScope: 65,
      freeLook: 75
    };
  }
};