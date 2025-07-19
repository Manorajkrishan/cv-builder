import { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

// Firebase Firestore
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// Form Components
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import JobDetails from './components/JobDetails';
import Preview from './components/Preview';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    jobTitle: '',
    jobDescription: '',
  });

  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate CV & Cover Letter using OpenAI
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/generate', formData);
      const result = response.data.result;
      setGeneratedText(result);
      await saveToFirestore(result);
    } catch (err) {
      console.error('Error generating content:', err);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  // Save data to Firebase Firestore
  const saveToFirestore = async (generatedText) => {
    try {
      await addDoc(collection(db, 'cv_feedback'), {
        formData,
        generatedText,
        timestamp: new Date(),
      });
      console.log('Saved to Firestore');
    } catch (err) {
      console.error('Error saving to Firestore:', err);
    }
  };

  // Download generated output as PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('generated-output');
    const opt = {
      margin: 0.5,
      filename: 'cv_cover_letter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Smart CV Builder 🚀</h1>

      <PersonalInfo formData={formData} setFormData={setFormData} />
      <Education formData={formData} setFormData={setFormData} />
      <Experience formData={formData} setFormData={setFormData} />
      <Skills formData={formData} setFormData={setFormData} />
      <JobDetails formData={formData} setFormData={setFormData} />
      <Preview formData={formData} />
// Live Preview of the form data
      <div className="text-center">
        <button
          className="btn btn-primary mt-4"
          onClick={handleGenerate} // Trigger CV generation
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate CV & Cover Letter'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3 text-center">{error}</div>
      )}

      {generatedText && (
        <div>
          <div id="generated-output" className="mt-5 p-4 border rounded bg-white">
            <h4 className="text-success">Generated Output</h4>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{generatedText}</pre>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={handleDownloadPDF}>
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;