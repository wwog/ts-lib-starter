import { SchedulerError, type ScheduleStrategy, type Task } from '../common'

/**
 * @description 一次性延迟执行
 * @description_en One-time delay execution
 */
export class TimerStrategy implements ScheduleStrategy {
  private timeoutId: NodeJS.Timeout | null = null
  private delay: number

  constructor(delay: number) {
    this.delay = delay
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

    this.timeoutId = setTimeout(executeTask, this.delay)
  }

  cancel(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }
}
