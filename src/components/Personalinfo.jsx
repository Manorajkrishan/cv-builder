function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="mb-4">
      <h4>Personal Information</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        className="form-control"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
    </div>
  );
}

export default PersonalInfo;