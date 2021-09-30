import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TaskService {
  async createTask(projectId, taskData) {
    const res = await api.post(`api/projects/${projectId}/tasks`, taskData)
    logger.log('createTask', res)
    AppState.tasks = [...AppState.tasks, new Task(res.data)]
    this.setWeight()
  }

  setWeight(backlogId) {
    let tasksWeight = 0
    let tasks = []
    tasks = AppState.tasks.filter(t => t.backlogItemId === backlogId)
    for (let i = 0; i < tasks.length; i++) {
      tasksWeight += tasks[i].weight
    }
    AppState.backlogs.weightTotal = tasksWeight
    logger.log('Set Weight', AppState.backlogs.totalWeight)
  }

  async getTasks(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`)
    logger.log('Got Tasks', res)
    AppState.tasks = res.data.map(t => new Task(t))
    this.setWeight()
  }
}
export const taskService = new TaskService()
