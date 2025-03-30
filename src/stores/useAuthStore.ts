import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    let user = ref<User | null>(null)
    const isAuthenticated = ref(false)

    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
        ? {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        }
        : null
      isAuthenticated.value = Boolean(firebaseUser)
    })

    const logout = async () => {
      await signOut(auth)
      user.value = null
      isAuthenticated.value = false
    }

    return { user, isAuthenticated, logout }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
