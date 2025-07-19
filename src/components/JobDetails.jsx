function JobDetails({ formData, setFormData }) {
  return (
    <div className="mb-4">
      <h4>Job Details</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
      />
      <textarea
        className="form-control"
        placeholder="Job Description"
        rows="3"
        value={formData.jobDescription}
        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
      />
    </div>
  );
}

export default JobDetails;