import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { Notes } from '../models/Notes'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogService {
  async getBacklogs(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('backlog res', res)
    AppState.backlogs = res.data.map(b => new Backlog(b))
    logger.log('backlog', AppState.backlogs)
  }

  setWeight(projectId) {

  }

  async createBacklogItem(projectId, formData) {
    const res = await api.post(`api/projects/${projectId}/backlog`, formData)
    logger.log(res)
    AppState.backlogs = [...AppState.backlogs, new Backlog(res.data)]
  }

  async editDetails(projectId, backlogId, detailsData) {
    const res = await api.put(`api/projects/${projectId}/backlog/${backlogId}`, detailsData)
    logger.log('Edit Details', res.data)
  }

  async deleteBacklogItem(projectId, backlogId) {
    const res = await api.delete(`api/projects/${projectId}/backlog/${backlogId}`)
    logger.log('Deleted Backlog Item', res)
    AppState.backlogs = AppState.backlogs.filter(b => b.id !== backlogId)
  }

  async setBacklog(backlogId) {
    AppState.currentBacklog = AppState.backlogs.find(b => b.id === backlogId)
    logger.log('set Backlog', AppState.currentBacklog)
  }

  async addNote(projectId, noteData) {
    const res = await api.post(`api/projects/${projectId}/notes`, noteData)
    logger.log('Added Note', res)
    AppState.notes = [...AppState.notes, new Notes(res.data)]
  }

  async getNotes(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log('Got Notes', res)
    AppState.notes = res.data.map(n => new Notes(n))
  }

  async deleteNote(projectId, noteId) {
    const res = await api.delete(`api/projects/${projectId}/notes/${noteId}`)
    logger.log('Deleted Note', res)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}
export const backlogService = new BacklogService()
