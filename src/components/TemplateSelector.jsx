function TemplateSelector({ formData, setFormData }) {
  return (
    <div className="mb-4">
      <h4>Choose CV Template</h4>
      <select
        className="form-select"
        value={formData.template}
        onChange={(e) => setFormData({ ...formData, template: e.target.value })}
      >
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
        <option value="creative">Creative</option>
      </select>
    </div>
  );
}

export default TemplateSelector;
