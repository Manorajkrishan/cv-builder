function TemplateSelector({ formData, setFormData }) {
  const templates = [
    { value: "classic", label: "Classic", description: "Traditional, ATS-friendly format" },
    { value: "modern", label: "Modern", description: "Contemporary design with visual hierarchy" },
    { value: "creative", label: "Creative", description: "Innovative layout for creative fields" },
  ];

  return (
    <div className="mb-4 card p-3">
      <h4 className="text-primary mb-3">🎨 Choose CV Template</h4>
      <select
        className="form-select form-select-lg"
        value={formData.template || "classic"}
        onChange={(e) => setFormData({ ...formData, template: e.target.value })}
      >
        {templates.map((template) => (
          <option key={template.value} value={template.value}>
            {template.label} - {template.description}
          </option>
        ))}
      </select>
      <small className="text-muted mt-2 d-block">
        💡 Templates affect the AI-generated format and styling
      </small>
    </div>
  );
}

export default TemplateSelector;
