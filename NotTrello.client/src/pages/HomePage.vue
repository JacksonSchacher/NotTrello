<template>
  <div class="container-fluid">
    <div class="row py-2 mt-2">
    <div class="col-10 offset-1">
  <div class="card px-4">
  <div class="row justify-content-between my-4">
    <div class="col-2">
      <h4 class="text-center"> Projects </h4>
    </div>
    <div class="col-2">
     <button class="btn projectButton" data-bs-toggle="modal" data-bs-target="#createProject-modal">
      Create Project
      </button>
    </div>
    </div>
    <div class="card-header">
      <div class="row justify-content-between mx-5">
    <div class="col-2">
      <h6 class="ms-3">Name:</h6>
      </div>
      <div class="col-2 offset-4">
      <h6> Started On: </h6>
      </div>
      </div>
  </div>
<Projects v-for="p in projects" :key="p.id" :project="p"/>
</div>
</div>
    </div>
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
