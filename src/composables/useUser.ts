import { useMutation } from '@tanstack/vue-query'
import { userAPI } from '@/api/user/routes'
import type { User } from 'firebase/auth'

export function useUser() {
  const createUserMutation = useMutation({
    mutationFn: async (user: User) => userAPI.createUser(user?.uid),
  })

  return {
    createUserMutation,
  }
}
