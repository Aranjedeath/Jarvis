﻿(function(a){"use strict";String.prototype.repeat=function(a){return(new Array(a+1)).join(this)};Array.prototype.unique=function(){var a,b,c;a=this.concat();for(b=0;b<a.length;++b){for(c=b+1;c<a.length;++c){if(a[b]===a[c]){a.splice(c,1)}}}return a};var b={replaceWith:"*",customSwears:null,externalSwears:null};a.fn.profanityFilter=function(c){function f(a){function b(a){var b,c=[];for(b=0;b<a.childNodes.length;b+=1){c[b]=a.childNodes[b]}return c}var c,d=[],e=b(a);while(e.length){c=e.shift();if(c.nodeType===1){e.unshift.apply(e,b(c))}if(c.nodeType===3){d.push(c)}}return d}function g(a){var b=new XMLHttpRequest;b.open("GET",a,false);b.setRequestHeader("X-Requested-With","XMLHttpRequest");b.send(null);try{return JSON.parse(b.responseText)}catch(c){return""}}function i(a){var b=Math.floor(Math.random()*a);if(h==null){h=b}else{if(b==h&&a!=0){b+=1}}if(b>a){b=0}h=b;return b}var d=a.extend({},b,c),e;e=function(){var a=new Date,b;try{localStorage.setItem("uid",a);b=localStorage.getItem("uid")===a;localStorage.removeItem("uid");return b&&localStorage}catch(c){}}();var h=null;return this.each(function(){var a,b,c=f(this),h,j,k;if(d.externalSwears!==null){if(e){if(localStorage.getItem("localSwears")===null){localStorage.setItem("localSwears",JSON.stringify(g(d.externalSwears)))}a=JSON.parse(localStorage.getItem("localSwears"))}else{a=g(d.externalSwears)}if(d.customSwears!==null){a=a.concat(d.customSwears).unique()}}else{if(d.customSwears!==null){a=d.customSwears}}if(a===null){return}for(k=0;k<c.length;k+=1){for(b=0;b<a.length;b+=1){h=new RegExp("\\b"+a[b]+"\\b","gi");var l=i(d.replaceWith.length-1);j=d.replaceWith[l];if(typeof d.replaceWith=="string"){j=d.replaceWith[l].repeat(a[b].length)}if(h.test(c[k].nodeValue)){c[k].nodeValue=c[k].nodeValue.replace(h,j)}}}})}})(jQuery)