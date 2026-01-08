function TemplateSelector({ formData, setFormData }) {
  const templates = [
    { 
      value: "ats-optimized", 
      label: "ATS-Optimized", 
      description: "Maximum ATS compatibility, internationally valid, simple formatting",
      icon: "✅"
    },
    { 
      value: "classic", 
      label: "Classic", 
      description: "Traditional format, ATS-friendly with professional styling",
      icon: "📄"
    },
    { 
      value: "modern", 
      label: "Modern", 
      description: "Contemporary design with visual hierarchy, ATS-compatible",
      icon: "🎨"
    },
    { 
      value: "creative", 
      label: "Creative", 
      description: "Innovative layout for creative fields, maintains ATS compatibility",
      icon: "✨"
    },
  ];

  return (
    <div className="mb-4 card p-3">
      <h4 className="text-primary mb-3">🎨 Choose CV Template</h4>
      
      <div className="row g-2">
        {templates.map((template) => (
          <div key={template.value} className="col-md-6">
            <div 
              className={`card border ${formData.template === template.value ? 'border-primary border-2' : ''}`}
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => setFormData({ ...formData, template: template.value })}
            >
              <div className="card-body p-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="template"
                    id={`template-${template.value}`}
                    checked={formData.template === template.value}
                    onChange={() => setFormData({ ...formData, template: template.value })}
                  />
                  <label className="form-check-label w-100" htmlFor={`template-${template.value}`}>
                    <strong>{template.icon} {template.label}</strong>
                    <br />
                    <small className="text-muted">{template.description}</small>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {formData.template === 'ats-optimized' && (
        <div className="alert alert-success mt-3 mb-0">
          <strong>✅ ATS-Optimized Selected:</strong> This template ensures maximum compatibility with 
          Applicant Tracking Systems and international standards. Perfect for job applications worldwide.
        </div>
      )}
      
      <small className="text-muted mt-2 d-block">
        💡 All templates are ATS-friendly, but "ATS-Optimized" provides maximum compatibility
      </small>
    </div>
  );
}

export default TemplateSelector;
