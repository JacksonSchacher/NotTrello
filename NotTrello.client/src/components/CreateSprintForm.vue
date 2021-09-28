  <template>
    <form @submit.prevent="submitSprintForm">
    <div class="form-group">
    <label for="name" class="">Name:</label>
    <input 
    type="text" 
    class="form-control" 
    name="name" 
    id="name" 
    placeholder="Name..."
    v-model="editable.name" 
    required>
  </div>


  <label for="startDate">Start Date:</label>
  <input 
    type="date" 
    name="startDate"
    id="startDate"
    v-model="editable.startDate"
    required>
  <button class='btn btn-success py-0 ms-3' type='submit'>ok</button>


  
  <label for="startDate">End Date:</label>
  <input 
    type="date" 
    name="endDate"
    id="endDate"
    v-model="editable.endDate"
    required>
  <button class='btn btn-success py-0 ms-3' type='submit'>ok</button>
  
  <div class="button-group my-3">
    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
  </div>
</form>
</template>
  
  <script>
import { Sprint } from '../models/Sprint'
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
  export default {
    props: {
      sprints: {type: Sprint, default: true}
    },
    setup(props) {
      const editable = ref({})
      watchEffect(() => {
        editable.value = {...props.sprints}
      })
      return {
        editable,
        async submitSprintForm(){
          try {
            editable.value.id
            ? await sprintsService.editSprint(editable.value)
            : await sprintsService.createSprint(editable.value)
            editable.value = {}
          } catch (error) {
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  
  }
  </script>
  
  <style>
  
  </style>