import { useState } from "react";

function Experience({ formData, setFormData }) {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formDataLocal, setFormDataLocal] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    achievements: "",
  });

  const resetForm = () => {
    setFormDataLocal({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      achievements: "",
    });
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formDataLocal.jobTitle || !formDataLocal.company) {
      alert("Please fill in at least Job Title and Company.");
      return;
    }

    const experienceEntry = {
      jobTitle: formDataLocal.jobTitle,
      company: formDataLocal.company,
      location: formDataLocal.location,
      startDate: formDataLocal.startDate,
      endDate: formDataLocal.isCurrent ? "Present" : formDataLocal.endDate,
      isCurrent: formDataLocal.isCurrent,
      description: formDataLocal.description,
      achievements: formDataLocal.achievements,
    };

    const updated = [...formData.experience];
    
    if (editingIndex !== null) {
      updated[editingIndex] = experienceEntry;
    } else {
      updated.push(experienceEntry);
    }
    
    setFormData({ ...formData, experience: updated });
    resetForm();
  };

  const handleEdit = (index) => {
    const exp = formData.experience[index];
    setFormDataLocal({
      jobTitle: exp.jobTitle || "",
      company: exp.company || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.isCurrent ? "" : (exp.endDate || ""),
      isCurrent: exp.isCurrent || false,
      description: exp.description || "",
      achievements: exp.achievements || "",
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      const updated = formData.experience.filter((_, i) => i !== index);
      setFormData({ ...formData, experience: updated });
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...formData.experience];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setFormData({ ...formData, experience: updated });
  };

  const handleMoveDown = (index) => {
    if (index === formData.experience.length - 1) return;
    const updated = [...formData.experience];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setFormData({ ...formData, experience: updated });
  };

  const formatExperience = (exp) => {
    if (typeof exp === "string") {
      return { jobTitle: exp, company: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "", achievements: "" };
    }
    return exp;
  };

  return (
    <div className="mb-4 card p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-success mb-0">💼 Work Experience</h4>
        {!showForm && (
          <button
            className="btn btn-success btn-sm"
            onClick={() => setShowForm(true)}
          >
            ➕ Add Experience
          </button>
        )}
      </div>

      {formData.experience.length === 0 && !showForm && (
        <div className="text-center text-muted py-4">
          <p>No work experience added yet.</p>
          <p className="small">Click "Add Experience" to get started.</p>
        </div>
      )}

      {formData.experience.map((exp, index) => {
        const formattedExp = formatExperience(exp);
        return (
          <div key={index} className="card mb-3 border-left-success" style={{ borderLeft: "4px solid #28a745" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-1" style={{ color: "#28a745" }}>
                    {formattedExp.jobTitle || "Job Title"}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {formattedExp.company || "Company"}
                    {formattedExp.location && ` • ${formattedExp.location}`}
                  </h6>
                  <p className="text-muted small mb-2">
                    {formattedExp.startDate || "Start Date"} - {formattedExp.endDate || "End Date"}
                  </p>
                  {formattedExp.description && (
                    <p className="card-text mb-2">{formattedExp.description}</p>
                  )}
                  {formattedExp.achievements && (
                    <div className="mt-2">
                      <strong className="small">Key Achievements:</strong>
                      <ul className="small mb-0">
                        {formattedExp.achievements.split("\n").filter(a => a.trim()).map((achievement, i) => (
                          <li key={i}>{achievement.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleMoveUp(index)}
                    title="Move up"
                    disabled={index === 0}
                  >
                    ⬆️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleMoveDown(index)}
                    title="Move down"
                    disabled={index === formData.experience.length - 1}
                  >
                    ⬇️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(index)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {showForm && (
        <div className="card mt-3 border-primary">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">{editingIndex !== null ? "✏️ Edit Experience" : "➕ Add New Experience"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Job Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Software Engineer"
                    value={formDataLocal.jobTitle}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, jobTitle: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Company <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Tech Corp"
                    value={formDataLocal.company}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. New York, NY"
                    value={formDataLocal.location}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, location: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="month"
                    className="form-control"
                    value={formDataLocal.startDate}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="month"
                    className="form-control"
                    value={formDataLocal.endDate}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, endDate: e.target.value })}
                    disabled={formDataLocal.isCurrent}
                  />
                </div>
                <div className="col-md-6 mb-3 d-flex align-items-end">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`currentJob-${editingIndex || 'new'}`}
                      checked={formDataLocal.isCurrent}
                      onChange={(e) => {
                        setFormDataLocal({ ...formDataLocal, isCurrent: e.target.checked, endDate: "" });
                      }}
                    />
                    <label className="form-check-label" htmlFor={`currentJob-${editingIndex || 'new'}`}>
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Job Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Describe your responsibilities and role..."
                  value={formDataLocal.description}
                  onChange={(e) => setFormDataLocal({ ...formDataLocal, description: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Key Achievements</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="List key achievements (one per line)"
                  value={formDataLocal.achievements}
                  onChange={(e) => setFormDataLocal({ ...formDataLocal, achievements: e.target.value })}
                />
                <small className="text-muted">Enter one achievement per line</small>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {editingIndex !== null ? "💾 Update Experience" : "➕ Add Experience"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Experience;
