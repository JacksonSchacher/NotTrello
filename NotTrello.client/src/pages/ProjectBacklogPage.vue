<template>
  <div class="card bg-dark">
    <div class="col-2">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#BacklogItem-modal">
        Create Backlog Item
      </button>
    </div>
    <div class="backlog-item" v-for="b in backlogs" :key="b.id">
      <BacklogItem :backlog="b" />
    </div>
  </div>

  <Modal id="BacklogItem-modal">
    <template #modal-title>
      Add New Backlog Item
    </template>
    <template #modal-body>
      <BacklogForm />
    </template>
  </Modal>
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
