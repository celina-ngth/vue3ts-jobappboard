import { JobStatus, type JobBoard } from "./types"

export const formatJobBoard = (data: any): JobBoard[] => {
  const jobs = data ?? []
  const savedJobs = jobs.filter((job: any) => job.status === 'saved')
  const appliedJobs = jobs.filter((job: any) => job.status === 'applied')
  const interviewJobs = jobs.filter((job: any) => job.status === 'interview')
  const rejectedJobs = jobs.filter((job: any) => job.status === 'rejected')

  return [
    {
      id: JobStatus.Saved,
      icon: 'Sparkles',
      jobs: savedJobs.map((job: any) => ({
        id: job.id,
        company: job.company,
        title: job.title
      }))
    },
    {
      id: JobStatus.Applied,
      icon: 'FileCheck',
      jobs: appliedJobs.map((job: any) => ({
        id: job.id,
        company: job.company,
        title: job.title
      }))
    },
    {
      id: JobStatus.Interview,
      icon: 'BriefcaseBusiness',
      jobs: interviewJobs.map((job: any) => ({
        id: job.id,
        company: job.company,
        title: job.title
      }))
    },
    {
      id: JobStatus.Rejected,
      icon: 'ThumbsDown',
      jobs: rejectedJobs.map((job: any) => ({
        id: job.id,
        company: job.company,
        title: job.title
      }))
    }
  ]
}
