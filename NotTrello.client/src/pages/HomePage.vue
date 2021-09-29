<template>
  <div class="container-fluid">
    <div class="row py-2 mt-2">
    <div class="col-10 offset-1">
  <div class="card shadow px-4 m-5">
  <div class="row justify-content-between my-4 mx-5">
    <div class="col-3">
      <h4 class="mt-2 project"> Projects </h4>
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
      <h6>Name:</h6>
      </div>
      <div class="col-2">
        <h6>Members:</h6>
      </div>
      <div class="col-2">
      <h6> Started On:</h6>
      </div>
      </div>
  </div>
<Projects v-for="p in projects" :key="p.id" :project="p"/>
</div>
<footer>
  </footer>
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
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { Project } from '../models/Project'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {

  onMounted( async () => {
      try {
       await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log('getProjects onMounted' ,error.message)
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
    }
  }
}
</script>

<style scoped lang="scss">
.projectButton{
  border: solid #BABEF8;
  color: white;  
}
.projectButton:hover{
  border: solid #29ADF8;
  background-color: rgba(0, 0, 0, 0.192);
  color: white;
}
.card{
backdrop-filter: blur(4px);
background-color: rgba(0, 0, 0, 0.616);
color: white;
}
.card-header{
background-color: rgba(255, 255, 255, 0);
color: white;
}
.project{
  text-shadow: 2px 2px 4px #000000;
  font-size: 45px;
}
</style>
