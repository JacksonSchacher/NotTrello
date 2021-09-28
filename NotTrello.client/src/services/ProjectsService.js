import { AppState } from "../AppState"
import { Project } from "../models/Project"
import { logger } from "../utils/Logger"
import { convertToQuery } from "../utils/Query"
import { api } from './AxiosService.js'

class ProjectsService{
  async getProjects(){
    const res = await api.get('api/projects/')
    logger.log(res)
    AppState.projects = res.data.map(p => new Project(p))
  }
  
  async getProjectById(projectId){
    const res = await api.get(`api/projects/${projectId}`)
    AppState.projects = new Project(res.data)
  }
  async createProject(project){
  const res = await api.post('api/projects', project)
  AppState.projects.push(new Project(res.data))
  logger.log('create project', res)
  logger.log(AppState.projects)
  }
  async editProjects(project){
    const res = await api.put('api/projects', project)
    AppState.projects = new Project(res.data)
    logger.log('edit project', res)
  }
  
  async deleteSprint(projectId, sprintId) {
    const res = await api.delete(`api/projects/${projectId}/sprints/${sprint.id}`)
    AppState.sprints = null
    AppState.sprints.filter(s => s.id !== sprintId)
  }
  }
  export const projectsService = new ProjectsService()