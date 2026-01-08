import { useState, useEffect } from "react";
import axios from "axios";

function AIProviderSelector({ formData, setFormData }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/ai-providers`);
      setProviders(response.data.providers);
      setFormData({ ...formData, aiProvider: response.data.current });
    } catch (error) {
      console.error("Error fetching providers:", error);
      // Fallback providers
      setProviders([
        { id: 'openai', name: 'OpenAI GPT', requires: ['OPENAI_API_KEY'] },
        { id: 'ollama', name: 'Ollama (Local AI)', requires: ['Ollama installed locally'] },
        { id: 'template', name: 'Template Generator (No AI)', requires: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (providerId) => {
    setFormData({ ...formData, aiProvider: providerId });
  };

  if (loading) {
    return (
      <div className="mb-4 card p-3">
        <h4 className="text-secondary mb-0">🤖 AI Provider</h4>
        <small className="text-muted">Loading providers...</small>
      </div>
    );
  }

  return (
    <div className="mb-4 card p-3">
      <h4 className="text-secondary mb-3">🤖 AI Provider</h4>
      <select
        className="form-select"
        value={formData.aiProvider || providers[0]?.id || 'openai'}
        onChange={(e) => handleProviderChange(e.target.value)}
      >
        {providers.map((provider) => (
          <option key={provider.id} value={provider.id}>
            {provider.name}
          </option>
        ))}
      </select>
      
      {formData.aiProvider && (
        <div className="mt-2">
          {providers.find(p => p.id === formData.aiProvider)?.requires && 
           providers.find(p => p.id === formData.aiProvider).requires.length > 0 && (
            <small className="text-muted d-block">
              <strong>Requirements:</strong>{" "}
              {providers.find(p => p.id === formData.aiProvider).requires.join(", ")}
            </small>
          )}
          {formData.aiProvider === 'ollama' && (
            <div className="alert alert-info mt-2 mb-0 small">
              <strong>📥 Using Local AI:</strong> Make sure Ollama is installed and running.
              <br />
              <small>
                Install from: <a href="https://ollama.ai" target="_blank" rel="noreferrer">ollama.ai</a>
                <br />
                Run: <code>ollama pull llama2</code>
              </small>
            </div>
          )}
          {formData.aiProvider === 'template' && (
            <div className="alert alert-warning mt-2 mb-0 small">
              <strong>⚡ Template Mode:</strong> This uses a template-based generator (no AI).
              Results will be structured but less personalized.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIProviderSelector;

