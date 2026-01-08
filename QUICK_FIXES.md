# 🚨 Critical Security Fixes - Implement Immediately

## 1. Fix Hardcoded API URL

### Current Issue
```javascript
// src/App.jsx
axios.post("http://localhost:5000/generate", ...)
```

### Solution
Create `.env` file in root:
```env
VITE_API_URL=http://localhost:5000
```

Update `src/App.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.post(`${API_URL}/generate`, ...)
```

## 2. Move Firebase Config to Environment Variables

### Current Issue
Firebase config is hardcoded in `src/firebase.js`

### Solution
Add to `.env`:
```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Update `src/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

## 3. Add Rate Limiting to Server

Install:
```bash
cd server
npm install express-rate-limit
```

Update `server/index.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/generate', limiter);
```

## 4. Fix CORS Configuration

Update `server/index.js`:
```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Add to `server/.env`:
```env
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

