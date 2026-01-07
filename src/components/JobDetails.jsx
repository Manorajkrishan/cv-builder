function JobDetails({ formData, setFormData }) {
  return (
    <div className="mb-4 card p-3">
      <h4 className="text-danger mb-3">💼 Target Job Details</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Job Title / Position *"
        value={formData.jobTitle}
        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
        required
      />
      <textarea
        className="form-control"
        placeholder="Paste the job description here. Include key requirements, responsibilities, and qualifications... *"
        rows="5"
        value={formData.jobDescription}
        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
        required
      />
      <small className="text-muted mt-2 d-block">
        💡 The AI will tailor your CV and cover letter to match this job description
      </small>
    </div>
  );
}

export default JobDetails;