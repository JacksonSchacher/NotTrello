  <template>
    <form @submit.prevent="submitSprintForm" class="px-3">
    <div class="form-group">
    <label for="name" class="">Sprint Name:</label>
    <input 
    type="text" 
    class="form-control" 
    name="name" 
    id="name" 
    placeholder="Name..."
    v-model="editable.name" 
    required>
  </div>

<br />

  <label for="startDate">Sprint Start Date: </label>
  <br />
  <input 
    type="date" 
    name="startDate"
    id="startDate"
    v-model="editable.startDate"
    required>

<br />
<br />
  
  <label for="startDate">Sprint End Date: </label>
  <br />
  <input 
    type="date" 
    name="endDate"
    id="endDate"
    v-model="editable.endDate"
    required
    >

    <br />
    <br />

  <label for="isOpen">Is this sprint closed? </label>
  <input
  class="ms-2"
  type="checkbox"
  name="isOpen"
  id="isOpen"
  v-model="editable.isOpen"
  >
  
  <div class="button-group my-3">
    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
  </div>
</form>
</template>
  
  <script>
import { ref } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
  export default {
    setup() {
      const route = useRoute()
      const editable = ref({})
      watchEffect(() => {
        editable.value = {}
      })
      return {
        route,
        editable,
        project: computed(() => AppState.projects),
        async submitSprintForm(){
          try {
            // editable.value.id
            // ? await sprintsService.editSprint(editable.value)
            await sprintsService.createSprint(route.params.id, editable.value)
            editable.value = {}
          } catch (error) {
            Pop.toast(error.message, 'error')
            logger.log('create sprint', error.message)
          }
        }
      }
    }
  
  }
  </script>
  
  <style>
  
  </style>