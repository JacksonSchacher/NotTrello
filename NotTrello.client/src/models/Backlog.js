export class Backlog {
  constructor(backlogData = {}) {
    this.name = backlogData.name
    this.description = backlogData.description
    this.status = backlogData.status
    this.id = backlogData.id
    this.projectId = backlogData.projectId
    this.sprintId = backlogData.sprintId
    this.sprint = backlogData.sprint
    this.creatorId = backlogData.creatorId
    this.creator = backlogData.creator
    this.color = backlogData.color
    this.weightTotal = backlogData.weightTotal
    this.edit = backlogData.edit || false
  }
}
