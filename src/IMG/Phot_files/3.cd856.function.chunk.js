webpackJsonp([3],{11:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))try{throw new TypeError("Cannot call a class as a function")}catch(e){}}e.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=o(1),f=i(s),p=function(){function t(e,o){n(this,t),this.divName1="report-scroll-module",this.divObserver=[],this.divArr=document.querySelectorAll("."+this.divName1);for(var i=0;i<this.divArr.length;i++)this.divObserver.push(!1);this.win=e,this.spmPrefix=o+".",this.checkScroll()}return t.prototype.throttleV2=function(t,e,o,i){var n,r=null;return function(){var s=this,f=arguments,p=+new Date;clearTimeout(r),i&&"function"==typeof i&&i(),n||(n=p),p-n>=o?(t.apply(s,f),n=p):r=setTimeout(function(){t.apply(s,f)},e)}},t.prototype.getOffset1=function(t){var e={top:0,left:0};return void 0!==r(t.getBoundingClientRect)&&(e=t.getBoundingClientRect()),{top:e.top+(window.pageYOffset||t.scrollTop)-(t.clientTop||0),left:e.left+(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}},t.prototype.judgeAppear=function(){for(var t=(void 0!==this.win.pageXOffset?this.win.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft,void 0!==this.win.pageYOffset?this.win.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop),e=this.win.screen.availHeight,o=0;o<this.divObserver.length;o++)if(this.divObserver[o]===!1){var i=this.getOffset1(this.divArr[o]).top;i>t&&i+200<t+e&&(this.divObserver[o]=!0,this.todo("AppearInView",this.divName1,o))}},t.prototype.checkScroll=function(){var t=this;t.judgeAppear(),this.win.addEventListener("scroll",t.throttleV2(function(){t.judgeAppear()},100,200),!1)},t.prototype.todo=function(){for(var t=arguments.length,e=Array(t),o=0;o<t;o++)e[o]=arguments[o];var i=(e[0],e[1]),n=e[2],r={},s={};r.spm_id=this.spmPrefix+this.divArr[n].id+".0",r.timestamp=(new Date).getTime(),s.num=n+1,s.name=i,r.msg=JSON.stringify(s);var p={type:"appear",obj:r};f["default"].receiveGroupMsg(p)},t}();e["default"]=p}});