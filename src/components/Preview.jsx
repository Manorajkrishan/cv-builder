function Preview({ formData }) {
  return (
    <div className="mt-5 p-4 border rounded bg-white">
      <h4 className="text-success">Live Preview</h4>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone:</strong> {formData.phone}</p>

      <p><strong>Education:</strong></p>
      <ul>
        {formData.education.length === 0 ? (
          <li><em>No education added</em></li>
        ) : (
          formData.education.map((edu, i) => <li key={i}>{edu}</li>)
        )}
      </ul>

      <p><strong>Experience:</strong></p>
      <ul>
        {formData.experience.length === 0 ? (
          <li><em>No experience added</em></li>
        ) : (
          formData.experience.map((exp, i) => <li key={i}>{exp}</li>)
        )}
      </ul>

      <p><strong>Skills:</strong> {formData.skills}</p>
      <p><strong>Job Title:</strong> {formData.jobTitle}</p>
      <p><strong>Job Description:</strong> {formData.jobDescription}</p>
    </div>
  );
}

export default Preview;
