export enum JobStatus {
  Saved = 'saved',
  Applied = 'applied',
  Interview = 'interview',
  Rejected = 'rejected',
}

export interface Job {
  id: string
  title: string
  company: string
  status: JobStatus
}

export interface JobBoard {
  id: JobStatus
  icon: string
  jobs: Job[]
}
