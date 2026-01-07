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

  const educationText = Array.isArray(education) ? education.join("\n") : education;
  const experienceText = Array.isArray(experience) ? experience.join("\n") : experience;

  const prompt = `You are a professional CV and cover letter writer. Generate a highly tailored, professional CV and cover letter for the following candidate applying to the specified job.

CANDIDATE INFORMATION:
Name: ${name || "Not provided"}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
${req.body.address ? `Address: ${req.body.address}` : ""}
${req.body.linkedin ? `LinkedIn: ${req.body.linkedin}` : ""}
${req.body.portfolio ? `Portfolio: ${req.body.portfolio}` : ""}

EDUCATION:
${educationText || "Not provided"}

WORK EXPERIENCE:
${experienceText || "Not provided"}

SKILLS:
${skills || "Not provided"}

TARGET JOB:
Position: ${jobTitle || "Not specified"}
Job Description:
${jobDescription || "Not provided"}

INSTRUCTIONS:
1. Create a professional CV that highlights the candidate's qualifications and aligns their experience with the job requirements.
2. Write a compelling cover letter that directly addresses the job description and explains why the candidate is a perfect fit.
3. Use the "${template}" template style: 
   - Classic: Traditional, clean, professional format
   - Modern: Contemporary design with better visual hierarchy
   - Creative: Innovative layout for creative fields
4. Ensure the CV is ATS-friendly (Applicant Tracking System compatible).
5. Use action verbs and quantify achievements where possible.
6. Format the output as HTML with proper structure and styling suitable for PDF generation.

Return the response in the following format:
<!-- CV_START -->
[Well-formatted HTML CV content]
<!-- CV_END -->

<!-- COVER_LETTER_START -->
[Well-formatted HTML cover letter content]
<!-- COVER_LETTER_END -->`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
      temperature: 0.7,
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
