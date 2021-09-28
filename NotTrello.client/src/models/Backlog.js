export class Backlog{
  constructor(backlogData){
    this.name = backlogData.name 
    this.description = backlogData.description 
    this.status = backlogData.status 
    this.id = backlogData.id 
    this.projectId = backlogData.projectId 
    this.creatorId = backlogData.creatorId 
    this.creator = backlogData.creator 
    this.color = backlogData.color

  }
}