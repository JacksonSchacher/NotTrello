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
             placeholder="Backlog Item Name"
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
      <!-- <label for="color"></label>
      <input type="text"
             class="form-control"
             name="description"
             id="description"
             placeholder="Backlog Description"
             v-model="editable.description"
             required
      > -->
      <div class="btn-group dropend">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Dropright
        </button>
        <ul class="dropdown-menu">
          <input class="btn btn-color" type="button" value="dark">
          <input class="btn btn-color" type="button" value="red">
          <input class="btn btn-color" type="button" value="orange">
          <input class="btn btn-color" type="button" value="yellow">
          <input class="btn btn-color" type="button" value="green">
          <input class="btn btn-color" type="button" value="blue">
          <input class="btn btn-color" type="button" value="purple">
          <input class="btn btn-color" type="button" value="light">
        </ul>
      </div>
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

<style scoped lang="scss">
.btn-color {
  width: 50%;
}
// .btn-color[value="dark"] {
//   background: $dark-bg-grad;
// }
// .btn-color[value="red"] {
//   background-color: var(--red-bg-grad);
// }
// .btn-color[value="orange"] {
//   background-color: var(--orange-bg-grad);
// }
// .btn-color[value="yellow"] {
//   background-color: var(--yellow-bg-grad);
// }
// .btn-color[value="green"] {
//   background-color: var(--green-bg-grad);
// }
// .btn-color[value="blue"] {
//   background-color: var(--blue-bg-grad);
// }
// .btn-color[value="purple"] {
//   background-color: var(--purple-bg-grad);
// }
// .btn-color[value="light"] {
//   background-color: var(--light-bg-grad);
// }
.dropdown-menu {
  width: 19vw;
}
</style>
