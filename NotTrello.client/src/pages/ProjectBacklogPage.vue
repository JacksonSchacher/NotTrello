<template>
  <div class="card bg-dark">
    <div class="backlog-item" v-for="b in backlogs" :key="b.id">
      <BacklogItem :backlog="b" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      backlogs: computed(() => AppState.backlogs)
    }
  }
}
</script>

<style>

</style>
