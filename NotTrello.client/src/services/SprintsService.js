import { AppState } from '../AppState'
import { Sprint } from '../models/Sprint'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('getSprints', res)
    AppState.sprints = res.data.map(s => new Sprint(s))
    logger.log('appstate sprints', AppState.sprints)
  }

  async createSprint(projectId, sprint) {
    const res = await api.post(`api/projects/${projectId}/sprints`, sprint)
    AppState.sprints = [...AppState.sprints, new Sprint((res.data))]
    logger.log('create sprints', res)
  }

  async editSprint(projectId, sprint) {
    const res = await api.put(`api/projects/${projectId}/sprints/${sprint.id}`, sprint)
    AppState.sprints = new Sprint(res.data)
    logger.log('edit sprints', res)
  }

  async deleteSprint(projectId, sprintId) {
    const res = await api.delete(`api/projects/${projectId}/sprints/${sprint.id}`)
    AppState.sprints = null
    AppState.sprints.filter(s => s.id !== sprintId)
  }
}
export const sprintsService = new SprintsService()
