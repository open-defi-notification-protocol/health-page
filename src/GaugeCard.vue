<template>

  <div class="card gauge-card flex-column justify-content-center">

    <div class="card-title d-flex justify-content-center text-nowrap">{{ title }}</div>

    <div class="gauge-value d-flex justify-content-center">
      <span v-if="value || value ===0">{{ value }}</span>
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
  methods: {}
};
</script>
