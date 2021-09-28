import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async deleteNote(noteId, id) {
    const note = await this.getNoteById(noteId)
    if (id !== note.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Delete')
    }
    await note.remove()
    return note
  }

  async createNote(body) {
    const note = await dbContext.Note.create(body)
    await note.populate('creator', 'name picture')
    return note
  }

  async getNoteById(noteId) {
    const note = await dbContext.Note.findById(noteId).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Note Id')
    }
    return note
  }

  async getNotes(query) {
    const notes = await dbContext.Note.find(query).populate('creator', 'name picture')
    if (!notes) {
      throw new BadRequest('No Notes Found')
    }
    return notes
  }
}
export const notesService = new NotesService()
