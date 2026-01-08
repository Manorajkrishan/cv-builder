function Preview({ formData }) {
  const isComplete = formData.name && formData.email && formData.phone && 
                     formData.jobTitle && formData.jobDescription &&
                     (formData.education.length > 0 || formData.experience.length > 0);

  return (
    <div className="mt-4 card p-4">
      <h4 className="text-success mb-3">👁️ Live Preview</h4>
      
      {!isComplete && (
        <div className="alert alert-warning">
          <small>⚠️ Fill in all required fields to see a complete preview</small>
        </div>
      )}

      <div className="preview-content" style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif"
      }}>
        <div className="mb-3" style={{ borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
          <h3 style={{ margin: 0, color: "#007bff" }}>{formData.name || "Your Name"}</h3>
          <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "5px" }}>
            {formData.email && <span>📧 {formData.email}</span>}
            {formData.phone && <span style={{ marginLeft: "15px" }}>📱 {formData.phone}</span>}
            {formData.address && <span style={{ marginLeft: "15px" }}>📍 {formData.address}</span>}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "5px" }}>
            {formData.linkedin && <a href={formData.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {formData.portfolio && (
              <a href={formData.portfolio} target="_blank" rel="noreferrer" style={{ marginLeft: "10px" }}>
                Portfolio
              </a>
            )}
          </div>
        </div>

        {formData.jobTitle && (
          <div className="mb-3">
            <h5 style={{ color: "#28a745" }}>Target Position: {formData.jobTitle}</h5>
          </div>
        )}

        {formData.education.length > 0 && (
          <div className="mb-3">
            <h5 style={{ color: "#17a2b8", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
              🎓 Education
            </h5>
            {formData.education.map((edu, i) => {
              const formattedEdu = typeof edu === "string" ? { degree: edu } : edu;
              return (
                <div key={i} style={{ marginBottom: "12px", paddingLeft: "10px" }}>
                  <strong style={{ color: "#17a2b8" }}>{formattedEdu.degree || "Degree"}</strong>
                  {formattedEdu.institution && (
                    <span style={{ marginLeft: "8px" }}>from {formattedEdu.institution}</span>
                  )}
                  {formattedEdu.field && (
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>in {formattedEdu.field}</div>
                  )}
                  {(formattedEdu.startDate || formattedEdu.endDate) && (
                    <div style={{ fontSize: "0.85rem", color: "#999" }}>
                      {formattedEdu.startDate || ""} - {formattedEdu.endDate || "Present"}
                      {formattedEdu.gpa && ` | GPA: ${formattedEdu.gpa}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {formData.experience.length > 0 && (
          <div className="mb-3">
            <h5 style={{ color: "#28a745", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
              💼 Experience
            </h5>
            {formData.experience.map((exp, i) => {
              const formattedExp = typeof exp === "string" ? { jobTitle: exp } : exp;
              return (
                <div key={i} style={{ marginBottom: "12px", paddingLeft: "10px" }}>
                  <strong style={{ color: "#28a745" }}>{formattedExp.jobTitle || "Position"}</strong>
                  {formattedExp.company && (
                    <span style={{ marginLeft: "8px" }}>at {formattedExp.company}</span>
                  )}
                  {(formattedExp.startDate || formattedExp.endDate) && (
                    <div style={{ fontSize: "0.85rem", color: "#999" }}>
                      {formattedExp.startDate || ""} - {formattedExp.endDate || "Present"}
                      {formattedExp.location && ` | ${formattedExp.location}`}
                    </div>
                  )}
                  {formattedExp.description && (
                    <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "4px" }}>
                      {formattedExp.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {formData.skills && (
          <div className="mb-3">
            <h5 style={{ color: "#ffc107", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
              🛠️ Skills
            </h5>
            <p>{formData.skills}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
