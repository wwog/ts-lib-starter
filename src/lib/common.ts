export interface Task {
  id: string
  name: string
  execute: () => Promise<void> | void
  priority?: number
  onError?: (error: SchedulerError) => void
}

export interface Scheduer {
  start(): void
  pause(): void
  cancel(): void
  isRunning(): boolean
}

export interface ScheduleStrategy {
  schedule(task: Task): void
  cancel(): void
}

export class SchedulerError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'SchedulerError'
  }
}
