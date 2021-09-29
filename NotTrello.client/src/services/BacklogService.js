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
}
export const backlogService = new BacklogService()
