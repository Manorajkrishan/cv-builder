// Template-based CV generator (fallback when no AI is available)
// This creates a structured CV using templates without AI

function generateCV(prompt, options = {}) {
  // Extract information from prompt
  const nameMatch = prompt.match(/Name:\s*([^\n]+)/);
  const emailMatch = prompt.match(/Email:\s*([^\n]+)/);
  const phoneMatch = prompt.match(/Phone:\s*([^\n]+)/);
  const jobTitleMatch = prompt.match(/Position:\s*([^\n]+)/);
  const educationMatch = prompt.match(/EDUCATION:\s*([\s\S]*?)(?=WORK EXPERIENCE|SKILLS|TARGET JOB|$)/);
  const experienceMatch = prompt.match(/WORK EXPERIENCE:\s*([\s\S]*?)(?=SKILLS|TARGET JOB|$)/);
  const skillsMatch = prompt.match(/SKILLS:\s*([^\n]+)/);
  const jobDescMatch = prompt.match(/Job Description:\s*([\s\S]*?)(?=INSTRUCTIONS|$)/);
  const templateMatch = prompt.match(/"([^"]+)"\s+template style/);

  const name = nameMatch ? nameMatch[1].trim() : 'Your Name';
  const email = emailMatch ? emailMatch[1].trim() : '';
  const phone = phoneMatch ? phoneMatch[1].trim() : '';
  const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : '';
  const education = educationMatch ? educationMatch[1].trim() : 'Not provided';
  const experience = experienceMatch ? experienceMatch[1].trim() : 'Not provided';
  const skills = skillsMatch ? skillsMatch[1].trim() : '';
  const jobDescription = jobDescMatch ? jobDescMatch[1].trim() : '';
  const template = templateMatch ? templateMatch[1] : 'classic';

  // Generate CV HTML
  const cvHTML = generateCVHTML(name, email, phone, education, experience, skills, template);
  
  // Generate Cover Letter HTML
  const coverLetterHTML = generateCoverLetterHTML(name, email, phone, jobTitle, jobDescription, experience);

  return `<!-- CV_START -->
${cvHTML}
<!-- CV_END -->

<!-- COVER_LETTER_START -->
${coverLetterHTML}
<!-- COVER_LETTER_END -->`;
}

function generateCVHTML(name, email, phone, education, experience, skills, template) {
  // ATS-Optimized template with maximum compatibility
  if (template === 'ats-optimized') {
    return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6;">
  <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #000000;">${name}</h1>
  <div style="margin-bottom: 20px; font-size: 12px; color: #333333;">
    ${email ? `Email: ${email}` : ''}${email && phone ? ' | ' : ''}${phone ? `Phone: ${phone}` : ''}
  </div>
  
  <h2 style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #000000; border-bottom: 1px solid #cccccc; padding-bottom: 5px;">PROFESSIONAL SUMMARY</h2>
  <p style="margin-bottom: 15px; font-size: 12px;">Experienced professional with a strong background in relevant skills and proven track record of achievements.</p>
  
  <h2 style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #000000; border-bottom: 1px solid #cccccc; padding-bottom: 5px;">WORK EXPERIENCE</h2>
  <div style="margin-bottom: 20px; font-size: 12px; white-space: pre-wrap;">${experience || 'Not provided'}</div>
  
  <h2 style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #000000; border-bottom: 1px solid #cccccc; padding-bottom: 5px;">EDUCATION</h2>
  <div style="margin-bottom: 20px; font-size: 12px; white-space: pre-wrap;">${education || 'Not provided'}</div>
  
  <h2 style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #000000; border-bottom: 1px solid #cccccc; padding-bottom: 5px;">SKILLS</h2>
  <div style="margin-bottom: 20px; font-size: 12px;">${skills || 'Not provided'}</div>
</div>`;
  }
  
  // Other templates with ATS-friendly structure
  return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; ${template === 'modern' ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px;' : ''}">
  <div style="${template === 'modern' ? 'background: white; padding: 30px; border-radius: 10px;' : ''}">
    <h1 style="color: ${template === 'modern' ? '#667eea' : template === 'creative' ? '#ff6b6b' : '#333'}; margin-bottom: 10px; ${template === 'creative' ? 'text-transform: uppercase; letter-spacing: 2px;' : ''}">${name}</h1>
    <div style="margin-bottom: 20px; color: #666; font-size: 14px;">
      ${email ? `<span>${email}</span>` : ''}
      ${phone ? `<span style="margin-left: 15px;">${phone}</span>` : ''}
    </div>
    
    <hr style="border: 2px solid ${template === 'modern' ? '#667eea' : '#333'}; margin: 20px 0;">
    
    <h2 style="color: ${template === 'modern' ? '#667eea' : '#333'}; border-bottom: 2px solid #ddd; padding-bottom: 5px; font-size: 18px;">EDUCATION</h2>
    <div style="white-space: pre-wrap; margin-bottom: 20px; font-size: 12px;">${education || 'Not provided'}</div>
    
    <h2 style="color: ${template === 'modern' ? '#667eea' : '#333'}; border-bottom: 2px solid #ddd; padding-bottom: 5px; font-size: 18px;">WORK EXPERIENCE</h2>
    <div style="white-space: pre-wrap; margin-bottom: 20px; font-size: 12px;">${experience || 'Not provided'}</div>
    
    <h2 style="color: ${template === 'modern' ? '#667eea' : '#333'}; border-bottom: 2px solid #ddd; padding-bottom: 5px; font-size: 18px;">SKILLS</h2>
    <div style="margin-bottom: 20px; font-size: 12px;">${skills || 'Not provided'}</div>
  </div>
</div>`;
}

function generateCoverLetterHTML(name, email, phone, jobTitle, jobDescription, experience) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <div style="margin-bottom: 30px;">
    <div style="text-align: right; margin-bottom: 20px;">
      <div>${name}</div>
      ${email ? `<div>${email}</div>` : ''}
      ${phone ? `<div>${phone}</div>` : ''}
      <div style="margin-top: 10px;">${date}</div>
    </div>
    
    <div style="margin-bottom: 20px;">
      <strong>Re: ${jobTitle || 'Job Application'}</strong>
    </div>
  </div>
  
  <div style="line-height: 1.8;">
    <p>Dear Hiring Manager,</p>
    
    <p>I am writing to express my interest in the ${jobTitle || 'position'} role. With my background and experience, I am confident that I would be a valuable addition to your team.</p>
    
    ${experience ? `<p>My relevant experience includes:</p><ul><li>${experience.split('\n').filter(e => e.trim()).slice(0, 3).join('</li><li>')}</li></ul>` : ''}
    
    ${jobDescription ? `<p>I am particularly excited about this opportunity because ${jobDescription.substring(0, 200)}...</p>` : ''}
    
    <p>I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for considering my application.</p>
    
    <p>Sincerely,<br>${name}</p>
  </div>
</div>`;
}

module.exports = {
  generateCV,
  name: 'Template Generator',
};

