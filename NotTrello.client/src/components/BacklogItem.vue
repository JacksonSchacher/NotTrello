<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <div class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
        >
          <i class="mdi mdi-folder f-24"></i>

          <h4>{{ backlog.name }}</h4>
          <div>Sprints go here</div>
          <i class="mdi mdi-weight">595</i>
        </button>
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
import { Backlog } from '../models/Backlog'
export default {
  props: {
    backlog: { type: Backlog, required: true }
  }

}
</script>

<style>

</style>
