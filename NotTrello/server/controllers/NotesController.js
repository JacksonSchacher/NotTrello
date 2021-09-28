import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .get('', this.getNotes)
      .get('/:noteId', this.getNote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes({ projectId: req.params.projectId })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getNote(req, res, next) {
    try {
      const note = await notesService.getNoteById(req.params.noteId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await notesService.deleteNote(req.params.noteId, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
