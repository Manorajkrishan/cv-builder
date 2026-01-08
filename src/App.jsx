import { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import PersonalInfo from "./components/Personalinfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import JobDetails from "./components/JobDetails";
import Preview from "./components/Preview";
import TemplateSelector from "./components/TemplateSelector";
import AIProviderSelector from "./components/AIProviderSelector";
import ATSInfo from "./components/ATSInfo";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
    education: [],
    experience: [],
    skills: "",
    jobTitle: "",
    jobDescription: "",
    template: "ats-optimized",
    aiProvider: null,
  });

  const [generatedText, setGeneratedText] = useState("");
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedCVs, setSavedCVs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [showFeedback, setShowFeedback] = useState(false);

  // Validate form before generation
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required personal information fields.");
      return false;
    }
    if (!formData.jobTitle || !formData.jobDescription) {
      setError("Please provide job title and job description.");
      return false;
    }
    if (formData.education.length === 0 && formData.experience.length === 0) {
      setError("Please add at least education or work experience.");
      return false;
    }
    return true;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/generate`, {
        ...formData,
        aiProvider: formData.aiProvider || null,
      });
      const result = response.data.result;
      setGeneratedText(result);
      
      // Parse HTML if available
      const cvMatch = result.match(/<!-- CV_START -->([\s\S]*?)<!-- CV_END -->/);
      const coverLetterMatch = result.match(/<!-- COVER_LETTER_START -->([\s\S]*?)<!-- COVER_LETTER_END -->/);
      
      if (cvMatch && coverLetterMatch) {
        const cvHTML = cvMatch[1].trim();
        const coverLetterHTML = coverLetterMatch[1].trim();
        const combinedHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="margin-bottom: 40px;">
              ${cvHTML}
            </div>
            <div style="page-break-before: always;">
              ${coverLetterHTML}
            </div>
          </div>
        `;
        setGeneratedHTML(combinedHTML);
      } else {
        // Fallback to plain text rendering
        setGeneratedHTML(`<pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${result}</pre>`);
      }
      
      setShowFeedback(true);
    } catch (err) {
      console.error("Error generating content:", err);
      if (err.response?.status === 500) {
        setError("Server error. Please check if the backend server is running and OpenAI API key is configured.");
      } else if (err.code === 'ECONNREFUSED') {
        setError("Cannot connect to server. Please make sure the backend server is running on port 5000.");
      } else {
        setError(err.response?.data?.error || "Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("generated-output");
    if (!element) {
      setError("Nothing to download. Please generate a CV first.");
      return;
    }
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${formData.name || "CV"}_${formData.jobTitle || "Application"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleCopyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText).then(() => {
        alert("Content copied to clipboard!");
      });
    }
  };

  const handleSaveToFirebase = async () => {
    if (!generatedText) {
      setError("Please generate a CV first.");
      return;
    }
    try {
      const cvData = {
        ...formData,
        generatedCV: generatedText,
        generatedHTML: generatedHTML,
        createdAt: new Date().toISOString(),
        template: formData.template,
      };
      await addDoc(collection(db, "cvs"), cvData);
      alert("CV saved successfully!");
      loadSavedCVs();
    } catch (err) {
      console.error("Error saving CV:", err);
      setError("Failed to save CV. Please try again.");
    }
  };

  const loadSavedCVs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cvs"));
      const cvs = [];
      querySnapshot.forEach((doc) => {
        cvs.push({ id: doc.id, ...doc.data() });
      });
      setSavedCVs(cvs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Error loading CVs:", err);
    }
  };

  const handleLoadCV = (cv) => {
    setFormData({
      name: cv.name || "",
      email: cv.email || "",
      phone: cv.phone || "",
      address: cv.address || "",
      linkedin: cv.linkedin || "",
      portfolio: cv.portfolio || "",
      education: cv.education || [],
      experience: cv.experience || [],
      skills: cv.skills || "",
      jobTitle: cv.jobTitle || "",
      jobDescription: cv.jobDescription || "",
      template: cv.template || "classic",
    });
    if (cv.generatedText) {
      setGeneratedText(cv.generatedCV);
      setGeneratedHTML(cv.generatedHTML || "");
    }
    setShowSaved(false);
  };

  const handleDeleteCV = async (id) => {
    if (window.confirm("Are you sure you want to delete this saved CV?")) {
      try {
        await deleteDoc(doc(db, "cvs", id));
        loadSavedCVs();
      } catch (err) {
        console.error("Error deleting CV:", err);
        setError("Failed to delete CV.");
      }
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedback.rating === 0) {
      setError("Please provide a rating.");
      return;
    }
    try {
      const feedbackData = {
        rating: feedback.rating,
        comment: feedback.comment,
        formData: formData,
        generatedText: generatedText.substring(0, 500), // Store snippet
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, "feedback"), feedbackData);
      alert("Thank you for your feedback! It helps us improve.");
      setFeedback({ rating: 0, comment: "" });
      setShowFeedback(false);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback.");
    }
  };

  useEffect(() => {
    loadSavedCVs();
  }, []);

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
      <div className="text-center mb-4">
        <h1 className="text-primary mb-2">Smart CV Builder 🚀</h1>
        <p className="text-muted">AI-Powered Resume & Cover Letter Generator</p>
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowSaved(!showSaved)}
          >
            {showSaved ? "Hide" : "Show"} Saved CVs ({savedCVs.length})
          </button>
        </div>
      </div>

      {showSaved && savedCVs.length > 0 && (
        <div className="mb-4 card p-3">
          <h5 className="mb-3">📁 Saved CVs</h5>
          <div className="list-group">
            {savedCVs.map((cv) => (
              <div key={cv.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{cv.name}</strong> - {cv.jobTitle} 
                  <small className="text-muted d-block">
                    {new Date(cv.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleLoadCV(cv)}
                  >
                    Load
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteCV(cv.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AIProviderSelector formData={formData} setFormData={setFormData} />
      <TemplateSelector formData={formData} setFormData={setFormData} />
      <ATSInfo template={formData.template} />
      <PersonalInfo formData={formData} setFormData={setFormData} />
      <Education formData={formData} setFormData={setFormData} />
      <Experience formData={formData} setFormData={setFormData} />
      <Skills formData={formData} setFormData={setFormData} />
      <JobDetails formData={formData} setFormData={setFormData} />
      <Preview formData={formData} />

      <div className="text-center">
        <button
          className="btn btn-primary btn-lg mt-4 px-5"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Generating...
            </>
          ) : (
            "🤖 Generate CV & Cover Letter"
          )}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {error}
        </div>
      )}

      {generatedText && (
        <div className="mt-5 card p-4">
          <h4 className="text-success mb-3">✨ Generated CV & Cover Letter</h4>
          <div
            id="generated-output"
            className="p-4 border rounded bg-white"
            style={{ 
              maxHeight: "600px", 
              overflowY: "auto",
              minHeight: "300px"
            }}
            dangerouslySetInnerHTML={{ __html: generatedHTML || generatedText }}
          />
          <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            <button className="btn btn-success px-4" onClick={handleDownloadPDF}>
              📥 Download as PDF
            </button>
            <button className="btn btn-info px-4" onClick={handleCopyToClipboard}>
              📋 Copy to Clipboard
            </button>
            <button className="btn btn-secondary px-4" onClick={handleSaveToFirebase}>
              💾 Save to Cloud
            </button>
          </div>
        </div>
      )}

      {showFeedback && generatedText && (
        <div className="mt-4 card p-4">
          <h5 className="mb-3">💬 Help Us Improve!</h5>
          <p className="text-muted">How would you rate this generated CV?</p>
          <div className="mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="btn btn-link p-1"
                onClick={() => setFeedback({ ...feedback, rating: star })}
                style={{ fontSize: "2rem", color: star <= feedback.rating ? "#ffc107" : "#ccc" }}
              >
                ⭐
              </button>
            ))}
          </div>
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Any comments or suggestions? (Optional)"
            value={feedback.comment}
            onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleSubmitFeedback}>
              Submit Feedback
            </button>
            <button className="btn btn-outline-secondary" onClick={() => setShowFeedback(false)}>
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
