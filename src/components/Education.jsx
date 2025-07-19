import { useState } from "react";

function Experience({ formData, setFormData }) {
  const [newExperience, setNewExperience] = useState("");

  const addExperience = () => {
    if (newExperience.trim() !== "") {
      const updated = [...formData.experience, newExperience];
      setFormData({ ...formData, experience: updated });
      setNewExperience("");
    }
  };

  const removeExperience = (index) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  return (
    <div className="mb-4">
      <h4 className="mb-2 text-success">💼 Work Experience</h4>

      {formData.experience.length === 0 && (
        <p className="text-muted">No work experience added yet.</p>
      )}

      {formData.experience.map((exp, index) => (
        <div key={index} className="mb-2 d-flex justify-content-between align-items-start">
          <div className="bg-light p-2 rounded flex-grow-1 shadow-sm">{exp}</div>
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => removeExperience(index)}
            aria-label={`Remove experience ${index + 1}`}
          >
            ❌
          </button>
        </div>
      ))}

      <textarea
        className="form-control mt-3"
        rows="3"
        placeholder="Add job title, company, dates, responsibilities..."
        value={newExperience}
        onChange={(e) => setNewExperience(e.target.value)}
      />

      <button className="btn btn-success mt-2" onClick={addExperience}>
        ➕ Add Experience
      </button>
    </div>
  );
}

export default Experience;
