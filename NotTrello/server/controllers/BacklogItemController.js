import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService'

export class BacklogItemController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlog')
    this.router
      .get('', this.getBacklogItems)
      .get('/:backlogItemId', this.getBacklogItemById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklogItem)
      .put('/:backlogItemId', this.editBacklogItem)
      .delete('/:backlogItemId', this.deleteBacklogItem)
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItems({ projectId: req.params.projectId })
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItemById(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemsById(req.params.backlogItemId)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async createBacklogItem(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.createBacklogItem(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlog = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.userInfo.id, req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async deleteBacklogItem(req, res, next) {
    try {
      const backlog = await backlogItemsService.deleteBacklogItem(req.params.backlogItemId, req.userInfo.id)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }
}
