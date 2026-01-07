# Server Setup

## Environment Variables

Create a `.env` file in this directory with the following content:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

### Getting Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key and paste it in your `.env` file

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
  - Request body: JSON with form data (name, email, phone, education, experience, skills, jobTitle, jobDescription, template)
  - Response: JSON with `result` field containing the generated content

### Troubleshooting

- **Error: OPENAI_API_KEY not found**: Make sure your `.env` file exists and contains the API key
- **Port already in use**: Change the PORT in `.env` or kill the process using port 5000
- **API errors**: Check your OpenAI API key is valid and you have credits available

