<template>

  <div>

    <img
        src="https://static.wixstatic.com/media/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg/v1/fill/w_1400,h_400,al_c/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg"
        class="background"/>

    <img src="https://avatars.githubusercontent.com/u/88712094?s=200&v=4" class="logo"/>

    <div style="display: flex; flex-direction: column;">

      <h3 class="p-3 title">
        Open DeFi Notifications Health
      </h3>
      <div style="display: flex; flex-direction: column" class=" p-3 ">

        <div style="display: flex; " >

          <span class="my-2"> Server health: </span>
          <div class="m-2 fw-bold"
               :style="health.status === 'OK' ? 'color: green;' : 'color: red;'"> {{ health.status }}
          </div>

          <span class="my-2"> Server uptime: </span>
          <div class="m-2 fw-bold"> {{ [health.uptime, 'seconds'] | duration('humanize') }}</div>

          <span class="my-2"> Stuck Threshold: </span>
          <div class="m-2 fw-bold"> {{ [health.loopStuckThresholdMillis, 'milliseconds'] | duration('humanize') }}</div>

        </div>

        <div style="display: flex;">

          <span class="my-2"> Slow Threshold: </span>
          <div class="m-2 fw-bold"> {{ [health.loopSlowThresholdMillis, 'milliseconds'] | duration('humanize') }}</div>

          <span class="my-2"> Unsuccessful Threshold: </span>
          <div class="m-2 fw-bold"> {{
              [health.loopUnsuccessfulThresholdMillis, 'milliseconds'] | duration('humanize')
            }}
          </div>

          <span class="my-2"> Errors Threshold: </span>
          <div class="m-2 fw-bold"> {{ health.loopErrorsThreshold }}</div>

        </div>

      </div>

      <div class=" px-3 ">Networks detector parameters</div>
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

      <br/>
      <div class=" px-3 ">Loops</div>
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
          <td style="text-align: right;">
            {{ health.loops[key].errors }}
          </td>
          <td style="text-align: right;">
            {{ new Date(health.loops[key].lastCompleted).toLocaleString() }}
          </td>
          <td style="text-align: right;">
            {{ health.loops[key].count }}
          </td>
          <td style="text-align: right;">
            {{ health.loops[key].elapsedTimeMillis }}
          </td>

        </tr>

        </tbody>

      </table>

      <br/>
      <div class=" px-3 ">Errors</div>
      <table class="common-table" style="" v-if="health.errors">
        <tbody>
        <tr v-for="error of health.errors" :key="error">

          <td>
            {{ error }}
          </td>

        </tr>

        </tbody>

      </table>
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
      health: {},
      isLoading: true
    }
  },

  async mounted() {

    setInterval(async () => {

      const response = await fetch('http://localhost:61005/health', {
        method: 'GET'
      });

      this.health = (await (response.json()))

      this.isLoading = false

    }, 500)

  },
  computed: {},
  methods: {}

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

.winner-box {
  color: #03fcf5;
}

.common-table td {

  padding: 2px 15px;
  border: 1px solid #555

}

.common-table td.winner {
  color: black;
  background-color: #03fcf5;

}

.fireworks-canvas {
  position: fixed;
  opacity: 0.7;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.logo {
  position: fixed;
  right: 15vw;
  top: 50vh;
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
</style>
