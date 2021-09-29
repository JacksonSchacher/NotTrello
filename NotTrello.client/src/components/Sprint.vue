<template>
  <div class="col-md-6">
    <!-- <h4>{{ sprint.name }}</h4> -->
    one sprint
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
    sprint: { type: Object, required: true }
  },
  setup() {
  }
}
</script>

<style>

</style>
