# Server Setup

## Environment Variables

Create a `.env` file in this directory with the following content:

```env
# AI Provider Configuration
AI_PROVIDER=openai  # Options: openai, ollama, template

# OpenAI Configuration (if using OpenAI)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo  # Optional: gpt-4, gpt-4-turbo, etc.

# Ollama Configuration (if using Ollama - local AI)
OLLAMA_BASE_URL=http://localhost:11434  # Default Ollama URL
OLLAMA_MODEL=llama2  # Options: llama2, mistral, codellama, etc.

# Server Configuration
PORT=5000
```

### Getting Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key and paste it in your `.env` file

### Using Ollama (Local AI)

Ollama allows you to run AI models locally on your machine - no API keys needed!

1. **Install Ollama:**
   - Visit https://ollama.ai
   - Download and install for your operating system

2. **Download a Model:**
   ```bash
   ollama pull llama2
   # Or try other models:
   ollama pull mistral
   ollama pull codellama
   ```

3. **Configure .env:**
   ```env
   AI_PROVIDER=ollama
   OLLAMA_MODEL=llama2
   ```

4. **Start Ollama:**
   - Ollama runs automatically as a service after installation
   - It will be available at `http://localhost:11434`

### Using Template Generator (No AI)

If you want to generate CVs without any AI (using templates only):

```env
AI_PROVIDER=template
```

This mode creates structured CVs using templates but doesn't use AI for personalization.

### Running the Server

```bash
# Install dependencies (if not already done)
npm install

# Start the server
npm start

# Or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000` by default.

### API Endpoints

- `POST /generate` - Generates a CV and cover letter
  - Request body: JSON with form data (name, email, phone, education, experience, skills, jobTitle, jobDescription, template, aiProvider)
  - Response: JSON with `result` field containing the generated content and `provider` field showing which AI was used

- `GET /ai-providers` - Returns available AI providers

### Switching AI Providers

You can switch AI providers in three ways:

1. **Environment Variable** (recommended for production):
   Set `AI_PROVIDER` in your `.env` file

2. **Request Parameter**:
   Include `aiProvider` in the request body when calling `/generate`

3. **Frontend UI**:
   Use the AI Provider selector in the web interface

### Troubleshooting

- **Error: OPENAI_API_KEY not found**: Make sure your `.env` file exists and contains the API key
- **Ollama connection refused**: Make sure Ollama is installed and running. Check with `ollama list`
- **Port already in use**: Change the PORT in `.env` or kill the process using port 5000
- **API errors**: Check your OpenAI API key is valid and you have credits available (for OpenAI)
- **Ollama model not found**: Run `ollama pull <model-name>` to download the model

### Performance Tips

- **OpenAI**: Fastest, requires internet and API key
- **Ollama**: Runs locally, no internet needed, but slower and requires more RAM
- **Template**: Instant, but less personalized
