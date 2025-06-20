import { Task, Scheduer, ScheduleStrategy, SchedulerError } from './common'

export class TaskScheduler implements Scheduer {
  private task: Task
  private strategy: ScheduleStrategy
  private _isRunning = false

  constructor(task: Task, strategy: ScheduleStrategy) {
    this.task = task
    this.strategy = strategy
  }

  isRunning(): boolean {
    return this._isRunning
  }

  start(): void {
    if (this._isRunning === false) {
      try {
        this.strategy.schedule(this.task)
        this._isRunning = true
      } catch (error) {
        const schedulerError = new SchedulerError(
          `Failed to start scheduler for task ${this.task.name}`,
          'SCHEDULER_START_FAILED',
        )
        if (this.task.onError) {
          this.task.onError(schedulerError)
        } else {
          console.error(schedulerError.message, error as Error)
        }
      }
    }
  }

  pause(): void {
    if (this._isRunning) {
      try {
        this.strategy.cancel()
        this._isRunning = false
      } catch (error) {
        const schedulerError = new SchedulerError(
          `Failed to pause scheduler for task ${this.task.name}`,
          'SCHEDULER_PAUSE_FAILED',
        )
        if (this.task.onError) {
          this.task.onError(schedulerError)
        }
      }
    }
  }

  cancel(): void {
    this.pause()
  }
}
