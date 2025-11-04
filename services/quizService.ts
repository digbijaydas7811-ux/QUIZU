import { GoogleGenAI } from "@google/genai";
import { Question, Source, Difficulty, Settings } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const QUESTION_COUNT = 12;

class QuizService {
  public static async fetchQuestions(
    category: string,
    difficulty: Difficulty,
    settings: Settings
  ): Promise<Question[]> {
    console.log(`Fetching ${QUESTION_COUNT} questions for category: ${category}, difficulty: ${difficulty}, settings:`, settings);

    const prompt = `Generate exactly ${QUESTION_COUNT} quiz questions based on the following criteria:
- Topic: ${category}
- Difficulty: ${difficulty}
- Target Audience: A student in ${settings.class}
- Language: ${settings.language} (e.g., English, or Hinglish - a mix of Hindi and English)

For each question:
- The question text MUST be short and concise, easy to read quickly.
- Provide four possible options.
- Provide the index of the correct answer (0-3).
- Provide a brief, simple explanation for the correct answer.

VERY IMPORTANT: Respond ONLY with a valid JSON array of question objects. Do not include any other text, explanations, or markdown formatting outside of the JSON array. The format must be:
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "answerIndex": 0,
    "difficulty": "${difficulty}",
    "explanation": "..."
  }
]`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const jsonText = response.text.trim().replace(/^```json|```$/g, '');
      const questionsData: Omit<Question, 'id' | 'category' | 'sources'>[] = JSON.parse(jsonText);

      if (!Array.isArray(questionsData) || questionsData.length === 0) {
        throw new Error('Invalid or empty data format received from API.');
      }
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources: Source[] = [];
      if (groundingChunks) {
        for (const chunk of groundingChunks) {
          if (chunk.web && chunk.web.uri && chunk.web.title) {
            sources.push({
              uri: chunk.web.uri,
              title: chunk.web.title,
            });
          }
        }
      }

      const questions: Question[] = questionsData.slice(0, QUESTION_COUNT).map((q, index) => ({
        ...q,
        id: `${category.replace(/\s/g, '')}-${index}-${Date.now()}`,
        category: category,
        difficulty: difficulty, // Ensure difficulty from prompt is set
        sources: sources.length > 0 ? sources : undefined,
      }));

      return questions;

    } catch (error) {
      console.error('Error fetching questions from Gemini API:', error);
      let errorMessage = 'Failed to generate quiz questions. The model may have returned an unexpected format.';
      if (error instanceof Error && error.message.includes('JSON')) {
        errorMessage = 'Failed to parse quiz data. The AI response was not valid JSON.';
      } else if (error instanceof Error) {
        errorMessage = `An error occurred: ${error.message}`;
      }
      throw new Error(errorMessage);
    }
  }
  
  private static _getUserLocation(): Promise<GeolocationCoordinates | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => {
          console.warn("Could not get user location:", error.message);
          resolve(null);
        }
      );
    });
  }

  private static async _reverseGeocode(coords: GeolocationCoordinates): Promise<{ state: string; country: string } | null> {
    const prompt = `Based on the latitude ${coords.latitude} and longitude ${coords.longitude}, identify the state/province and country. Respond ONLY with a valid JSON object in the format: {"state": "State or Province Name", "country": "Country Name"}.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const jsonText = response.text.trim().replace(/^```json|```$/g, '');
      const locationData = JSON.parse(jsonText);

      if (locationData.state && locationData.country) {
        return locationData;
      }
      return null;
    } catch (error) {
      console.error('Error during reverse geocoding with Gemini:', error);
      return null;
    }
  }

  public static async getCategories(): Promise<string[]> {
    const baseCategories = [
      'Recent Scientific Discoveries',
      'Latest Technology Trends',
      'World News (Last 24 Hours)',
      'Pop Culture 2024',
      'Modern World History',
      'Space Exploration Updates',
    ];

    try {
      const coords = await this._getUserLocation();
      if (coords) {
        const location = await this._reverseGeocode(coords);
        if (location && location.state && location.country) {
          const locationCategory = `About ${location.state}, ${location.country}`;
          return [locationCategory, ...baseCategories];
        }
      }
    } catch (error) {
        console.error("Could not add location-based category:", error);
    }
    
    return baseCategories;
  }
}

export default QuizService;