const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getAIProvider } = require('./ai-providers/aiFactory');
const { validateATSCompliance, sanitizeForATS } = require('./utils/atsValidator');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
    aiProvider = null,  // Allow client to specify AI provider
  } = req.body;

  // Format education data
  const formatEducation = (edu) => {
    if (typeof edu === "string") return edu;
    let text = `${edu.degree || "Degree"}`;
    if (edu.institution) text += ` from ${edu.institution}`;
    if (edu.field) text += ` in ${edu.field}`;
    if (edu.location) text += ` (${edu.location})`;
    if (edu.startDate || edu.endDate) {
      text += ` - ${edu.startDate || ""} to ${edu.endDate || "Present"}`;
    }
    if (edu.gpa) text += ` | GPA: ${edu.gpa}`;
    if (edu.honors) text += ` | Honors: ${edu.honors}`;
    if (edu.description) text += ` | ${edu.description}`;
    return text;
  };

  // Format experience data
  const formatExperience = (exp) => {
    if (typeof exp === "string") return exp;
    let text = `${exp.jobTitle || "Position"}`;
    if (exp.company) text += ` at ${exp.company}`;
    if (exp.location) text += ` (${exp.location})`;
    if (exp.startDate || exp.endDate) {
      text += ` - ${exp.startDate || ""} to ${exp.endDate || "Present"}`;
    }
    if (exp.description) text += `\n${exp.description}`;
    if (exp.achievements) {
      const achievements = exp.achievements.split("\n").filter(a => a.trim());
      if (achievements.length > 0) {
        text += `\nKey Achievements:\n${achievements.map(a => `- ${a.trim()}`).join("\n")}`;
      }
    }
    return text;
  };

  const educationText = Array.isArray(education) 
    ? education.map(formatEducation).join("\n\n") 
    : formatEducation(education || "");
  
  const experienceText = Array.isArray(experience) 
    ? experience.map(formatExperience).join("\n\n") 
    : formatExperience(experience || "");

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

CRITICAL INSTRUCTIONS FOR ATS-FRIENDLY & INTERNATIONALLY VALID CV:

1. ATS-FRIENDLY FORMATTING (MANDATORY):
   - Use simple, clean HTML with standard tags (h1, h2, h3, p, ul, li, strong)
   - NO complex CSS, NO tables for layout, NO columns, NO floating elements
   - Use standard fonts only: Arial, Times New Roman, Calibri, or Helvetica
   - NO images, icons, or graphics in the CV content
   - NO headers/footers that could break parsing
   - Use consistent date format: MM/YYYY or Month YYYY (e.g., "January 2020" or "01/2020")
   - Use standard section headers: "PROFESSIONAL SUMMARY", "WORK EXPERIENCE", "EDUCATION", "SKILLS"
   - Use bullet points (•) for lists, not special characters
   - Keep formatting consistent and simple

2. INTERNATIONAL VALIDITY:
   - Use internationally recognized date formats: "Month YYYY" format (e.g., "January 2020" or "March 2021")
     DO NOT use: DD/MM/YYYY, MM/DD/YYYY, or DD-MM-YYYY formats
   - Include country code for phone numbers if applicable (format: +1 555 123 4567 or +44 20 1234 5678)
   - Use standard section names that work globally: "WORK EXPERIENCE", "EDUCATION", "SKILLS", "PROFESSIONAL SUMMARY"
   - Avoid region-specific terms, currencies, or formats
   - Use clear, professional English language that translates well
   - Include relevant international certifications or qualifications
   - Format names consistently (First Name Last Name)
   - Use standard address format when needed (Street, City, Country or City, Country)

3. CONTENT REQUIREMENTS:
   - Extract and include ALL relevant keywords from the job description
   - Use industry-standard terminology
   - Quantify achievements with numbers and metrics
   - Use strong action verbs (Managed, Developed, Implemented, Led, etc.)
   - Align skills with job requirements explicitly
   - Keep descriptions concise but informative (2-4 bullet points per role)

4. TEMPLATE STYLE "${template}":
   - ATS-Optimized: Maximum ATS compatibility, simple formatting, standard sections
   - Classic: Traditional format, slightly more styling but still ATS-friendly
   - Modern: Contemporary with better visual hierarchy, ATS-friendly structure
   - Creative: For creative fields, but maintain ATS compatibility

5. CV STRUCTURE (in this order):
   - Contact Information (Name, Email, Phone, Location, LinkedIn/Portfolio if provided)
   - Professional Summary (2-3 sentences highlighting key qualifications)
   - Work Experience (reverse chronological order)
   - Education (reverse chronological order)
   - Skills (categorized if applicable: Technical Skills, Soft Skills, etc.)

6. HTML FORMATTING:
   - Use semantic HTML structure
   - Apply minimal inline styling (font-family, font-size, margin, padding)
   - Ensure proper heading hierarchy (h1 for name, h2 for sections, h3 for subsections)
   - Use white space effectively for readability
   - Ensure all text is selectable and searchable

7. COVER LETTER:
   - Address the hiring manager professionally
   - Reference specific job title and company
   - Highlight 2-3 most relevant qualifications
   - Show knowledge of the company/role
   - Keep to one page equivalent
   - Professional closing

Return the response in the following format:
<!-- CV_START -->
[ATS-friendly, internationally valid HTML CV content]
<!-- CV_END -->

<!-- COVER_LETTER_START -->
[Professional HTML cover letter content]
<!-- COVER_LETTER_END -->`;

  try {
    // Get the appropriate AI provider
    const aiProviderInstance = getAIProvider(aiProvider);
    console.log(`Using AI Provider: ${aiProviderInstance.name}`);
    
    // Generate CV using the selected provider
    let output = await aiProviderInstance.generateCV(prompt, {
      model: req.body.model || null,
      maxTokens: req.body.maxTokens || null,
      temperature: req.body.temperature || null,
    });
    
    // Extract CV HTML for validation
    const cvMatch = output.match(/<!-- CV_START -->([\s\S]*?)<!-- CV_END -->/);
    
    // Validate and sanitize for ATS if template is ATS-optimized
    if (template === 'ats-optimized' && cvMatch) {
      const cvHTML = cvMatch[1];
      const validation = validateATSCompliance(cvHTML);
      
      // Sanitize if issues found
      if (!validation.isCompliant) {
        const sanitizedCV = sanitizeForATS(cvHTML);
        output = output.replace(/<!-- CV_START -->[\s\S]*?<!-- CV_END -->/, 
          `<!-- CV_START -->\n${sanitizedCV}\n<!-- CV_END -->`);
      }
      
      // Log validation results
      console.log('ATS Validation Score:', validation.score);
      if (validation.issues.length > 0) {
        console.log('ATS Issues:', validation.issues);
      }
    }

    res.json({ 
      result: output,
      provider: aiProviderInstance.name,
      atsValidated: template === 'ats-optimized',
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate content',
      details: error.message,
    });
  }
});

// Endpoint to get available AI providers
app.get('/ai-providers', (req, res) => {
  res.json({
    providers: [
      { id: 'openai', name: 'OpenAI GPT', requires: ['OPENAI_API_KEY'] },
      { id: 'ollama', name: 'Ollama (Local AI)', requires: ['Ollama installed locally'] },
      { id: 'template', name: 'Template Generator (No AI)', requires: [] },
    ],
    current: process.env.AI_PROVIDER || 'openai',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
