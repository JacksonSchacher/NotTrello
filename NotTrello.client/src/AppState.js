import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  /** @type {import('.model/Sprint.js').Sprint[]} */
  sprints: [],
  /** @type {import('.model/Project.js').Project[]} */
  projects: [],
  currentProject: null,
  /** @type {import('.model/Backlog.js').Backlog[]} */
  backlogs: []
  /** @type {import('.model/Sprint.js').Sprint[]} */
})
