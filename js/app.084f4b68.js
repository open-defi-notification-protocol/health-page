(function(t){function e(e){for(var s,o,n=e[0],c=e[1],l=e[2],h=0,u=[];h<n.length;h++)o=n[h],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&u.push(r[o][0]),r[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);d&&d(e);while(u.length)u.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,n=1;n<a.length;n++){var c=a[n];0!==r[c]&&(s=!1)}s&&(i.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},r={app:0},i=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],c=n.push.bind(n);n.push=e,n=n.slice();for(var l=0;l<n.length;l++)e(n[l]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("85ec")},"0ab9":function(t,e,a){},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(t){var e=i(t);return a(e)}function i(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}r.keys=function(){return Object.keys(s)},r.resolve=i,t.exports=r,r.id="4678"},"492e":function(t,e,a){"use strict";a("0ab9")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s,r,i,o,n,c,l=a("2b0e"),d=a("5f5b"),h=(a("ab8b"),a("2dd8"),a("8c4f")),u=a("2ead"),f=a.n(u),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",class:t.modeProduction?"":"modeTest"},[a("div",{staticClass:"header px-3 title justify-content-between"},[t._m(0),a("div",{staticClass:" title-buttons d-flex"},[a("button",{staticClass:"mx-2 btn btn-primary",on:{click:t.toggleMode}},[t._v(" "+t._s(t.expertMode?"Expert Mode":"Simple Mode")+" ")]),a("button",{staticClass:"mx-2 btn btn-primary",on:{click:t.toggleEnv}},[t._v(" "+t._s(t.modeProduction?"Production Env":"Development Env")+" ")]),a("button",{staticClass:"mx-2 btn btn-primary",on:{click:function(e){return t.loaderFunction(!0)}}},[a("font-awesome-icon",{attrs:{icon:"fa-solid fa-rotate"}})],1)])]),t.detectorHealth?a("div",{staticClass:"px-3 main-container",staticStyle:{display:"flex","flex-direction":"column"}},[a("div",{staticStyle:{display:"flex","flex-direction":"column","margin-top":"7rem"}},[a("div",{staticClass:"d-flex align-items-center gauge-cards"},[a("health-card",{attrs:{health:t.detectorHealth,expertMode:t.expertMode,"fa-icon":"fa-server",title:"Detector",healthEndpoint:t.healthEndpoint}}),a("div",{staticClass:"vr d-none",staticStyle:{height:"5rem"}}),a("health-card",{attrs:{health:t.managerHealth,expertMode:t.expertMode,"fa-icon":"fa-database",title:"Manager",healthEndpoint:t.managerHealthEndpoint}}),a("div",{staticClass:"vr d-none",staticStyle:{height:"5rem"}}),a("health-card",{attrs:{health:t.l3Health,expertMode:t.expertMode,icon:"https://www.orbs.com/assets/img/common/logo.svg",title:"ORBS L3",healthEndpoint:t.l3HealthEndpoint}})],1),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("table",{staticClass:"d-flex flex-column",class:t.expertMode?"visible":"hidden"},[a("tbody",[a("tr",[a("td",{staticClass:"px-3"},[t._v(" Server uptime:")]),a("td",{staticClass:" fw-bold"},[t._v(" "+t._s(t._f("duration")([t.detectorHealth.uptime,"seconds"],"humanize")))])]),a("tr",[a("td",{staticClass:"px-3"},[t._v(" Heap Size:")]),t.detectorHealth.heapUsedMB?a("td",{staticClass:" fw-bold"},[t._v(" "+t._s(t.detectorHealth.heapUsedMB.toFixed(1))+"Mb ")]):t._e()]),a("tr",[a("td",{staticClass:"px-3"},[t._v(" Env:")]),t.detectorHealth.env?a("td",{staticClass:" fw-bold"},[t._v(" "+t._s(t.detectorHealth.env))]):t._e()])])])])]),a("div",{staticClass:" card charts"},[a("div",{staticClass:"mb-3 card-title"},[t._v("NETWORKS")]),a("div",{staticClass:"d-flex flex-row justify-content-between charts-container"},[a("div",{staticClass:"px-4 chart-container"},[a("div",{staticClass:"chart-title"},[t._v("Networks Performance (ms)")]),a("BarChart",{ref:"network_performance_chart",staticClass:"chart",attrs:{width:700,height:200,"chart-data":t.networksPerformanceChartDataSet,options:t.barOptions}})],1),a("div",{staticClass:"vr",staticStyle:{height:"230px"}}),a("div",{staticClass:"px-4 chart-container"},[a("div",{staticClass:"chart-title"},[t._v("Subscriptions Pre Network")]),a("DoughnutChart",{ref:"networks_chart",staticClass:"chart",attrs:{width:230,height:200,"chart-data":t.networksChartDataSet,options:t.optionsNoLegend}})],1)])]),a("div",{staticClass:" card charts"},[a("div",{staticClass:"mb-3 card-title"},[t._v("DETECTION HEALTH")]),a("div",{staticClass:"d-flex flex-row justify-content-between charts-container "},[a("div",{staticClass:"px-4 chart-container"},[a("div",{staticClass:" chart-title"},[t._v("Subscriptions Per Project")]),a("DoughnutChart",{ref:"projects_chart",staticClass:"chart",attrs:{width:700,height:200,"chart-data":t.projectsChartDataSet,options:t.options}})],1),a("div",{staticClass:"vr",staticStyle:{height:"230px"}}),a("div",{staticClass:"px-4 chart-container"},[a("div",{staticClass:"chart-title"},[t._v("Audit Statistics")]),a("PolarChart",{ref:"audit_chart",staticClass:"chart",attrs:{width:230,height:200,"chart-data":t.auditChartDataSet,options:t.optionsNoLegend}})],1)])]),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("div",{staticClass:"table-responsive"},[t.detectorHealth?a("table",{staticClass:"  common-table table  table-hover table-bordered"},[t._m(1),a("tbody",[t.detectorHealth?a("tr",[a("th",[t._v("Detector")]),a("td",[a("a",{attrs:{href:t.healthEndpoint,target:"_blank"}},[t._v(t._s(t.healthEndpoint))])]),a("td",[t._v(" "+t._s(t.detectorHealth&&t.detectorHealth.commitHash)+" ")]),a("td",[t._v(" "+t._s(t.detectorHealth&&t.detectorHealth.projectsCommitHash)+" ")])]):t._e(),t.managerHealth?a("tr",[a("th",[t._v("Manager")]),a("td",[a("a",{attrs:{href:t.managerHealthEndpoint,target:"_blank"}},[t._v(t._s(t.managerHealthEndpoint))])]),a("td",[t._v(" "+t._s(t.managerHealth.commitHash)+" ")]),a("td",[t._v(" "+t._s(t.managerHealth.projectsCommitHash)+" ")])]):t._e(),t.l3Health?a("tr",[a("th",[t._v("Layer 3")]),a("td",[a("a",{attrs:{href:t.l3HealthEndpoint,target:"_blank"}},[t._v(t._s(t.l3HealthEndpoint))])]),a("td",[t._v(" "+t._s(t.l3Health.commitHash)+" ")]),a("td",[t._v(" "+t._s(t.l3Health.projectsCommitHash)+" ")])]):t._e()])]):t._e()])]),t.detectorHealth.errors.length>0?a("div",{staticClass:"card"},[a("div",{staticClass:" fw-bold"},[t._v("Errors")]),a("table",{staticClass:"  common-table table  table-hover table-bordered"},[t._m(2),a("tbody",t._l(t.detectorHealth.errors,(function(e,s){return a("tr",{key:s,class:e.level>0?e.level>1?"text-danger":"text-warning":""},[a("td",[t._v(" "+t._s(e.type)+" ")]),a("td",[t._v(" "+t._s(e.loop)+" ")]),a("td",[t._v(" "+t._s(e.info)+" ")])])})),0)])]):t._e(),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("div",{staticClass:"  pb-2 fw-bold "},[t._v("Loops Status")]),a("div",{staticClass:"table-responsive"},[t.detectorHealth.loops?a("table",{staticClass:"  common-table table  table-hover table-bordered"},[t._m(3),a("tbody",[t._l(Object.keys(t.detectorHealth.loops),(function(e){return a("tr",{key:e},[a("th",[t._v(" "+t._s(e.charAt(0).toUpperCase()+e.slice(1))+" ")]),a("td",{},[t._v(" "+t._s("idle"===t.detectorHealth.loops[e].started?"Idle":"Running...")+" ")]),a("td",{class:t.getColorClass(t.detectorHealth.loops[e].errors,t.detectorHealth.loopErrorsThreshold),staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.loops[e].errors)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(new Date(t.detectorHealth.loops[e].lastCompleted).toLocaleString())+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.loops[e].count)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.loops[e].clipboard.subscriptions&&Object.keys(t.detectorHealth.loops[e].clipboard.subscriptions).length)+" ")]),a("td",{class:t.getColorClass(t.detectorHealth.loops[e].elapsedTimeMillis,t.detectorHealth.loopSlowThresholdMillis),staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.loops[e].elapsedTimeMillis)+" ")])])})),a("tr",[t._m(4),a("td",{}),a("td",{staticStyle:{"text-align":"right"}},[a("b",[t._v(t._s(t.totalErrors))])]),a("td",{staticStyle:{"text-align":"right"}}),a("td",{staticStyle:{"text-align":"right"}}),a("td",{staticStyle:{"text-align":"right"}},[a("b",[t._v(t._s(t.totalSubscriptions))])]),a("td")])],2)]):t._e()])]),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("div",{staticClass:" pb-2 fw-bold"},[t._v("Global Parameters")]),a("div",{staticClass:"table-responsive"},[t.detectorHealth.networks?a("table",{staticClass:"  common-table table  table-hover table-bordered"},[t._m(5),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t._f("duration")([t.detectorHealth.loopSlowThresholdMillis,"milliseconds"],"humanize"))+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t._f("duration")([t.detectorHealth.loopStuckThresholdMillis,"milliseconds"],"humanize"))+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t._f("duration")([t.detectorHealth.loopUnsuccessfulThresholdMillis,"milliseconds"],"humanize"))+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.loopErrorsThreshold)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t._f("duration")([t.detectorHealth.subscriptionModificationGraceMillis,"milliseconds"],"humanize"))+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.onBlocksRequestTimeout)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.detectorHealth.getBlockRequestTimeout)+" ")])])])]):t._e()])]),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("div",{staticClass:"pb-2 fw-bold"},[t._v("Networks Parameters")]),a("div",{staticClass:"table-responsive"},[t.detectorHealth.networks?a("table",{staticClass:"  common-table table  table-hover table-bordered"},[t._m(6),a("tbody",t._l(Object.values(t.detectorHealth.networks),(function(e){return a("tr",{key:e.id},[a("th",[t._v(" "+t._s(e.id.charAt(0).toUpperCase()+e.id.slice(1))+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.loopIntervalMillis)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.initBlockRangeSize)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.executor_asyncSize)+" ")])])})),0)]):t._e()])]),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("div",{staticClass:" px-3 "},[t._v("Audit")]),a("div",{staticClass:"table-responsive"},[t.auditResults?a("table",{staticClass:"  common-table table  table-hover table-bordered"},[t._m(7),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.auditedRequestsPercentage)+"% ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.succeededAudits)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.failedAudits)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.failedAuditsPercentage.toFixed(2))+"% ")])])])]):t._e()])]),a("div",{staticClass:"card",class:t.expertMode?"visible":"hidden"},[a("div",{staticClass:"  pb-2 fw-bold "},[t._v("Project Statistics")]),a("div",{staticClass:"table-responsive"},[t.projectsStatistics?a("table",{staticClass:" common-table table  table-hover table-bordered"},[t._m(8),a("tbody",t._l(t.projectsStatistics,(function(e){return a("tr",{key:e.projectId},[a("th",[t._v(" "+t._s(e.projectId)+" ")]),a("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.subs.length)+" ")])])})),0)]):t._e()])]),a("br")]):t._e(),t.detectorError?a("div",{staticClass:"justify-content-center flex-column d-flex align-items-center",staticStyle:{height:"100vh"}},[a("h1",[t._v("😫")]),a("h5",[t._v(t._s(t.detectorError))])]):t._e(),t.isLoading?a("div",{staticClass:"loading"},[a("img",{attrs:{src:"https://media3.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e478m15g7rgia18ipg9menvhnn4ahik4vcjd5zzr33r&rid=giphy.gif&ct=s"}})]):t._e()])},b=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-items-center"},[a("div",{staticClass:"logo "},[a("img",{attrs:{onclick:"window.open('https://defi.org/notifications/')",src:"https://defi.org/notifications/assets/images/navbar/logo.svg"}})]),a("div",{staticClass:"main-title mx-4 d-flex flex-column"},[a("span",[t._v("Open DeFi Notifications")]),a("span",{staticClass:"powered-by"},[t._v(" Powered by "),a("img",{attrs:{src:"https://defi.org/notifications/assets/images/orbs-logo-3.svg"}})])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{},[a("tr",[a("th",[t._v(" Module ")]),a("th",[t._v(" Endpoint ")]),a("th",[t._v(" Deployment Commit Hash ")]),a("th",[t._v(" Projects Commit Hash ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",[t._v(" Type ")]),a("td",[t._v(" Loop ")]),a("td",[t._v(" info ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v(" Loop ")]),a("th",[t._v(" State ")]),a("th",[t._v(" Error count ")]),a("th",[t._v(" Last Completed ")]),a("th",[t._v(" Execution Count ")]),a("th",[t._v(" Subscriptions ")]),a("th",[t._v(" Elapsed (ms) ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("th",[a("b",[t._v("Total")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v(" Slow Threshold ")]),a("th",[t._v(" Stuck Threshold ")]),a("th",[t._v(" Unsuccessful Threshold ")]),a("th",[t._v(" Errors Threshold ")]),a("th",[t._v(" Subscription Change Detection ")]),a("th",[t._v(" onBlocks execution Timeout (ms) ")]),a("th",[t._v(" Get Block Timeout (ms) ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v(" Network ")]),a("th",[t._v(" Loop Interval (ms) ")]),a("th",[t._v(" Init Block Range Size ")]),a("th",[t._v(" Executor Async Size ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v(" % Audited ")]),a("th",[t._v(" Passed ")]),a("th",[t._v(" Failed ")]),a("th",[t._v(" % Failed ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v(" Project ")]),a("th",[t._v(" Subscription Count ")])])])}],v=a("1da1"),m=(a("4de4"),a("d3b7"),a("07ac"),a("4e82"),a("b64b"),a("d81d"),a("d9e2"),a("96cf"),a("1fca")),g={extends:m["a"],props:["chartData","options"],methods:{update:function(){this.renderChart(this.chartData,this.options)}},mounted:function(){this.renderChart(this.chartData,this.options)}},_=g,j=a("2877"),C=Object(j["a"])(_,s,r,!1,null,null,null),x=C.exports,y={extends:m["b"],props:["chartData","options"],methods:{update:function(){this.renderChart(this.chartData,this.options)}},mounted:function(){this.renderChart(this.chartData,this.options)}},k=y,S=Object(j["a"])(k,i,o,!1,null,null,null),H=S.exports,w={extends:m["c"],props:["chartData","options"],methods:{update:function(){this.renderChart(this.chartData,this.options)}},mounted:function(){this.renderChart(this.chartData,this.options)}},E=w,D=Object(j["a"])(E,n,c,!1,null,null,null),M=D.exports,O=a("66ce"),P=a("260b"),A=a("fd9b"),z=a.n(A),R=a("ad3d"),T=a("ecee"),I=a("c074"),L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card gauge-card flex-row justify-content-between"},[t.health?a("div",{staticClass:"d-flex flex-column"},[a("div",{staticClass:"mb-3 card-title text-nowrap"},[t._v(t._s(t.title.toUpperCase()))]),a("div",{staticClass:"gauge-value ",class:"OK"===t.health.status?"text-success":"ERROR"===t.health.status?"text-danger":"text-warning"},[t._v(" "+t._s(t.health.status)+" ")])]):t._e(),t.faIcon&&!t.expertMode?a("div",{staticClass:"  fa-5x d-flex gauge-icon align-items-center"},[a("font-awesome-icon",{attrs:{icon:"fa-solid "+t.faIcon}})],1):t.icon&&!t.expertMode?a("div",{staticClass:" fa-5x d-flex gauge-icon align-items-center"},[a("img",{attrs:{src:t.icon,width:"80"}})]):t._e(),t.expertMode&&t.healthEndpoint?a("div",{staticClass:"card-title d-flex flex-column header-button"},[a("a",{staticClass:" ",attrs:{href:t.healthEndpoint,target:"_blank"}},[t._v("RAW")])]):t._e()])},$=[],B={props:["health","expertMode","healthEndpoint","title","faIcon","icon"],methods:{}},F=B,N=(a("492e"),Object(j["a"])(F,L,$,!1,null,null,null)),U=N.exports;T["c"].add(I["c"]),T["c"].add(I["d"]),T["c"].add(I["a"]),T["c"].add(I["b"]),l["default"].component("font-awesome-icon",R["a"]);var G={name:"App",components:{HealthCard:U,BarChart:x,DoughnutChart:H,PolarChart:M},data:function(){return{options:{responsive:!0,maintainAspectRatio:!1,legend:{position:"left"}},optionsNoLegend:{responsive:!0,maintainAspectRatio:!1,legend:!1},barOptions:{responsive:!0,maintainAspectRatio:!1,legend:!1,scales:{yAxes:[{gridLines:{drawOnChartArea:!1}}],xAxes:[{gridLines:{drawOnChartArea:!1}}]}},networksPerformanceChartDataSet:null,networksChartDataSet:null,projectsChartDataSet:null,auditChartDataSet:null,detectorHealth:null,managerHealth:null,l3Health:null,detectorError:null,auditResults:null,managerError:null,prodAuditRef:null,testAuditRef:null,l3Error:null,modeProduction:!0,expertMode:!1,isLoading:!0}},mounted:function(){var t=this;return Object(v["a"])(regeneratorRuntime.mark((function e(){var a,s,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=Object(P["a"])({apiKey:"AIzaSyBMyomj4UiFVLirE7iG6cJBWU4lZE5dB6k",authDomain:"open-defi-notifications.firebaseapp.com",databaseURL:"https://open-defi-notifications-default-rtdb.firebaseio.com",projectId:"open-defi-notifications",storageBucket:"open-defi-notifications.appspot.com",messagingSenderId:"394201114987",appId:"1:394201114987:web:26bcf3a9374291467b042e",measurementId:"G-X9HH8PYVGB"},"test"),s=Object(P["a"])({apiKey:"AIzaSyCH2vgsAGCxC9Kbzfe1AyZunCXCoJxg-O8",authDomain:"notifications-deddy-ron-test.firebaseapp.com",databaseURL:"https://notifications-deddy-ron-test-default-rtdb.firebaseio.com",projectId:"notifications-deddy-ron-test",storageBucket:"notifications-deddy-ron-test.appspot.com",messagingSenderId:"699309381956",appId:"1:699309381956:web:bf35ff2cde11b684aa1f11",measurementId:"G-KECX1V3QY8"},"prod"),r=Object(O["b"])(s),i=Object(O["b"])(a),t.testAuditRef=Object(O["c"])(r,"audit"),t.prodAuditRef=Object(O["c"])(i,"audit"),e.next=8,t.loaderFunction();case 8:case"end":return e.stop()}}),e)})))()},computed:{auditedRequestsPercentage:function(){return Math.round(1/this.detectorHealth.auditEveryProb_1_in_x*100)},succeededAudits:function(){return this.auditResults&&this.auditResults.filter((function(t){return t.auditPassed})).length},failedAudits:function(){return this.auditResults&&this.auditResults.filter((function(t){return!t.auditPassed})).length},failedAuditsPercentage:function(){return this.failedAudits/this.succeededAudits*100},healthEndpoint:function(){return this.modeProduction?"https://open-defi-notifications-detect.herokuapp.com/health":"https://defi-notifications-detect-test.herokuapp.com/health"},managerHealthEndpoint:function(){return this.modeProduction?"https://us-central1-open-defi-notifications.cloudfunctions.net/app/health":"https://us-central1-notifications-deddy-ron-test.cloudfunctions.net/app/health"},auditRef:function(){return this.modeProduction?this.prodAuditRef:this.testAuditRef},l3HealthEndpoint:function(){return this.modeProduction?"https://odnp-l3-test-node.global.ssl.fastly.net/health":"https://defi-notification-l3-test.herokuapp.com/health"},projectsStatistics:function(){var t={};if(this.detectorHealth&&this.detectorHealth.loops)for(var e in this.detectorHealth.loops){var a=this.detectorHealth.loops[e].clipboard.subscriptions;if(a)for(var s=0,r=Object.values(a);s<r.length;s++){var i=r[s],o=t[i.projectId];t[i.projectId]=o=o||{projectId:i.projectId,subs:[]},o.subs.push(i)}}var n=Object.values(t);return n.sort((function(t,e){return t.projectId.localeCompare(e.projectId)})),n},totalSubscriptions:function(){var t=0;if(this.detectorHealth&&this.detectorHealth.loops)for(var e in this.detectorHealth.loops)this.detectorHealth.loops[e].clipboard.subscriptions&&(t+=Object.keys(this.detectorHealth.loops[e].clipboard.subscriptions).length);return t},totalErrors:function(){var t=0;if(this.detectorHealth&&this.detectorHealth.loops)for(var e in this.detectorHealth.loops)this.detectorHealth.loops[e].errors&&(t+=this.detectorHealth.loops[e].errors);return t}},methods:{refreshNetworksChartDataSet:function(){var t=this,e=this.detectorHealth.loops,a=[];for(var s in e)e[s].clipboard.subscriptions&&a.push(s);var r=a.map((function(t){return e[t].clipboard.subscriptions&&Object.keys(e[t].clipboard.subscriptions).length})),i=a.map((function(){return z()()}));this.networksChartDataSet={labels:a,datasets:[{backgroundColor:i,data:r}]};var o=a.map((function(t){return e[t]&&e[t].elapsedTimeMillis}));this.networksPerformanceChartDataSet={labels:a,datasets:[{backgroundColor:i,data:o}]},this.$nextTick((function(){t.$refs.network_performance_chart.update(),t.$refs.networks_chart.update()}))},refreshProjectsChartDataSet:function(){var t=this,e=this.projectsStatistics.map((function(t){return t.projectId})),a=this.projectsStatistics.map((function(t){return t.subs.length})),s=this.projectsStatistics.map((function(){return z()()}));a&&(this.projectsChartDataSet={labels:e,datasets:[{backgroundColor:s,data:a}]}),this.$nextTick((function(){t.$refs.projects_chart.update()}))},refreshAuditChartDataSet:function(){var t=this;!this.auditResults||this.auditChartDataSet&&this.auditChartDataSet.datasets[0].data[0]===this.succeededAudits&&this.auditChartDataSet.datasets[0].data[1]===this.failedAudits||(this.auditChartDataSet={labels:["Succeeded Audits","Failed Audits"],datasets:[{backgroundColor:["green","orange"],data:[this.succeededAudits,this.failedAudits]}]},this.$nextTick((function(){t.$refs.audit_chart.update()})))},refreshCharts:function(){this.refreshNetworksChartDataSet(),this.refreshProjectsChartDataSet(),this.refreshAuditChartDataSet()},getColorClass:function(t,e){var a=t/e;return a>=1?"text-danger":a<.2?"text-success":"text-warning"},toggleMode:function(){this.expertMode=!this.expertMode},toggleEnv:function(){var t=this;this.modeProduction=!this.modeProduction,this.$nextTick((function(){t.loaderFunction(!0)}))},loaderFunction:function(t){var e=this;return Object(v["a"])(regeneratorRuntime.mark((function a(){var s,r,i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t&&(e.isLoading=!0),a.prev=1,a.next=4,fetch(e.healthEndpoint,{method:"GET"});case 4:return s=a.sent,a.next=7,s.json();case 7:e.detectorHealth=a.sent,e.detectorError=null,a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](1),e.detectorError=new Error("Failed fetching Detector health");case 14:return e.isLoading=!1,e.refreshNetworksChartDataSet(),a.prev=16,a.next=19,fetch(e.managerHealthEndpoint,{method:"GET"});case 19:return r=a.sent,a.next=22,r.json();case 22:e.managerHealth=a.sent,e.managerError=null,a.next=30;break;case 26:a.prev=26,a.t1=a["catch"](16),e.managerHealth=null,e.managerError=new Error("Failed fetching Manager health");case 30:return e.refreshProjectsChartDataSet(),a.prev=31,a.next=34,fetch(e.l3HealthEndpoint,{method:"GET"});case 34:return i=a.sent,a.next=37,i.json();case 37:e.l3Health=a.sent,e.l3Error=null,a.next=45;break;case 41:a.prev=41,a.t2=a["catch"](31),e.l3Health=null,e.l3Error=new Error("Failed fetching L3 health");case 45:return a.next=47,Object(O["a"])(e.auditRef);case 47:o=a.sent.val(),e.auditResults=o?Object.values(o):[],e.refreshAuditChartDataSet();case 50:case"end":return a.stop()}}),a,null,[[1,11],[16,26],[31,41]])})))()}}},q=G,K=(a("034f"),Object(j["a"])(q,p,b,!1,null,null,null)),J=K.exports;l["default"].use(d["a"]),l["default"].use(h["a"]),l["default"].use(f.a);var V=new l["default"]({transformToRequire:{img:"src",image:"xlink:href"},render:function(t){return t(J)},mounted:function(){document.title="Detector Health"}});V.$mount("#app")},"85ec":function(t,e,a){}});
//# sourceMappingURL=app.084f4b68.js.map