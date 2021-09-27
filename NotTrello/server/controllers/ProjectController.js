import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectService } from "../services/ProjectService";

export class ProjectController extends BaseController {
  constructor(){
    super('api/projects')
    this.router 
    .get('', this.getProjects)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createProject)
    .delete('/:projectId', this.deleteProject)

  }
  async deleteProject(req, res, next) {
    try {
      await projectService.deleteProject()
    } catch (error) {
    }
  }
  async createProject(req, res, next) {
    try {
      await projectService.createProject()
    } catch (error) {
      
    }
  }
  async getProjects(req, res, next) {
    try {
      await projectService.getProjects()
    } catch (error) {
      
    }
  }
}