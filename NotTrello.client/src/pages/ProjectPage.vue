<template>
  <div class="container-fluid mb-3">
    <div class="row pt-2 top-bar" style="background-color: rgba(0, 0, 0, 0.616);">
      <ul class="nav nav-links d-flex align-items-center justify-content-around">
         <p class="text-light mt-2">
      <b>
      {{ currentProject.name }}
      </b>
      <i class="mdi mdi-delete f-15 selectable ms-2" @click="deleteProject(currentProject.id)"></i>
      </p>

          
        <router-link :to="{name:'Project.Backlog'}">
          <li class="nav-link">
            Backlog
          </li>
        </router-link>
          

          <div v-for="s in sprints" :key="s.id" :sprint="s" >
        <router-link :to="{name:'Project.Sprint'}">
           <li class="nav-link">
             {{ s.name }}
           </li>
        </router-link>
          </div>

          <button class="btn create-button" data-bs-toggle="modal" data-bs-target="#Sprint-modal">
                 New Sprint +
              </button>

      </ul>
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
  <router-view />
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { router } from '../router'
import { useRoute } from 'vue-router'
import { sprintsService } from '../services/SprintsService'

export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await sprintsService.getSprints(route.params.id)
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log('getSprints', error.message)
      }
    })
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.project),
      backlog: computed(() => AppState.backlogs),
      sprints: computed(() => AppState.sprints),
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

<style scoped lang="scss">
.nav-link{
  text-transform: uppercase;
}
 .nav-links .router-link-exact-active{
  background-color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-bottom: 7px;
 }
 .hoverable {
  cursor: pointer;
}
.create-button{
  color: white;  
}
.create-button:hover{
  background-color: rgba(0, 0, 0, 0.192);
  color: white;
}
</style>
