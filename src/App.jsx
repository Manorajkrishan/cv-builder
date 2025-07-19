import { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import JobDetails from "./components/JobDetails";
import Preview from "./components/Preview";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [],
    experience: [],
    skills: "",
    jobTitle: "",
    jobDescription: "",
  });

  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/generate", formData);
      setGeneratedText(response.data.result);
    } catch (err) {
      console.error("Error generating content:", err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("generated-output");
    const opt = {
      margin: 0.5,
      filename: "cv_cover_letter.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div
      className="container my-5 p-4 rounded shadow"
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <h1 className="text-center text-primary mb-4">Smart CV Builder 🚀</h1>

      <PersonalInfo formData={formData} setFormData={setFormData} />
      <Education formData={formData} setFormData={setFormData} />
      <Experience formData={formData} setFormData={setFormData} />
      <Skills formData={formData} setFormData={setFormData} />
      <JobDetails formData={formData} setFormData={setFormData} />
      <Preview formData={formData} />

      <div className="text-center">
        <button
          className="btn btn-primary mt-4 px-4"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate CV & Cover Letter"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {error}
        </div>
      )}

      {generatedText && (
        <div className="mt-5">
          <div
            id="generated-output"
            className="p-4 border rounded bg-light"
            style={{ whiteSpace: "pre-wrap", maxHeight: "400px", overflowY: "auto" }}
          >
            <h4 className="text-success mb-3">Generated Output</h4>
            <pre>{generatedText}</pre>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success px-4" onClick={handleDownloadPDF}>
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
