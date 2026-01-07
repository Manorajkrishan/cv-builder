import { useState } from "react";

function Education({ formData, setFormData }) {
  const [newEducation, setNewEducation] = useState("");

  const addEducation = () => {
    if (newEducation.trim() !== "") {
      const updated = [...formData.education, newEducation];
      setFormData({ ...formData, education: updated });
      setNewEducation("");
    }
  };

  const removeEducation = (index) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  return (
    <div className="mb-4">
      <h4 className="mb-2 text-info">🎓 Education</h4>

      {formData.education.length === 0 && (
        <p className="text-muted">No education added yet.</p>
      )}

      {formData.education.map((edu, index) => (
        <div key={index} className="mb-2 d-flex justify-content-between align-items-start">
          <div className="bg-light p-2 rounded flex-grow-1 shadow-sm">{edu}</div>
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => removeEducation(index)}
            aria-label={`Remove education ${index + 1}`}
          >
            ❌
          </button>
        </div>
      ))}

      <textarea
        className="form-control mt-3"
        rows="3"
        placeholder="Add degree, institution, graduation date, GPA (optional)..."
        value={newEducation}
        onChange={(e) => setNewEducation(e.target.value)}
      />

      <button className="btn btn-info mt-2" onClick={addEducation}>
        ➕ Add Education
      </button>
    </div>
  );
}

export default Education;
