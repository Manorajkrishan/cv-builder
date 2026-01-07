# 🚀 Smart CV Builder - AI-Powered Resume & Cover Letter Generator

A modern web application that leverages OpenAI's GPT-3.5 to generate personalized CVs and cover letters tailored to your profile and desired job applications.

## ✨ Key Features

- **Easy-to-use Forms**: Intuitive interface for personal info, education, experience, skills, and job descriptions
- **Multiple Professional Templates**: Choose from Classic, Modern, or Creative CV templates
- **AI-Powered Generation**: Generate tailored CVs and cover letters in seconds using GPT-3.5
- **Live Preview**: See your CV preview in real-time as you fill in the form
- **Instant PDF Downloads**: Download your generated CV as a professional PDF
- **Cloud Storage**: Save and load your CVs using Firebase Firestore
- **Feedback System**: Rate and provide feedback to help improve the AI
- **Fully Responsive**: Beautiful, modern UI built with Bootstrap and React
- **Copy to Clipboard**: Easily copy generated content
- **Multiple CV Management**: Save, load, and manage multiple CV versions

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
- **OpenAI GPT-3.5** - AI content generation
- **CORS** - Cross-origin resource sharing

### Database
- **Firebase Firestore** - User data and feedback storage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))
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
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

   The Firebase configuration is already set up in `src/firebase.js`. If you want to use your own Firebase project, update the configuration.

5. **Start the Development Servers**

   In one terminal, start the backend:
   ```bash
   cd server
   npm start
   # or for development with auto-reload:
   npm run dev  # (requires nodemon: npm install -g nodemon)
   ```

   In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📖 Usage

1. **Fill in Your Information**
   - Personal details (name, email, phone, LinkedIn, portfolio)
   - Education history
   - Work experience
   - Skills
   - Target job details

2. **Choose a Template**
   - Classic: Traditional, ATS-friendly format
   - Modern: Contemporary design with visual hierarchy
   - Creative: Innovative layout for creative fields

3. **Generate Your CV**
   - Click "Generate CV & Cover Letter"
   - Wait for the AI to create your personalized documents

4. **Download or Save**
   - Download as PDF
   - Copy to clipboard
   - Save to cloud for future access

5. **Provide Feedback**
   - Rate the generated CV
   - Leave comments to help improve the system

## 🗂️ Project Structure

```
cv-builder/
├── src/
│   ├── components/
│   │   ├── Personalinfo.jsx    # Personal information form
│   │   ├── Education.jsx       # Education input component
│   │   ├── Experience.jsx      # Work experience component
│   │   ├── Skills.jsx          # Skills management
│   │   ├── JobDetails.jsx      # Target job information
│   │   ├── Preview.jsx         # Live preview component
│   │   └── TemplateSelector.jsx # Template selection
│   ├── App.jsx                 # Main application component
│   ├── firebase.js             # Firebase configuration
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── server/
│   ├── index.js                # Express server and API
│   └── package.json            # Backend dependencies
├── public/                     # Static assets
└── package.json                # Frontend dependencies
```

## 🔐 Environment Variables

### Backend (.env file in server/)
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 5000)

### Firebase Configuration
Update `src/firebase.js` with your Firebase project credentials if using a different project.

## 🎯 Features Roadmap

- [x] Basic CV generation
- [x] Multiple templates
- [x] PDF download
- [x] Cloud storage
- [x] Feedback system
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
- Verify your OpenAI API key is valid

### Firebase errors
- Ensure Firebase is properly initialized
- Check Firebase project permissions
- Verify Firestore rules allow read/write access

### PDF generation issues
- Try a different browser (Chrome recommended)
- Check browser console for errors
- Ensure generated content is properly formatted

## 💡 Tips for Best Results

1. **Be Specific**: Provide detailed information about your experience and the job requirements
2. **Use Keywords**: Include relevant keywords from the job description
3. **Quantify Achievements**: Include numbers and metrics when possible
4. **Review Generated Content**: Always review and edit the AI-generated content
5. **Save Multiple Versions**: Save different CVs for different job types

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using React, OpenAI, and Firebase
