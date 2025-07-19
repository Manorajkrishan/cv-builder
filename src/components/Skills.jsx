function Skills({ formData, setFormData }) {
  return (
    <div className="mb-4">
      <h4>Skills</h4>
      <input
        type="text"
        className="form-control"
        placeholder="e.g. JavaScript, React, Communication"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
      />
    </div>
  );
}

export default Skills;