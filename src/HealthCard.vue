<template>

  <div class="card gauge-card health-card flex-row align-items-center">

    <div class="d-flex gauge-icon align-items-center ">
      <img :src="icon">
    </div>

    <div v-if="health" class="d-flex flex-column card-content justify-content-center">

      <div class=" card-title text-nowrap" @click="openLink">{{ title }}</div>
      <div class="card-description" @click="openLink">{{ description }}</div>

    </div>

    <div v-if="health" class="health-value" @click="openLink"
         :title="health.status === 'OK' ? 'Everything is OK' : 'Warning, please check Expert Mode for more details.'">
      <font-awesome-icon v-if="health.status === 'OK'" icon="fa-solid fa-check"/>
      <font-awesome-icon v-else icon="fa-solid fa-warning" style="margin-top: -2px"/>
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
    'description',
    'icon'
  ],
  methods: {

    openLink() {

      window.open(this.healthEndpoint)

    }

  }
};
</script>

