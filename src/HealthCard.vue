<template>

  <div class="card gauge-card flex-row justify-content-between">

    <div v-if="health" class="d-flex flex-column">

      <div class="mb-3 card-title text-nowrap">{{ title.toUpperCase() }}</div>

      <div class="gauge-value "
           :title="health.status === 'OK' ? 'Everything is OK' : 'Warning, please check Expert Mode for more details.'"
           :class="health.status === 'OK' ? 'text-success' :(health.status === 'ERROR' ? 'text-warning' : 'text-warning')">
        <font-awesome-icon v-if="health.status === 'OK'" icon="fa-solid fa-check"/>
        <font-awesome-icon v-else icon="fa-solid fa-warning"/>
        <!--        {{ health.status === 'OK' ? '😃' : (health.status === 'ERROR' ? '😫' : '😐') }}-->
      </div>

    </div>

    <div v-if="faIcon && !expertMode" class="  fa-5x d-flex gauge-icon align-items-center">
      <font-awesome-icon :icon="'fa-solid ' + faIcon"/>
    </div>

    <div v-else-if="icon && !expertMode" class=" fa-5x d-flex gauge-icon align-items-center">
      <img :src="icon" width="80">
    </div>

    <div class="card-title d-flex flex-column header-button" v-if="expertMode && healthEndpoint">

      <a class=" "
         :href="healthEndpoint"
         target="_blank">RAW</a>

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
  methods: {}
};
</script>

<style lang="css">


.gauge-icon {
  color: #cdcdcd;
  opacity: 0.6;
}

.gauge-value {
  font-size: 46pt;
  font-weight: bold;
  opacity: 0.8;
}

.gauge-card {
  width: 100%;
}

</style>
