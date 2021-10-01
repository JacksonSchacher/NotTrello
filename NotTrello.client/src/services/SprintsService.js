import { AppState } from '../AppState'
import { Sprint } from '../models/Sprint'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('Got Sprints', res)
    AppState.sprints = res.data.map(s => new Sprint(s))
  }

  async setSprint(sprintId) {
    AppState.currentSprint = AppState.sprints.find(s => s.id === sprintId)
  }

  async createSprint(projectId, sprint) {
    const res = await api.post(`api/projects/${projectId}/sprints`, sprint)
    AppState.sprints = [...AppState.sprints, new Sprint((res.data))]
  }

  async editSprint(projectId, sprint) {
    const res = await api.put(`api/projects/${projectId}/sprints/${sprint.id}`, sprint)
    const foundIndex = AppState.sprints.findIndex(i => i.id === sprint.id)
    const updatedSprint = new Sprint(res.data)
    AppState.sprints.splice(foundIndex, 1, updatedSprint)
    AppState.currentSprint = updatedSprint
  }

  async deleteSprint(projectId, sprintId) {
    const res = await api.delete(`api/projects/${projectId}/sprints/${sprintId}`)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
  }
}
export const sprintsService = new SprintsService()
