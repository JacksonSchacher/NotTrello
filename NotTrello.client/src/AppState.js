import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  /** @type {import('.model/Sprint.js').Sprint[]} */
  sprints: [],
  currentSprint: {},
  /** @type {import('.model/Project.js').Project[]} */
  projects: [],
  currentProject: {},
  /** @type {import('.model/Backlog.js').Backlog[]} */
  backlogs: [],
  /** @type {import('.model/Task.js').Task[]} */
  tasks: [],
  currentBacklog: {},
  /** @type {import('.model/Notes.js').Notes[]} */
  notes: []
})
