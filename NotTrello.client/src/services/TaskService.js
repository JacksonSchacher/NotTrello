import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TaskService {
  async createTask(projectId, backlogId) {
    const res = await api.post(`api/projects/${projectId}/tasks`)
    logger.log('createTask', res)
  }
}
export const taskService = new TaskService()
