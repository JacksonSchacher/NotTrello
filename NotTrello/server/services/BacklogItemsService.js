import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class BacklogItemsService{
  async getBacklogItems(query) {
    const backlogItem = await dbContext.BacklogItem.find(query).populate('creator', 'name picture')
    return backlogItem
    }
    async getBacklogItemsById(backlogItemId){
      const backlogItem = await dbContext.BacklogItem.findById(backlogItemId).populate('creator', 'name picture')
      if(!backlogItem){
        throw new BadRequest('Invalid BacklogItem Id')
      }
      return backlogItem
    }
  async createBacklogItem(itemData) {
    const backlogItem = await dbContext.BacklogItem.create(itemData)
    return backlogItem
  }
  async deleteBacklogItem(backlogItemId, userId) {
    const backlogItem = await this.getBacklogItemsById(backlogItemId)
    if(userId !== backlogItem.creatorId.toString()) {
    throw new Forbidden ('You do not have authorization')
    }
    await backlogItem.remove()
    return backlogItem
  }

  async editBacklogItem(backlogItemId, userId, itemData) {
    const backlogItem = await this.getBacklogItemsById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden('You do not have authorization')
    }
    backlogItem.name = itemData.name || backlogItem.name
    backlogItem.description = itemData.description || backlogItem.description
    backlogItem.status = itemData.status || backlogItem.status
    backlogItem.color = itemData.color || backlogItem.color
    backlogItem.sprintId = itemData.sprintId || backlogItem.sprintId

    await backlogItem.save()
    return backlogItem
  }
}
export const backlogItemsService = new BacklogItemsService()