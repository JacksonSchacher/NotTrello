<template>
  <form @submit.prevent="createBacklogItem">
    <!-- Status Buttons -->
    <div class="button-group">
    </div>
    <div class="btn-group" role="group" aria-label="Toggle Status Buttons">
      <input type="radio"
             class="btn-check"
             name="status"
             id="pending"
             value="pending"
             checked
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="pending">Pending</label>

      <input type="radio"
             class="btn-check"
             name="status"
             id="in-progress"
             value="in-progress"
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="in-progress">In-Progress</label>

      <input type="radio"
             class="btn-check"
             name="status"
             id="review"
             value="review"
             v-model="editable.status"
      >
      <label class="btn btn-outline-primary" for="review">Review</label>
      <input type="radio"
             class="btn-check"
             name="status"
             id="done"
             value="done"
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
    <!-- Colors -->
    <div class="form-group mt-3">
      <div class="" role="group" aria-label="Toggle Status Buttons">

        
        <input type="radio"
               class="btn-check"
               name="status"
               id="dark"
               value="dark"
               v-model="editable.color"
        >
        <label class="btn btn-color" for="dark">Dark</label>
    

        <input type="radio"
               class="btn-check"
               name="color"
               id="red"
               value="red"
               v-model="editable.color"
        >
        <label class="btn btn-color" for="red">Red</label>

        <input type="radio"
               class="btn-check"
               name="color"
               id="orange"
               value="orange"
               v-model="editable.color"
        >
        <label class="btn btn-color" for="orange">Orange</label>

        <input type="radio"
               class="btn-check"
               name="color"
               id="yellow"
               value="yellow"
               v-model="editable.color"
        >
        <label class="btn btn-color" for="yellow">Yellow</label>

        <input type="radio"
               class="btn-check"
               name="color"
               id="green"
               value="green"
               v-model="editable.color"
        >
        <label class="btn btn-color" for="green">Green</label>

        <input type="radio"
               class="btn-check"
               name="color"
               id="blue"
               value="blue"
               v-model="editable.color"
        >
       <label class="btn btn-color" for="blue">Blue</label>

        <input type="radio"
               class="btn-check"
               name="color"
               id="purple"
               value="purple"
               v-model="editable.color"
        >
         <label class="btn btn-color" for="purple">Purple</label>
        
        <input type="radio"
               class="btn-check"
               name="color"
               id="light"
               value="light"
               v-model="editable.color"
        >
        <label class="btn btn-color" for="light">Light</label>
      </div>
    </div>
    <button type="submit" class="btn btn-success">
      Create Item
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { backlogService } from '../services/BacklogService'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createBacklogItem() {
        try {
          await backlogService.createBacklogItem(route.params.id, editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
input[type="radio"]+ label{
border: 5px solid transparent;
transition: all .15s linear;
}
input[type="radio"]:checked + label{

 border: 5px solid rgba(1, 1, 2, 0.329);
}
.btn-color {
  width: 40%;
  margin:.25rem;
}
.btn-color[for="dark"] {
  background: var(--dark-bg-grad);
  color:white;
}
.btn-color[for="red"] {
  background: var(--red-bg-grad);
}
.btn-color[for="orange"] {
  background: var(--orange-bg-grad);
}
.btn-color[for="yellow"] {
  background: var(--yellow-bg-grad);
}
.btn-color[for="green"] {
  background: var(--green-bg-grad);
}
.btn-color[for="blue"] {
  background: var(--blue-bg-grad);
}
.btn-color[for="purple"] {
  background: var(--purple-bg-grad);
}
.btn-color[for="light"] {
  background: var(--light-bg-grad);
}
.dropdown-menu {
  width: 19vw;
}
</style>
