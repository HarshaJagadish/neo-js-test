(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{16:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(0);class a extends o.a{static getConfig(){return{className:"Neo.main.draggable.sensor.Base",currentElement:null,dragTargetClasses:["neo-draggable","neo-resizable"],isDragging:!1,lastEvent:null,startEvent:null}}onConstructed(){this.attach(),super.onConstructed()}attach(){}detach(){}trigger(e,t){const n=document.createEvent("Event");return n.detail=t,n.initEvent(t.type,!0,!0),e.dispatchEvent(n),this.lastEvent=t,t}}Neo.applyClassConfig(a)},18:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var o=n(16),a=n(1);class s extends o.a{static getConfig(){return{className:"Neo.main.draggable.sensor.Mouse",delay:0,minDistance:1,mouseDownTime:0,mouseDownTimeout:null,pageX:null,pageY:null}}constructor(e){super(e),Neo.bindMethods(this,["onDistanceChange","onMouseDown","onMouseMove","onMouseUp"])}attach(){document.addEventListener("mousedown",this.onMouseDown,!0)}detach(){document.removeEventListener("mousedown",this.onMouseDown,!0)}onDistanceChange(e){let t=this;if(t.currentElement){const{pageX:n,pageY:o}=e,s=Date.now()-t.mouseDownTime,r=a.a.getDistance(t.startEvent.pageX,t.startEvent.pageY,n,o)||0;Object.assign(t,{pageX:n,pageY:o}),s>=t.delay&&r>=t.minDistance&&(clearTimeout(t.mouseDownTimeout),document.removeEventListener("mousemove",t.onDistanceChange),t.startDrag())}}onMouseDown(e){if(0===e.button&&!e.ctrlKey&&!e.metaKey){let t=this,n=a.a.testPathInclusion(e,t.dragTargetClasses);n&&(Object.assign(t,{currentElement:n.node,mouseDownTime:Date.now(),pageX:e.pageX,pageY:e.pageY,startEvent:e}),document.addEventListener("dragstart",r),document.addEventListener("mousemove",t.onDistanceChange),document.addEventListener("mouseup",t.onMouseUp),t.mouseDownTimeout=setTimeout(()=>{t.onDistanceChange({pageX:t.pageX,pageY:t.pageY})},t.delay))}}onMouseMove(e){let t=this;if(t.dragging){let n=t.currentElement,o=document.elementFromPoint(e.clientX,e.clientY);t.trigger(n,{clientX:e.clientX,clientY:e.clientY,element:n,originalEvent:e,path:t.startEvent.path||t.startEvent.composedPath(),target:o,type:"drag:move"})}}onMouseUp(e){if(0===e.button){let t=this;if(clearTimeout(t.mouseDownTimeout),document.removeEventListener("dragstart",r),document.removeEventListener("mousemove",t.onDistanceChange),document.removeEventListener("mouseup",t.onMouseUp),t.dragging){let n=t.currentElement,o=document.elementFromPoint(e.clientX,e.clientY);t.trigger(n,{clientX:e.clientX,clientY:e.clientY,element:n,originalEvent:e,path:t.startEvent.path||t.startEvent.composedPath(),target:o,type:"drag:end"}),document.removeEventListener("contextmenu",r,!0),document.removeEventListener("mousemove",t.onMouseMove),Object.assign(t,{currentElement:null,dragging:!1,startEvent:null})}t.dragging=!1}}startDrag(){let e=this,t=e.currentElement,n=e.startEvent;e.trigger(t,{clientX:n.clientX,clientY:n.clientY,element:t,originalEvent:n,path:n.path||n.composedPath(),target:n.target,type:"drag:start"}),e.dragging=!0,e.dragging&&(document.addEventListener("contextmenu",r,!0),document.addEventListener("mousemove",e.onMouseMove))}}function r(e){e.preventDefault()}Neo.applyClassConfig(s)}}]);