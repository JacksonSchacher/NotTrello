import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class TasksService{
  async getTasks(query) {
    const tasks = await dbContext.Task.find(query).populate('creator', 'name picture')
    if(!tasks) {
      throw new BadRequest('No Task Found')
    }
    return tasks
  }
  async getTaskById(taskId) {
    const tasks = await dbContext.Task.findById(taskId).populate('creator', 'name picture')
    if(!tasks) {
      throw new BadRequest('Invalid Task Id')
    }
    return tasks
  }
  async createTask(body) {
    const tasks = await dbContext.Task.create(body)
    return tasks
  }
  async deleteTask(taskId, userId) {
    const tasks = await this.getTaskById(taskId)
    if(userId !== tasks.creatorId.toString()){
    throw new Forbidden('Not Authorized to Delete')
  }
  await tasks.remove()
  return tasks 
}
async editTask(taskId, userId, taskData) {
  const tasks = await this.getTaskById(taskId)
  if (userId !== tasks.creatorId.toString()) {
    throw new Forbidden('Not Authorized to Edit')
  }
  tasks.name = taskData.name || tasks.name
  tasks.weight = taskData.weight || tasks.weight
  tasks.completedOn = taskData.completedOn || tasks.completedOn
  tasks.assignedTo = taskData.assignedTo || tasks.assignedTo
  
  await tasks.save()
  return tasks
}


}
export const tasksService = new TasksService()