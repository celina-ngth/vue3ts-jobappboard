import { JobStatus, type Job, type JobBoard } from "./types"

export const formatJobBoard = (data: Job[]): JobBoard[] => {
  const jobs = data.map((job: Job) => formatJob(job)) ?? []
  const savedJobs = jobs.filter((job: Job) => job.status === JobStatus.Saved)
  const appliedJobs = jobs.filter((job: Job) => job.status === JobStatus.Applied)
  const interviewJobs = jobs.filter((job: Job) => job.status === JobStatus.Interview)
  const rejectedJobs = jobs.filter((job: Job) => job.status === JobStatus.Rejected)

  return [
    {
      id: JobStatus.Saved,
      icon: 'Sparkles',
      jobs: savedJobs
    },
    {
      id: JobStatus.Applied,
      icon: 'FileCheck',
      jobs: appliedJobs
    },
    {
      id: JobStatus.Interview,
      icon: 'BriefcaseBusiness',
      jobs: interviewJobs
    },
    {
      id: JobStatus.Rejected,
      icon: 'ThumbsDown',
      jobs: rejectedJobs
    }
  ]
}

export const formatJob = (job: Job): Job => {
  return {
    id: job.id,
    company: job.company,
    title: job.title,
    status: job.status
  }
}