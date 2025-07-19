function Education({ formData, setFormData }) {
  return (
    <div className="mb-4">
      <h4>Education</h4>
      <textarea
        className="form-control"
        placeholder="Your education background"
        rows="3"
        value={formData.education}
        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
      />
    </div>
  );
}

export default Education;