<template>
  <form>
    <div class="button-group">
    </div>
    <div class="btn-group" role="group" aria-label="Toggle Status Buttons">
      <input type="radio"
             class="btn-check"
             name="status"
             id="pending"
             autocomplete="off"
             checked
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="pending">Pending</label>

      <input type="radio"
             class="btn-check"
             name="status"
             id="in-progress"
             autocomplete="off"
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="in-progress">In-Progress</label>

      <input type="radio"
             class="btn-check"
             name="status"
             id="review"
             autocomplete="off"
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="review">Review</label>
      <input type="radio"
             class="btn-check"
             name="status"
             id="done"
             autocomplete="off"
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="done">Done</label>
    </div>
    <div class="form-group">
      <label for="name"></label>
      <input type="text"
             class="form-control"
             name="name"
             id="name"
             placeholder="Backlog Description"
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="description"></label>
      <input type="text"
             class="form-control"
             name="description"
             id="description"
             placeholder="Backlog Description"
             v-model="editable.description"
             required
      >
    </div>
    <div class="form-group">
      <label for="color"></label>
      <input type="text"
             class="form-control"
             name="description"
             id="description"
             placeholder="Backlog Description"
             v-model="editable.description"
             required
      >
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const editable = ref({})
    return {
      editable
    }
  }
}
</script>

<style>

</style>
