<template>
  <form @submit.prevent="createTask">
    <div class="form-group">
      <label for="name"></label>
      <input type="text"
             class="form-control"
             name="name"
             id="name"
             placeholder="Task Name"
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="weight"></label>
      <input type="number"
             class="form-control"
             name="weight"
             id="weight"
             placeholder="0"
             v-model="editable.weight"
             required
      >
    </div>
    <button class="mt-3 btn btn-success" type="submit">
      Add Task
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { taskService } from '../services/TaskService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})

    return {
      editable,
      async createTask() {
        try {
          editable.value.backlogItemId = AppState.currentBacklog.id
          await taskService.createTask(route.params.id, editable.value)
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
