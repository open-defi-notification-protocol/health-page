<template>

  <div :class="!modeProduction ? 'modeTest' : ''" class="page">

    <div class="header px-3 title justify-content-between">

      <div class="d-flex align-items-center">

        <div class="logo ">

          <img onclick="window.open('https://defi.org/notifications/')"
               src="https://defi.org/notifications/assets/images/navbar/logo.svg"/>

        </div>

        <div class="main-title mx-4 d-flex flex-column">
          <span>Open DeFi Notifications</span>
          <span class="powered-by">
          Powered by <img src="https://defi.org/notifications/assets/images/orbs-logo-3.svg">
            </span>
        </div>

      </div>

      <div class=" title-buttons d-flex">

        <button @click="toggleMode" class="mx-2 btn btn-primary">
          {{ expertMode ? 'Expert Mode' : 'Simple Mode' }}
        </button>

        <button @click="toggleEnv" class="mx-2 btn btn-primary">
          {{ modeProduction ? 'Production Env' : 'Development Env' }}
        </button>

        <button @click=" loaderFunction(true)" class="mx-2 btn btn-primary">
          <font-awesome-icon icon="fa-solid fa-rotate"/>
        </button>

      </div>

    </div>

    <div style="display: flex; flex-direction: column;" v-if="detectorHealth" class="px-3 main-container">

      <div style="display: flex; flex-direction: column; margin-top: 7rem;" class="">

        <div class="d-flex align-items-center gauge-cards">

          <health-card
              :health="detectorHealth"
              :expertMode="expertMode"
              fa-icon="fa-server"
              title="Detector"
              :healthEndpoint="healthEndpoint"/>

          <div class="vr d-none" style="height: 5rem"></div>

          <health-card
              :health="managerHealth"
              :expertMode="expertMode"
              fa-icon="fa-database"
              title="Manager"
              :healthEndpoint="managerHealthEndpoint"/>

          <div class="vr d-none" style="height: 5rem"></div>

          <health-card
              :health="l3Health"
              :expertMode="expertMode"
              icon="https://www.orbs.com/assets/img/common/logo.svg"
              title="ORBS L3"
              :healthEndpoint="l3HealthEndpoint"/>

        </div>

        <div class="card" :class="expertMode ? 'visible' : 'hidden'">

          <table class="d-flex flex-column" :class="expertMode ? 'visible' : 'hidden'">
            <tbody>
            <tr>
              <td class="px-3"> Server uptime:</td>
              <td class=" fw-bold"> {{ [detectorHealth.uptime, 'seconds'] | duration('humanize') }}</td>
            </tr>

            <tr>
              <td class="px-3"> Heap Size:</td>
              <td class=" fw-bold" v-if="detectorHealth.heapUsedMB"> {{
                  detectorHealth.heapUsedMB.toFixed(1)
                }}Mb
              </td>
            </tr>
            <tr>
              <td class="px-3"> Env:</td>
              <td class=" fw-bold" v-if="detectorHealth.env"> {{ detectorHealth.env }}</td>
            </tr>
            </tbody>
          </table>

        </div>

      </div>

      <div class=" card charts">

        <div class="mb-3 card-title">NETWORKS</div>

        <div class="d-flex flex-row justify-content-between charts-container">

          <div class="px-4 chart-container">
            <div class="chart-title">Networks Performance (ms)</div>
            <BarChart
                ref="network_performance_chart"
                class="chart"
                :width="700"
                :height="200"
                :chart-data="networksPerformanceChartDataSet"
                :options="barOptions">
            </BarChart>
          </div>

          <div class="vr" style="height: 230px"></div>

          <div class="px-4 chart-container">
            <div class="chart-title">Subscriptions Pre Network</div>
            <DoughnutChart
                ref="networks_chart"
                class="chart"
                :width="230"
                :height="200"
                :chart-data="networksChartDataSet"
                :options="optionsNoLegend">
            </DoughnutChart>
          </div>

        </div>


      </div>

      <div class=" card charts">

        <div class="mb-3 card-title">DETECTION HEALTH</div>

        <div class="d-flex flex-row justify-content-between charts-container ">


          <div class="px-4 chart-container">
            <div class=" chart-title">Subscriptions Per Project</div>
            <DoughnutChart
                ref="projects_chart"
                :width="700"
                class="chart"
                :height="200"
                :chart-data="projectsChartDataSet"
                :options="options">
            </DoughnutChart>
          </div>

          <div class="vr" style="height: 230px"></div>

          <div class="px-4 chart-container">
            <div class="chart-title">Audit Statistics</div>
            <PolarChart
                ref="audit_chart"
                class="chart"
                :width="230"
                :height="200"
                :chart-data="auditChartDataSet"
                :options="optionsNoLegend">
            </PolarChart>
          </div>


        </div>


      </div>

      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="table-responsive">
          <table class="  common-table table  table-hover table-bordered" style="" v-if="detectorHealth">
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

      <div class="card" v-if="detectorHealth.errors.length > 0">

        <div class=" fw-bold">Errors</div>
        <table class="  common-table table  table-hover table-bordered" style="">
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
          <tr v-for="(error, index) of detectorHealth.errors" :key="index"
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

      </div>

      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="  pb-2 fw-bold ">Loops Status</div>
        <div class="table-responsive">
          <table class="  common-table table  table-hover table-bordered" style=""
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

      </div>

      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class=" pb-2 fw-bold">Global Parameters</div>

        <div class="table-responsive">
          <table class="  common-table table  table-hover table-bordered" style=""
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

      </div>

      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="pb-2 fw-bold">Networks Parameters</div>

        <div class="table-responsive">
          <table class="  common-table table  table-hover table-bordered" style=""
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

      </div>

      <div class="card" :class="expertMode ? 'visible' : 'hidden'">
        <div class=" px-3 ">Audit</div>
        <div class="table-responsive">
          <table class="  common-table table  table-hover table-bordered" style="" v-if="auditResults">
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
      </div>

      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="  pb-2 fw-bold ">Project Statistics</div>

        <div class="table-responsive">

          <table class=" common-table table  table-hover table-bordered" v-if="projectsStatistics">
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

import BarChart from './BarChart.vue'
import DoughnutChart from './DoughnutChart.vue'
import PolarChart from './PolarChart.vue'

import {get, getDatabase, ref} from "firebase/database";
import {initializeApp} from "firebase/app";
import randomColor from "randomcolor";
import Vue from 'vue'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import {faCheck, faRemove,faWarning, faDatabase, faNetworkWired, faRotate, faServer} from '@fortawesome/free-solid-svg-icons'

import HealthCard from "./HealthCard.vue";

/* add icons to the library */
library.add(faCheck)
library.add(faRemove)
library.add(faWarning)
library.add(faRotate)
library.add(faServer)
library.add(faDatabase)
library.add(faNetworkWired)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'App',

  components: {HealthCard, BarChart, DoughnutChart, PolarChart},

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'left'
        }
      },
      optionsNoLegend: {
        responsive: true,
        maintainAspectRatio: false,
        legend: false
      },
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
        scales: {
          yAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      },
      networksPerformanceChartDataSet: null,
      networksChartDataSet: null,
      projectsChartDataSet: null,
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
      expertMode: false,
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

  },
  computed: {

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

            totalErrors += this.detectorHealth.loops[key].errors

          }

        }

      }

      return totalErrors

    }

  },
  methods: {

    refreshNetworksChartDataSet() {

      const loops = this.detectorHealth.loops

      const loopsNames = []

      for (const key in loops) {

        if (loops[key].clipboard.subscriptions) {
          loopsNames.push(key)
        }

      }

      const networkSubCount = loopsNames.map(key => loops[key].clipboard.subscriptions && Object.keys(loops[key].clipboard.subscriptions).length)
      const colors = loopsNames.map(() => randomColor())

      this.networksChartDataSet = {
        labels: loopsNames,
        datasets: [
          {
            backgroundColor: colors,
            data: networkSubCount
          }
        ]
      }

      const networkPerformance = loopsNames.map(key => loops[key] && loops[key].elapsedTimeMillis)

      this.networksPerformanceChartDataSet = {
        labels: loopsNames,
        datasets: [
          {
            backgroundColor: colors,
            data: networkPerformance
          }
        ]
      }

      this.$nextTick(() => {

        this.$refs.network_performance_chart.update()
        this.$refs.networks_chart.update()

      })

    },
    refreshProjectsChartDataSet() {

      const projectNames = this.projectsStatistics.map(ps => ps.projectId)
      const projectSubCount = this.projectsStatistics.map(ps => ps.subs.length)
      const colors = this.projectsStatistics.map(() => randomColor())

      if (projectSubCount)

        this.projectsChartDataSet = {
          labels: projectNames,
          datasets: [
            {
              backgroundColor: colors,
              data: projectSubCount
            }
          ]
        }

      this.$nextTick(() => {

        this.$refs.projects_chart.update()

      })


    },
    refreshAuditChartDataSet() {

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

        this.$nextTick(() => {

          this.$refs.audit_chart.update()

        })

      }

    },
    refreshCharts() {

      this.refreshNetworksChartDataSet()
      this.refreshProjectsChartDataSet()
      this.refreshAuditChartDataSet()

    },
    getColorClass(value, threshold) {

      let ratio = value / threshold

      return ratio >= 1 ? 'text-danger' : (ratio < 0.2 ? 'text-success' : 'text-warning')

    },
    toggleMode() {
      this.expertMode = !this.expertMode
    },
    toggleEnv() {

      this.modeProduction = !this.modeProduction

      this.$nextTick(() => {

        this.loaderFunction(true)

      })

    },
    async loaderFunction(useLoadingMask) {

      if (useLoadingMask) {
        this.isLoading = true
      }

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

      this.refreshNetworksChartDataSet()

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

      this.refreshProjectsChartDataSet()

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

      this.refreshAuditChartDataSet()

    }
  }

}
</script>

<style lang="css">

.page {
  overflow: hidden;
}

body {
  background-color: #f0f0f0 !important;
  color: #333;
  font-size: 11pt;
}

.content {
}

.modeTest .title {
  background-color: gray !important;
}

.modeTest .btn {
  background-color: gray !important;
}

.title {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 6rem;
  display: flex;
  color: #fff;
  font-size: 1.8rem;
  background-color: #c231a3;
  align-items: center;
}

.header {
  box-shadow: 0 1px 13px rgba(0, 0, 0, 0.5);
}

.logo img {
  padding: 0.15rem;
  cursor: pointer;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 100em;
  background-color: white;
}

.powered-by{
  font-size: 12pt;
  margin-bottom: 0.4rem;
}

.powered-by img{
  filter: brightness(100);
  height: 1.3rem;
  margin-left: 0.3rem;
}

.common-table {

}

.loading {
  background-color: rgba(0, 0, 0, 0.1);
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

.card {

  display: flex;
  padding: 1.5rem 2rem;
  margin: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: none;
  background-color: white;

}

.charts {
}

.hidden {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  max-height: 0;
  visibility: hidden;
  transition: all 0.3s ease-out;
  opacity: 0;
}

.visible {
  overflow: hidden;
  max-height: 100rem;
  opacity: 1;
  transition: all 0.3s ease-in;
}

.right-0 {
  right: 0;
}

.chart-title {
  display: flex;
  justify-content: center;
  /*font-weight: bold;*/
  margin-bottom: 1rem;
}

.vr {
  display: inline;
  height: 50%;
  width: 1px;
  border: 1px solid #c5c5c5;
  margin: auto 0;
}

.card-title {
  margin-right: 0.3rem;
  font-size: 12pt;
  color: #aaa;
}

.btn-primary {
  background-color: #c231a3 !important;
  border: 1px solid #ccc !important;
  box-shadow: none !important;
}

.btn-primary:hover {
  box-shadow: 0 1px 10px rgba(255, 255, 255, 0.5) !important;
  border: 1px solid #fff !important;
}

@media only screen and (max-width: 1150px) {

  .main-container {
    transform-origin: top;
  }

  .charts-container {
    flex-flow: wrap;
    justify-content: center !important;
  }

  .chart-container {
    margin-bottom: 2rem !important;
  }

  .charts .vr {
    display: none;
  }

  .gauge-icon {
    transform: scale(0.7);
  }

  .btn {
    font-size: 10pt !important;
  }

  .card-title {
    font-size: 10pt !important;
  }

  .gauge-value {
    font-size: 14pt;
  }

  .main-title {
    font-size: 16pt;
  }


}

@media only screen and (max-width: 800px) {

  .powered-by{
    font-size: 10pt;
    margin-bottom: 0;
  }

  .powered-by img{
    height: 1.1rem;
  }

  .card {
    box-shadow: none !important;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .main-container.px-3 {
    padding: 0.5rem !important;
  }

  body {

    width: 100% !important;
    background-color: white !important;
  }

  .main-title {
    font-size: 14pt;
  }

  .title-buttons {
    width: 100%;
    justify-content: end;
  }

  .logo img {
    padding: 0.1rem;
    height: 2.5rem;
    cursor: pointer;
  }

  .header {
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);
    padding: 0.8rem 0;
    height: 8rem;
    flex-flow: wrap;
  }

  .chart-title {
    font-size: 10pt;
  }

  table {
    font-size: 10pt;
  }

  .gauge-icon {
    transform: scale(0.4);
    margin-right: 2rem !important;
    margin-top: -2.2rem;
  }

  .gauge-cards {
    margin-top: 1rem;
  }

  .gauge-cards .vr {
    display: block !important;
  }

}

@media only screen and (max-width: 600px) {

  .powered-by{
    font-size: 9pt;
    margin-bottom: 0;
  }

  .powered-by img{
    height: 1rem;
    margin-bottom: 0.1rem;
  }

  .card {
    box-shadow: none !important;
    margin-top: 0;
    margin-bottom: 0;
  }

  .main-container.px-3 {
    padding: 0.5rem !important;
  }

  .main-title {
    font-size: 12pt;
  }

  .gauge-icon {
    transform: scale(0.3);
    margin-top: -2.3rem !important;
  }

  .card-title {
    font-size: 8pt !important;
  }

  .chart-title {
    font-size: 8pt;
  }

  table {
    font-size: 8pt;
  }

  .gauge-cards .vr {
    display: none !important;
  }

}

@media only screen and (max-width: 800px) {
  .chart {
    margin: -1rem 0;
    transform: scale(0.85);
  }
}

@media only screen and (max-width: 750px) {
  .chart {
    margin: -1.5rem 0;
    transform: scale(0.8);
  }
}

@media only screen and (max-width: 700px) {
  .chart {
    margin: -2rem 0;
    transform: scale(0.75);
  }
}

@media only screen and (max-width: 650px) {
  .chart {
    margin: -2.5rem 0;
    transform: scale(0.7);
  }
}

@media only screen and (max-width: 600px) {
  .chart {
    margin: -3rem 0;
    transform: scale(0.65);
  }
}

@media only screen and (max-width: 500px) {
  .chart {
    margin: -3.5rem 0;
    transform: scale(0.5);
  }
}

</style>
