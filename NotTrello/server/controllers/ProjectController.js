import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectService } from '../services/ProjectService'
import { query } from 'express'

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

  async editProject(req, res, next) {
    try {
      const project = await projectService.editProject(req.params.projectId, req.userInfo.id, req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

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
      const projects = await projectService.getProjects({ creatorId: req.userInfo.id })
      res.send(projects)
    } catch (error) {
      next(error)
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

  async deleteProject(req, res, next) {
    try {
      const project = await projectService.deleteProject(req.params.projectId, req.userInfo.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
