export class Notes {
  constructor(notesData) {
    this.body = notesData.body
    this.backlogItemId = notesData.backlogItemId
    this.projectId = notesData.projectId
    this.creatorId = notesData.creatorId
  }
}
