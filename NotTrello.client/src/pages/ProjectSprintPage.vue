<template>
  <div class="container-fluid">
    <div class="row">
       <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Sprint-modal">
          Create New Sprint
        </button>
      <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
      <div>{{sprints}}</div>
    </div>
  </div>

    <Modal id="Sprint-modal">
      <template #modal-title>
        Add Sprint
      </template>
      <template #modal-body>
        <CreateSprintForm />
      </template>
    </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
export default {
  name: 'Sprint',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.getSprints(route.params.id)
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log('getSprints onMounted', error.message)
      }
    })
    return {
      route,
      sprints: computed(() => AppState.sprints),
      // project: computed(() => AppState.projects)
    }
  }
}
</script>

<style>

</style>
