<template>

  <div :style="!modeProduction ? 'color: yellow !important;' : ''">

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

        <div class="d-flex align-items-center">

          <div class="global-health-title"> Server health:</div>
          <div v-if="!error" class=" fw-bold "
               :class="health.status === 'OK' ? 'green' :(health.status === 'ERROR' ? 'red' : 'orange')">
            {{ health.status }}
            {{ health.status === 'OK' ? '😁' : (health.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold red"> {{ error }} 😫
          </div>

          <div class="mx-3">|</div>
          <span class=" global-health-title"> Server uptime: </span>
          <div class=" fw-bold"> {{ [health.uptime, 'seconds'] | duration('humanize') }}</div>

          <div class="mx-3">|</div>
          <div class=" global-health-title"> Heap Size:</div>
          <div class=" fw-bold" v-if="health.heapUsedMB"> {{ health.heapUsedMB.toFixed(1) }}Mb</div>

          <div class="mx-3">|</div>
          <a class=""
             :href="modeProduction ? 'https://addons-sso.heroku.com/apps/50eb195f-1036-4b99-a124-8653f6d07123/addons/f9f455a8-2cd4-4a43-954d-82d9f90f2d2b' : 'https://addons-sso.heroku.com/apps/de52ad2a-132b-4aee-b9bc-827c32c92272/addons/ebab4863-ea0d-47e4-a92a-1ff525df3a16'"
             target="_blank"> Papertrail </a>

          <div class="mx-3">|</div>
          <a class=""
             :href="healthEndpoint"
             target="_blank"> RAW </a>

          <div class="mx-3">|</div>
          <button @click="modeProduction = !modeProduction" class="px-2 mx-3">
            {{ modeProduction ? 'Production Env' : 'Development Env' }}
          </button>

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
          Execution Count
        </td>
        <td>
          Subscriptions
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
          <td style="text-align: right;">
            {{
              health.loops[key].clipboard.subscriptions && Object.keys(health.loops[key].clipboard.subscriptions).length
            }}
          </td>
          <td style="text-align: right;"
              :class="getColorClass(health.loops[key].elapsedTimeMillis, health.loopSlowThresholdMillis )">
            {{ health.loops[key].elapsedTimeMillis }}
          </td>

        </tr>

        <tr>

          <td>
            <b>Total</b>
          </td>
          <td style="">
          </td>
          <td style="text-align: right;">
            <b>{{ totalErrors }}</b>
          </td>
          <td style="text-align: right;">
          </td>
          <td style="text-align: right;">
          </td>
          <td style="text-align: right;">
            <b>{{ totalSubscriptions }}</b>
          </td>
          <td>
          </td>

        </tr>

        </tbody>

      </table>

      <br/>


      <div class=" px-3 ">Project Statistics</div>
      <table class="common-table" style="width: 20%;" v-if="subscriptionsByProjects">
        <thead style="font-weight: bold;">
        <td>
          Project
        </td>
        <td>
          Subscription Count
        </td>
        </thead>
        <tbody>
        <tr v-for="key in Object.keys(subscriptionsByProjects)" :key="key">

          <td>
            {{ key }}
          </td>
          <td style="text-align: right;">
            {{ subscriptionsByProjects[key].length }}
          </td>

        </tr>

        </tbody>

      </table>

      <br/>


      <div class=" px-3 ">Global Parameters</div>
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
        <td>
          Subscription Change Detection
        </td>
        <td>
          onBlocks execution Timeout (ms)
        </td>
        <td>
          Get Block Timeout (ms)
        </td>
        </thead>
        <tbody>
        <tr>

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
          <td style="text-align: right;">
            {{ [health.subscriptionModificationGraceMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ health.onBlocksRequestTimeout }}
          </td>
          <td style="text-align: right;">
            {{ health.getBlockRequestTimeout }}
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

      <table class="common-table" style="" v-if="health.networks">
        <thead style="font-weight: bold;">
        <td>
          Endpoint
        </td>
        <td>
          Logger Endpoint
        </td>
        </thead>

        <tbody>
        <tr>

          <td>
            {{ health.endpoint }}
          </td>
          <td style="">
            {{ health.loggerEndpoint }}
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
      modeProduction: true,
      isLoading: true
    }
  },

  async mounted() {

    const loaderFunction = async () => {

      try {

        const response = await fetch(this.healthEndpoint, {
          method: 'GET'
        });

        this.health = (await (response.json()))

        this.error = null

      } catch (e) {

        this.error = e

      }

      this.isLoading = false

    }

    await loaderFunction()

    setInterval(loaderFunction, 5000)

  },
  computed: {

    healthEndpoint() {

      return this.modeProduction ? 'https://open-defi-notifications-detect.herokuapp.com/health' : 'https://defi-notifications-detect-test.herokuapp.com/health'

    },
    subscriptionsByProjects() {

      const subscriptionsByProjects = {}

      if (this.health && this.health.loops) {

        for (const key in this.health.loops) {

          const subscriptions = this.health.loops[key].clipboard.subscriptions;

          if (subscriptions) {

            for (const sub of Object.values(subscriptions)) {

              let subscriptionsByProject = subscriptionsByProjects[sub.projectId]

              subscriptionsByProjects[sub.projectId] = subscriptionsByProject = subscriptionsByProject || []

              subscriptionsByProject.push(sub)

            }

          }

        }

      }

      return subscriptionsByProjects

    },
    totalSubscriptions() {

      let totalSubscriptions = 0

      if (this.health && this.health.loops) {

        for (const key in this.health.loops) {

          if (this.health.loops[key].clipboard.subscriptions) {

            totalSubscriptions += Object.keys(this.health.loops[key].clipboard.subscriptions).length

          }

        }

      }

      return totalSubscriptions

    },
    totalErrors() {

      let totalErrors = 0

      if (this.health && this.health.loops) {

        for (const key in this.health.loops) {

          if (this.health.loops[key].errors) {

            totalErrors += this.health.loops[key].errors.length

          }

        }

      }

      return totalErrors

    }

  },
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
  width: 60vw;
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
  opacity: 0.2;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 10vw;
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

.global-health-title {
  margin-right: 0.3rem;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
