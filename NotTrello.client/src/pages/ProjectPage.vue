<template>
  <div class="container-fluid mb-3">
    <div class="row py-2 mb-4 bg-dark">
      <ul class="nav-links mb-0 d-flex align-items-center justify-content-around">
        <router-link :to="{name:'Project.Backlog'}">
          <li class="nav-link">
            Backlog
          </li>
        </router-link>
        <router-link :to="{name:'Project.Sprint'}">
          <li class="nav-link">
            Sprint
          </li>
        </router-link>
        <li class="nav-link">
      {{ currentProject.name }}
      <i class="mdi mdi-delete f-15 selectable ms-2" @click="deleteProject(currentProject.id)"></i>
      </li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { router } from '../router'

export default {
  name: 'Project',
  setup() {
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.project),
      backlog: computed(() => AppState.backlogs),
      currentProject: computed(() => AppState.currentProject),
       async deleteProject(currentProjectId) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) { return }
          await projectsService.deleteProject(currentProjectId)
          router.push({ name: 'Home' })
        } catch (error) {
          logger.log('delteProject in Project.vue', error.message)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
