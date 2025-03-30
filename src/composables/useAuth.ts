import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/services/firebase"

export function useAuth() {
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('signup', userCredential.user)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  return { login, signup }
}
