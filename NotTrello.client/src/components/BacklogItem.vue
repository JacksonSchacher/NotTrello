<template>
  <div class="container-fluid p-0 accordian accordion-flush" id="accordionFlushExample">
        <div class="row accordion-header m-0 p-0 justify-content-around" id="flush-headingOne">
          <button class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#backlog-'+backlog.id"
                  aria-expanded="true"
                  aria-controls="flush-collapseOne"
          >

            <div class="col-md-4">
            <i class="mdi mdi-folder f-20">{{ backlog.name }}</i>
            </div>
      

            <div class="col-md-2">
            <span class="px-2"> {{ backlog.weightTotal }}<i class="mdi mdi-weight f-20 px-2"></i></span>
             </div>
            
            <div class="col-md-4">
              <button class="btn custom-button mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#backlogDetails-modal"
                      @click="getCurrentBacklogId(backlog.id)"
              >
                <i class="mdi mdi-eye pe-2"></i>Details
              </button>
            
              <button data-bs-toggle="modal"
                      class="btn custom-button"
                      data-bs-target="#Task-modal"
                      @click="getCurrentBacklogId(backlog.id)"
              >
                + Add Task
              </button>
               </div>
          
          <div class="col-md-4">
            <span>
              Tasks Completed
             <!-- TODO add counter for tasks completed -->
            </span>
          </div>

          </button>

        </div>

        </div>
      

      <div :id="'backlog-'+backlog.id" class="task accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div v-for="t in tasks" :key="t.id">
            <Task :task="t" />
          </div>
        </div>
      </div>


  <Modal id="Task-modal">
    <template #modal-title>
      Create Task
    </template>
    <template #modal-body>
      <TaskForm />
    </template>
  </Modal>

  <Modal id="backlogDetails-modal">
    <template #modal-title>
      <div v-if="account.id == backlog.creatorId" >
      {{ backlog.name }} Details <i class="mdi mdi-pencil selectable" @click="editDetails(backlog.edit)"></i>
      <i class="mdi mdi-delete selectable" @click="deleteBacklogItem(backlog.id)"></i>
      </div>
    </template>
    <template #modal-body>
      <BacklogDetails />
    </template>
  </Modal>

</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Backlog } from '../models/Backlog'
import { backlogService } from '../services/BacklogService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: {
    backlog: { type: Backlog, required: true }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.backlog.id)),
      sprint: computed(() => AppState.sprints.filter(s => s.sprintId === props.backlog.sprintId)),
      async deleteBacklogItem(backlogId) {
        try {
          await backlogService.deleteBacklogItem(route.params.id, backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getCurrentBacklogId(backlogId) {
        try {
          await backlogService.setBacklog(backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      editDetails(backlogEditable) {
        if (backlogEditable) {
          AppState.currentBacklog.edit = false
        } else {
          AppState.currentBacklog.edit = true
        }
        logger.log('Edit Details', props.backlog.edit)
      }
    }
  }

}
</script>

<style scoped lang="scss">
@media only screen and (max-width: 768px) {
     .hidden-text {
       display: none;
     }
}

.custom-button{
   border: solid #BABEF8;
}
.custom-button:hover{
  border: solid #29ADF8;
  background-color: rgba(0, 0, 0, 0.192);
  color: white;
}
.task{
  background-color: rgba(0, 0, 0, 0.616);
  color: white;
  backdrop-filter: blur(4px);
}
</style>
