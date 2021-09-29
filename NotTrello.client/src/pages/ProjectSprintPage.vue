<template>
  <div class="container-fluid bg-color">
    <div class="row">
      <div class="col-8 m-auto">
        <div class="card shadow">
          <div class="row justify-content-between mx-2">
            <div class="col-4 py-2 text-light">
              <h4>{{ currentProject.name }} Sprints</h4>
              <p>{{ currentProject.description }}</p>
            </div>
            <div class="col-2 align-self-end py-2">
               <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Sprint-modal">
                 Create New Sprint
              </button>
            </div>
          </div>
          <div class="sprint">
             <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
          </div>
        </div>
      </div>
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
      currentProject: computed(() => AppState.currentProject)
      // project: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  background-color: rgba(0, 0, 0, 0.616);
  color: white;
  backdrop-filter: blur(4px);
}
.bg-color{
background-color: linear-gradient(90deg, hsla(236, 82%, 85%, 1) 0%, hsla(186, 100%, 69%, 1) 100%);
}
</style>
