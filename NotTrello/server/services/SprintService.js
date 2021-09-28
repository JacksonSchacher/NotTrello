import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintService {
 
  async getSprints(query) {
    const sprints = await dbContext.Sprint.find(query).populate('creator', 'name picture')
    if (!sprints) {
      throw new BadRequest('No Sprints Found')
    }
    return sprints
  }
  async getSprintById(sprintId) {
    const sprint = await dbContext.Sprint.findById(sprintId).populate('creator', 'name picture')
    if (!sprint) {
      throw new BadRequest('Invalid Sprint Id')
    }
    return sprint
  }
  async createSprint(body) {
    const sprint = await dbContext.Sprint.create(body)
    return sprint
  }

  async deleteSprint(sprintId, id) {
    const sprint = await this.getSprintById(sprintId)
    if (id !== sprint.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Delete')
    }
    await sprint.remove()
    return sprint
  }
  
  async editSprint(sprintId, id, body) {
    const sprint = await this.getSprintById(sprintId)
    if (id !== sprint.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Edit')
    }
    sprint.name = body.name || sprint.name
    sprint.startDate = body.startDate || sprint.startDate
    sprint.endDate = body.endDate || sprint.endDate
    sprint.isOpen = body.isOpen || sprint.isOpen
    await sprint.save()
    return sprint
  }

}
export const sprintService = new SprintService()
