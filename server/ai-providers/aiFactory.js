const openaiProvider = require('./openaiProvider');
const ollamaProvider = require('./ollamaProvider');
const templateProvider = require('./templateProvider');

const AI_PROVIDERS = {
  openai: openaiProvider,
  ollama: ollamaProvider,
  template: templateProvider,
};

function getAIProvider(providerName = null) {
  const provider = providerName || process.env.AI_PROVIDER || 'openai';
  
  if (!AI_PROVIDERS[provider]) {
    console.warn(`Provider "${provider}" not found. Falling back to "openai".`);
    return AI_PROVIDERS.openai;
  }
  
  return AI_PROVIDERS[provider];
}

module.exports = {
  getAIProvider,
  AI_PROVIDERS,
};

