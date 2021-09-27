import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectService } from '../services/ProjectService'

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
      .get('/:projectId', this.getProject)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .delete('/:projectId', this.deleteProject)
      .put('/:projectId', this.editProject)
  }
<<<<<<< HEAD

  async deleteProject(req, res, next) {
    try {
      const project = await projectService.deleteProject(req.params.projectId, req.userInfo.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async editProject(req, res, next) {
    try {
      const project = await projectService.editProject(req.params.projectId, req.userInfo.id, req.body)
    } catch (error) {
      next(error)
    }
  }

=======
>>>>>>> 4c4cce1c3b0c3723c9299734193268afac1eb4bb
  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectService.createProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectService.getProjects(req.query)
      res.send(projects)
    } catch (error) {

    }
  }

  async getProject(req, res, next) {
    try {
      const project = await projectService.getProjectById(req.params.projectId)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
<<<<<<< HEAD
}
=======
async deleteProject(req, res, next) {
  try {
    await projectService.deleteProject()
  } catch (error) {
  }
}
}
>>>>>>> 4c4cce1c3b0c3723c9299734193268afac1eb4bb
