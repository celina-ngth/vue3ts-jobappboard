import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-application-tracker-1aa49.firebaseapp.com",
  projectId: "job-application-tracker-1aa49",
  storageBucket: "job-application-tracker-1aa49.firebasestorage.app",
  messagingSenderId: "556196322862",
  appId: "1:556196322862:web:2ae6d42f5471b5c1fb49bf",
  measurementId: "G-90M5LJ1REM"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
