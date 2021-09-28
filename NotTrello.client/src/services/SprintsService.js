import { AppState } from "../AppState"
import { Sprint } from "../models/Sprint"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService{

async getSprints(projectId){
  AppState.sprints = []
  const res = await api.get(`api/projects/${projectId}/sprints`)
  AppState.sprints = res.data.map(s => new Sprint(s))
}

async getSprintsById(projectId, sprintId){
  AppState.sprints = null
  const res = await api.get(`api/projects/${projectId}/sprints/${sprintId}`)
  AppState.sprints = new Sprint(res.data)
}
async createSprints(projectId, sprint){
const res = await api.post(`api/projects/${projectId}/sprints`, sprint)
AppState.sprints.push(new Sprint(res.data))
logger.log('create sprints', res)
}
async editSprints(projectId, sprint){
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