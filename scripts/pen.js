var empty,exists,parser,pen,test,type;type=function(){var t,e,n,i,r,s;for(t={},e=n=0,i=(s="Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window".split(/\s+/gi)).length;n<i;e=++n)r=s[e],t[`[object ${r}]`]=r.toLowerCase();return function(e){var n;return n=Object.prototype.toString.call(e),t[n]||"object"}}(),exists=function(t){return null!==t&&void 0!==t},test=function(t,e,n){return"string"===type(t)?(t=new RegExp(t,e)).test(n):t.test(e)},parser=function(t,e="gi",n=1,i=2){var r;return"string"===type(t)&&(r=t,t=new RegExp(t,e)),function(s){var o,l,a,p;for(p=s.match(t),a={},o=0,l=p.length;o<l;o++)p[o].trim().replace(t,function(...t){"string"===type(r)?a[t[n]]=t[i]:a[t[e]]=t[n]});return a}},empty=function(t){if(null==t)return!0},pen=function(){var t,e,n;return({log:n,error:error,dir:dir}=console),({body:e,head:head}=document),pen=function(t,n){var i;if(!(this instanceof pen))return new pen(t,n);if(this.events={},this.options={autoAttach:!1,autoAttachTo:e,global:{parseIt:!1,create:{retneh:"return child"},html:{app:!1,parse:!1}}},t instanceof Document)this.element=this.el=t,this.body=pen(t.body),this.head=pen(t.head),pen.ink.ready=function(t,e){var n;return n=this,this.on("DOMContentLoaded",[...arguments]),n};else if(t instanceof pen)for(i in t)this[i]=t[i];else this.setup(t);!0===this.options.autoAttach&&this.options.autoAttachTo.append(t)},pen.ink=pen.prototype={},pen.$=function(t,e){return!0===e?pen(document.querySelector(t)):document.querySelector(t)},pen.$$=function(t){return document.querySelectorAll(t)},pen.prototype.setup=function(t){var e,n,i,r,s,o;if(this.attributes={},this.style={},this.text=void 0,o=/<([^\n]*?)>/gi,e=/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,"string"===type(t))if(!0===test(o,t)){if(t=t.replace(/<|>/gi,""),!0===(s=test(e,t))&&(r=this.parseAttributes(t),t=t.replace(e,"").trim()),n=document.createElement(t),!0===s)for(i in r)n.setAttribute(i,r[i]),this.attributes[i]=r[i]}else n=document.querySelector(t);else n=t;return this.element=this.el=n,this.tag=n.tagName.toLowerCase(),this.partialSetup(n),n},pen.prototype.partialSetup=function(t){this.Id=t.getAttribute("id"),this.Class=t.getAttribute("class"),this.children="template"===this.tag?t.content.children:t.children,this.Parent=exists(t.parentNode)?t.parentNode:void 0,this.initLocalName(),"template"===this.tag&&(this.content=t.content,pen.ink.clone=function(t=!1){return document.importNode(this.el.content,t)})},pen.prototype.parseAttributes=(()=>parser(/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,1,3))(),pen.prototype.parseCssStyle=(()=>parser(/([^\n\ ;:]*?):([^\n]*?);/gi,1,2))(),pen.prototype.initLocalName=function(){var t;return this,t=`${this.tag}${null!=this.Id?`#${this.Id}`:""}${null!=this.Class?`.${this.Class}`:""}`,this.localName=t,t},pen.prototype.handleObject=function(t,e){var n;for(n in t)e(n,this,t);return this},pen.prototype.selfInstance=function(t,e){return t instanceof pen&&e(t,this),this},pen.prototype.html=function(t,e){var i,r,s,o,l,a,p,u,h;switch(null!=e?(i=null!=e.app&&e.app,u=null!=e.parse&&e.parse):(i=null!=this.options.global.html.app&&this.options.global.html.app,u=null!=this.options.global.html.parse&&this.options.global.html.parse),s=(e=>{this.text=t;return exists(t)?(!0===i?this.element[e]+=t:this.element[e]=t,this):this.element[e]}),this.tag){case"input":case"option":case"textarea":return s("value");case"template":if("object"!==type(t))return n("element was a template, the first parameter is not an object"),this;for(o in t)for(l=a=0,p=(h=this.element.content.children).length;a<p;l=++a)r=h[l],o===pen(r).initLocalName()&&this.html(t[o],e);break;default:return s(!0===u?"innerHTML":"textContent")}},pen.prototype.attr=function(t,e){var n,i,r;if(null!=t){if("object"===type(t))return this.Id=null!=t.id?t.id:void 0,this.Class=null!=t.class?t.class:void 0,this.handleObject(t,function(e,n){return n.attributes[e]=t[e],n.element.setAttribute(e,t[e]),n});if(null!=e)return this["id"===t?"id":"class"===t?"class":void 0]=null!=e&&"id"===t?e:void 0,this.element.setAttribute(t,e),this.initLocalName(),this;if("string"===type(t)){i=this.parseAttributes(t),r=[];for(n in i)this["id"===n?"id":"class"===n?"class":void 0]=null!=i[n]&&"id"===n?i[n]:void 0,r.push(this.element.setAttribute(n,i[n]));return r}return this.initLocalName(),this.element.getAttribute(t)}return this.attributes},pen.prototype.attr.get=function(t){return this.initLocalName(),this.element.getAttribute(t)},pen.prototype.css=function(t,e){var i,r;if(null!=t){if("object"===type(t))return this.handleObject(t,function(e,i){var r,s;if(r=t[e],n(r),"object"===type(t[e]))for(s in t[e])i.style[`${e}-${s}`]=t[e][s],i.element.style[`${e}-${s}`]=t[e][s];else i.style[e]=t[e],i.element.style[e]=t[e];return i});if("string"===type(t)){r=this.parseCssStyle(t);for(i in r)this.style[i]=r[i],this.element.style[t]=r[i];return this}return this.element.style[t]}return this.style},pen.prototype.on=function(t,e,n=!1){var i;return this.events[t]={},this.events[t].capture=n,i=null!=this.element.addEventListener?"addEventListener":null!=this.element.attachEvent?"attachEvent":`on${t}`,"addEventListener"===i?this.element[i](t,e,n):"attachEvent"===i?this.element[i](t,e):this.element[i]=e,this},pen.prototype.off=function(t,e){var n;return n=null!=this.element.removeEventListener?"removeEventListener":null!=this.element.detachEvent?"detachEvent":`on${t}`,this.event[t].capture=capture,"removeEventListener"===n?this.element[n](t,e):"detachEvent"===n?this.element[n](t,e):this.element[n]=void 0,delete this.events[t],this},pen.prototype.is=function(t){return this.tag===t},pen.prototype.append=function(...t){var e,n,i,r;for(i=0,r=t.length;i<r;i++)e=t[i],"string"===type(e)&&(e=document.querySelector(e)),e instanceof pen&&(e.Parent=this.element),n=e instanceof pen?e.el:e,"template"===this.tag?this.element.content.appendChild(n):this.element.appendChild(n);return this},pen.prototype.appendTo=function(t){return"string"===type(t)&&(t=document.querySelector(t)),pen(t).append(this.element),this},pen.prototype.remove=function(){var t;return t=null!=this.Parent?"Parent":null!=this.element.parentNode?"parentNode":void 0,null!=t?(this[t].removeChild(this.element),this.Parent=void 0):n(`Pen-remove-error: There's no parent to remove child: (${this.localName}) from`),this},pen.prototype.$=function(t){var e;return e="template"===this.tag?this.element.content:this.element,!0===this.options.global.parseIt?pen(e.querySelector(t)):e.querySelector(t)},pen.prototype.$$=function(t){return("template"===this.tag?this.element.content:this.element).querySelector(t)},pen.prototype.create=pen.prototype.createElement=function(t){var e,n,i,r,s;if(t=pen(`<${t}>`),this.append(t),"parent"===(r=function(){var t;return ret.startsWith("return")&&(t=ret.split(/\s+/gi).slice(1)[0].toLowerCase()),t}()))return this;if("child"===r)for(n=0,i=(s=null!=this.children?this.children:"template"===this.tag?this.el.content.children:this.el.children).length;n<i;n++)if((e=s[n])===t.el)return e},pen.prototype.toggle=function(...t){var e,n;for(e=0,n=t.length;e<n;e++)t[e],this.element.classList.toggle(clss);return this},t="id class href src contentEditable charset title rows cols".split(/\s+/),"click keydown keyup keypress mousedown mouseup mouseover mousepress mouseout contextmenu dblclick".split(/\s+/).forEach(function(t){return pen.prototype[t]=function(e,n){return null==this.events[t]?this.on(t,e,n):this.off(t,e,n)}}),t.forEach(function(t){return pen.prototype[t]=function(e){return null==e?this.attr(t):this.attr(t,e)}}),pen}();
