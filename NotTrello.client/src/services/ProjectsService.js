import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService.js'

class ProjectsService {
  async getProjects() {
    const res = await api.get('api/projects/')
    logger.log(res)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async getProjectById(projectId) {
    const res = await api.get(`api/projects/${projectId}`)
    AppState.currentProject = new Project(res.data)
    logger.log('GetProjectId RES', res)
    logger.log('GET Project By Id', AppState.currentProject)
  }

  async createProject(project) {
    logger.log('creat project before', project)
    const res = await api.post('api/projects', project)
    AppState.projects.push(new Project(res.data))
    logger.log('create project', res)
    logger.log('create project, appstate.projects', AppState.projects)
    return res.data.id
  }

  async editProjects(project) {
    const res = await api.put('api/projects', project)
    AppState.projects = new Project(res.data)
    logger.log('edit project', res)
  }

  async deleteProject(projectId) {
    const res = await api.delete('api/projects/' + projectId)
    logger.log('delete project in service', res)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}
export const projectsService = new ProjectsService()
