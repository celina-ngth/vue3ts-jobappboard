
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

  async addJob(job: Job, uid: string | undefined) {
    if (!uid) return

    const getUserResponse = await fetch(`${API_CONFIG.API_URL}/user/${uid}`)
    const data = await getUserResponse.json()

    const [jobResponse, updateUserResponse] = await Promise.all([
      fetch(`${API_CONFIG.API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      }),
      fetch(`${API_CONFIG.API_URL}/user/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobs: [...data?.jobs, job.id],
        }),
      }),
    ])

    if (!jobResponse.ok || !updateUserResponse.ok) {
      throw new Error(
        `Jobs API Error : ${jobResponse.statusText} ${updateUserResponse.statusText}`
      )
    }
  }

  async updateJob(job: Job) {
    if (!job) return

    const response = await fetch(`${API_CONFIG.API_URL}/jobs/${job.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    })

    if (!response.ok) {
      throw new Error(`Jobs API Error : ${response.statusText}`)
    }
  }

  async deleteJob(id: string, uid: string | undefined) {
    if (!uid) return

    const getUserResponse = await fetch(`${API_CONFIG.API_URL}/user/${uid}`)
    const data = await getUserResponse.json()

    const [jobResponse, updateUserResponse] = await Promise.all([
      fetch(`${API_CONFIG.API_URL}/jobs/${id}`, {
        method: 'DELETE',
      }),
      fetch(`${API_CONFIG.API_URL}/user/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobs: [...data?.jobs.filter((jobId: string) => jobId !== id)],
        }),
      }),
    ])

    if (!jobResponse.ok || !updateUserResponse.ok) {
      throw new Error(`Jobs API Error : ${jobResponse.statusText} ${updateUserResponse.statusText}`)
    }
  }
}

export const jobAPI = new JobAPI()