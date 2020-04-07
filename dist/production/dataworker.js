!function(e){var t={};function r(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(s,o,function(t){return e[t]}.bind(null,o));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=42)}({1:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var s=r(11);const o=Symbol.for("configSymbol"),i=Symbol("isInstance");class n{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.Base",ntype:"base",mixins:null}}constructor(e){e=e||{};let t=this;Object.defineProperties(t,{[o]:{configurable:!0,enumerable:!1,value:{},writable:!0},[i]:{enumerable:!1,value:!0}}),t.createId(e.id||t.id),delete e.id,t.constructor.config&&delete t.constructor.config.id,(t.getStaticConfig("observable")||t.mixins&&Neo.ns("Neo.core.Observable",t.mixins))&&t.initObservable(e),t.initConfig(e),t.controller&&t.controller.parseConfig(),Object.defineProperty(t,"configsApplied",{enumerable:!1,value:!0}),t.remote&&setTimeout(t.initRemote.bind(t),1)}onConstructed(){}init(){}beforeSetEnumValue(e,t,r,s=r+"s"){const o=this.getStaticConfig(s);return o.includes(e)?e:(Neo.logError("Supported values for "+r+" are:",o.join(", "),this),t)}createId(e){let t=this;e||(e=s.a.getId(t.ntype)),t.id=e,!0===n.instanceManagerAvailable?Neo.manager.Instance.register(t):(Neo.idMap||(Neo.idMap={}),Neo.idMap[t.id]=t)}destroy(){let e=this;!0===n.instanceManagerAvailable&&Neo.manager.Instance.unregister(e),Object.entries(e).forEach(t=>{e[t]=null,delete e[t]})}getStaticConfig(e){let t=this.constructor.staticConfig;return e?t[e]:t}initConfig(e,t){Object.assign(this[o],this.mergeConfig(e,t)),this.processConfigs()}processConfigs(){let e=this,t=Object.keys(e[o]);t.length>0&&(e.hasOwnProperty(t[0])||(e[t[0]]=e[o][t[0]]),delete e[o][t[0]],e.processConfigs())}initRemote(){let e,t=this.remote,r=this.className;if(!this.singleton)throw new Error("Remote method access only functional for Singleton classes "+r);!Neo.config.unitTestMode&&Neo.isObject(t)&&Object.entries(t).forEach(([t,s])=>{Neo.workerId!==t&&(e="main"===Neo.workerId?Neo.worker.Manager:Neo.currentWorker,e.sendMessage(t,{action:"registerRemote",methods:s,className:r}))})}mergeConfig(e,t){let r=this,s=r.constructor;if(!s.config)throw new Error("Neo.applyClassConfig has not been run on "+r.className);return t||(r.originalConfig=Neo.clone(e,!0,!0)),{...s.config,...e}}set(e={}){let t=this;Object.keys(t[o]).forEach(e=>{delete t[o][e]}),Object.assign(t[o],e),t.processConfigs()}setStaticConfig(e,t){let r=this.constructor.staticConfig;return!!r.hasOwnProperty(e)&&(r[e]=t,!0)}get[Symbol.toStringTag](){return this.className+" (id:"+this.id+")"}static[Symbol.hasInstance](e){return!!e&&(!0===e[i]&&super[Symbol.hasInstance](e))}}Neo.applyClassConfig(n),n.instanceManagerAvailable=!1},11:function(e,t,r){"use strict";class s{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.IdGenerator",ntype:"id-generator",base:"neo-",singleton:!0}}constructor(e){this.idCounter={},Neo.getId=this.getId.bind(this)}onConstructed(){}init(){}getId(e){e=e||"neo";let t=this.idCounter,r=t[e]||0;return t[e]=++r,this.base+("neo"===e?"":e+"-")+r}}Neo.applyClassConfig(s);let o=Neo.create(s);Neo.applyToGlobalNs(o),t.a=o},12:function(e,t,r){"use strict";var s=r(1);r(6);class o extends s.a{static getStaticConfig(){return{observable:!0,operators:["==","===","!=","!==","<","<=",">",">=","excluded","included","isDefined","isUndefined","like"]}}static getConfig(){return{className:"Neo.collection.Filter",ntype:"filter",disabled_:!1,filterBy_:null,includeEmptyValues:!1,isUpdating_:!1,listenerApplied:!1,operator_:"===",property_:"id",scope:null,value_:null}}afterSetDisabled(...e){this.fireChangeEvent(...e)}afterSetFilterBy(e,t){}afterSetIsUpdating(e,t){!1===e&&this.fireChangeEvent(e,t)}afterSetOperator(...e){this.fireChangeEvent(...e)}afterSetProperty(...e){this.fireChangeEvent(...e)}afterSetValue(...e){this.fireChangeEvent(...e)}beforeSetFilterBy(e,t){return e&&"function"!=typeof e?(Neo.logError("filterBy has to be a function",this),t):e}beforeSetOperator(e,t){return this.beforeSetEnumValue(e,t,"operator")}fireChangeEvent(e,t){let r=this;void 0!==t&&!0!==r.isUpdating&&r.fire("change",{operator:r.operator,property:r.property,value:r.value})}isFiltered(e,t,r){let s=this;return!s._disabled&&((!s.includeEmptyValues||null!==s._value&&!Neo.isEmpty(s._value))&&(s._filterBy?s.filterBy.call(s.scope||s,e,t,r):!o[s._operator](e[s._property],s._value)))}static"=="(e,t){return e==t}static"==="(e,t){return e===t}static"!="(e,t){return e!=t}static"!=="(e,t){return e!==t}static"<"(e,t){return e<t}static"<="(e,t){return e<=t}static">"(e,t){return e>t}static">="(e,t){return e>=t}static excluded(e,t){return t.indexOf(e)<0}static included(e,t){return t.indexOf(e)>-1}static isDefined(e,t){return void 0!==e}static isUndefined(e,t){return void 0===e}static like(e,t){return e.toLowerCase().includes(t.toLowerCase())}}Neo.applyClassConfig(o);var i=o,n=r(3);class a extends s.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.collection.Sorter",ntype:"sorter",directionMultiplier:1,direction_:"ASC",listenerApplied:!1,property_:"id",sortBy:null,useTransformValue:!0}}afterSetDirection(e,t){let r=this;r.directionMultiplier="ASC"===e?1:-1,t&&r.fire("change",{direction:r.direction,property:r.property})}afterSetProperty(e,t){let r=this;t&&r.fire("change",{direction:r.direction,property:r.property})}defaultSortBy(e,t){let r=this;return e=e[r.property],t=t[r.property],r.useTransformValue&&(e=r.transformValue(e),t=r.transformValue(t)),e>t?1*r.directionMultiplier:e<t?-1*r.directionMultiplier:0}transformValue(e){return"string"==typeof e&&(e=e.toLowerCase()),e}}Neo.applyClassConfig(a);var l=a,c=r(5);const u=Symbol("countMutations"),p=Symbol("isFiltered"),f=Symbol("isSorted"),d=Symbol("silentUpdateMode"),g=Symbol("toAddArray"),h=Symbol("toRemoveArray"),m=Symbol("updatingIndex");class y extends s.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.collection.Base",ntype:"collection",allItems:null,autoSort:!0,filterMode:"primitive",filters_:[],items_:[],keyProperty:"id",map_:null,sortDirections:null,sortProperties:null,sorters_:[],sourceId_:null}}constructor(e){super(e);let t=this,r={enumerable:!1,writable:!0};Object.defineProperties(t,{[u]:{...r,value:!1},[p]:{...r,value:!1},[f]:{...r,value:!1},[d]:{...r,value:!1},[g]:{...r,value:[]},[h]:{...r,value:[]},[m]:{...r,value:0}}),t.autoSort&&t._sorters.length>0&&t.doSort()}add(e){return this.splice(0,null,e),this.getCount()}afterSetFilters(e,t){let r=this;e.forEach(e=>{!1===e.listenerApplied&&(e.on("change",r.onFilterChange,r),e.listenerApplied=!0)}),t&&r.filter()}afterSetItems(e,t){let r,s=this,o=s.keyProperty,i=0,n=e.length;for(;i<n;i++)r=e[i],s.map.set(r[o],r)}afterSetSorters(e,t){let r=this;r.applySorterConfigs(),e.forEach(e=>{!1===e.listenerApplied&&(e.on("change",r.onSorterChange,r),e.listenerApplied=!0)}),t&&r.autoSort&&r.doSort()}afterSetSourceId(e,t){if(e){let r=this,s=Neo.get(e);r._items=[...s._items],r.map=new Map(s.map);const o={mutate:r.onMutate,scope:r};s.on(o),t&&(s=Neo.get(t),s.un(o))}}applySorterConfigs(){let e=this;e.sortDirections=[],e.sortProperties=[],e.sorters.forEach(t=>{e.sortDirections.push(t.directionMultiplier),e.sortProperties.push(t.property)})}beforeSetMap(e,t){return e||new Map}beforeSetFilters(e,t){Array.isArray(e)||(e=e?[e]:[]);let r,s,o=t&&t.length||0;return e.forEach((n,a)=>{if(!(n instanceof l)){if(t)for(r=!1,s=0;s<o;s++)if(t[s].operator===(n.operator||"===")&&t[s].property===n.property&&t[s].value===n.value){e[a]=t[s],r=!0,t.splice(s,1),o--;break}r||(e[a]=Neo.create(i,n))}}),Array.isArray(t)&&t.forEach(e=>{e.destroy()}),e}beforeSetSorters(e,t){Array.isArray(e)||(e=e?[e]:[]);let r,s,o=t&&t.length||0;return e.forEach((i,n)=>{if(!(i instanceof l)){if(t)for(r=!1,s=0;s<o;s++)if(t[s].property===i.property&&t[s].direction===i.direction){e[n]=t[s],r=!0,t.splice(s,1),o--;break}r||(e[n]=Neo.create(l,i))}}),Array.isArray(t)&&t.forEach(e=>{e.destroy()}),e}cacheUpdate(e){console.log("cacheUpdate",e,this[g])}clear(){this._items.splice(0,this.getCount()),this.map.clear()}clearFilters(e){this.filters=e?Neo.clone(this.originalConfig.filters,!0,!0):null}clearSorters(e){this.sorters=e?Neo.clone(this.originalConfig.sorters,!0,!0):null}clone(){let e=this,t=Neo.clone(e.originalConfig,!0),r=e._filters||[],s=e._sorters||[];return delete t.id,delete t.filters,delete t.items,delete t.sorters,e._items.length>0&&(t.items=[...e._items]),t.filters=[],t.sorters=[],r.forEach((function(e){t.filters.push(e.originalConfig)})),s.forEach((function(e){t.sorters.push(e.originalConfig)})),Neo.create(y,t)}destroy(){this.items.splice(0,this._items.length),this.map.clear(),super.destroy()}doSort(){let e,t,r,s,o,i,n=this,a=n._items,l=n.sorters,c=n.sortDirections,u=n.sortProperties,p=u.length||0,d=!1,g=!1;p>0&&(l.forEach(e=>{e.sortBy&&(d=!0),e.useTransformValue&&(g=!0)}),d?n._items.sort((t,r)=>{for(e=0;e<p;e++)if(s=l[e],i=s[s.sortBy?"sortBy":"defaultSortBy"](t,r),0!==i)return i;return 0}):(t=g?a.map((t,s)=>{for(r={index:s},e=0;e<p;e++)l[e].useTransformValue?r[u[e]]=l[e].transformValue(t[u[e]]):r[u[e]]=t[u[e]];return r}):a,t.sort((t,r)=>{for(e=0;e<p;e++){if(o=u[e],t[o]>r[o])return 1*c[e];if(t[o]<r[o])return-1*c[e]}return 0}),g&&(n._items=t.map(e=>a[e.index])))),n[f]=p>0,0===n[m]&&n.fire("sort")}endUpdate(e){const t=this;t[m]>0&&t[m]--,e?t[d]=!1:(t.fire("mutate",{addedItems:t[g],removedItems:t[h]}),t[g].splice(0,t[g].length),t[h].splice(0,t[h].length))}filter(){let e,t,r,s,o,i=this,n=i._filters,a=n.length,l=0,c=i.allItems&&i.allItems._items||i._items,u=0,f=c.length,d=[];for(;u<a;u++)n[u].disabled||l++;if(0===l&&i.allItems)i.clear(),i.items=[...i.allItems._items],i.map.set(...i.allItems.map);else if(i.allItems||(e={...i.originalConfig},delete e.filters,delete e.items,delete e.sorters,i.allItems=Neo.create(y,{...Neo.clone(e,!0,!0),keyProperty:i.keyProperty,sourceId:i.id})),i.map.clear(),"primitive"===i.filterMode){for(u=0;u<f;u++){for(t=!0,r=c[u],s=0;s<a;s++)if(n[s].isFiltered(r,c,c)){t=!1;break}t&&(d.push(r),i.map.set(r[i.keyProperty],r))}i._items=d}else{for(d=[...c],s=0;s<a;s++){for(o=[],u=0;u<f;u++)n[s].isFiltered(d[u],d,c)||o.push(d[u]);d=[...o],f=d.length}i.items=d}i[p]=0!==l,i.fire("filter")}find(e,t){let r,s,o,i=[],n=Neo.isObject(e);return n&&(s=Object.entries(e),o=s.length),this.items.forEach(a=>{n?(r=[],s.forEach(([e,t])=>{a[e]===t&&r.push(!0)}),r.length===o&&i.push(a)):a[e]===t&&i.push(a)}),i}findBy(e,t,r,s){let o=this,i=[],n=r||0,a=s||o.getCount();for(t=t||o;n<a;n++)e.call(t,o.items[n])&&i.push(o.items[n]);return i}first(){return this._items[0]}get(e){return this.map.get(e)}getAt(e){return this._items[e]}getCount(){return this._items.length}getCountMutations(){return this[u]}getFilter(e){let t=this.filters||[],r=0,s=t.length;for(;r<s;r++)if(t[r].property===e)return t[r];return null}getKeyAt(e){let t=this._items[e];return t&&t[this.keyProperty]}getRange(e,t){return this._items.slice(e,t)}getSource(){return this.sourceId&&Neo.get(this.sourceId)}has(e){return this.map.has(e)}hasItem(e){return this.map.has(e[this.keyProperty])}indexOf(e){return this._items.indexOf(c.a.isObject(e)?e:this.map.get(e))}indexOfItem(e){return this._items.indexOf(e)}indexOfKey(e){return this._items.indexOf(this.map.get(e))}insert(e,t){return this.splice(e,0,t),this.getCount()}isFiltered(){return this[p]}isFilteredItem(e){let t=this._filters,r=0,s=t.length,o=!1;for(;r<s;r++)if(t[r].isFiltered(e)){o=!0;break}return o}isSorted(){return this[f]}last(){return this._items[this.getCount()-1]}onFilterChange(e){this.filter()}onMutate(e){let t=this;e.preventBubbleUp&&(t.preventBubbleUp=!0),t.splice(null,e.removedItems,e.addedItems)}onSorterChange(e){this.applySorterConfigs(),this.doSort()}pop(){return this.splice(this.getCount()-1,1).removedItems[0]}push(e){return this.add(e)}remove(e){return this.splice(0,Array.isArray(e)?e:[e]),this.getCount()}removeAt(e){return this.splice(e,1),this.getCount()}reverse(){return this._items.reverse()}shift(){return this.splice(0,1).addedItems[0]}some(...e){return this._items.some(...e)}splice(e,t,r){let s,o,i,a,l,p=this,f=p.getSource(),g=[],h=p._items,y=p.keyProperty,b=p.map,N=[],C=c.a.isNumber(t)?t:null,v=Array.isArray(t)?t:null;if(!e&&C&&n.a.error(p.id+": If index is not passed, removeCountAtIndex cannot be used"),r=r&&!Array.isArray(r)?[r]:r,v&&(a=v.length)>0)for(r&&r.length>0&&(l=r.map(e=>e[y])),s=0;s<a;s++)o=v[s],i=c.a.isObject(o)?o[y]:o,b.has(i)&&(!l||l&&l.indexOf(i)<0)&&(N.push(h.splice(p.indexOfKey(i),1)[0]),b.delete(i));else C&&C>0&&(N.push(...h.splice(e,C)),N.forEach(e=>{b.delete(e[y])}));if(r&&(a=r.length)>0){for(s=0;s<a;s++)o=r[s],i=c.a.isObject(o)?o[y]:o,b.has(i)||p.isFilteredItem(o)||(g.push(o),b.set(i,o));g.length>0&&(h.splice(c.a.isNumber(e)?e:h.length,0,...g),p.autoSort&&p._sorters.length>0&&p.doSort())}return f&&(f.getSource()||(f.preventBubbleUp=!0),p.preventBubbleUp||(p.startUpdate(!0),f.splice(null,v||N,r),p.endUpdate(!0)),delete f.preventBubbleUp),(g.length>0||N.length>0)&&p[u]++,0===p[m]?p.fire("mutate",{addedItems:r,preventBubbleUp:p.preventBubbleUp,removedItems:v||N}):p[d]||p.cacheUpdate({addedItems:g,removedItems:N}),0===p[m]&&delete p.preventBubbleUp,{addedItems:g,removedItems:N}}startUpdate(e){e&&(this[d]=!0),this[m]++}unshift(e){return this.splice(0,0,e),this.getCount()}}Neo.applyClassConfig(y);t.a=y},18:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var s=r(11);class o{constructor(e){e.destination=e.destination||"main",e.id=e.id||s.a.getId(Neo.workerId),e.origin=e.origin||Neo.workerId,Object.assign(this,e)}}Neo.ns("Neo.worker",!0).Message=o},19:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var s=r(1);class o extends s.a{static getConfig(){return{className:"Neo.worker.mixins.RemoteMethodAccess",ntype:"mixin-remote-method-access",mixin:!0}}generateRemote(e,t){let r=this,s=e.origin;return function(o,i){let n={action:"remoteMethod",data:o,destination:s,remoteClassName:e.className,remoteMethod:t};return r.promiseMessage(s,n,i)}}onRegisterRemote(e){if(e.destination===Neo.workerId){let t=this,r=e.className,s=e.methods,o=Neo.ns(r,!0);s.forEach((function(s){if(o[s])throw new Error("Duplicate remote method definition "+r+"."+s);o[s]=t.generateRemote(e,s)})),"main"!==Neo.workerId&&t.fire("remoteregistered",e)}}onRemoteMethod(e){let t,r,s=this,o=Neo.ns(e.remoteClassName);if(!o)throw new Error('Invalid remote namespace "'+e.remoteClassName+'"');if(r=o[e.remoteMethod],!r)throw new Error('Invalid remote method name "'+e.remoteMethod+'"');t=Array.isArray(e.data)?r.call(o,...e.data):r.call(o,e.data),t instanceof Promise?t.then((function(t){s.resolve(e,t)})).catch((function(t){s.reject(e,t)})):s.resolve(e,t)}reject(e,t){this.sendMessage(e.origin,{action:"reply",data:t,reject:!0,replyId:e.id})}resolve(e,t){this.sendMessage(e.origin,{action:"reply",data:t,replyId:e.id})}}Neo.applyClassConfig(o)},2:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));const s=self.Neo||{};s.config=s.config||{};const o={applyBodyCls:!0,appPath:null,basePath:"./",cssPath:null,environment:"production",isExperimental:!1,isInsideSiesta:!1,locale:"default",themes:["neo-theme-light","neo-theme-dark"],unitTestMode:!1,useAmCharts:!1,useCss4:!0,useFontAwesome:!0,useGoogleAnalytics:!1};Object.assign(o,{resourcesPath:(s.config.basePath||o.basePath)+"resources/",workerBasePath:(s.config.basePath||o.basePath)+"src/worker/"});const i=Symbol.for("configSymbol"),n=Symbol("getSetCache");let a=self.Neo||{};a=self.Neo=Object.assign({ntypeMap:{},insideWorker:"undefined"!=typeof DedicatedWorkerGlobalScope||"undefined"!=typeof WorkerGlobalScope,applyClassConfig(e){let t,r=null,s=null,o={},l=e.prototype||e,d=[],g={};for(;l.__proto__;){if(t=l.constructor,t.hasOwnProperty("classConfigApplied")){r=a.clone(t.config,!0),s=a.clone(t.staticConfig,!0);break}d.unshift(l),l=l.__proto__}o=r||o,g=s||g,d.forEach(r=>{t=r.constructor;let s,l=t.getConfig&&t.getConfig()||{},d=t.getStaticConfig&&t.getStaticConfig()||{};l&&Object.entries(l).forEach(([e,t])=>{"_"===e.slice(-1)?(delete l[e],e=e.slice(0,-1),l[e]=t,function(e,t){if(f(e,t))throw"Config "+t+"_ ("+e.className+") already has a set method, use beforeGet, beforeSet & afterSet instead";a[n]||(a[n]={});a[n][t]||(a[n][t]={get(){let e=this,r="beforeGet"+a.capitalize(t),s=e[i].hasOwnProperty(t),o=e[i][t],n=s?o:e["_"+t];return Array.isArray(n)?"items"!==t&&(n=[...n]):n instanceof Date&&(n=new Date(n.valueOf())),s&&(e[t]=n,n=e["_"+t]),e[r]&&"function"==typeof e[r]&&(n=e[r](n)),n},set(e){let r=this,s="_"+t,o=a.capitalize(t),n="beforeSet"+o,l="afterSet"+o,c=r[s];if(delete r[i][t],r[s]=e,r[n]&&"function"==typeof r[n]){if(void 0===(e=r[n](e,c)))return void(r[s]=c);r[s]=e}(a.isObject(e)||Array.isArray(e)||e!==c)&&r[l]&&"function"==typeof r[l]&&r[l](e,c)}});Object.defineProperty(e,t,a[n][t])}(r,e)):f(r,e)||Object.defineProperty(r,e,{enumerable:!0,value:t,writable:!0})}),Object.assign(t,d),l.hasOwnProperty("ntype")&&(a.ntypeMap[l.ntype]=l.className),s=o.hasOwnProperty("mixins")&&o.mixins||[],d&&d.observable&&s.push("Neo.core.Observable"),l.hasOwnProperty("mixins")&&Array.isArray(l.mixins)&&l.mixins.length>0&&s.push(...l.mixins),s.length&&function(e,t){Array.isArray(t)||(t=[t]);let r,s,o,i=0,n=t.length,l={};for(;i<n;i++){if(r=t[i],r.isClass)o=r.prototype,s=a.ns(o.className);else{if(!c(r))throw new Error("Attempting to mixin an undefined class: "+r+", "+e.prototype.className);s=a.ns(r),o=s.prototype}o.className.split(".").reduce(u(s),l),Object.getOwnPropertyNames(o).forEach(p(e.prototype,o))}e.prototype.mixins=l}(t,s),delete l.mixins,delete o.mixins,Object.assign(o,l),Object.assign(g,d),Object.assign(t,{classConfigApplied:!0,config:a.clone(o,!0),isClass:!0,staticConfig:a.clone(g,!0)}),delete t.getConfig,delete t.getStaticConfig,o.singleton||this.applyToGlobalNs(e)})},applyToGlobalNs(e){let t,r,s,o,i="function"==typeof e?e.prototype:e;!0===i.constructor.registerToGlobalNs&&(t=i.isClass?i.config.className:i.className,r=t.split("."),s=r.pop(),o=a.ns(r,!0),o[s]=e)},applyFromNs(e,t,r,s){let o;return e&&r&&"object"==typeof r&&Object.entries(r).forEach(([r,i])=>{o=t[i],e[r]=s?o.bind(t):o}),e},assignDefaults:(e,t)=>(e&&t&&"object"==typeof t&&Object.entries(t).forEach(([t,r])=>{e.hasOwnProperty(t)||(e[t]=r)}),e),clone(e,t,r){let s;return Array.isArray(e)?e.map(e=>a.clone(e,t,r)):null!==e&&"object"==typeof e?e.constructor.isClass&&e instanceof a.core.Base?r?e:this.cloneNeoInstance(e):e.constructor.isClass?e:(s={},Object.entries(e).forEach(([e,o])=>{t&&(o=a.clone(o,t,r)),s[e]=o}),s):e},cloneNeoInstance(e){let t={...e.originalConfig};return delete t._id,delete t.id,a.create(e.className,t)},create(e,t){let r,s;if("function"==typeof e&&void 0!==e.constructor)r=e;else{if("object"==typeof e){if(!(t=e).className&&!t.module)return console.error("Class created with object configuration missing className or module property",t),null;e=t.className?t.className:t.module.prototype.className}if(!c(e))throw new Error("Class "+e+" does not exist");r=a.ns(e)}return s=new r(t),s.onConstructed(),s.init(),s},emptyFn(){},ns:(e,t,r)=>(e=Array.isArray(e)?e:e.split(".")).reduce((e,r)=>{if(t&&!e[r]&&(e[r]={}),e)return e[r]},r||self),ntype(e,t){if("object"==typeof e){if(!(t=e).ntype)throw new Error("Class defined with object configuration missing ntype property. "+t.ntype);e=t.ntype}let r=a.ntypeMap[e];if(!r)throw new Error("ntype "+e+" does not exist");return a.create(r,t)},onStart:a.emptyFn},a);const l=["_name","classConfigApplied","className","constructor","isClass","mixin","ntype","observable","registerToGlobalNs"];function c(e){try{return!!e.split(".").reduce((e,t)=>e[t],self)}catch(e){return!1}}function u(e){return(t,r,s,o)=>t[r]=s!==o.length-1?t[r]||{}:e}function p(e,t){return function(r){if(!~l.indexOf(r)){if(e[r]&&e[r]._from){if(t.className===e[r]._from)return void console.warn("Mixin set multiple times or already defined on a Base Class",e.className,t.className,r);throw new Error(e.className+": Multiple mixins defining same property ("+t.className+", "+e[r]._from+") => "+r)}e[r]=t[r],Object.getOwnPropertyDescriptor(e,r)._from=t.className,"function"==typeof e[r]&&(e[r]._name=r)}}}function f(e,t){let r;for(;e.__proto__;){if(r=Object.getOwnPropertyDescriptor(e,t),"object"==typeof r&&"function"==typeof r.set)return!0;e=e.__proto__}return!1}a.config=a.config||{},a.assignDefaults(a.config,o)},21:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var s=r(12);class o extends s.a{static getConfig(){return{className:"Neo.manager.Base",ntype:"base-manager"}}getById(e){return this.get(e)}register(e){let t=this;t.get(e.id)?Neo.logError("Trying to create an item with an already existing id",e,t.get(e.id)):t.push(e)}unregister(e){this.remove(e)}}Neo.applyClassConfig(o)},23:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var s=r(1),o=r(6),i=r(18),n=r(19);class a extends s.a{static getConfig(){return{className:"Neo.worker.Worker",ntype:"worker",mixins:[o.a,n.a],workerId:null}}constructor(e){super(e=e||{});let t=this;t.promises={},self.addEventListener("message",t.onMessage.bind(t),!1),Neo.workerId=t.workerId,Neo.currentWorker=t}onMessage(e){let t,r=this,s=e.data,o=s.action,i=s.replyId;if(!o)throw new Error("Message action is missing: "+s.id);if("reply"!==o)try{this["on"+Neo.capitalize(o)](s)}catch(t){console.log("error",s,t,e),this.reject(s.id,{error:t.message})}else(t="reply"===o&&r.promises[i])&&(s.reject?t.reject(s.data):t.resolve(s.data),delete r.promises[i])}onPing(e){this.resolve(e,{originMsg:e})}onRegisterNeoConfig(e){Neo.config=Neo.config||{},Object.assign(Neo.config,e.data)}promiseMessage(e,t,r){let s=this;return new Promise((function(o,i){let n=s.sendMessage(e,t,r).id;s.promises[n]={resolve:o,reject:i}}))}sendMessage(e,t,r){t.destination=e;let s=new i.a(t);return self.postMessage(s,r),s}}Neo.applyClassConfig(a)},3:function(e,t,r){"use strict";var s=r(1);class o extends s.a{static getConfig(){return{className:"Neo.core.Logger",ntype:"logger",enableLogs:!0,level:"log",singleton:!0}}constructor(e){super(e),Neo.applyFromNs(Neo,this,{error:"error",info:"info",log:"log",logError:"logError",warn:"warn"},!0)}error(e){throw new Error(e)}log(...e){this.level="log",this.write(...e)}info(...e){this.level="info",this.write(...e)}logError(...e){this.level="error",this.write(...e)}warn(...e){this.level="warn",this.write(...e)}write(...e){!0===this.enableLogs&&console[this.level](...e)}}Neo.applyClassConfig(o);let i=Neo.create(o);Neo.applyToGlobalNs(i),t.a=i},42:function(e,t,r){"use strict";r.r(t);var s=r(2),o=r(23),i=r(21);class n extends i.a{static getConfig(){return{className:"Neo.manager.Store",ntype:"store-manager",singleton:!0,listeners:{},remote:{app:["createRandomData","filter","load","sort"]}}}createRandomData(e,t){let r,s=[],o=0;for(;o<t;o++)for(s.push({}),r=0;r<e;r++)s[o]["column"+r]="Column"+(r+1)+" - "+Math.round(Math.random()/1.5),s[o]["column"+r+"style"]=Math.round(Math.random()/1.7)>0?"brown":o%2?"#3c3f41":"#323232";return s}filter(e,t,r){}load(e,t){}sort(e,t,r){}}Neo.applyClassConfig(n);let a=Neo.create(n);Neo.applyToGlobalNs(a);r(5);var l=r(1);class c extends l.a{static getConfig(){return{className:"Neo.data.connection.Xhr",ntype:"xhr-connection",callback:null,requests:{},scope:null,timeout:5e3}}request(e){let t=this,r=e.headers||{},s=Neo.getId("xhr-request"),o=e.method||"GET",i=new XMLHttpRequest;if(e.url)return e.insideNeo||!location.href.includes("/node_modules/neo.mjs/")||location.href.includes("https://neomjs.github.io/")||(e.url.startsWith("./")||e.url.startsWith("../"))&&(e.url="../../"+e.url),e.params&&(e.url+="?"+new URLSearchParams(e.params).toString()),i.neoId=s,t.requests[s]={callback:"function"==typeof e.callback&&e.callback,scope:e.scope,xhr:i},i.responseType=e.responseType||"text",i.timeout=t.timeout,i.addEventListener("abort",t.onError.bind(t)),i.addEventListener("error",t.onError.bind(t)),i.addEventListener("load",t.onLoad.bind(t)),i.addEventListener("progress",t.onProgress.bind(t)),i.open(o,e.url,!0),Object.entries(r).forEach(([e,t])=>{i.setRequestHeader(e,t)}),i.send(e.data),i;console.error("Neo.Xhr.request without a given url"+JSON.stringify(e))}sendForm(e,t){return t.data=new FormData(e),this.request(t)}onLoad(e){let t=e.currentTarget.neoId,r=this.requests[t],s=r.callback;s&&s.apply(r.scope||this,[this.getResponse(e),!0]),Object.entries(r).forEach(([e,t])=>{r[e]=null}),delete this.requests[t]}onError(e){let t=e.currentTarget.neoId,r=this.requests[t],s=r.callback;s&&s.apply(r.scope||this,[this.getResponse(e),!1]),Object.entries(r).forEach(([e,t])=>{r[e]=null}),delete this.requests[t]}getResponse(e){let t=e.target;return{readyState:t.readyState,response:t.response,status:t.status,statusText:t.statusText,headers:t.getAllResponseHeaders()}}onProgress(){}promiseRequest(e){let t=this;return new Promise((r,s)=>{e.callback=function(e,t){t?r(e):s(e)},t.request(e)})}promiseJson(e){let t=this;return new Promise((r,s)=>{e.callback=function(e,t){if(t){let t;try{t=JSON.parse(e.response),r(Object.assign(e,{json:t}))}catch(e){s({reject:!0,error:e.message})}}else s(e)},t.request(e)})}}Neo.applyClassConfig(c);class u extends c{static getConfig(){return{className:"Neo.Xhr",ntype:"xhr",remote:{app:["promiseRequest","promiseJson"]},singleton:!0}}}Neo.applyClassConfig(u);let p=Neo.create(u);Neo.applyToGlobalNs(p);class f extends o.a{static getConfig(){return{className:"Neo.worker.Data",ntype:"data-worker",singleton:!0,workerId:"data"}}onLoad(){console.log("worker.Data onLoad")}}s.a.applyClassConfig(f);let d=s.a.create(f);s.a.applyToGlobalNs(d);t.default=d},5:function(e,t,r){"use strict";var s=r(1);class o extends s.a{static getStaticConfig(){return{decamelRegEx:/([a-z])([A-Z])/g}}static getConfig(){return{className:"Neo.core.Util",ntype:"core-util"}}static createStyles(e){let t="";return Object.entries(e).forEach(([e,r])=>{null!=r&&(t+=o.decamel(e)+":"+r+";")}),t}static capitalize(e){return o.isString(e)&&e[0].toUpperCase()+e.slice(1)}static decamel(e){return e.replace(o.decamelRegEx,"$1-$2").toLowerCase()}static createStyleObject(e){if(!e)return null;let t;return e.split(/;(?=[^\)]*(?:\(|$))/g).reduce((e,r)=>(t=r.split(/:(.+)/).map((function(e){let t=parseFloat(e);return e==t?t:e.trim()})),""!==t[0]&&(t[0]=t[0].replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),e[t[0]]=t[1]),e),{})}static isArray(e){return Array.isArray(e)}static isBoolean(e){return"boolean"==typeof e}static isDefined(e){return void 0!==e}static isEmpty(e){return Array.isArray(e)?0===e.length:o.isObject(e)?0===Object.keys(e).length:!!o.isString(e)&&""===e}static isFunction(e){return"function"==typeof e}static isNumber(e){return"number"==typeof e&&isFinite(e)}static isObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}static isString(e){return"string"==typeof e}static toArray(e,t,r){let s;return e&&(s=e.length)?"string"==typeof e?e.split(""):Array.prototype.slice.call(e,t||0,r||s):[]}}Neo.applyClassConfig(o),Neo.applyFromNs(Neo,o,{createStyleObject:"createStyleObject",createStyles:"createStyles",capitalize:"capitalize",decamel:"decamel",isArray:"isArray",isBoolean:"isBoolean",isDefined:"isDefined",isEmpty:"isEmpty",isFunction:"isFunction",isNumber:"isNumber",isObject:"isObject",isString:"isString",toArray:"toArray"},!0),t.a=o},6:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var s=r(1);class o extends s.a{static getConfig(){return{className:"Neo.core.Observable",ntype:"mixin-observable",mixin:!0}}initObservable(e){let t,r=this,s=r.__proto__;for(e.listeners&&(r.listeners=e.listeners,delete e.listeners),t=r.listeners,r.listeners={},t&&r.addListener(t);s&&s.constructor.isClass;)s.constructor.staticConfig.observable&&!s.constructor.listeners&&Object.assign(s.constructor,{addListener:r.addListener,fire:r.fire,listeners:{},on:r.on,removeListener:r.removeListener,un:r.un}),s=s.__proto__}addListener(e,t,r,s,o,i){let n,a,l,c=this;if("object"==typeof e)e.hasOwnProperty("scope")&&(r=e.scope,delete e.scope),Object.entries(e).forEach(([e,t])=>{c.addListener(e,t,r)});else if("object"==typeof t)r=r||t.scope,n=t.fn,i=i||t.order,s=s||t.eventId;else if("function"==typeof t)n=t;else{if("string"!=typeof t)throw new Error("Invalid addListener call: "+e);n=t}return l={fn:n,scope:r,data:o,id:s||Neo.getId("event")},(a=c.listeners&&c.listeners[e])?(a.forEach(t=>{if(t.id===s||t.fn===n&&t.scope===r)throw new Error("Duplicate event handler attached: "+e)}),"number"==typeof i?a.splice(i,0,l):"before"===i?a.unshift(l):a.push(l)):c.listeners[e]=[l],l.id}fire(e){let t,r,s,o,i=this,n=[].slice.call(arguments,1),a=i.listeners;if(a&&a[e])for(r=[...a[e]],o=r.length,s=0;s<o;s++)t=r[s],t.fn.apply(t.scope||i,t.data?n.concat(t.data):n)}removeListener(e,t){if(Neo.isString(t)){let r=this.listeners[e],s=!1;r.forEach((e,r)=>{if(e.id===t)return s=r}),!1!==s&&r.splice(s,1)}}on(...e){return this.addListener(...e)}un(...e){this.removeListener(...e)}}Neo.applyClassConfig(o)}});