function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="mb-4 card p-3">
      <h4 className="text-primary mb-3">👤 Personal Information</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Full Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email Address *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        className="form-control mb-2"
        placeholder="Phone Number *"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Address (Optional)"
        value={formData.address || ""}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <input
        type="url"
        className="form-control mb-2"
        placeholder="LinkedIn Profile (Optional)"
        value={formData.linkedin || ""}
        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
      />
      <input
        type="url"
        className="form-control"
        placeholder="Portfolio/Website (Optional)"
        value={formData.portfolio || ""}
        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
      />
    </div>
  );
}

export default PersonalInfo;