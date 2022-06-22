<template>

  <div class="card gauge-card flex-row justify-content-between"
       :class="health.status === 'OK' ? 'text-success' :(health.status === 'ERROR' ? 'text-danger' : 'text-warning')">

    <div v-if="health">

      <div class="mb-3 card-title">{{ title.toUpperCase() }}</div>

      <div class="health-value "
           >
        {{ health.status }}
<!--        {{ health.status === 'OK' ? '😃' : (health.status === 'ERROR' ? '😫' : '😐') }}-->
      </div>

    </div>

    <div v-if="faIcon" class="position-absolute  right-0 mx-4 fa-6x icon">
      <font-awesome-icon :icon="'fa-solid ' + faIcon"/>
    </div>

    <div class="d-flex flex-column" v-if="expertMode && healthEndpoint">

      <a class="px-3 position-absolute bottom-0 right-0 mb-4 mx-4"
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


.icon {
  color: rgba(194, 49, 163, 0.44);
}

.health-value {
  font-size: 46pt;
  font-weight: bold;
  margin-bottom: 1rem;
  bottom: 0;
  position: absolute;
  opacity: 0.8;
}

</style>
