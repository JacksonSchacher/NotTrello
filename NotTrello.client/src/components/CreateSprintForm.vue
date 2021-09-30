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
  <div>
  <label class="date-container" for="startDate">Sprint Start Date: {{new Date(editable.startDate).toDateString()}}
 <i class="mdi mdi-calendar selectable"></i>
  <input 
    type="date" 
    name="startDate"
    id="startDate"
    v-model="editable.startDate"
    >
     </label>
  </div>

<br />
<br />
  
  <div>
  <label class="date-container" for="endDate">Sprint End Date: {{new Date(editable.endDate).toDateString()}} 
     <i class="mdi mdi-calendar selectable"></i>
  <input 
    type="date" 
    name="endDate"
    id="endDate"
    v-model="editable.endDate"
    >
    </label>
  </div>

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
  
  <div class="button-group my-3" v-if="editable.id">
    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Update</button>
  </div>
    <div class="button-group my-3" v-else>
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
import { Sprint } from '../models/Sprint'
  export default {
props: {
  sprint: {type: Sprint, default: ()=> new Sprint() }
},
    setup(props) {
      const route = useRoute()
      const editable = ref({})
      watchEffect(() => {
        editable.value = { ...props.sprint }
        logger.log('updating sprint info', props.sprint, editable.value)
      })
      return {
        route,
        editable,
        project: computed(() => AppState.projects),
        async submitSprintForm(){
          try {
            if (editable.value.id) {
              await sprintsService.editSprint(route.params.id, editable.value)
            } else{
            await sprintsService.createSprint(route.params.id, editable.value)
            editable.value = {}
            }
          } catch (error) {
            Pop.toast(error.message, 'error')
          }
          
        }
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .date-container{
    position: relative;
    display: block;
  }

 input[type="date"]{
  border: none;
  opacity: 0;
  pointer-events: none;
  &::-webkit-calendar-picker-indicator {
    pointer-events: all;
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
 }  
  </style>