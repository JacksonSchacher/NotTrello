import { Auth0Provider } from '@bcwdev/auth0provider'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'

export class TaskController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .get('', this.getTasks)
      .get('/:taskId', this.getTask)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .delete('/:taskId', this.deleteTask)
      .put('/:taskId', this.editTask)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasks({ projectId: req.params.projectId })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTask(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.taskId)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await taskService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const task = await taskService.deleteTask(req.params.taskId, req.userInfo.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      const task = await taskService.editTask(req.params.taskId, req.userInfo.id, req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

}
