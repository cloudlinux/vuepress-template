(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{283:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return o})},315:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var o=n(283);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){Object(o.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}},340:function(e,t,n){},359:function(e,t,n){e.exports=n.p+"assets/img/bot.9745ef89.png"},360:function(e,t,n){"use strict";var o=n(340);n.n(o).a},367:function(e,t,n){"use strict";n.r(t);n(18),n(150);var o=n(315),s=n(359),c=n.n(s),i={components:{BotIcon:c.a},data:function(){return{dynamicComponent:null,messages:[],messageData:[],isConnected:!1,waitResponse:!1,botOptions:{botAvatarImg:c.a,botTitle:"AI Bot",colorScheme:"#43a069",boardContentBg:"#f4f4f4",msgBubbleBgBot:"#fff",msgBubbleBgUser:"#43a069",inputPlaceholder:"Ask a new question"},docName:"imunify360-doc"}},mounted:function(){var e=this;n.e(58).then(n.t.bind(null,364,7)).then(function(t){e.dynamicComponent=t.VueBotUI}),console.log("Starting connection..."),this.connection=new WebSocket("wss://doc-bot.cloudlinux.com:2096"),this.connection.onmessage=function(t){var n=JSON.parse(t.data);e.messages.push({agent:"bot",type:"markdown",text:n.text}),e.waitResponse=!1,setTimeout(function(){e.messages.push({agent:"bot",type:"rate",id:n.id})},1e3)},this.connection.onclose=function(t){console.log("Connection closed"),e.isConnected=!1},this.connection.onopen=function(t){console.log("Successfully connected to the websocket server..."),e.isConnected=!0}},methods:{messageSendHandler:function(e){this.messages.push({agent:"user",type:"text",text:e.text}),this.connection.send(JSON.stringify({type:"question",text:e.text,"doc-name":this.docName})),this.waitResponse=!0},messageToServer:function(e){this.connection.send(JSON.stringify(Object(o.a)(Object(o.a)({},{"doc-name":this.docName}),e)))}}},r=(n(360),n(34)),a=Object(r.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ClientOnly",[n("div",{attrs:{id:"app"}},[e.dynamicComponent&&e.isConnected?n(e.dynamicComponent,{tag:"VueBotUI",attrs:{messages:e.messages,options:e.botOptions,"bot-typing":e.waitResponse,"input-disable":e.waitResponse},on:{"msg-send":e.messageSendHandler,"msg-to-server":e.messageToServer}}):e._e()],1)])},[],!1,null,null,null);t.default=a.exports}}]);