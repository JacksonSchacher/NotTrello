<template>
  <div class="card">
    <div class="row">
      <img :src="note.creator.picture" alt=""><h4>{{ note.creator.name }}</h4>
    </div>
    <div class="row">
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>

<script>
import { Notes } from '../models/Notes'
export default {
  props: {
    note: { type: Notes, required: true }
  },
  setup() {
    return {

    }
  }

}
</script>

<style>

</style>
