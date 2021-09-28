<template>
    <form @submit.prevent="submitProjectForm">
    <div class="form-group">
    <label for="name" class="">Name:</label>
    <input 
    type="text" 
    class="form-control" 
    name="name" 
    id="name" 
    placeholder="Name..."
    v-model="editable.name" 
    required>
  </div>

   <div class="form-group">
    <label for="description" class="">Description:</label>
    <input 
    type="text" 
    class="form-control" 
    name="description" 
    id="description" 
    placeholder="description..."
    v-model="editable.name" 
    required>
  </div>
  
  <div class="button-group my-3">
    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
  </div>
</form>
</template>
  
  <script>
import { Project } from '../models/Project'
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'


  export default {
    props: {
      projects: {type: Project, default: true}
    },
    setup(props) {
      const editable = ref({})
      watchEffect(() => {
        editable.value = {...props.projects}
      })
      return {
        editable,
        async submitProjectForm(){
          try {
            editable.value.id
            ? await projectsService.editProject(editable.value)
            : await projectsService.createProject(editable.value)
            editable.value = {}
          } catch (error) {
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  
  }
  </script>
  
  <style>
  
  </style>