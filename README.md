# HabitFlow – Habit Tracker 🌊

A beautiful, full-stack habit tracking web application built with React, Tailwind CSS, and Firebase. Track your daily habits, view weekly statistics, and get algorithmic motivation to stay consistent!

![HabitFlow](https://img.shields.io/badge/version-1.0.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Free%20Tier-orange)
![React](https://img.shields.io/badge/React-18.3-61dafb)

## Demo
![Demo](./demo_recordings/final_production_multihabit_verification_1771394290732.webp)

## ✨ Features

### 🔐 Authentication
- Email/password sign up and login
- Persistent login state
- Protected routes
- Secure user data isolation

### 📝 Habit Management
- Create habits with title and description
- Mark habits as complete daily
- View weekly completion count (last 7 days)
- Delete habits with confirmation
- Real-time updates across all views

### 📊 Weekly Statistics
- Total habits count
- Total completions this week
- Weekly completion percentage
- Animated progress bar
- Most consistent habit
- Least consistent habit (needs attention)

### 💫 Algorithmic Motivation
- Generate personalized motivational messages
- Three-tier messaging system based on performance:
  - ≥80%: Highly positive encouragement
  - 50-79%: Encouraging with improvement tips
  - <50%: Constructive daily improvement focus
- No AI APIs required - fully algorithmic

### 🎨 Modern UI/UX
- Glassmorphism design with backdrop blur effects
- Light green and purple color scheme
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states and error handling
- Empty states with helpful prompts

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Backend**: Firebase
  - Authentication (Email/Password)
  - Firestore Database
  - Hosting
- **Routing**: React Router v6
- **Local Development**: Firebase Emulator Suite

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier works!)
- Firebase CLI

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
cd habit_tracker_full_stack
npm install
```

### 2. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 3. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password** authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Choose a location

### 4. Configure Firebase

Copy your Firebase configuration from Firebase Console:
- Go to Project Settings > General
- Scroll to "Your apps" section
- Click on Web app (</>) to create/view config
- Copy the config object

Update `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Update `.firebaserc`:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 5. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## 🧪 Local Development

### Option 1: Using Firebase Emulators (Recommended)

1. Start Firebase Emulators:
```bash
firebase emulators:start
```

This will start:
- Auth Emulator: http://localhost:9099
- Firestore Emulator: http://localhost:8080
- Emulator UI: http://localhost:4000

2. In a new terminal, start the dev server:
```bash
npm run dev
```

3. Open http://localhost:5173

The app will automatically connect to emulators when running on localhost!

### Option 2: Using Production Firebase

Simply run:
```bash
npm run dev
```

Open http://localhost:5173

## 📦 Production Build

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build Locally

```bash
npm run preview
```

### Deploy to Firebase Hosting

```bash
firebase deploy
```

This deploys:
- Firestore security rules
- Firebase Hosting

Your app will be live at: `https://your-project-id.web.app`

## 📁 Project Structure

```bash
habit_tracker_full_stack/
├── src/
│   ├── components/
│   │   ├── HabitForm.jsx
│   │   ├── HabitCard.jsx
│   │   ├── HabitList.jsx
│   │   ├── WeeklyStats.jsx
│   │   ├── MotivationCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.jsx
│   │
│   ├── firebase/
│   │   ├── config.js
│   │   ├── auth.js
│   │   └── habits.js
│   │
│   ├── utils/
│   │   ├── statsCalculator.js
│   │   └── motivationGenerator.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── firebase.json
├── firestore.rules
├── .firebaserc
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🔒 Firestore Database Structure

```text
users (collection)
└── {userId} (document)
    └── habits (subcollection)
        └── {habitId} (document)
            ├── title: string
            ├── description: string
            ├── createdAt: timestamp
            └── completions: array of date strings (YYYY-MM-DD)
```

## 🛡️ Security

- Users can only access their own data
- Firestore security rules enforce user isolation
- Email/password authentication required
- Protected routes prevent unauthorized access

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'glass-green': {
    light: '#d1fae5',
    DEFAULT: '#a7f3d0',
    dark: '#6ee7b7',
  },
  'glass-purple': {
    light: '#ddd6fe',
    DEFAULT: '#e9d5ff',
    dark: '#c4b5fd',
  },
}
```

### Glassmorphism Effects

Edit `src/index.css` to customize glass effects:
```css
.glass-card {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl;
}
```

## 🐛 Troubleshooting

### Emulator Connection Issues

If the app doesn't connect to emulators:
1. Make sure emulators are running
2. Check console for connection messages
3. Clear browser cache and reload

### Build Errors

If npm install fails:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Firebase Deployment Issues

Make sure you're logged in and have the correct project selected:
```bash
firebase login
firebase use --add
```

## 📄 License

MIT License - feel free to use this project for learning or personal use!

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Backend by [Firebase](https://firebase.google.com/)

---

Made with 💜 and 🌊 by the HabitFlow team
