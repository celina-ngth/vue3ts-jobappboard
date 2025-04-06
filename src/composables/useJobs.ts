import { useQuery } from '@tanstack/vue-query'
import { jobAPI } from '@/api/jobs/routes'

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobAPI.getJobs(),
  })
}
