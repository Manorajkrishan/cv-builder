import { useState } from "react";

function Skills({ formData, setFormData }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      const currentSkills = formData.skills ? formData.skills.split(",").map(s => s.trim()) : [];
      const updated = [...currentSkills, newSkill.trim()];
      setFormData({ ...formData, skills: updated.join(", ") });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const currentSkills = formData.skills ? formData.skills.split(",").map(s => s.trim()) : [];
    const updated = currentSkills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updated.join(", ") });
  };

  const skillsArray = formData.skills ? formData.skills.split(",").map(s => s.trim()).filter(s => s) : [];

  return (
    <div className="mb-4 card p-3">
      <h4 className="text-warning mb-3">🛠️ Skills</h4>
      
      {skillsArray.length > 0 && (
        <div className="mb-3">
          {skillsArray.map((skill, index) => (
            <span
              key={index}
              className="badge bg-warning text-dark me-2 mb-2"
              style={{ fontSize: "0.9rem", padding: "0.5rem" }}
            >
              {skill}
              <button
                className="btn-close ms-2"
                style={{ fontSize: "0.6rem" }}
                onClick={() => removeSkill(index)}
                aria-label="Remove skill"
              ></button>
            </span>
          ))}
        </div>
      )}

      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add a skill (e.g. JavaScript, React, Communication)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addSkill()}
        />
        <button className="btn btn-warning" onClick={addSkill}>
          ➕ Add
        </button>
      </div>
      <small className="text-muted mt-2 d-block">
        💡 Tip: Add skills one at a time for better organization
      </small>
    </div>
  );
}

export default Skills;