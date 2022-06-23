<template>

  <div class="card gauge-card flex-row justify-content-between">

    <div class="d-flex flex-column">

      <div class="mb-3 card-title text-nowrap" >{{ title.toUpperCase() }}</div>

      <div class="gauge-value" v-if="value || value ===0">
        {{ value }}
      </div>
      <img v-else height="40" width="40"
           src="https://media3.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e478m15g7rgia18ipg9menvhnn4ahik4vcjd5zzr33r&rid=giphy.gif&ct=s"/>

    </div>

  </div>

</template>

<script>


export default {
  props: [
    'value',
    'title'
  ],
  methods: {

  }
};
</script>

<style lang="css">


.gauge-icon {
  color: #cdcdcd;
  opacity: 0.6;
}

.gauge-value {
  font-size: 29pt;
  font-weight: bold;
  opacity: 0.8;
}

.gauge-card {
  width: 100%;
  height: 100%;
}

.gauge-card .card-title {
  cursor: pointer;
}

</style>
