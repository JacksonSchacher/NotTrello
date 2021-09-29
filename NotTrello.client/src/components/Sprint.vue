<template>
   <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <div class="row">
        <div class="accordion-header col-11" id="flush-headingOne">
          <button class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="true"
                  aria-controls="flush-collapseOne"
          >
            <i class="mdi mdi-folder f-24"></i>

            <h4>{{ sprint.name }}</h4>
          </button>
        </div>
        <div class="d-flex col-1 align-items-center">
          <!-- <i class="mdi mdi-delete f-24 selectable" @click="deleteBacklogItem(backlog.id)"></i> -->
        </div>
      </div>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { Sprint } from '../models/Sprint'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup() {
  }
}
</script>

<style>

</style>
