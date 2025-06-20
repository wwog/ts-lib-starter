import { CounterId } from './utils'
import { TaskScheduler } from './taskScheduler'
import { SchedulerError, ScheduleStrategy, Task } from './common'

export interface RegisterOptions {
  name: string
  execute: () => Promise<void> | void
  strategy: ScheduleStrategy
  priority?: number
  onError?: (error: SchedulerError) => void
}

export class TaskManager {
  private tasks: Map<string, TaskScheduler> = new Map()
  private counterId = new CounterId()

  registerTask(options: RegisterOptions): string {
    const { name, execute, strategy, priority, onError } = options
    try {
      const task: Task = {
        id: this.counterId.next(),
        name,
        priority: priority ?? 0,
        execute,
        onError,
      }
      const scheduler = new TaskScheduler(task, strategy)
      this.tasks.set(task.id, scheduler)
      return task.id
    } catch (_error) {
      const schedulerError = new SchedulerError(`Failed to register task ${name}`, 'TASK_REGISTRATION_FAILED')
      throw schedulerError
    }
  }

  startTask(taskId: string): void {
    const scheduler = this.tasks.get(taskId)
    if (scheduler) {
      scheduler.start()
    } else {
      const error = new SchedulerError(`Task ${taskId} not found`, 'TASK_NOT_FOUND')
      throw error
    }
  }

  pauseTask(taskId: string): void {
    const scheduler = this.tasks.get(taskId)
    if (scheduler) {
      scheduler.pause()
    } else {
      const error = new SchedulerError(`Task ${taskId} not found`, 'TASK_NOT_FOUND')
      throw error
    }
  }

  cancelTask(taskId: string): void {
    const scheduler = this.tasks.get(taskId)
    if (scheduler) {
      scheduler.cancel()
      this.tasks.delete(taskId)
    } else {
      const error = new SchedulerError(`Task ${taskId} not found`, 'TASK_NOT_FOUND')
      throw error
    }
  }
}
