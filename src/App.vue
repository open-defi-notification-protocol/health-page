<template>

  <div :style="!modeProduction ? 'color: fuchsia !important;' : ''">

    <img
        src="https://static.wixstatic.com/media/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg/v1/fill/w_1400,h_400,al_c/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg"
        class="background"/>

    <div class="logo">

      <img
          src="https://play-lh.googleusercontent.com/1bxBSz9Aj_TESC9mUjs7c365PNvfHm8TUA8L1iMNOxcQpXi2zhUAsqQyhc4VEAKr938U=s360-rw"/>
      <h1 class="my-3">DeFi Notifications</h1>
      <img src="./assets/logo.svg"/>

    </div>

    <div style="display: flex; flex-direction: column;" v-if="detectorHealth">

      <h3 class="px-3 pt-3 title">
        Open DeFi Notifications Health
      </h3>
      <div style="display: flex; flex-direction: column" class=" p-3 ">

        <div class="d-flex align-items-center">

          <div class="global-health-title"> Detector health:</div>
          <div v-if="!detectorError" class=" fw-bold "
               :class="detectorHealth.status === 'OK' ? 'green' :(detectorHealth.status === 'ERROR' ? 'red' : 'orange')">
            {{ detectorHealth.status }}
            {{ detectorHealth.status === 'OK' ? '😁' : (detectorHealth.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold red"> {{ detectorError }} 😫
          </div>

          <div class="mx-3">|</div>

          <div class="global-health-title"> Manager health:</div>
          <div v-if="!managerError && managerHealth" class=" fw-bold "
               :class="managerHealth.status === 'OK' ? 'green' :(managerHealth.status === 'ERROR' ? 'red' : 'orange')">
            {{ managerHealth.status }}
            {{ managerHealth.status === 'OK' ? '😁' : (managerHealth.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold red"> {{ managerError }} 😫
          </div>

          <div class="mx-3">|</div>

          <div class="global-health-title"> L3 health:</div>
          <div v-if="!l3Error && l3Health" class=" fw-bold "
               :class="l3Health.status === 'OK' ? 'green' :(l3Health.status === 'ERROR' ? 'red' : 'orange')">
            {{ l3Health.status }}
            {{ l3Health.status === 'OK' ? '😁' : (l3Health.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold red"> {{ l3Error }} 😫
          </div>

        </div>

        <div class="d-flex align-items-center mt-2">

          <span class=" global-health-title"> Server uptime: </span>
          <div class=" fw-bold"> {{ [detectorHealth.uptime, 'seconds'] | duration('humanize') }}</div>

          <div class="mx-3">|</div>
          <div class=" global-health-title"> Heap Size:</div>
          <div class=" fw-bold" v-if="detectorHealth.heapUsedMB"> {{ detectorHealth.heapUsedMB.toFixed(1) }}Mb</div>

          <div class="mx-3">|</div>

          <div class=" global-health-title"> Env:</div>
          <div class=" fw-bold" v-if="detectorHealth.env"> {{ detectorHealth.env }}</div>

          <div class="mx-3">|</div>
          <a class=""
             :href="modeProduction ? 'https://addons-sso.heroku.com/apps/50eb195f-1036-4b99-a124-8653f6d07123/addons/f9f455a8-2cd4-4a43-954d-82d9f90f2d2b' : 'https://addons-sso.heroku.com/apps/de52ad2a-132b-4aee-b9bc-827c32c92272/addons/ebab4863-ea0d-47e4-a92a-1ff525df3a16'"
             target="_blank"> Papertrail </a>

          <div class="mx-3">|</div>
          <a class=""
             :href="healthEndpoint"
             target="_blank"> RAW </a>

          <div class="mx-3">|</div>
          <button @click="toggleEnv" class="px-2 mx-3">
            {{ modeProduction ? 'Production Env' : 'Development Env' }}
          </button>

        </div>

      </div>

      <div v-if="detectorHealth.errors.length > 0">

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
          <tr v-for="error of detectorHealth.errors" :key="error"
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
      <table class="common-table" style="" v-if="detectorHealth.loops">
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
        <tr v-for="key in Object.keys(detectorHealth.loops)" :key="key">

          <td>
            {{ key }}
          </td>
          <td style="">
            {{ detectorHealth.loops[key].started === 'idle' ? 'idle' : 'running' }}
          </td>
          <td style="text-align: right;"
              :class="getColorClass(detectorHealth.loops[key].errors, detectorHealth.loopErrorsThreshold)">
            {{ detectorHealth.loops[key].errors }}
          </td>
          <td style="text-align: right;">
            {{ new Date(detectorHealth.loops[key].lastCompleted).toLocaleString() }}
          </td>
          <td style="text-align: right;">
            {{ detectorHealth.loops[key].count }}
          </td>
          <td style="text-align: right;">
            {{
              detectorHealth.loops[key].clipboard.subscriptions && Object.keys(detectorHealth.loops[key].clipboard.subscriptions).length
            }}
          </td>
          <td style="text-align: right;"
              :class="getColorClass(detectorHealth.loops[key].elapsedTimeMillis, detectorHealth.loopSlowThresholdMillis )">
            {{ detectorHealth.loops[key].elapsedTimeMillis }}
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


      <div class=" px-3 ">Global Parameters</div>
      <table class="common-table" style="" v-if="detectorHealth.networks">
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

          <td style="text-align: right;">
            {{ [detectorHealth.loopSlowThresholdMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ [detectorHealth.loopStuckThresholdMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ [detectorHealth.loopUnsuccessfulThresholdMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ detectorHealth.loopErrorsThreshold }}
          </td>
          <td style="text-align: right;">
            {{ [detectorHealth.subscriptionModificationGraceMillis, 'milliseconds'] | duration('humanize') }}
          </td>
          <td style="text-align: right;">
            {{ detectorHealth.onBlocksRequestTimeout }}
          </td>
          <td style="text-align: right;">
            {{ detectorHealth.getBlockRequestTimeout }}
          </td>

        </tr>

        </tbody>

      </table>


      <table class="common-table" style="" v-if="detectorHealth.networks">
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
            {{ detectorHealth.endpoint }}
          </td>
          <td style="">
            {{ detectorHealth.loggerEndpoint }}
          </td>

        </tr>

        </tbody>

      </table>

      <table class="common-table" style="" v-if="detectorHealth.networks">
        <thead style="font-weight: bold;">
        <td>
          Projects Commit Hash (Detector)
        </td>
        <td>
          Projects Commit Hash (Manager)
        </td>
        <td>
          Projects Commit Hash (L3)
        </td>
        </thead>

        <tbody>
        <tr>


          <td style="">
            {{ detectorHealth.projectsCommitHash }}
          </td>
          <td style="">
            {{ managerHealth && managerHealth.projectsCommitHash }}
          </td>
          <td style="">
            {{ l3Health && l3Health.projectsCommitHash }}
          </td>

        </tr>

        </tbody>

      </table>

      <br/>
      <div class=" px-3 ">Networks Parameters</div>
      <table class="common-table" style="" v-if="detectorHealth.networks">
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
        <tr v-for="network in Object.values(detectorHealth.networks)" :key="network.id">

          <td>
            {{ network.id }}
          </td>
          <td style="text-align: right;">
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
      <div class=" px-3 ">Audit</div>
      <table class="common-table" style="" v-if="auditResults">
        <thead style="font-weight: bold;">
        <td>
          % Audited
        </td>
        <td>
          Passed
        </td>
        <td>
          Failed
        </td>
        <td>
          % Failed
        </td>
        </thead>
        <tbody>
        <tr>

          <td style="text-align: right;">
            {{ auditedRequestsPercentage }}%
          </td>
          <td style="text-align: right;">
            {{ succeededAudits }}
          </td>
          <td style="text-align: right;">
            {{ failedAudits }}
          </td>
          <td style="text-align: right;">
            {{ failedAuditsPercentage }}%
          </td>

        </tr>

        </tbody>

      </table>

    </div>
    <br/>

    <div class=" px-3 ">Project Statistics</div>
    <table class="common-table" v-if="projectsStatistics">
      <thead style="font-weight: bold;">
      <td>
        Project
      </td>
      <td>
        Subscription Count
      </td>
      </thead>
      <tbody>
      <tr v-for="projectStatistics of projectsStatistics" :key="projectStatistics.projectId">

        <td>
          {{ projectStatistics.projectId }}
        </td>
        <td style="text-align: right;">
          {{ projectStatistics.subs.length }}
        </td>

      </tr>

      </tbody>

    </table>

    <br/>
    <br/>


    <div v-if="detectorError" class="justify-content-center flex-column d-flex align-items-center"
         style="height: 100vh;">
      <h1>😫</h1>
      <h5>{{ detectorError }}</h5>
    </div>

    <div class="loading" v-if="isLoading">
      <img
          src="https://media.giphy.com/media/eJWyod5gLxdcY/giphy.gif?cid=ecf05e473mnhsxzl45qw6ucn5nrbfmurt4gmgwdjsp9jspnp&rid=giphy.gif&ct=s"/>
    </div>

  </div>

</template>

<script>


import {get, getDatabase, ref} from "firebase/database";
import {initializeApp} from "firebase/app";


export default {
  name: 'App',

  data() {
    return {
      detectorHealth: null,
      managerHealth: null,
      l3Health: null,
      detectorError: null,
      auditResults: null,
      managerError: null,
      prodAuditRef: null,
      testAuditRef: null,
      l3Error: null,
      modeProduction: true,
      isLoading: true
    }
  },

  async mounted() {


    const prodFB = initializeApp(
        {
          apiKey: "AIzaSyBMyomj4UiFVLirE7iG6cJBWU4lZE5dB6k",
          authDomain: "open-defi-notifications.firebaseapp.com",
          databaseURL: "https://open-defi-notifications-default-rtdb.firebaseio.com",
          projectId: "open-defi-notifications",
          storageBucket: "open-defi-notifications.appspot.com",
          messagingSenderId: "394201114987",
          appId: "1:394201114987:web:26bcf3a9374291467b042e",
          measurementId: "G-X9HH8PYVGB"
        },
        "test"
    )

    const testFB = initializeApp(
        {
          apiKey: "AIzaSyCH2vgsAGCxC9Kbzfe1AyZunCXCoJxg-O8",
          authDomain: "notifications-deddy-ron-test.firebaseapp.com",
          databaseURL: "https://notifications-deddy-ron-test-default-rtdb.firebaseio.com",
          projectId: "notifications-deddy-ron-test",
          storageBucket: "notifications-deddy-ron-test.appspot.com",
          messagingSenderId: "699309381956",
          appId: "1:699309381956:web:bf35ff2cde11b684aa1f11",
          measurementId: "G-KECX1V3QY8"
        },
        "prod"
    )

    const testFBDB = getDatabase(testFB)
    const prodFBDB = getDatabase(prodFB)

    this.testAuditRef = ref(testFBDB, 'audit')
    this.prodAuditRef = ref(prodFBDB, 'audit')


    await this.loaderFunction()

    setInterval(this.loaderFunction, 10000)

  },
  computed: {

    auditedRequestsPercentage() {

      return Math.round((1 / this.detectorHealth.auditEveryProb_1_in_x) * 100)

    },
    succeededAudits() {

      return this.auditResults.filter(audit => audit.auditPassed).length

    },
    failedAudits() {

      return this.auditResults.filter(audit => !audit.auditPassed).length

    },
    failedAuditsPercentage() {

      return (this.failedAudits / this.succeededAudits) * 100

    },
    healthEndpoint() {

      return this.modeProduction ? 'https://open-defi-notifications-detect.herokuapp.com/health' : 'https://defi-notifications-detect-test.herokuapp.com/health'

    },
    managerHealthEndpoint() {

      return this.modeProduction ? 'https://us-central1-open-defi-notifications.cloudfunctions.net/app/health' : 'https://us-central1-notifications-deddy-ron-test.cloudfunctions.net/app/health'

    },
    auditRef() {

      return this.modeProduction ? this.prodAuditRef : this.testAuditRef

    },
    l3HealthEndpoint() {

      return this.modeProduction ? '' : 'https://defi-notification-l3-test.herokuapp.com/health'

    },
    projectsStatistics() {

      const subscriptionsByProjects = {}

      if (this.detectorHealth && this.detectorHealth.loops) {

        for (const key in this.detectorHealth.loops) {

          const subscriptions = this.detectorHealth.loops[key].clipboard.subscriptions;

          if (subscriptions) {

            for (const sub of Object.values(subscriptions)) {

              let subscriptionsByProject = subscriptionsByProjects[sub.projectId]

              subscriptionsByProjects[sub.projectId] = subscriptionsByProject = subscriptionsByProject || {
                projectId: sub.projectId,
                subs: []
              }

              subscriptionsByProject.subs.push(sub)

            }

          }

        }

      }

      const projectsStatistics = Object.values(subscriptionsByProjects)
      projectsStatistics.sort((a, b) => a.projectId.localeCompare(b.projectId))

      return projectsStatistics

    },
    totalSubscriptions() {

      let totalSubscriptions = 0

      if (this.detectorHealth && this.detectorHealth.loops) {

        for (const key in this.detectorHealth.loops) {

          if (this.detectorHealth.loops[key].clipboard.subscriptions) {

            totalSubscriptions += Object.keys(this.detectorHealth.loops[key].clipboard.subscriptions).length

          }

        }

      }

      return totalSubscriptions

    },
    totalErrors() {

      let totalErrors = 0

      if (this.detectorHealth && this.detectorHealth.loops) {

        for (const key in this.detectorHealth.loops) {

          if (this.detectorHealth.loops[key].errors) {

            totalErrors += this.detectorHealth.loops[key].errors.length

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

    },
    toggleEnv() {
      this.modeProduction = !this.modeProduction

      this.$nextTick(() => {

        this.loaderFunction()

      })

    },
    async loaderFunction() {

      try {

        const response = await fetch(this.healthEndpoint, {
          method: 'GET'
        })


        this.detectorHealth = (await (response.json()))

        this.detectorError = null

      } catch (e) {

        this.detectorError = new Error("Failed fetching Detector health")

      }

      this.isLoading = false

      try {

        const managerResponse = await fetch(this.managerHealthEndpoint, {
          method: 'GET'
        })

        this.managerHealth = (await (managerResponse.json()))

        this.managerError = null

      } catch (e) {

        this.managerError = new Error("Failed fetching Manager health")

      }

      try {

        const l3Response = await fetch(this.l3HealthEndpoint, {
          method: 'GET'
        })

        this.l3Health = (await (l3Response.json()))

        this.l3Error = null

      } catch (e) {

        this.l3Error = new Error("Failed fetching L3 health")

      }

      const auditResultsMap = (await get(this.auditRef)).val();
      this.auditResults = auditResultsMap ? Object.values(auditResultsMap) : []

    }
  }

}
</script>

<style lang="css">

body {
  background-color: black;
  color: #eee;
  font-size: 11pt;
}

.title {
  color: white;
}

.common-table {

  background: #222;
  width: 90vw;
  margin: 10px 20px;

}

.common-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15);
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
