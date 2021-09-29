<template>
  <form @submit.prevent="submitProjectForm">
    <div class="form-group">
      <label for="name" class="">Name:</label>
      <input
        type="text"
        class="form-control bg-white"
        name="name"
        id="name"
        placeholder="Name..."
        v-model="editable.name"
        required
      >
    </div>

    <div class="form-group mt-4">
      <label for="description" class="">Description:</label>
      <input
        type="text"
        class="form-control description bg-white"
        name="description"
        id="description"
        placeholder="description..."
        v-model="editable.description"
        required
      >
    </div>

    <div class="button-group my-3">
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
        Create
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { AppState } from '../AppState'
import { router } from '../router'

export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = {}
    })
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.projects),
      editable,
      async submitProjectForm() {
        try {
          // editable.value.id
          // await projectsService.editProject(editable.value)
          const newProject = await projectsService.createProject(editable.value)
          router.push({ name: 'Project.Backlog', params: { id: newProject } })
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log();
        }
      }
    }
  }
}
</script>

  <style scoped lang="scss">
  .description{
    height: 6rem;
  }
  </style>
