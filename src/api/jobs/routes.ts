
import { API_CONFIG } from "../config"
import type { Job } from "./types"

class JobAPI {
  async getJobs(): Promise<Job[]> {
    try {
      const response = await fetch(`${API_CONFIG.API_URL}/jobs`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Jobs API Error : ${response.statusText}`)
      }

      return data
    } catch (error) {
      throw new Error(`Failed to fetch jobs: ${error}`)
    }
  }

}

export const jobAPI = new JobAPI()
