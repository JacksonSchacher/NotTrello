<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <div class="row">
        <div class="accordion-header col-11" id="flush-headingOne">
          <button class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#sprint-' + sprint.id"
                  aria-expanded="true"
                  aria-controls="flush-collapseOne"
          >
            <i class="mdi mdi-folder f-24 mb-2"></i>

            <h4>{{ sprint.name }}</h4>
          </button>
        </div>
        <div class="d-flex col-1 align-items-center text-dark">
          <i class="mdi mdi-delete f-24 selectable" @click="deleteSprint(sprint.id)"></i>
        </div>
      </div>
      <div :id="'sprint-'+sprint.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      async deleteSprint(sprintId) {
        try {
          await sprintsService.deleteSprint(route.params.id, sprintId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
