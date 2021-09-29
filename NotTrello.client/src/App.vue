<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-color">
    <router-view />
  </main>
  <footer>
    
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.bg-color{
background: #b9bef8;
background: linear-gradient(90deg, #b9bef8 20%, #61efff 80%);
// background-color: linear-gradient(90deg, hsla(236, 82%, 85%, 1) 0%, hsla(186, 100%, 69%, 1) 100%);
}

</style>
