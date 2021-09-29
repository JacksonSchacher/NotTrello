<template>
  <div class="container-fluid">
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
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { backlogService } from '../services/BacklogService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await backlogService.getBacklogs(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs)
    }
  }
}
</script>

<style>

</style>
