import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { Notes } from '../models/Notes'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogService {
  async getBacklogs(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    AppState.backlogs = res.data.map(b => new Backlog(b))
  }

  async createBacklogItem(projectId, formData) {
    const res = await api.post(`api/projects/${projectId}/backlog`, formData)
    AppState.backlogs = [...AppState.backlogs, new Backlog(res.data)]
  }

  async editDetails(projectId, backlogId, detailsData) {
    const res = await api.put(`api/projects/${projectId}/backlog/${backlogId}`, detailsData)
    const foundIndex = AppState.backlogs.findIndex(i => i.id === backlogId)
    const updatedBacklog = new Backlog(res.data)
    AppState.backlogs.splice(foundIndex, 1, updatedBacklog)
    AppState.currentBacklog = updatedBacklog
  }

  async deleteBacklogItem(projectId, backlogId) {
    const res = await api.delete(`api/projects/${projectId}/backlog/${backlogId}`)
    AppState.backlogs = AppState.backlogs.filter(b => b.id !== backlogId)
  }

  async setBacklog(backlogId) {
    AppState.currentBacklog = AppState.backlogs.find(b => b.id === backlogId)
  }

  async addNote(projectId, noteData) {
    const res = await api.post(`api/projects/${projectId}/notes`, noteData)
    AppState.notes = [...AppState.notes, new Notes(res.data)]
  }

  async getNotes(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    AppState.notes = res.data.map(n => new Notes(n))
  }

  async deleteNote(projectId, noteId) {
    const res = await api.delete(`api/projects/${projectId}/notes/${noteId}`)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}
export const backlogService = new BacklogService()
