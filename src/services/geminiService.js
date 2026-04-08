class GeminiService {
  async sendMessage(text) {
    return { success: true, message: `Respuesta a: ${text}` };
  }
}
export default new GeminiService();