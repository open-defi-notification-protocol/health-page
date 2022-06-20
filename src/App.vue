<template>

  <div :class="!modeProduction ? 'modeTest' : ''">

    <div style="display: flex; flex-direction: column;" v-if="detectorHealth">

      <div class="px-3 title justify-content-between">

        <div class="logo">

          <img onclick="window.open('https://defi.org/notifications/')"
               src="https://play-lh.googleusercontent.com/1bxBSz9Aj_TESC9mUjs7c365PNvfHm8TUA8L1iMNOxcQpXi2zhUAsqQyhc4VEAKr938U=s360-rw"/>

        </div>

        <div class="">Open DeFi Notifications - Health</div>

        <div class="">

          <button @click="toggleEnv" class="mx-auto px-2 mx-3 btn btn-primary">
            {{ modeProduction ? 'Production Env' : 'Development Env' }}
          </button>

        </div>

      </div>
      <div style="display: flex; flex-direction: column; margin-top: 6rem;" class=" py-3 content">

        <div class="d-flex align-items-center">

          <div class="global-health-title"> Detector health:</div>
          <div v-if="!detectorError" class=" fw-bold "
               :class="detectorHealth.status === 'OK' ? 'text-success' :(detectorHealth.status === 'ERROR' ? 'text-danger' : 'text-warning')">
            {{ detectorHealth.status }}
            {{ detectorHealth.status === 'OK' ? '😁' : (detectorHealth.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold text-danger"> {{ detectorError }} 😫
          </div>

          <div class="mx-3">|</div>

          <div class="global-health-title"> Manager health:</div>
          <div v-if="!managerError && managerHealth" class=" fw-bold "
               :class="managerHealth.status === 'OK' ? 'text-success' :(managerHealth.status === 'ERROR' ? 'text-danger' : 'text-warning')">
            {{ managerHealth.status }}
            {{ managerHealth.status === 'OK' ? '😁' : (managerHealth.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold text-danger"> {{ managerError }} 😫
          </div>

          <div class="mx-3">|</div>

          <div class="global-health-title"> L3 health:</div>
          <div v-if="!l3Error && l3Health" class=" fw-bold "
               :class="l3Health.status === 'OK' ? 'text-success' :(l3Health.status === 'ERROR' ? 'text-danger' : 'text-warning')">
            {{ l3Health.status }}
            {{ l3Health.status === 'OK' ? '😁' : (l3Health.status === 'ERROR' ? '😫' : '😐') }}
          </div>

          <div v-else class=" fw-bold text-danger"> {{ l3Error }} 😫
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

        </div>

      </div>
      <div class="content">

        <div class="d-flex flex-row justify-content-center py-4">

          <div>
            <div class="d-flex justify-content-center fw-bold">Networks</div>
            <BarChart
                ref="networks_chart"
                :width="200"
                :height="230"
                :chart-data="networksChartDataSet"
                :options="options">
            </BarChart>
          </div>
          <div>
            <div class="d-flex justify-content-center fw-bold">Projects</div>
            <BarChart class="px-5"
                      :width="200"
                      :height="230"
                      ref="projects_chart"
                      :chart-data="projectsChartDataSet"
                      :options="options">
            </BarChart>
          </div>
          <div>
            <div class="d-flex justify-content-center fw-bold">Audit</div>
            <BarChart
                ref="audit_chart"
                :width="200"
                :height="230"
                :chart-data="auditChartDataSet"
                :options="options">
            </BarChart>
          </div>
        </div>

        <div class="table-responsive">
          <table class="  common-table table table-light table-hover table-bordered" style="" v-if="detectorHealth">
            <thead class="">
            <tr>
              <th>
                Module
              </th>
              <th>
                Endpoint
              </th>
              <th>
                Deployment Commit Hash
              </th>
              <th>
                Projects Commit Hash
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-if="detectorHealth">

              <th>Detector</th>
              <td>
                <a class=""
                   :href="healthEndpoint"
                   target="_blank">{{ healthEndpoint }}</a>
              </td>
              <td>
                {{ detectorHealth && detectorHealth.commitHash }}
              </td>
              <td>
                {{ detectorHealth && detectorHealth.projectsCommitHash }}
              </td>

            </tr>
            <tr v-if="managerHealth">

              <th>Manager</th>
              <td>
                <a class=""
                   :href="managerHealthEndpoint"
                   target="_blank">{{ managerHealthEndpoint }}</a>
              </td>
              <td>
                {{ managerHealth.commitHash }}
              </td>
              <td>
                {{ managerHealth.projectsCommitHash }}
              </td>

            </tr>
            <tr v-if="l3Health">

              <th>Layer 3</th>
              <td>
                <a class=""
                   :href="l3HealthEndpoint"
                   target="_blank">{{ l3HealthEndpoint }}</a>
              </td>
              <td>
                {{ l3Health.commitHash }}
              </td>
              <td>
                {{ l3Health.projectsCommitHash }}
              </td>

            </tr>

            </tbody>

          </table>
        </div>
      </div>

      <br/>

      <div v-if="detectorHealth.errors.length > 0">

        <div class=" px-3 ">Errors</div>
        <table class="  common-table table table-light table-hover table-bordered" style="">
          <thead>
          <tr>
            <td>
              Type
            </td>
            <td>
              Loop
            </td>
            <td>
              info
            </td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="error of detectorHealth.errors" :key="error"
              :class="error.level > 0 ? (error.level > 1 ? 'text-danger' : 'text-warning') :'' ">

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

      <div class="content">

        <div class="  pb-2 fw-bold ">Loops Status</div>
        <div class="table-responsive">
          <table class="  common-table table table-light table-hover table-bordered" style=""
                 v-if="detectorHealth.loops">
            <thead>
            <tr>
              <th>
                Loop
              </th>
              <th>
                State
              </th>
              <th>
                Error count
              </th>
              <th>
                Last Completed
              </th>
              <th>
                Execution Count
              </th>
              <th>
                Subscriptions
              </th>
              <th>
                Elapsed (ms)
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="key in Object.keys(detectorHealth.loops)" :key="key">

              <th>
                {{ key.charAt(0).toUpperCase() + key.slice(1) }}
              </th>
              <td style="">
                {{ detectorHealth.loops[key].started === 'idle' ? 'Idle' : 'Running...' }}
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

              <th>
                <b>Total</b>
              </th>
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

        </div>

        <br/>

        <div class=" pb-2 fw-bold">Global Parameters</div>
        <div class="table-responsive">
          <table class="  common-table table table-light table-hover table-bordered" style=""
                 v-if="detectorHealth.networks">
            <thead>
            <tr>
              <th>
                Slow Threshold
              </th>
              <th>
                Stuck Threshold
              </th>
              <th>
                Unsuccessful Threshold
              </th>
              <th>
                Errors Threshold
              </th>
              <th>
                Subscription Change Detection
              </th>
              <th>
                onBlocks execution Timeout (ms)
              </th>
              <th>
                Get Block Timeout (ms)
              </th>
            </tr>
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
        </div>

        <br/>

        <div class="pb-2 fw-bold">Networks Parameters</div>

        <div class="table-responsive">
          <table class="  common-table table table-light table-hover table-bordered" style=""
                 v-if="detectorHealth.networks">
            <thead>
            <tr>
              <th>
                Network
              </th>
              <th>
                Loop Interval (ms)
              </th>
              <th>
                Init Block Range Size
              </th>
              <th>
                Executor Async Size
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="network in Object.values(detectorHealth.networks)" :key="network.id">

              <th>
                {{ network.id.charAt(0).toUpperCase() + network.id.slice(1) }}
              </th>
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
        </div>
        <br/>
        <div class=" px-3 ">Audit</div>
        <div class="table-responsive">
          <table class="  common-table table table-light table-hover table-bordered" style="" v-if="auditResults">
            <thead>
            <tr>
              <th>
                % Audited
              </th>
              <th>
                Passed
              </th>
              <th>
                Failed
              </th>
              <th>
                % Failed
              </th>
            </tr>
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
                {{ failedAuditsPercentage.toFixed(2) }}%
              </td>

            </tr>

            </tbody>

          </table>
        </div>
        <br/>

        <div class="  pb-2 fw-bold ">Project Statistics</div>

        <div class="table-responsive">

          <table class=" common-table table table-light table-hover table-bordered" v-if="projectsStatistics">
            <thead>
            <tr>
              <th>
                Project
              </th>
              <th>
                Subscription Count
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="projectStatistics of projectsStatistics" :key="projectStatistics.projectId">

              <th>
                {{ projectStatistics.projectId }}
              </th>
              <td style="text-align: right;">
                {{ projectStatistics.subs.length }}
              </td>

            </tr>

            </tbody>

          </table>

        </div>


      </div>

      <br/>

    </div>

    <div v-if="detectorError" class="justify-content-center flex-column d-flex align-items-center"
         style="height: 100vh;">
      <h1>😫</h1>
      <h5>{{ detectorError }}</h5>
    </div>

    <div class="loading" v-if="isLoading">
      <img
          src="https://media3.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e478m15g7rgia18ipg9menvhnn4ahik4vcjd5zzr33r&rid=giphy.gif&ct=s"/>
    </div>

  </div>

</template>

<script>

import DoughnutChart from './DoughnutChart.vue'

import {get, getDatabase, ref} from "firebase/database";
import {initializeApp} from "firebase/app";
import randomColor from "randomcolor";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: false
};

export default {
  name: 'App',

  components: {BarChart: DoughnutChart},

  data() {
    return {
      options,
      auditChartDataSet: null,
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

    networksChartDataSet() {

      const loops = this.detectorHealth.loops

      const loopsNames = Object.keys(loops)

      const projectSubCount = loopsNames.map(key => loops[key].clipboard.subscriptions && Object.keys(loops[key].clipboard.subscriptions).length)
      const colors = loopsNames.map(() => randomColor())

      return {
        labels: loopsNames,
        datasets: [
          {
            backgroundColor: colors,
            data: projectSubCount
          }
        ]
      }

    },
    projectsChartDataSet() {

      const projectNames = this.projectsStatistics.map(ps => ps.projectId)
      const projectSubCount = this.projectsStatistics.map(ps => ps.subs.length)
      const colors = this.projectsStatistics.map(() => randomColor())

      return {
        labels: projectNames,
        datasets: [
          {
            backgroundColor: colors,
            data: projectSubCount
          }
        ]
      }

    },
    auditedRequestsPercentage() {

      return Math.round((1 / this.detectorHealth.auditEveryProb_1_in_x) * 100)

    },
    succeededAudits() {

      return this.auditResults && this.auditResults.filter(audit => audit.auditPassed).length

    },
    failedAudits() {

      return this.auditResults && this.auditResults.filter(audit => !audit.auditPassed).length

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

      return this.modeProduction ? 'https://odnp-l3-test-node.global.ssl.fastly.net/health' : 'https://defi-notification-l3-test.herokuapp.com/health' // todo add prod node

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

      return ratio >= 1 ? 'text-danger' : (ratio < 0.2 ? 'text-success' : 'text-warning')

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

        this.managerHealth = null
        this.managerError = new Error("Failed fetching Manager health")

      }

      try {

        const l3Response = await fetch(this.l3HealthEndpoint, {
          method: 'GET'
        })

        this.l3Health = (await (l3Response.json()))

        this.l3Error = null

      } catch (e) {

        this.l3Health = null
        this.l3Error = new Error("Failed fetching L3 health")

      }

      const auditResultsMap = (await get(this.auditRef)).val();

      this.auditResults = auditResultsMap ? Object.values(auditResultsMap) : []

      if (this.auditResults && (!this.auditChartDataSet ||
          (this.auditChartDataSet.datasets[0].data[0] !== this.succeededAudits || this.auditChartDataSet.datasets[0].data[1] !== this.failedAudits))) {

        this.auditChartDataSet = {
          labels: ['Succeeded Audits', 'Failed Audits'],
          datasets: [
            {
              backgroundColor: ['green', 'orange'],
              data: [this.succeededAudits, this.failedAudits]
            }
          ]
        }

        let auditChart = this.$refs.audit_chart;

        this.$nextTick(() => {
          auditChart.update()
        })

      }

    }
  }

}
</script>

<style lang="css">

body {
  background-color: #fff !important;
  color: #333;
  font-size: 11pt;
}

.content {
  padding-right: 1rem;
  padding-left: 1rem;
}


.modeTest .title {
  background-color: gray !important;
}

.modeTest .btn {
  background-color: gray !important;
}


.title {
  position: fixed;
  width: 100%;
  height: 6rem;
  display: flex;
  color: #fff;
  font-size: 1.8rem;
  background-color: #c231a3;
  box-shadow: 0 1px 13px rgba(0, 0, 0, 0.2);
  align-items: center;
}

.logo img {
  height: 3.7rem;
  cursor: pointer;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.3);
  border-radius: 100em;
  background-color: white;
}

.common-table {

}

.loading {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading img {
  height: 4rem;
}

.background {
  opacity: 0.1;
  pointer-events: none;
  position: fixed;
  bottom: 0;
  height: 100%;
}


.global-health-title {
  margin-right: 0.3rem;
}

</style>
