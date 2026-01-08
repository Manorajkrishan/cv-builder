// Component to display ATS-friendly information

function ATSInfo({ template }) {
  if (template !== 'ats-optimized') {
    return null;
  }

  return (
    <div className="alert alert-info mt-3">
      <h5 className="alert-heading">✅ ATS-Optimized & Internationally Valid</h5>
      <p className="mb-2">
        <strong>This CV is optimized for:</strong>
      </p>
      <ul className="mb-2 small">
        <li>✅ <strong>Applicant Tracking Systems (ATS)</strong> - Maximum parsing compatibility</li>
        <li>✅ <strong>International Standards</strong> - Works worldwide</li>
        <li>✅ <strong>Simple Formatting</strong> - Clean, standard HTML structure</li>
        <li>✅ <strong>Standard Sections</strong> - Industry-recognized headings</li>
        <li>✅ <strong>Keyword Optimization</strong> - Includes relevant keywords from job description</li>
        <li>✅ <strong>No Complex Elements</strong> - No tables, images, or complex CSS</li>
      </ul>
      <p className="mb-0 small">
        <strong>Compatible with:</strong> LinkedIn Easy Apply, Indeed, ZipRecruiter, 
        Workday, Taleo, Greenhouse, and most major ATS systems worldwide.
      </p>
    </div>
  );
}

export default ATSInfo;

