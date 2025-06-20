import { SchedulerError, type ScheduleStrategy, type Task } from '../common'

export class IntervalStrategy implements ScheduleStrategy {
  private intervalId: NodeJS.Timeout | null = null
  private interval: number

  constructor(interval: number) {
    this.interval = interval
  }

  async schedule(task: Task): Promise<void> {
    const executeTask = async () => {
      try {
        await task.execute()
      } catch (error) {
        const schedulerError = new SchedulerError(`Task ${task.name} execution failed`, 'TASK_EXECUTION_FAILED')
        if (task.onError) {
          task.onError(schedulerError)
        } else {
          console.error(schedulerError.message, schedulerError)
        }
      }
    }

    this.intervalId = setInterval(executeTask, this.interval)
  }

  cancel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
