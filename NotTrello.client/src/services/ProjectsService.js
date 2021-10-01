import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService.js'

class ProjectsService {
  async getProjects() {
    const res = await api.get('api/projects/')
    AppState.projects = res.data.map(p => new Project(p))
  }

  async getProjectById(projectId) {
    const res = await api.get(`api/projects/${projectId}`)
    AppState.currentProject = new Project(res.data)
  }

  async createProject(project) {
    const res = await api.post('api/projects', project)
    AppState.projects.push(new Project(res.data))
    return res.data.id
  }

  async editProjects(project) {
    const res = await api.put('api/projects', project)
    AppState.projects = new Project(res.data)
  }

  async deleteProject(projectId) {
    const res = await api.delete('api/projects/' + projectId)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}
export const projectsService = new ProjectsService()
