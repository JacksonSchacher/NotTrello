import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint', required: false },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    color: { type: String }
  }
)

BacklogItemSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

BacklogItemSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})

BacklogItemSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  justOne: true,
  ref: 'Sprint'
})
