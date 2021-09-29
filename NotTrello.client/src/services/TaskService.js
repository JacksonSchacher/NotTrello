import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TaskService {
  async createTask(projectId, taskData) {
    const res = await api.post(`api/projects/${projectId}/tasks`, taskData)
    logger.log('createTask', res)
    AppState.tasks = [...AppState.tasks, new Task(res.data)]
  }
}
export const taskService = new TaskService()
