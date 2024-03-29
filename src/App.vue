<template>

  <div :class="(!modeProduction ? 'modeTest' : '') + ' ' + (darkMode ? 'dark' : 'light')" class="page">

    <div class="header px-3 justify-content-between">

      <div class="d-flex align-items-center">

        <div class="logo ">

          <img onclick="window.open('https://defi.org/notifications/')"
               src="./assets/img/odnp-logo.png"/>

        </div>

        <div class="main-title mx-4 d-flex flex-column">
          <span>Open DeFi Notifications</span>
          <span class="powered-by">
          Powered by <img src="https://www.orbs.com/assets/img/common/logo.svg"
                          onclick="window.open('https://orbs.com')">
            </span>
        </div>

      </div>

      <div class=" title-buttons d-flex">

        <!--                <button @click="toggleMode" class="mx-2 btn btn-primary">
                          {{ expertMode ? 'Expert Mode' : 'Simple Mode' }}
                        </button>-->

        <!--        <button @click="toggleEnv" class="mx-2 btn btn-primary">
                  {{ modeProduction ? 'Production Env' : 'Development Env' }}
                </button>-->

        <button @click="toggleTheme" class="mx-2 btn btn-primary">
          <font-awesome-icon v-if="!darkMode" icon="fa-solid fa-moon"/>
          <font-awesome-icon v-else icon="fa-solid fa-sun"/>
        </button>

        <button @click="loaderFunction(true)" class="mx-2 btn btn-primary">
          <font-awesome-icon icon="fa-solid fa-rotate"/>
        </button>

      </div>

    </div>

    <div style="display: flex; flex-direction: column;" v-if="detectorHealth" class="px-3 main-container">

      <div style="display: flex; flex-direction: column; margin-top: 9.5rem;" class="gauges">

        <div class="d-flex flex-wrap gauge-cards">

          <health-card
              :health="detectorHealth"
              :statusFieldName="'status'"
              :okString="'OK'"
              :expertMode="expertMode"
              :icon="`${publicPath}img/detector.png`"
              title="Detector"
              description="On-chain events scanner"
              :healthEndpoint="healthEndpoint"/>

          <health-card
              :health="managerHealth"
              :statusFieldName="'status'"
              :okString="'OK'"
              :expertMode="expertMode"
              :icon="`${publicPath}img/manager.png`"
              title="Manager"
              description="Subscriptions management"
              :healthEndpoint="managerHealthEndpoint"/>

          <health-card
              :health="l3Health"
              :statusFieldName="'Status'"
              :okString="'Status = OK,'"
              :expertMode="expertMode"
              :icon="`${publicPath}img/l3.png`"
              title="Orbs L3"
              description="Decentralized layer"
              :healthEndpoint="l3HealthEndpoint"/>

          <gauge-card class="w-auto"
                      :value="succeededAudits"
                      title="Succeeded Audits"/>

          <gauge-card class="w-auto"
                      :value="failedAudits"
                      title="Failed Audits"/>

        </div>

      </div>

      <div class="card">

        <div class="  pb-2 card-title">Detector Activity</div>

        <div class="d-flex network-activity-graph">

          <div class="d-flex flex-column" style="margin-top: -0.2rem">

            <div v-for="key in Object.keys(web3Networks)" :key="key" class="d-flex network-activity-title">

              {{ key.charAt(0).toUpperCase() + key.slice(1) }}

            </div>

          </div>

          <div class="d-flex flex-column" id="network_activity_container">

            <div v-for="key in Object.keys(web3Networks)" :key="key" class="d-flex"
                 :class="key">

              <div class="block-indicator current-block"
                   :style="`background-color: ${networksColors[key]};`"></div>

            </div>

          </div>

        </div>

      </div>

      <div class="d-flex flex-wrap">

        <div class=" card charts network-performance-chart-container">

          <div class="mb-3 card-title">Networks Performance (ms)</div>

          <div class="d-flex flex-row justify-content-between charts-container">

            <div class="px-4 chart-container">
              <BarChart
                  ref="network_performance_chart"
                  class="chart network-performance-chart"
                  :width="700"
                  :height="200"
                  :chart-data="networksPerformanceChartDataSet"
                  :options="barOptions">
              </BarChart>
            </div>

          </div>


        </div>
        <div class=" card charts network-chart-container">

          <div class="mb-3 card-title">Subscriptions per Network</div>

          <div class="d-flex flex-row justify-content-center charts-container">

            <div class="px-4 chart-container">
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


      </div>

      <div class="d-flex flex-wrap">

        <div class="card charts subscriptions-chart-container">

          <div class="mb-3 card-title">Subscriptions per Project</div>

          <div class="d-flex flex-row justify-content-center charts-container ">

            <div class="px-4 chart-container">
              <DoughnutChart
                  ref="projects_chart"
                  :width="700"
                  class="chart projects-chart"
                  :height="200"
                  :chart-data="projectsChartDataSet"
                  :options="options">
              </DoughnutChart>
            </div>

          </div>

        </div>

        <div class="card charts audit-chart-container">

          <div class="mb-3 card-title">Audit Statistics</div>

          <div class="d-flex flex-row justify-content-center charts-container ">

            <div class="px-4 chart-container">
              <PolarChart
                  v-if="auditChartDataSet"
                  ref="audit_chart"
                  class="chart"
                  :width="230"
                  :height="200"
                  :chart-data="auditChartDataSet"
                  :options="optionsNoLegend">
              </PolarChart>

              <div v-else class="d-flex align-items-center h-100">
                <img width="40" height="40"
                     src="https://media3.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e478m15g7rgia18ipg9menvhnn4ahik4vcjd5zzr33r&rid=giphy.gif&ct=s"/>
              </div>

            </div>

          </div>

        </div>

      </div>

      <!-- Loop Status -->
      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="  pb-2 card-title">Loops Status</div>
        <div class="table-responsive">

          <table class="  common-table table  table-hover " style=""
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
                Block Time (s)
              </th>
              <th>
                Last Completed
              </th>
              <th>
                Execution Count
              </th>
              <th>
                Recent Subscriptions
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
              <td>
                {{ detectorHealth.loops[key].started === 'idle' ? 'Idle' : 'Running...' }}
              </td>
              <td
                  :class="getColorClass(detectorHealth.loops[key].errors, detectorHealth.loopErrorsThreshold)">
                {{ detectorHealth.loops[key].errors }}
              </td>
              <td>
                {{ networkBlockTimes[key] && numberFormatter.format(networkBlockTimes[key]) }}
              </td>
              <td>
                {{ new Date(detectorHealth.loops[key].lastCompleted).toLocaleString() }}
              </td>
              <td>
                {{ detectorHealth.loops[key].count }}
              </td>
              <td>
                {{
                  detectorHealth.loops[key].clipboard.subscriptions && Object.keys(detectorHealth.loops[key].clipboard.subscriptions).length
                }}
              </td>
              <td
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
              <td>
                <b>{{ totalErrors }}</b>
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
                <b>{{ totalSubscriptions }}</b>
              </td>
              <td>
              </td>

            </tr>

            </tbody>

          </table>

        </div>

      </div>

      <!-- Global Parameters-->
      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class=" pb-2 card-title">Global Parameters</div>

        <div class="table-responsive">
          <table class="  common-table table  table-hover " style=""
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

              <td>
                {{ [detectorHealth.loopSlowThresholdMillis, 'milliseconds'] | duration('humanize') }}
              </td>
              <td>
                {{ [detectorHealth.loopStuckThresholdMillis, 'milliseconds'] | duration('humanize') }}
              </td>
              <td>
                {{ [detectorHealth.loopUnsuccessfulThresholdMillis, 'milliseconds'] | duration('humanize') }}
              </td>
              <td>
                {{ detectorHealth.loopErrorsThreshold }}
              </td>
              <td>
                {{ [detectorHealth.subscriptionModificationGraceMillis, 'milliseconds'] | duration('humanize') }}
              </td>
              <td>
                {{ detectorHealth.onBlocksRequestTimeout }}
              </td>
              <td>
                {{ detectorHealth.getBlockRequestTimeout }}
              </td>

            </tr>

            </tbody>

          </table>
        </div>

      </div>

      <!-- Network Parameters -->
      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="pb-2 card-title">Network Parameters</div>

        <div class="table-responsive">
          <table class="  common-table table  table-hover " style=""
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
              <th>
                Batch Throttling
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="network in Object.values(detectorHealth.networks)" :key="network.id">

              <th>
                {{ network.id.charAt(0).toUpperCase() + network.id.slice(1) }}
              </th>
              <td>
                {{ network.loopIntervalMillis }}
              </td>
              <td>
                {{ network.initBlockRangeSize }}
              </td>
              <td>
                {{ network.executor_asyncSize }}
              </td>
              <td>
                {{ network.executor_MinBatchProcessTime }}
              </td>

            </tr>

            </tbody>

          </table>
        </div>

      </div>

      <!-- Audit -->
      <div class="card" :class="expertMode ? 'visible' : 'hidden'">
        <div class=" pb-2 card-title">Audit</div>
        <div class="table-responsive">
          <table class="  common-table table  table-hover " style="" v-if="auditResults">
            <thead>
            <tr>
              <th>
                Audited By
              </th>

              <th>
                Up time (h)
              </th>
              <th>
                Mem usage (mb)
              </th>
              <th>
                Version
              </th>

              <th>
                Audited
              </th>
              <th>
                % Audited
              </th>
              <th>
                Passed
              </th>
              <th>
                Failed
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="nodeAddress in  Object.keys(auditResultsPerNode)" :key="nodeAddress">

              <td>
                {{ nodeAddress }}
              </td>
              <td>
                {{ (auditResultsPerNode[nodeAddress].uptime / 60 / 60).toFixed(1) }}
              </td>
              <td>
                {{ Math.round(auditResultsPerNode[nodeAddress].heapUsedMB) }}
              </td>
              <td>
                {{
                  auditResultsPerNode[nodeAddress].Payload && auditResultsPerNode[nodeAddress].Payload.Version.Semantic
                }}
              </td>
              <td>
                {{ auditResultsPerNode[nodeAddress].audited }}
              </td>
              <td>
                {{ numberFormatter.format(auditResultsPerNode[nodeAddress].auditedPercentage * 100) }}%
              </td>
              <td>
                {{ auditResultsPerNode[nodeAddress].succeededAudits }}
              </td>
              <td>
                {{ auditResultsPerNode[nodeAddress].failedAudits }}
              </td>

            </tr>

            </tbody>

          </table>
          <div class="d-flex justify-content-center align-items-center" v-else>
            <img height="40" width="40"
                 src="https://media3.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e478m15g7rgia18ipg9menvhnn4ahik4vcjd5zzr33r&rid=giphy.gif&ct=s"/>
          </div>
        </div>
      </div>

      <!-- Project Statistics -->
      <div class="card" :class="expertMode ? 'visible' : 'hidden'">

        <div class="  pb-2 card-title">Project Statistics</div>

        <div class="table-responsive">

          <table class=" common-table table  table-hover " v-if="projectsStatistics">
            <thead>
            <tr>
              <th>
                Project
              </th>
              <th>
                Current Block
              </th>
              <th>
                Recent Subscriptions
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="projectStatistics of projectsStatistics" :key="projectStatistics.projectId">

              <th>
                {{ projectStatistics.projectId }}
              </th>
              <td>
                {{ projectStatistics.toBlock }}
              </td>
              <td>
                {{ projectStatistics.subs.length }}
              </td>

            </tr>

            </tbody>

          </table>

        </div>

      </div>

      <!-- Detector Health -->
      <div class="card pb-5" :class="expertMode ? 'visible' : 'hidden'">

        <div class="  pb-2 card-title">Detector Health</div>

        <div class="table-responsive">

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
              <td class="px-3"> Environment:</td>
              <td class=" fw-bold" v-if="detectorHealth.env"> {{ detectorHealth.env }}</td>
            </tr>
            </tbody>
          </table>

        </div>

      </div>

      <!-- Infrastructure -->
      <div class="card" :class="expertMode ? 'visible' : 'hidden'">
        <div class="  pb-2 card-title">Infrastructure</div>
        <div class="table-responsive">
          <table class="  common-table table  table-hover " style="" v-if="detectorHealth">
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

      <!-- Errors -->
      <div class="card" v-if="detectorHealth.errors.length > 0">

        <div class=" fw-bold">Errors</div>
        <table class="  common-table table  table-hover " style="">
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
import './scss/style.scss'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

import $ from 'jquery'

/* import specific icons */
import {
  faCheck,
  faDatabase,
  faMoon,
  faNetworkWired,
  faRemove,
  faRotate,
  faServer,
  faSun,
  faWarning
} from '@fortawesome/free-solid-svg-icons'

import HealthCard from "./HealthCard.vue";
import GaugeCard from "@/GaugeCard";

/* add icons to the library */
library.add(faCheck)
library.add(faRemove)
library.add(faWarning)
library.add(faRotate)
library.add(faMoon)
library.add(faSun)
library.add(faServer)
library.add(faDatabase)
library.add(faNetworkWired)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

const numberFormatter = Intl.NumberFormat('en');

export default {
  name: 'App',

  components: {GaugeCard, HealthCard, BarChart, DoughnutChart, PolarChart},

  data() {
    return {
      publicPath: process.env.BASE_URL,
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
      networksColors: {
        'ethereum': '#5971e3',
        'bsc': '#f8c62c',
        'polygon': '#743ad6',
        'avalanche': '#e53d3f',
        'fantom': '#13aae6',
        'cronos': '#092b49',
        'arbitrum': '#9dcced',
        'optimism': '#ff0000',
        'http': '#6ed54d'
      },
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
      expertMode: true,
      darkMode: false,
      blockTimeTasks: null,
      networkBlockTimes: null,
      l3status: null,
      isLoading: true
    }
  },

  async mounted() {

    document.documentElement.dataset.scroll = window.scrollY;

    document.addEventListener('scroll', () => {
      document.documentElement.dataset.scroll = window.scrollY;
    });

    if (this.getUrlParams('test')) {
      this.modeProduction = false
    }

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

    numberFormatter() {
      return numberFormatter
    },
    auditedRequestsPercentage() {

      return Math.round((1 / this.detectorHealth.auditEveryProb_1_in_x) * 100)

    },
    auditResultsPerNode() {

      const _auditResultsPerNode = {}

      if (!this.l3status) {
        return _auditResultsPerNode
      }

      let l3NodesStatus = Object.values(this.l3status.CommitteeNodes);

      for (const auditResult of this.auditResults) {

        if (!auditResult.nodeEthAddress) {
          continue
        }

        const l3NodeStatus = l3NodesStatus.find(_l3NodeStatus => {

          const twapService = _l3NodeStatus.NodeServices['vm-twap']

          return twapService && twapService.VMStatusJson.nodeAddress && twapService.VMStatusJson.nodeAddress.toLowerCase() === auditResult.nodeEthAddress.toLowerCase()

        })

        let _auditResultPerNode = _auditResultsPerNode[auditResult.nodeEthAddress]

        if (!_auditResultPerNode) {
          _auditResultPerNode = _auditResultsPerNode[auditResult.nodeEthAddress] = Object.assign({}, (l3NodeStatus && l3NodeStatus.NodeServices['vm-notifications'].VMStatusJson) || {})
          _auditResultPerNode.succeededAudits = 0
          _auditResultPerNode.failedAudits = 0
          _auditResultPerNode.audited = 0

        }

        if (auditResult.auditPassed) {
          _auditResultPerNode.succeededAudits++
        } else {
          _auditResultPerNode.failedAudits++
        }

        _auditResultPerNode.audited++

      }

      for (const nodeAddress in _auditResultsPerNode) {

        const _auditResultPerNode = _auditResultsPerNode[nodeAddress];

        _auditResultPerNode.auditedPercentage = _auditResultPerNode.audited / this.auditResults.length

      }

      return _auditResultsPerNode

    },
    succeededAudits() {

      return this.auditResults && this.auditResults.filter(audit => audit.auditPassed).length

    },
    failedAudits() {

      return this.auditResults && this.auditResults.filter(audit => !audit.auditPassed).length

    },
    failedAuditsPercentage() {
      return this.auditResults && numberFormatter.format((this.failedAudits / this.auditResults.length) * 100)

    },
    succeededAuditsPercentage() {
      return this.auditResults && numberFormatter.format((this.succeededAudits / this.auditResults.length) * 100)

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
                toBlock: sub.toBlock,
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

    },
    web3Networks() {

      const loops = this.detectorHealth.loops
      const _web3Networks = {}

      for (const key in loops) {

        const subscriptions = loops[key].clipboard.subscriptions

        if (key !== 'http' && subscriptions && Object.values(subscriptions).length > 0) {
          _web3Networks[key] = loops[key]
        }

      }

      return _web3Networks

    }

  },
  methods: {

    calculateNetworkBlockTimes() {

      this.networkBlockTimes = {}

      const loops = this.detectorHealth.loops

      if (loops) {

        for (const key in loops) {

          if (key !== 'http') {

            const subscriptions = loops[key].clipboard.subscriptions

            if (subscriptions) {

              for (const sub of Object.values(subscriptions)) {

                if (sub.fromBlock && sub.toBlock) {

                  const prevToBlock = sub.fromBlock - 1

                  this.networkBlockTimes[key] = 1 / ((sub.toBlock - prevToBlock) / (loops[key].intervalMillis / 1000))

                  break

                }

              }

            }
          }
        }

      }

    },
    getUrlParams(name) {
      const query = new URLSearchParams(window.location.search)
      return query.get(name)
    },
    refreshNetworksChartDataSet() {

      const loops = this.detectorHealth.loops

      const loopsNames = []

      for (const key in loops) {

        if (loops[key].clipboard.subscriptions) {
          loopsNames.push(key)
        }

      }

      const networkSubCount = loopsNames.map(key => loops[key].clipboard.subscriptions && Object.keys(loops[key].clipboard.subscriptions).length)

      const colors = []

      for (const network of loopsNames) {

        let color = this.networksColors[network]

        if (!color) {
          color = randomColor()
          this.networksColors[network] = color
        }

        colors.push(color)

      }


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
    randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
          (this.auditChartDataSet.datasets[0].data[0] !== this.succeededAuditsPercentage || this.auditChartDataSet.datasets[0].data[1] !== this.failedAuditsPercentage))) {

        this.auditChartDataSet = {
          labels: ['Succeeded Audits', 'Failed Audits'],
          datasets: [
            {
              backgroundColor: ['green', 'orange'],
              data: [this.succeededAuditsPercentage, this.failedAuditsPercentage]
            }
          ]
        }

        this.$nextTick(() => {

          this.$refs.audit_chart && this.$refs.audit_chart.update()

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

      return ratio >= 1 ? 'text-danger' : (ratio < 0.7 ? 'text-success' : 'text-warning')

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
    toggleTheme() {
      this.darkMode = !this.darkMode
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

        this.calculateNetworkBlockTimes()

        if (!this.blockTimeTasks) {

          this.blockTimeTasks = []

          for (const key in this.detectorHealth.loops) {

            const networkBlockTime = this.networkBlockTimes[key]

            if (networkBlockTime > 0.2) {

              this.blockTimeTasks.push(window.setInterval(() => {

                const $blockIndicatorRow = $('#network_activity_container').find('.' + key)

                $blockIndicatorRow.find('.block-indicator').removeClass('current-block')

                const clone = `<div class="block-indicator current-block" \
                          style="background-color: ${this.networksColors[key]}; filter: brightness(${this.randomInteger(80, 100) / 100})"></div>`

                $blockIndicatorRow.prepend(clone)

              }, networkBlockTime * 1000))

            }

          }

        }

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

      const l3statusUrl = 'https://status.orbs.network/json-full'

      this.l3status = await (await fetch(l3statusUrl)).json()

      const auditResultsMap = (await get(this.auditRef)).val()

      this.auditResults = auditResultsMap ? Object.values(auditResultsMap) : []

      this.refreshAuditChartDataSet()

    }
  }

}
</script>
