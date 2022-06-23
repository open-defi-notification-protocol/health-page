<template>

  <div class="card gauge-card health-card flex-row justify-content-between">

    <div v-if="health" class="d-flex flex-column">

      <div class="mb-3 card-title text-nowrap" @click="openLink">{{ title.toUpperCase() }}</div>

      <div class="gauge-value "
           :title="health.status === 'OK' ? 'Everything is OK' : 'Warning, please check Expert Mode for more details.'"
           :class="health.status === 'OK' ? 'text-success' :(health.status === 'ERROR' ? 'text-warning' : 'text-warning')">
        <font-awesome-icon v-if="health.status === 'OK'" icon="fa-solid fa-check"/>
        <font-awesome-icon v-else icon="fa-solid fa-warning"/>
        <!--        {{ health.status === 'OK' ? '😃' : (health.status === 'ERROR' ? '😫' : '😐') }}-->
      </div>

    </div>

    <div v-if="faIcon" class="  fa-5x d-flex gauge-icon align-items-center">
      <font-awesome-icon :icon="'fa-solid ' + faIcon"/>
    </div>

    <div v-else-if="icon" class=" fa-5x d-flex gauge-icon align-items-center">
      <img :src="icon" width="80">
    </div>

  </div>

</template>

<script>


export default {
  props: [
    'health',
    'expertMode',
    'healthEndpoint',
    'title',
    'faIcon',
    'icon'
  ],
  methods: {

    openLink() {

      window.open(this.healthEndpoint)

    }

  }
};
</script>

<style lang="css">

.gauge-icon {
  color: #cdcdcd;
  opacity: 0.6;
  margin-right: 1rem;
}

.health-card .gauge-value {
  font-size: 46pt;
  font-weight: bold;
  opacity: 0.8;
  margin-left: 0.5rem;
}

.health-card.gauge-card {
  width: 100%;
}

.health-card.gauge-card .card-title {
  cursor: pointer;
}

</style>
