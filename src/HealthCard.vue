<template>

  <div class="card gauge-card flex-row justify-content-between">

    <div v-if="health" class="d-flex flex-column">

      <div class="mb-3 card-title">{{ title.toUpperCase() }}</div>

      <div class="gauge-value "
           :class="health.status === 'OK' ? 'text-success' :(health.status === 'ERROR' ? 'text-danger' : 'text-warning')">
        {{ health.status }}
<!--        {{ health.status === 'OK' ? '😃' : (health.status === 'ERROR' ? '😫' : '😐') }}-->
      </div>

    </div>

    <div v-if="faIcon && !expertMode" class=" mx-4 fa-5x d-flex gauge-icon align-items-center">
      <font-awesome-icon :icon="'fa-solid ' + faIcon"/>
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
  props: ['health', 'expertMode', 'healthEndpoint', 'title', 'faIcon'],
  methods: {}
};
</script>

<style lang="css">


.gauge-icon {
  color: #eee;
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
