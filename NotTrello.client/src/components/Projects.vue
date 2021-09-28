<template>
<div class="col-md-6">
{{ projects.name }}
  
</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Project } from '../models/Project.js'
import { AppState } from '../AppState.js'

export default {
  props: {
    projects: { type: Project, required: true }
  },
  setup(props) {
    return {
      project: computed(() => AppState.projects)
      }
    }
}
</script>

<style scoped lang="scss">
</style>