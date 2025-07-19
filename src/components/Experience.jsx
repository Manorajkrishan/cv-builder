function Experience({ formData, setFormData }) {
  return (
    <div className="mb-4">
      <h4>Work Experience</h4>
      <textarea
        className="form-control"
        placeholder="Your work experience"
        rows="3"
        value={formData.experience}
        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
      />
    </div>
  );
}

export default Experience;