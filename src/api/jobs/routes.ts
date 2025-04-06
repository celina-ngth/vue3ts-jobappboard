
import { API_CONFIG } from "../config"
import { formatJob, formatJobBoard } from "./reducers"
import type { Job, JobBoard } from "./types"
import { useAuthStore } from '@/stores/useAuthStore'

class JobAPI {
  async getJobs(): Promise<JobBoard[]> {
    try {
      const authStore = useAuthStore()
      const { user, isAuthenticated } = authStore

      if (!isAuthenticated) return []

      const response = await fetch(`${API_CONFIG.API_URL}/user/${user?.uid}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Jobs API Error : ${response.statusText}`)
      }

      const getJobsPromises = data.jobs.map((jobId: string) => this.getJob(jobId))
      const jobs = await Promise.all(getJobsPromises)

      return formatJobBoard(jobs)
    } catch (error) {
      throw new Error(`Failed to fetch jobs: ${error}`)
    }
  }

  async getJob(id: string): Promise<Job> {
    try {
      const response = await fetch(`${API_CONFIG.API_URL}/jobs/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Jobs API Error : ${response.statusText}`)
      }

      return formatJob(data)
    } catch (error) {
      throw new Error(`Failed to fetch job: ${error}, id: ${id}`)
    }
  }

}

export const jobAPI = new JobAPI()
