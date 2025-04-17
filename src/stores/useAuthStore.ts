import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/api/user/firebase'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'

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

    const updateDisplayName = async (displayName: string) => {
      if (!auth.currentUser) return

      try {
        await updateProfile(auth.currentUser, { displayName })
        if (user.value) {
          user.value.displayName = displayName
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du nom :', error)
      }
    }

    const logout = async () => {
      await signOut(auth)
      user.value = null
      isAuthenticated.value = false
    }

    return { user, isAuthenticated, logout, updateDisplayName }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
