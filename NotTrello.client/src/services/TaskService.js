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
    for (let i = 0; i < AppState.tasks.length; i++) {
      if (AppState.tasks[i].backlogItemId === backlogId) {
        tasksWeight += AppState.tasks[i].weight
      }
    }
    AppState.backlogs.totalWeight = tasksWeight
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
