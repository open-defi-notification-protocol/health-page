(function(t){function e(e){for(var r,o,i=e[0],n=e[1],c=e[2],h=0,u=[];h<i.length;h++)o=i[h],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&u.push(a[o][0]),a[o]=0;for(r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);d&&d(e);while(u.length)u.shift()();return l.push.apply(l,c||[]),s()}function s(){for(var t,e=0;e<l.length;e++){for(var s=l[e],r=!0,i=1;i<s.length;i++){var n=s[i];0!==a[n]&&(r=!1)}r&&(l.splice(e--,1),t=o(o.s=s[0]))}return t}var r={},a={app:0},l=[];function o(e){if(r[e])return r[e].exports;var s=r[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=r,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(s,r,function(e){return t[e]}.bind(null,r));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],n=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var d=n;l.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";s("85ec")},"56d7":function(t,e,s){"use strict";s.r(e);s("e623"),s("e379"),s("5dc8"),s("37e1");var r=s("2b0e"),a=s("5f5b"),l=(s("ab8b"),s("2dd8"),s("8c4f")),o=s("2ead"),i=s.n(o),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("img",{staticClass:"background",attrs:{src:"https://static.wixstatic.com/media/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg/v1/fill/w_1400,h_400,al_c/36247c_17923c17ce6642fa9ab5b64445d61b47~mv2.jpg"}}),t._m(0),t.health?s("div",{staticStyle:{display:"flex","flex-direction":"column"}},[s("h3",{staticClass:"px-3 pt-3 title"},[t._v(" Open DeFi Notifications Health ")]),s("div",{staticClass:" p-3 ",staticStyle:{display:"flex","flex-direction":"column"}},[s("div",{staticStyle:{display:"flex"}},[s("span",{staticClass:"my-2"},[t._v(" Server health: ")]),t.error?s("div",{staticClass:"m-2 fw-bold red"},[t._v(" "+t._s(t.error)+" 😫 ")]):s("div",{staticClass:"m-2 fw-bold",class:"OK"===t.health.status?"green":"ERROR"===t.health.status?"red":"orange"},[t._v(" "+t._s(t.health.status)+" "+t._s("OK"===t.health.status?"😁":"ERROR"===t.health.status?"😫":"😐")+" ")]),s("span",{staticClass:"my-2"},[t._v(" Server uptime: ")]),s("div",{staticClass:"m-2 fw-bold"},[t._v(" "+t._s(t._f("duration")([t.health.uptime,"seconds"],"humanize")))]),s("a",{staticClass:"m-2",attrs:{href:"https://addons-sso.heroku.com/apps/50eb195f-1036-4b99-a124-8653f6d07123/addons/f9f455a8-2cd4-4a43-954d-82d9f90f2d2b",target:"_blank"}},[t._v(" Papertrail ")])])]),t.health.errors.length>0?s("div",[s("div",{staticClass:" px-3 "},[t._v("Errors")]),s("table",{staticClass:"common-table"},[t._m(1),s("tbody",t._l(t.health.errors,(function(e){return s("tr",{key:e,class:e.level>0?e.level>1?"red":"orange":""},[s("td",[t._v(" "+t._s(e.type)+" ")]),s("td",[t._v(" "+t._s(e.loop)+" ")]),s("td",[t._v(" "+t._s(e.info)+" ")])])})),0)]),s("br")]):t._e(),s("div",{staticClass:" px-3 "},[t._v("Loops Status")]),t.health.loops?s("table",{staticClass:"common-table"},[t._m(2),s("tbody",t._l(Object.keys(t.health.loops),(function(e){return s("tr",{key:e},[s("td",[t._v(" "+t._s(e)+" ")]),s("td",{},[t._v(" "+t._s("idle"===t.health.loops[e].started?"idle":"running")+" ")]),s("td",{class:t.getColorClass(t.health.loops[e].errors,t.health.loopErrorsThreshold),staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.health.loops[e].errors)+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(new Date(t.health.loops[e].lastCompleted).toLocaleString())+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.health.loops[e].count)+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.health.loops[e].clipboard.subscriptions&&Object.keys(t.health.loops[e].clipboard.subscriptions).length)+" ")]),s("td",{class:t.getColorClass(t.health.loops[e].elapsedTimeMillis,t.health.loopSlowThresholdMillis),staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.health.loops[e].elapsedTimeMillis)+" ")])])})),0)]):t._e(),s("br"),s("div",{staticClass:" px-3 "},[t._v("Global Parameters")]),t.health.networks?s("table",{staticClass:"common-table"},[t._m(3),s("tbody",[s("tr",[s("td",[t._v(" "+t._s(t._f("duration")([t.health.loopSlowThresholdMillis,"milliseconds"],"humanize"))+" ")]),s("td",{},[t._v(" "+t._s(t._f("duration")([t.health.loopStuckThresholdMillis,"milliseconds"],"humanize"))+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t._f("duration")([t.health.loopUnsuccessfulThresholdMillis,"milliseconds"],"humanize"))+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t.health.loopErrorsThreshold)+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(t._f("duration")([t.health.subscriptionModificationGraceMillis,"milliseconds"],"humanize"))+" ")])])])]):t._e(),s("br"),s("div",{staticClass:" px-3 "},[t._v("Networks Parameters")]),t.health.networks?s("table",{staticClass:"common-table"},[t._m(4),s("tbody",t._l(Object.values(t.health.networks),(function(e){return s("tr",{key:e.id},[s("td",[t._v(" "+t._s(e.id)+" ")]),s("td",{},[t._v(" "+t._s(e.loopIntervalMillis)+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.initBlockRangeSize)+" ")]),s("td",{staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.executor_asyncSize)+" ")])])})),0)]):t._e()]):t._e(),t.error?s("div",{staticClass:"justify-content-center flex-column d-flex align-items-center",staticStyle:{height:"100vh"}},[s("h1",[t._v("😫")]),s("h5",[t._v(t._s(t.error))])]):t._e(),t.isLoading?s("div",{staticClass:"loading"},[s("img",{attrs:{src:"https://media.giphy.com/media/eJWyod5gLxdcY/giphy.gif?cid=ecf05e473mnhsxzl45qw6ucn5nrbfmurt4gmgwdjsp9jspnp&rid=giphy.gif&ct=s"}})]):t._e()])},c=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"logo"},[r("img",{attrs:{src:"https://play-lh.googleusercontent.com/1bxBSz9Aj_TESC9mUjs7c365PNvfHm8TUA8L1iMNOxcQpXi2zhUAsqQyhc4VEAKr938U=s360-rw"}}),r("h1",{staticClass:"my-3"},[t._v("DeFi Notifications")]),r("img",{attrs:{src:s("9b19")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticStyle:{"font-weight":"bold"}},[s("td",[t._v(" Type ")]),s("td",[t._v(" Loop ")]),s("td",[t._v(" info ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticStyle:{"font-weight":"bold"}},[s("td",[t._v(" Loop ")]),s("td",[t._v(" State ")]),s("td",[t._v(" Error count ")]),s("td",[t._v(" Last Completed ")]),s("td",[t._v(" Execution Count ")]),s("td",[t._v(" Subscriptions ")]),s("td",[t._v(" Elapsed (ms) ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticStyle:{"font-weight":"bold"}},[s("td",[t._v(" Slow Threshold ")]),s("td",[t._v(" Stuck Threshold ")]),s("td",[t._v(" Unsuccessful Threshold ")]),s("td",[t._v(" Errors Threshold ")]),s("td",[t._v(" Subscription Change Detection ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticStyle:{"font-weight":"bold"}},[s("td",[t._v(" Network ")]),s("td",[t._v(" Loop Interval (ms) ")]),s("td",[t._v(" Init Block Range Size ")]),s("td",[t._v(" Executor Async Size ")])])}],d=s("1da1"),h=(s("96cf"),s("d3b7"),{name:"App",data:function(){return{health:null,error:null,isLoading:!0}},mounted:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:setInterval(Object(d["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://open-defi-notifications-detect.herokuapp.com/health",{method:"GET"});case 3:return s=e.sent,e.next=6,s.json();case 6:t.health=e.sent,t.error=null,e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),t.error=e.t0;case 13:t.isLoading=!1;case 14:case"end":return e.stop()}}),e,null,[[0,10]])}))),1e3);case 1:case"end":return e.stop()}}),e)})))()},computed:{},methods:{getColorClass:function(t,e){var s=t/e;return s>=1?"red":s<.2?"green":"orange"}}}),u=h,p=(s("034f"),s("2877")),_=Object(p["a"])(u,n,c,!1,null,null,null),f=_.exports;r["default"].use(a["a"]),r["default"].use(l["a"]),r["default"].use(i.a);var v=new r["default"]({transformToRequire:{img:"src",image:"xlink:href"},render:function(t){return t(f)},mounted:function(){document.title="Detector Health"}});v.$mount("#app")},"85ec":function(t,e,s){},"9b19":function(t,e,s){t.exports=s.p+"img/logo.8775a381.svg"}});
//# sourceMappingURL=app.8bf056ec.js.map