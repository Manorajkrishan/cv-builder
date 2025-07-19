const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your key in .env
});

app.post('/generate', async (req, res) => {
  const {
    name,
    email,
    phone,
    education,
    experience,
    skills,
    jobTitle,
    jobDescription,
    template = "classic",  // Default template
  } = req.body;

  const prompt = `
Generate a professional CV and cover letter in the style of the "${template}" template for the following user:
Name: ${name}
Email: ${email}
Phone: ${phone}
Education: ${education}
Experience: ${experience}
Skills: ${skills}
Job Title: ${jobTitle}
Job Description: ${jobDescription}

Return both the CV and cover letter in clear sections.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const output = response.choices[0].message.content;
    res.json({ result: output });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
