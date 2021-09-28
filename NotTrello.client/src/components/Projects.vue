<template>
<div class="row">
<div class="col-md-6">
<p>{{ project.name }}</p>
<div class="col-md-6">
<p>{{ project.description }}</p>
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