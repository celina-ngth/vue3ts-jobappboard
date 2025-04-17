import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/useAuthStore'
import { jobAPI } from '@/api/jobs/routes'
import type { Job } from '@/api/jobs/types'

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

  const updateJobMutation = useMutation({
    mutationFn: async (job: Job) => jobAPI.updateJob(job),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-jobs'] }),
    mutationKey: ['update-job'],
  })

  const deleteJobMutation = useMutation({
    mutationFn: async (id: string) => jobAPI.deleteJob(id, user?.uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-jobs'] }),
    mutationKey: ['delete-job'],
  })

  return {
    jobsQuery,
    addJobMutation,
    updateJobMutation,
    deleteJobMutation
  }
}
