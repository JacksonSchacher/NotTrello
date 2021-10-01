<template>
  <div class="row py-2 text-white justify-content-between">
    <div class="col-4 d-flex align-items-center">
      <input @change="checked()" v-model="editable.isComplete" type="checkbox">
      <h5 class="ms-3">
        {{ task.name }}
      </h5>
    </div>
    <div class="col-4 d-flex align-items-center justify-content-center">
      {{ task.weight }}
      <i class="mdi mdi-weight f-20 ps-2"></i>
    </div>
    <div class="col-4 d-flex justify-content-end">
      <i class="mdi mdi-delete f-20 selectable" @click="deleteTask(task.id)"></i>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { Task } from '../models/Task'
import { taskService } from '../services/TaskService'
import Pop from '../utils/Pop'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
export default {
  props: {
    task: { type: Task, required: true }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = props.task
    })
    return {
      editable,
      async deleteTask(taskId) {
        try {
          await taskService.deleteTask(route.params.id, taskId)
          Pop.toast('Deleted Task', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async checked() {
        try {
          await taskService.checkTask(route.params.id, props.task.id, editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log('checked', error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
