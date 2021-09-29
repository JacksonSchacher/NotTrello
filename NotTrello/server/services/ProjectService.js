import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class ProjectService {
  async getProjects(query) {
    const projects = await dbContext.Project.find(query).populate('creator', 'name picture')
    if (!projects) {
      throw new BadRequest('No Projects Found')
    }
    return projects
  }

  async createProject(body) {
    const project = await dbContext.Project.create(body)
    await project.populate('creator', 'name picture')
    return project
  }

  async deleteProject(projectId, id) {
    const project = await this.getProjectById(projectId)
    if (id !== project.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Delete')
    }
    await project.remove()
    return project
  }

  async editProject(projectId, id, body) {
    const project = await this.getProjectById(projectId)
    if (id !== project.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Edit')
    }
    project.name = body.name || project.name
    project.description = body.description || project.description
    await project.save()
    return project
  }

  async getProjectById(projectId) {
    const project = await dbContext.Project.findById(projectId).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }
}
export const projectService = new ProjectService()
