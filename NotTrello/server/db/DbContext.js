import mongoose, { mongo } from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BacklogItemSchema } from '../models/BacklogItem'
import { NoteSchema } from '../models/Note'
import { ProjectSchema } from '../models/Project'
import { SprintSchema } from '../models/Sprint'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Project = mongoose.model('Project', ProjectSchema);
  BacklogItem = mongoose.model('BacklogItem', BacklogItemSchema);
  Note = mongoose.model('Note', NoteSchema);
  Sprint = mongoose.model('Sprint', SprintSchema);
  Task = mongoose.model('Task', TaskSchema)
}

export const dbContext = new DbContext()
