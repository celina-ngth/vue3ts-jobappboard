import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { jobAPI } from '@/api/jobs/routes'
import type { Job } from '@/api/jobs/types'
import { useAuthStore } from '@/stores/useAuthStore'

export function useJobs() {
  const queryClient = useQueryClient()
  const authStore = useAuthStore()
  const { user } = authStore

  const jobsQuery = () =>
    useQuery({
      queryKey: ['all-jobs'],
      queryFn: () => jobAPI.getJobs()
    })

  const addJobMutation = useMutation({
    mutationFn: async (job: Job) => jobAPI.addJob(job, user?.uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-jobs'] }),
    mutationKey: ['add-job'],
  })

  return {
    jobsQuery,
    addJobMutation,
  }
}
