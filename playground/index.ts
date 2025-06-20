import { TaskManager, TimerStrategy } from '../src'

const taskManager = new TaskManager()

const task1 = taskManager.registerTask({
  name: 'task1',
  execute: async () => {
    console.log('task1')
  },
  strategy: new TimerStrategy(1000),
})

const task2 = taskManager.registerTask({
  name: 'task2',
  execute: async () => {
    console.log('task2')
    taskManager.startTask(task1)
  },
  strategy: new TimerStrategy(1000),
})

async function main() {
  taskManager.startTask(task2)

  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })
}

await main()
