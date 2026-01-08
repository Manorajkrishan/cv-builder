# 🚀 Smart CV Builder - AI-Powered Resume & Cover Letter Generator

A modern web application that leverages AI to generate personalized CVs and cover letters tailored to your profile and desired job applications. **Now supports multiple AI providers including local AI models!**

## ✨ Key Features

- **✅ ATS-Optimized**: Maximum compatibility with Applicant Tracking Systems worldwide
- **🌍 Internationally Valid**: Standard formats that work globally
- **Easy-to-use Forms**: Intuitive interface for personal info, education, experience, skills, and job descriptions
- **Multiple Professional Templates**: 
  - **ATS-Optimized** - Maximum ATS compatibility (recommended)
  - **Classic** - Traditional, ATS-friendly format
  - **Modern** - Contemporary design, ATS-compatible
  - **Creative** - For creative fields, maintains ATS compatibility
- **Multiple AI Providers**: 
  - **OpenAI GPT** - Cloud-based AI (requires API key)
  - **Ollama (Local AI)** - Run AI models locally, no API key needed! 🎉
  - **Template Generator** - Fast template-based generation (no AI)
- **AI-Powered Generation**: Generate tailored CVs and cover letters in seconds
- **Live Preview**: See your CV preview in real-time as you fill in the form
- **Instant PDF Downloads**: Download your generated CV as a professional PDF
- **Cloud Storage**: Save and load your CVs using Firebase Firestore
- **Feedback System**: Rate and provide feedback to help improve the AI
- **Fully Responsive**: Beautiful, modern UI built with Bootstrap and React
- **Copy to Clipboard**: Easily copy generated content
- **Multiple CV Management**: Save, load, and manage multiple CV versions
- **ATS Validation**: Automatic validation and sanitization for ATS compatibility

## 🔧 Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Bootstrap 5** - Responsive, polished UI components
- **Vite** - Fast build tool and dev server
- **html2pdf.js** - PDF generation
- **Firebase** - Cloud database and storage

### Backend
- **Node.js** - Server runtime
- **Express.js** - REST API framework
- **OpenAI GPT-3.5/GPT-4** - Cloud AI content generation
- **Ollama** - Local AI models (optional)
- **CORS** - Cross-origin resource sharing

### Database
- **Firebase Firestore** - User data and feedback storage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- **For OpenAI**: OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))
- **For Ollama (Local AI)**: Install [Ollama](https://ollama.ai) (optional)
- Firebase project ([Set up here](https://console.firebase.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cv-builder
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `server` directory:
   ```env
   # Choose your AI provider: openai, ollama, or template
   AI_PROVIDER=openai
   
   # OpenAI Configuration (if using OpenAI)
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-3.5-turbo
   
   # Ollama Configuration (if using Ollama)
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama2
   
   # Server Configuration
   PORT=5000
   ```

5. **Set up Ollama (Optional - for Local AI)**

   If you want to use local AI instead of OpenAI:
   
   ```bash
   # Install Ollama from https://ollama.ai
   # Then download a model:
   ollama pull llama2
   # Or try other models:
   ollama pull mistral
   ollama pull codellama
   ```

   Then set in `.env`:
   ```env
   AI_PROVIDER=ollama
   OLLAMA_MODEL=llama2
   ```

   The Firebase configuration is already set up in `src/firebase.js`. If you want to use your own Firebase project, update the configuration.

6. **Start the Development Servers**

   In one terminal, start the backend:
   ```bash
   cd server
   npm install  # Install axios if not already installed
   npm start
   # or for development with auto-reload:
   npm run dev  # (requires nodemon: npm install -g nodemon)
   ```

   In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🤖 AI Provider Options

### 1. OpenAI (Cloud-based)
- **Pros**: Fast, high-quality results, supports GPT-3.5 and GPT-4
- **Cons**: Requires API key, costs money, needs internet
- **Best for**: Production use, when quality is priority

### 2. Ollama (Local AI)
- **Pros**: Free, no API key needed, runs locally, privacy-focused
- **Cons**: Slower, requires more RAM, need to download models
- **Best for**: Privacy-conscious users, offline use, testing
- **Models**: llama2, mistral, codellama, and more

### 3. Template Generator
- **Pros**: Instant, no setup required, no API costs
- **Cons**: Less personalized, no AI intelligence
- **Best for**: Quick CVs, when AI is not available

## 📖 Usage

1. **Select AI Provider**
   - Choose from OpenAI, Ollama, or Template Generator in the UI

2. **Fill in Your Information**
   - Personal details (name, email, phone, LinkedIn, portfolio)
   - Education history (structured form with all details)
   - Work experience (structured form with achievements)
   - Skills (tag-based input)
   - Target job details

3. **Choose a Template**
   - Classic: Traditional, ATS-friendly format
   - Modern: Contemporary design with visual hierarchy
   - Creative: Innovative layout for creative fields

4. **Generate Your CV**
   - Click "Generate CV & Cover Letter"
   - Wait for the AI to create your personalized documents

5. **Download or Save**
   - Download as PDF
   - Copy to clipboard
   - Save to cloud for future access

6. **Provide Feedback**
   - Rate the generated CV
   - Leave comments to help improve the system

## 🗂️ Project Structure

```
cv-builder/
├── src/
│   ├── components/
│   │   ├── Personalinfo.jsx    # Personal information form
│   │   ├── Education.jsx       # Structured education input
│   │   ├── Experience.jsx      # Structured work experience
│   │   ├── Skills.jsx          # Skills management
│   │   ├── JobDetails.jsx      # Target job information
│   │   ├── Preview.jsx         # Live preview component
│   │   ├── TemplateSelector.jsx # Template selection
│   │   └── AIProviderSelector.jsx # AI provider selection
│   ├── App.jsx                 # Main application component
│   ├── firebase.js             # Firebase configuration
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── server/
│   ├── ai-providers/           # AI provider modules
│   │   ├── aiFactory.js        # Provider factory
│   │   ├── openaiProvider.js   # OpenAI implementation
│   │   ├── ollamaProvider.js   # Ollama implementation
│   │   └── templateProvider.js # Template generator
│   ├── index.js                # Express server and API
│   └── package.json            # Backend dependencies
├── public/                     # Static assets
└── package.json                # Frontend dependencies
```

## 🔐 Environment Variables

### Backend (.env file in server/)
- `AI_PROVIDER` - Which AI to use: `openai`, `ollama`, or `template`
- `OPENAI_API_KEY` - Your OpenAI API key (required for OpenAI)
- `OPENAI_MODEL` - OpenAI model to use (default: `gpt-3.5-turbo`)
- `OLLAMA_BASE_URL` - Ollama server URL (default: `http://localhost:11434`)
- `OLLAMA_MODEL` - Ollama model to use (default: `llama2`)
- `PORT` - Server port (default: 5000)

### Firebase Configuration
Update `src/firebase.js` with your Firebase project credentials if using a different project.

## 🎯 Features Roadmap

- [x] Basic CV generation
- [x] Multiple templates
- [x] PDF download
- [x] Cloud storage
- [x] Feedback system
- [x] Multiple AI providers
- [x] Local AI support (Ollama)
- [ ] Job matching algorithm
- [ ] CV analytics and ATS score
- [ ] Export to Word/DOCX
- [ ] Multiple language support
- [ ] Advanced template customization
- [ ] Resume parsing from existing documents
- [ ] Integration with job boards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Server connection errors
- Make sure the backend server is running on port 5000
- Check that your `.env` file is properly configured
- For OpenAI: Verify your API key is valid
- For Ollama: Make sure Ollama is installed and running (`ollama list`)

### Firebase errors
- Ensure Firebase is properly initialized
- Check Firebase project permissions
- Verify Firestore rules allow read/write access

### PDF generation issues
- Try a different browser (Chrome recommended)
- Check browser console for errors
- Ensure generated content is properly formatted

### Ollama issues
- Make sure Ollama is installed: https://ollama.ai
- Verify model is downloaded: `ollama list`
- Check Ollama is running: Should be on port 11434
- If model not found: `ollama pull <model-name>`

## 💡 Tips for Best Results

1. **Choose ATS-Optimized Template**: For job applications, use the "ATS-Optimized" template for maximum compatibility
2. **Be Specific**: Provide detailed information about your experience and the job requirements
3. **Use Keywords**: Include relevant keywords from the job description - the AI will automatically incorporate them
4. **Quantify Achievements**: Include numbers and metrics when possible (e.g., "Increased sales by 30%")
5. **Review Generated Content**: Always review and edit the AI-generated content
6. **Save Multiple Versions**: Save different CVs for different job types
7. **Choose Right AI**: Use OpenAI for best quality, Ollama for privacy, Template for speed
8. **International Applications**: The CV automatically uses internationally recognized date formats (Month YYYY)

## ✅ ATS-Friendly Features

The system automatically ensures:

- **Standard Formatting**: Simple HTML structure that ATS systems can parse easily
- **No Complex Elements**: No tables, images, or complex CSS that break parsing
- **Standard Sections**: Uses industry-standard section headers (WORK EXPERIENCE, EDUCATION, SKILLS)
- **Keyword Optimization**: Automatically includes relevant keywords from job descriptions
- **Clean Structure**: Proper heading hierarchy and consistent formatting
- **Internationally Valid**: Dates in "Month YYYY" format, standard phone number formatting
- **Compatible with**: LinkedIn Easy Apply, Indeed, ZipRecruiter, Workday, Taleo, Greenhouse, and most major ATS systems

## 🌍 International Standards

- **Date Format**: "January 2020" format (internationally recognized)
- **Phone Numbers**: Optional country codes (e.g., +1 555 123 4567)
- **Section Names**: Standard English section headers that work globally
- **Language**: Professional English suitable for international applications
- **Address Format**: City, Country format (no street addresses needed for privacy)

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using React, OpenAI, Ollama, and Firebase
