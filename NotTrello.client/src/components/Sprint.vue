<template>
  <div class="col-md-6">
    <h4>{{ sprint.name }}</h4>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { Sprint } from '../models/Sprint'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    sprint: { type: Sprint, required: true }
  },
  setup() {
  }
}
</script>

<style>

</style>
