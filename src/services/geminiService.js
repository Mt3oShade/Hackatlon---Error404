import OpenAI from "openai";

// Leemos directamente de las variables de entorno de Vite
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

class GeminiService {
  constructor() {
    console.log("🔧 Inicializando EcoRiobamba GPT...");
    
    // Verificación de seguridad para el Integrador
    if (!API_KEY || API_KEY.includes("TU_API_KEY")) {
      console.error("❌ ERROR: VITE_GROQ_API_KEY no encontrada en el archivo .env");
    }

    // Inicializamos la SDK. 
    // Usamos un 'fallback' para que la app cargue aunque la key esté mal.
    this.groq = new OpenAI({
      apiKey: API_KEY || "key_no_definida", 
      baseURL: 'https://api.groq.com/openai/v1',
      dangerouslyAllowBrowser: true
    });
  }

  getSystemPrompt() {
    return `Eres "EcoRiobamba GPT", un asistente experto en gestión de residuos para Riobamba, Ecuador.
    REGLAS:
    1. Tono AMABLE y MOTIVADOR 🌱. Usa emojis.
    2. RESPUESTAS CORTAS (Max 2-3 oraciones).
    3. Responde SIEMPRE en ESPAÑOL.
    
    DATOS LOCALES:
    - Saboya: Lun, Mie, Vie (07:00-12:00)
    - Veloz (Centro): Mar, Jue, Sab (08:00-13:00)
    - Terminal: Mar, Jue, Sab (09:00-14:00)
    - Pilas: Punto Verde Parque Maldonado.`;
  }

  async sendMessage(userMessage) {
    if (!API_KEY || API_KEY === "key_no_definida") {
      return {
        success: false,
        message: "🌱 Configuración incompleta. Por favor, revisa el archivo .env del proyecto.",
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await this.groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: this.getSystemPrompt() },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 300
      });

      return {
        success: true,
        message: response.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("❌ Error API Groq:", error.message);
      return {
        success: false,
        message: "🌱 Lo siento, tengo problemas de conexión. Inténtalo en un momento.",
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Exportamos una única instancia
export default new GeminiService();