<template>
  <div class="container-fluid mb-3">
    <div class="row py-2 mb-4 bg-dark">
      <ul class="nav-links mb-0 d-flex align-items-center">
        <router-link :to="{name:'Project.Backlog'}">
          <li class="nav-link">
            Backlog
          </li>
        </router-link>
        <router-link :to="{name:'Project.Sprint'}">
          <li class="nav-link">
            Sprint
          </li>
        </router-link>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'Project',
  setup() {
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.project),
      backlog: computed(() => AppState.backlogs)
    }
  }
}
</script>

<style>

</style>
