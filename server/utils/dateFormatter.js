// International date formatter
// Converts dates to internationally recognized formats

function formatDateForCV(dateString, format = 'international') {
  if (!dateString || dateString === 'Present') return 'Present';
  
  // Try to parse different date formats
  let date;
  
  // Try ISO format (YYYY-MM)
  if (/^\d{4}-\d{2}$/.test(dateString)) {
    date = new Date(dateString + '-01');
  }
  // Try full ISO
  else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    date = new Date(dateString);
  }
  // Try MM/YYYY
  else if (/^\d{2}\/\d{4}$/.test(dateString)) {
    const [month, year] = dateString.split('/');
    date = new Date(year, month - 1);
  }
  // Try YYYY-MM-DD
  else {
    date = new Date(dateString);
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return as-is if can't parse
  }
  
  // Format based on international standard (Month YYYY)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${month} ${year}`;
}

function formatPhoneInternational(phone) {
  if (!phone) return phone;
  
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, assume it needs country code
  // This is a basic implementation - you might want to detect country
  if (!cleaned.startsWith('+')) {
    // Add +1 for US numbers if they're 10 digits
    if (cleaned.length === 10) {
      cleaned = '+1' + cleaned;
    }
  }
  
  // Format: +1 555 123 4567
  if (cleaned.startsWith('+')) {
    const countryCode = cleaned.match(/^\+\d{1,3}/)?.[0];
    const rest = cleaned.slice(countryCode.length).replace(/\D/g, '');
    
    if (countryCode === '+1' && rest.length === 10) {
      return `+1 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`;
    }
    // Format other international numbers
    return cleaned;
  }
  
  return phone;
}

module.exports = {
  formatDateForCV,
  formatPhoneInternational,
};

