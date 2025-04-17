import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '@/services/firebase'
import { useAuthStore } from '@/stores/useAuthStore'
import { doc, setDoc } from "firebase/firestore"
import { useUser } from './useUser'

export function useAuth() {
  const useAuthStoreInstance = useAuthStore()
  const { createUserMutation } = useUser()

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
      const newUser = userCredential.user

      useAuthStoreInstance.user = newUser
      createUserMutation.mutate(newUser)
    } catch (error) {
      throw error
    }
  }

  return { login, signup }
}
