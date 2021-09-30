<template>
  <div class="row py-2 justify-content-between">
    <div class="col-4 d-flex align-items-center">
      <input type="checkbox">
      <h5 class="ms-3">
        {{ task.name }}
      </h5>
    </div>
    <div class="col-4 d-flex align-items-center justify-content-center">
      {{ task.weight }}
      <i class="mdi mdi-weight f-20 ps-2"></i>
    </div>
    <div class="col-4 d-flex justify-content-end">
      <i class="mdi mdi-delete f-20 selectable"></i>
    </div>
  </div>
</template>

<script>
import { Task } from '../models/Task'
export default {
  props: {
    task: { type: Task, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style>

</style>
