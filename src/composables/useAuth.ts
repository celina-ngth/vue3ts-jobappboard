import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '@/services/firebase'
import { useAuthStore } from '@/stores/useAuthStore'

export function useAuth() {
  const useAuthStoreInstance = useAuthStore()

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const currentUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }

      useAuthStoreInstance.user = currentUser
    } catch (error) {
      throw error
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log('signup', userCredential.user)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  return { login, signup }
}
