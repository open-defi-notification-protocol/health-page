<template>

  <div>

    <img
        src="https://static.wixstatic.com/media/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg/v1/fill/w_1400,h_400,al_c/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg"
        class="background"/>

    <div class="logo">

      <img
          src="https://play-lh.googleusercontent.com/1bxBSz9Aj_TESC9mUjs7c365PNvfHm8TUA8L1iMNOxcQpXi2zhUAsqQyhc4VEAKr938U=s360-rw"/>
      <h1 class="my-3">DeFi Notifications</h1>
      <img src="./assets/logo.svg"/>

    </div>

    <div style="display: flex; flex-direction: column;" v-if="health">

      <h3 class="px-3 pt-3 title">
        Open DeFi Notifications Health
      </h3>
      <div style="display: flex; flex-direction: column" class=" p-3 ">

        <div style="display: flex; ">

          <span class="my-2"> Server health: </span>
          <div v-if="!error" class="m-2 fw-bold"
               :class="health.status === 'OK' ? 'green' : 'red'"> {{ health.status }}
            {{ health.status === 'OK' ? '😁' : '😫' }}
          </div>

          <div v-else class="m-2 fw-bold red"> {{ error }} 😫
          </div>

          <span class="my-2"> Server uptime: </span>
          <div class="m-2 fw-bold"> {{ [health.uptime, 'seconds'] | duration('humanize') }}</div>

        </div>

      </div>

      <div v-if="health.errors.length > 0">

        <div class=" px-3 ">Errors</div>
        <table class="common-table" style="">
          <thead style="font-weight: bold;">
          <td>
            Type
          </td>
          <td>
            Loop
          </td>
          <td>
            info
          </td>
          </thead>
          <tbody>
          <tr v-for="error of health.errors" :key="error"
              :class="error.level > 0 ? (error.level > 1 ? 'red' : 'orange') :'' ">

            <td>
              {{ error.type }}
            </td>
            <td>
              {{ error.loop }}
            </td>
            <td>
              {{ error.info }}
            </td>

          </tr>

          </tbody>

        </table>

        <br/>

      </div>

      <div class=" px-3 ">Loops Status</div>
      <table class="common-table" style="" v-if="health.loops">
        <thead style="font-weight: bold;">
        <td>
          Loop
        </td>
        <td>
          State
        </td>
        <td>
          Error count
        </td>
        <td>
          Last Completed
        </td>
        <td>
          Count
        </td>
        <td>
          Elapsed (ms)
        </td>
        </thead>
        <tbody>
        <tr v-for="key in Object.keys(health.loops)" :key="key">

          <td>
            {{ key }}
          </td>
          <td style="">
            {{ health.loops[key].started === 'idle' ? 'idle' : 'running' }}
          </td>
          <td style="text-align: right;"
              :class="getColorClass(health.loops[key].errors, health.loopErrorsThreshold)">
            {{ health.loops[key].errors }}
          </td>
          <td style="text-align: right;">
            {{ new Date(health.loops[key].lastCompleted).toLocaleString() }}
          </td>
          <td style="text-align: right;">
            {{ health.loops[key].count }}
          </td>
          <td style="text-align: right;"
              :class="getColorClass(health.loops[key].elapsedTimeMillis, health.loopSlowThresholdMillis )">
            {{ health.loops[key].elapsedTimeMillis }}
          </td>

        </tr>

        </tbody>

      </table>

      <br/>


      <div class=" px-3 ">Global Thresholds</div>
      <table class="common-table" style="" v-if="health.networks">
        <thead style="font-weight: bold;">
        <td>
          Slow Threshold
        </td>
        <td>
          Stuck Threshold
        </td>
        <td>
          Unsuccessful Threshold
        </td>
        <td>
          Errors Threshold
        </td>
        </thead>
        <tbody>
        <tr v-for="network in Object.values(health.networks)" :key="network.id">

          <td>
            {{ [health.loopSlowThresholdMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="">
            {{ [health.loopStuckThresholdMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ [health.loopUnsuccessfulThresholdMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ health.loopErrorsThreshold }}
          </td>

        </tr>

        </tbody>

      </table>

      <br/>
      <div class=" px-3 ">Networks Parameters</div>
      <table class="common-table" style="" v-if="health.networks">
        <thead style="font-weight: bold;">
        <td>
          Network
        </td>
        <td>
          Loop Interval (ms)
        </td>
        <td>
          Init Block Range Size
        </td>
        <td>
          Executor Async Size
        </td>
        </thead>
        <tbody>
        <tr v-for="network in Object.values(health.networks)" :key="network.id">

          <td>
            {{ network.id }}
          </td>
          <td style="">
            {{ network.loopIntervalMillis }}
          </td>
          <td style="text-align: right;">
            {{ network.initBlockRangeSize }}
          </td>
          <td style="text-align: right;">
            {{ network.executor_asyncSize }}
          </td>

        </tr>

        </tbody>

      </table>

    </div>

    <div v-if="error" class="justify-content-center flex-column d-flex align-items-center" style="height: 100vh;">
      <h1>😫</h1>
      <h5>{{ error }}</h5>
    </div>

    <div class="loading" v-if="isLoading">
      <img
          src="https://media.giphy.com/media/eJWyod5gLxdcY/giphy.gif?cid=ecf05e473mnhsxzl45qw6ucn5nrbfmurt4gmgwdjsp9jspnp&rid=giphy.gif&ct=s"/>
    </div>

  </div>

</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      health: null,
      error: null,
      isLoading: true
    }
  },

  async mounted() {

    setInterval(async () => {

      try {

        const response = await fetch('https://open-defi-notifications-detect.herokuapp.com/health', {
          method: 'GET'
        });

        this.health = (await (response.json()))

        this.error = null

      } catch (e) {

        this.error = e

      }

      this.isLoading = false

    }, 1000)

  },
  computed: {},
  methods: {
    getColorClass(value, threshold) {

      let ratio = value / threshold

      return ratio >= 1 ? 'red' : (ratio < 0.2 ? 'green' : 'orange')

    }
  }

}
</script>

<style lang="css">

body {
  background-color: black;
  color: #eee;
}

.title {
  color: white;
}

.common-table {

  background: #222;
  width: 50vw;
  margin: 10px 20px;

}

.common-table td {

  padding: 2px 15px;
  border: 1px solid #555

}

.common-table td.winner {
  color: black;
  background-color: #03fcf5;

}

.logo {
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 15vw;
  top: 20vh;
  align-items: center;
}

.loading {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading img {
  width: 100px;
}

.background {
  opacity: 0.1;
  pointer-events: none;
  position: fixed;
  bottom: 0;
  height: 100%;
}

.orange {
  color: orange;
}


.red {
  color: red;
}

.green {
  color: green;
}
</style>
