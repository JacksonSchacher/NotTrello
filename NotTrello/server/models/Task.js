import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
  backlogItemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'BacklogItem' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  completedOn: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Profile' }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('backlogItem', {
  localField: 'backlogItemId',
  foreignField: '_id',
  justOne: true,
  ref: 'BacklogItem'
})
// TaskSchema.virtual('project', {
//   localField: 'projectId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Project'
// })
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TaskSchema.virtual('assignedTo', {
  localField: 'assignedToId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
