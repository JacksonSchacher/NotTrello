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

  setWeight() {
    let tasksWeight = 0
    let tasks = []
    for (let i = 0; i < AppState.backlogs.length; i++) {
      tasks = AppState.tasks.filter(t => t.backlogItemId === AppState.backlogs[i].id)
      for (let i = 0; i < tasks.length; i++) {
        tasksWeight += tasks[i].weight
      }
      AppState.backlogs[i].weightTotal = tasksWeight
      tasksWeight = 0
    }
    AppState.backlogs.weightTotal = tasksWeight
    logger.log('Set Weight', AppState.backlogs)
  }

  async getTasks(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`)
    logger.log('Got Tasks', res)
    AppState.tasks = res.data.map(t => new Task(t))
    this.setWeight()
  }

  async checkTask(projectId, taskId, taskData) {
    const res = await api.put(`api/projects/${projectId}/tasks/${taskId}`, taskData)
    logger.log('if checkbox', res.data)
    logger.log('taskData', taskData)
  }

  async deleteTask(projectId, taskId) {
    const res = await api.delete(`api/projects/${projectId}/tasks/${taskId}`)
    logger.log('Deleted Task', res)
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
    this.setWeight()
  }
}
export const taskService = new TaskService()
