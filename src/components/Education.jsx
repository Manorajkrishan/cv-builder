import { useState } from "react";

function Education({ formData, setFormData }) {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formDataLocal, setFormDataLocal] = useState({
    degree: "",
    institution: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    gpa: "",
    honors: "",
    description: "",
  });

  const resetForm = () => {
    setFormDataLocal({
      degree: "",
      institution: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      gpa: "",
      honors: "",
      description: "",
    });
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formDataLocal.degree || !formDataLocal.institution) {
      alert("Please fill in at least Degree and Institution.");
      return;
    }

    const educationEntry = {
      degree: formDataLocal.degree,
      institution: formDataLocal.institution,
      field: formDataLocal.field,
      location: formDataLocal.location,
      startDate: formDataLocal.startDate,
      endDate: formDataLocal.isCurrent ? "Present" : formDataLocal.endDate,
      isCurrent: formDataLocal.isCurrent,
      gpa: formDataLocal.gpa,
      honors: formDataLocal.honors,
      description: formDataLocal.description,
    };

    const updated = [...formData.education];
    
    if (editingIndex !== null) {
      updated[editingIndex] = educationEntry;
    } else {
      updated.push(educationEntry);
    }
    
    setFormData({ ...formData, education: updated });
    resetForm();
  };

  const handleEdit = (index) => {
    const edu = formData.education[index];
    setFormDataLocal({
      degree: edu.degree || "",
      institution: edu.institution || "",
      field: edu.field || "",
      location: edu.location || "",
      startDate: edu.startDate || "",
      endDate: edu.isCurrent ? "" : (edu.endDate || ""),
      isCurrent: edu.isCurrent || false,
      gpa: edu.gpa || "",
      honors: edu.honors || "",
      description: edu.description || "",
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      const updated = formData.education.filter((_, i) => i !== index);
      setFormData({ ...formData, education: updated });
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...formData.education];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setFormData({ ...formData, education: updated });
  };

  const handleMoveDown = (index) => {
    if (index === formData.education.length - 1) return;
    const updated = [...formData.education];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setFormData({ ...formData, education: updated });
  };

  const formatEducation = (edu) => {
    if (typeof edu === "string") {
      return { degree: edu, institution: "", field: "", location: "", startDate: "", endDate: "", isCurrent: false, gpa: "", honors: "", description: "" };
    }
    return edu;
  };

  return (
    <div className="mb-4 card p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-info mb-0">🎓 Education</h4>
        {!showForm && (
          <button
            className="btn btn-info btn-sm"
            onClick={() => setShowForm(true)}
          >
            ➕ Add Education
          </button>
        )}
      </div>

      {formData.education.length === 0 && !showForm && (
        <div className="text-center text-muted py-4">
          <p>No education added yet.</p>
          <p className="small">Click "Add Education" to get started.</p>
        </div>
      )}

      {formData.education.map((edu, index) => {
        const formattedEdu = formatEducation(edu);
        return (
          <div key={index} className="card mb-3 border-left-info" style={{ borderLeft: "4px solid #17a2b8" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-1" style={{ color: "#17a2b8" }}>
                    {formattedEdu.degree || "Degree"}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {formattedEdu.institution || "Institution"}
                    {formattedEdu.location && ` • ${formattedEdu.location}`}
                  </h6>
                  {formattedEdu.field && (
                    <p className="text-muted small mb-1">
                      <strong>Field:</strong> {formattedEdu.field}
                    </p>
                  )}
                  <p className="text-muted small mb-2">
                    {formattedEdu.startDate || "Start Date"} - {formattedEdu.endDate || "End Date"}
                    {formattedEdu.gpa && ` • GPA: ${formattedEdu.gpa}`}
                  </p>
                  {formattedEdu.honors && (
                    <p className="text-success small mb-2">
                      <strong>Honors:</strong> {formattedEdu.honors}
                    </p>
                  )}
                  {formattedEdu.description && (
                    <p className="card-text mb-0 small">{formattedEdu.description}</p>
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
                    disabled={index === formData.education.length - 1}
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
        <div className="card mt-3 border-info">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">{editingIndex !== null ? "✏️ Edit Education" : "➕ Add New Education"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Degree/Qualification <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Bachelor of Science"
                    value={formDataLocal.degree}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, degree: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Institution/University <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. University of Technology"
                    value={formDataLocal.institution}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, institution: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Field of Study</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Computer Science"
                    value={formDataLocal.field}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, field: e.target.value })}
                  />
                </div>
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
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="month"
                    className="form-control"
                    value={formDataLocal.startDate}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, startDate: e.target.value })}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="month"
                    className="form-control"
                    value={formDataLocal.endDate}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, endDate: e.target.value })}
                    disabled={formDataLocal.isCurrent}
                  />
                </div>
                <div className="col-md-4 mb-3 d-flex align-items-end">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`currentEdu-${editingIndex || 'new'}`}
                      checked={formDataLocal.isCurrent}
                      onChange={(e) => {
                        setFormDataLocal({ ...formDataLocal, isCurrent: e.target.checked, endDate: "" });
                      }}
                    />
                    <label className="form-check-label" htmlFor={`currentEdu-${editingIndex || 'new'}`}>
                      Currently studying
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">GPA/Grade</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 3.8/4.0 or A+"
                    value={formDataLocal.gpa}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, gpa: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Honors/Awards</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Magna Cum Laude, Dean's List"
                    value={formDataLocal.honors}
                    onChange={(e) => setFormDataLocal({ ...formDataLocal, honors: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Additional details, coursework, thesis, etc. (optional)"
                  value={formDataLocal.description}
                  onChange={(e) => setFormDataLocal({ ...formDataLocal, description: e.target.value })}
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-info">
                  {editingIndex !== null ? "💾 Update Education" : "➕ Add Education"}
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

export default Education;
