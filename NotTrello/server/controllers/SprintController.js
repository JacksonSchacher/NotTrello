import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintService } from '../services/SprintService'
import BaseController from '../utils/BaseController'

export class SprintController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .get('', this.getSprints)
      .get('/:sprintId', this.getSprint)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .delete('/:sprintId', this.deleteSprint)
      .put('/:sprintId', this.editSprint)
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintService.getSprints(req.query)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getSprint(req, res, next) {
    try {
      const sprint = await sprintService.getSprintById(req.params.sprintId)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async createSprint(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}
