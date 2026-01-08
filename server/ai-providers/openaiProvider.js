const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateCV(prompt, options = {}) {
  try {
    const model = options.model || process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    const maxTokens = options.maxTokens || 3000;
    const temperature = options.temperature || 0.7;

    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: temperature,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error(`OpenAI generation failed: ${error.message}`);
  }
}

module.exports = {
  generateCV,
  name: 'OpenAI',
};

