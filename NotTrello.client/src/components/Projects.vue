<template>
  <div class="card-body">
    <div class="row justify-content-between mx-5">
      <div class="col-2">
    <p>{{ project.name }}</p>
      </div>
      <div class="col-2 offset-4">
    <p>{{ new Date(project.createdAt).toDateString() }}</p>
      </div>
    </div>
</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Project } from '../models/Project.js'
import { AppState } from '../AppState.js'

export default {
  props: {
    project: { type: Project, required: true } 
  },
  setup(props) {
    return {
    }
}
}
</script>

<style scoped lang="scss">
</style>