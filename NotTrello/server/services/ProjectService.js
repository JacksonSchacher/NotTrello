import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class ProjectService {
  async getProjects(query) {
    const projects = await dbContext.Project.find(query).populate('creator', 'name picture')
    if (!projects) {
      throw new BadRequest('No Projects Found')
    }
    return projects
  }

  async createProject(body) {
    const project = a
    throw new Error('Method not implemented.')
  }

  async deleteProject(projectId, id) {
    throw new Error('Method not implemented.')
  }

  async editProject(projectId, id, body) {
    throw new Error('Method not implemented.')
  }

  async getProjectById(projectId) {
    throw new Error('Method not implemented.')
  }
}
export const projectService = new ProjectService()
