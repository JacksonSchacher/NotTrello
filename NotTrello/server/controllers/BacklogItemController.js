import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from "../services/BacklogItemsService";

export class BacklogItemController extends BaseController{
  constructor(){
    super('api/projects/:projectId/backlog')
    this.router
    .get('', this.getBacklogItems)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createBacklogItem)
    .put('/:backlogItemId', this.editBacklogItem)
    .delete('/:backlogItemId', this.deleteBacklogItem)
  }
async getBacklogItems(req, res, next) {
    try {
      await backlogItemsService.getBacklogItems()
    } catch (error) {
      next(error)
    }
      }
async createBacklogItem(req, res, next) {
try {
  await backlogItemsService.createBacklogItem()
} catch (error) {
  next(error)
}
  }
  async editBacklogItem(req, res, next) {
    try {
    await backlogItemsService.editBacklogItem()
  } catch (error) {
    next(error)
  }
  }
  async deleteBacklogItem(req, res, next) {
    try {
      await backlogItemsService.deleteBacklogItem()
    } catch (error) {
      next(error)
    } 
  }
}
