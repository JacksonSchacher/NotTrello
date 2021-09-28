import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TaskService {
  async editTask(taskId, id, body) {
    const task = await this.getTaskById(taskId)
    if (id !== task.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Edit')
    }
    task.name = body.name || task.name
    task.weight = body.weight || task.weight
    task.completedOn = body.completedOn || task.completedOn
    task.completed = body.completed || task.completed
    await task.save()
    return task
  }

  async deleteTask(taskId, id) {
    const task = await this.getTaskById(taskId)
    if (id !== task.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Delete')
    }
    await task.remove()
    return task
  }

  async createTask(body) {
    const task = await dbContext.Task.create(body)
    return task
  }

  async getTaskById(taskId) {
    const task = await dbContext.Task.findById(taskId).populate('creator', 'name picture')
    if (!task) {
      throw new BadRequest('Invalid Task Id')
    }
    return task
  }

  async getTasks(query) {
    const tasks = await dbContext.Task.find(query).populate('creator', 'name picture')
    if (!tasks) {
      throw new BadRequest('No Tasks Found')
    }
    return tasks
  }
}
export const taskService = new TaskService()
