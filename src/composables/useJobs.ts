import { useQuery } from '@tanstack/vue-query'
import { jobAPI } from '@/api/jobs/routes'

export function useJobs() {
  const jobsQuery = () => useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobAPI.getJobs(),
  })

  return {
    jobsQuery
  }
}
