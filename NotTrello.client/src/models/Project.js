export class Project{
  constructor(projectData){
    this.name = projectData.name 
    this.description = projectData.description
    this.creatorId = projectData.creatorId
    this.id = projectData.id
  }
}