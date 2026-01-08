// Ollama Provider for local AI models
// Install Ollama from: https://ollama.ai
// Example: ollama pull llama2, ollama pull mistral, ollama pull codellama

const axios = require('axios');

async function generateCV(prompt, options = {}) {
  try {
    const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const model = options.model || process.env.OLLAMA_MODEL || 'llama2';
    
    const response = await axios.post(`${baseURL}/api/generate`, {
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: options.temperature || 0.7,
        num_predict: options.maxTokens || 3000,
      },
    }, {
      timeout: 120000, // 2 minutes timeout for local generation
    });

    return response.data.response || '';
  } catch (error) {
    console.error('Ollama Error:', error.message);
    
    // Check if Ollama is running
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new Error(
        'Ollama is not running. Please:\n' +
        '1. Install Ollama from https://ollama.ai\n' +
        '2. Run: ollama pull llama2\n' +
        '3. Make sure Ollama service is running on port 11434'
      );
    }
    
    if (error.response?.status === 404) {
      throw new Error(
        `Model "${model}" not found. Please run: ollama pull ${model}`
      );
    }
    
    throw new Error(`Ollama generation failed: ${error.message}`);
  }
}

module.exports = {
  generateCV,
  name: 'Ollama (Local AI)',
};

