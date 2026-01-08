// ATS-Friendly CV Validator
// Checks if generated CV meets ATS standards

function validateATSCompliance(cvHTML) {
  const issues = [];
  const warnings = [];
  
  // Check for common ATS-unfriendly elements
  const checks = {
    hasTables: /<table[^>]*>/i.test(cvHTML),
    hasImages: /<img[^>]*>/i.test(cvHTML),
    hasComplexCSS: /style="[^"]*(?:position|float|absolute|relative|transform|grid|flex)[^"]*"/i.test(cvHTML),
    hasColumns: /column|col-/i.test(cvHTML),
    hasSpecialChars: /[●○◆◇■□▲△]/g.test(cvHTML),
    hasHeadersFooters: /<header|<footer/i.test(cvHTML),
    hasStandardSections: /(PROFESSIONAL SUMMARY|WORK EXPERIENCE|EDUCATION|SKILLS)/i.test(cvHTML),
    hasBulletPoints: /[•·-]\s/.test(cvHTML),
  };
  
  // Critical issues
  if (checks.hasTables) {
    issues.push("Contains tables - ATS systems struggle with table layouts");
  }
  
  if (checks.hasImages) {
    issues.push("Contains images - ATS cannot read image content");
  }
  
  if (checks.hasComplexCSS) {
    warnings.push("Contains complex CSS - May cause parsing issues");
  }
  
  if (!checks.hasStandardSections) {
    warnings.push("Missing standard section headers - May affect ATS parsing");
  }
  
  // Positive indicators
  const positives = [];
  if (checks.hasBulletPoints) {
    positives.push("Uses bullet points - Good for ATS");
  }
  
  const score = calculateATSScore(checks, issues, warnings);
  
  return {
    score,
    isCompliant: issues.length === 0,
    issues,
    warnings,
    positives,
    checks,
  };
}

function calculateATSScore(checks, issues, warnings) {
  let score = 100;
  
  // Deduct for critical issues
  score -= issues.length * 25;
  
  // Deduct for warnings
  score -= warnings.length * 5;
  
  // Bonus for good practices
  if (checks.hasBulletPoints) score += 5;
  if (checks.hasStandardSections) score += 10;
  
  return Math.max(0, Math.min(100, score));
}

function sanitizeForATS(html) {
  // Remove ATS-unfriendly elements
  let sanitized = html;
  
  // Remove images
  sanitized = sanitized.replace(/<img[^>]*>/gi, '');
  
  // Simplify complex CSS
  sanitized = sanitized.replace(/style="[^"]*(?:position|float|absolute|relative|transform)[^"]*"/gi, '');
  
  // Convert special characters to standard bullets
  sanitized = sanitized.replace(/[●○◆◇■□▲△]/g, '•');
  
  // Remove tables (convert to divs if needed)
  sanitized = sanitized.replace(/<table[^>]*>/gi, '<div>');
  sanitized = sanitized.replace(/<\/table>/gi, '</div>');
  sanitized = sanitized.replace(/<tr[^>]*>/gi, '<div>');
  sanitized = sanitized.replace(/<\/tr>/gi, '</div>');
  sanitized = sanitized.replace(/<td[^>]*>/gi, '<span>');
  sanitized = sanitized.replace(/<\/td>/gi, '</span>');
  
  return sanitized;
}

module.exports = {
  validateATSCompliance,
  sanitizeForATS,
  calculateATSScore,
};

