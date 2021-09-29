import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogService {
  async getBacklogs(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('backlog res', res)
    AppState.backlogs = res.data.map(b => new Backlog(b))
    logger.log('backlog', AppState.backlogs)
  }

  async createBacklogItem(projectId, formData) {
    const res = await api.post(`api/projects/${projectId}/backlog`, formData)
    logger.log(res)
    AppState.backlogs = [...AppState.backlogs, new Backlog(res.data)]
  }

  async deleteBacklogItem(projectId, backlogId) {
    const res = await api.delete(`api/projects/${projectId}/backlog/${backlogId}`)
    logger.log('Deleted Backlog Item', res)
    AppState.backlogs = AppState.backlogs.filter(b => b.id !== backlogId)
  }
}
export const backlogService = new BacklogService()
