<template>
  <div class="container-fluid">
    <div class="row py-2 mt-2">

      <div class="col-md-10">
        <h4 class="ms-5">Projects:</h4>
      </div>
      <div class="col-md-2">
            <button class="btn projectButton" data-bs-toggle="modal" data-bs-target="#createProject-modal">
                Create Project
            </button>
      </div>
    </div>
  </div>

<div class="container-fluid" v-for="p in projects" :key="p.id">
<Projects :project="p"/>
</div>

    <Modal id="createProject-modal">
      <template #modal-title>
       Create Project
      </template>
      <template #modal-body>
        <CreateProjectForm />
      </template>
    </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { Project } from '../models/Project'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  // props: {
  //  project: { type: Project, required: true } },
  setup() {
    const route = useRoute()

  onMounted( async () => {
      try {
       await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log(error.message)
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.projectButton{
  border: solid #10a1b1;
  color: #10a1b1;
}
</style>
