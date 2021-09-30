export class Sprint {
  constructor(sprintData ={}) {
    this.name = sprintData.name
    this.startDate = sprintData.startDate
    this.endDate = sprintData.endDate
    this.id = sprintData.id
    this.projectId = sprintData.projectId
    this.creatorId = sprintData.creatorId
    this.isOpen = sprintData.isOpen
  }
  
  // formatDate(rawDate){
  //   let date = new Date(rawDate)
  //   return date.getMonth() + "/" + date.getDate() + "/" + date.getYear()
  // }
}
