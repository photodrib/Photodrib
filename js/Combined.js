(function ($) {
	$.url = {};
	$.extend($.url, {
		_params: {},
		init: function () {
			var paramsRaw = "";
			try {
				paramsRaw =
				 (document.location.href.split("?", 2)[1] || "").split("#")[0].split("&") || [];
				for (var i = 0; i < paramsRaw.length; i++) {
					var single = paramsRaw[i].split("=");
					if (single[0])
						this._params[single[0]] = unescape(single[1]);
				}
			}
			catch (e) {
				alert(e);
			}
		},
		param: function (name) {
			return this._params[name] || "";
		},
		paramAll: function () {
			return this._params;
		}
	});
	$.url.init();
})(jQuery);
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.21",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.21"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return!1;var e=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance))return e=!0,!1}),e?!1:this.accept.call(this.element[0],d.currentItem||d.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d)),this.element):!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.21"}),a.ui.intersect=function(b,c,d){if(!c.offset)return!1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();g:for(var h=0;h<d.length;h++){if(d[h].options.disabled||b&&!d[h].accept.call(d[h].element[0],b.currentItem||b.element))continue;for(var i=0;i<f.length;i++)if(f[i]==d[h].element[0]){d[h].proportions.height=0;continue g}d[h].visible=d[h].element.css("display")!="none";if(!d[h].visible)continue;e=="mousedown"&&d[h]._activate.call(d[h],c),d[h].offset=d[h].element.offset(),d[h].proportions={width:d[h].element[0].offsetWidth,height:d[h].element[0].offsetHeight}}},drop:function(b,c){var d=!1;return a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c))}),d},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.sortable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},destroy:function(){a.Widget.prototype.destroy.call(this),this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--)this.items[b].item.removeData(this.widgetName+"-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){var d=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f)return e=a(this),!1});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0)});if(!h)return!1}return this.currentItem=e,this._removeCurrentsFromItems(),!0},_mouseStart:function(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--)this.containers[g]._trigger("activate",b,f._uiHash(this));return a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b),!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break}}return this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(b,c){if(!b)return;a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return!1},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!d.length&&b.key&&d.push(b.key+"="),d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")}),d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=this.options.axis==="x"||a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=this.options.axis==="y"||a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();return e?this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1):!1},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){return this._refreshItems(a),this.refreshPositions(),this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--)e[g][0].each(function(){d.push(this)});return a(d)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f&&this.ready)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return e||(b.style.visibility="hidden"),b},update:function(a,b){if(e&&!d.forcePlaceholderSize)return;b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0)}if(!c)return;if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.containers[d].floating?this.items[i].item.offset().left:this.items[i].item.offset().top;Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i],this.direction=j-h>0?"down":"up")}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1}},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;return d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height()),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(var f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(var f=this.containers.length-1;f>=0;f--)c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.21"})})(jQuery);;﻿/// <reference path="jquery-1.7.2.min.js" />
// Copyright 2012 Omar AL Zabir
// This is part of Droptiles open source project.


/* enhance $.getSctipt to handle mutiple scripts */
var getScript = jQuery.getScript;
var get = jQuery.get;

jQuery.getScript = function (resources, callback) {

    var // reference declaration & localization
    length = resources.length,
    handler = function () { counter++; },
    deferreds = [],
    counter = 0,
    idx = 0;

    for (; idx < length; idx++) {
        deferreds.push(
            getScript(resources[idx], handler)
        );
    }

    jQuery.when.apply(null, deferreds).then(function () {
        callback && callback();
    });
};

jQuery.get = function (resources, callback) {

    if (!jQuery.isArray(resources))
        return get.apply(this, arguments);

    var // reference declaration & localization
    length = resources.length,
    results = [],
    handler = function (result) { results.push(result); counter++; },
    deferreds = [],
    counter = 0,
    idx = 0;

    for (; idx < length; idx++) {
        deferreds.push(
            get(resources[idx], handler)
        );
    }

    jQuery.when.apply(null, deferreds).then(function () {
        callback && callback(results);
    });
};

/**
 * Call once at beginning to ensure your app can safely call console.log() and
 * console.dir(), even on browsers that don't support it.  You may not get useful
 * logging on those browers, but at least you won't generate errors.
 * 
 * @param  alertFallback - if 'true', all logs become alerts, if necessary. 
 *   (not usually suitable for production)
 */
function fixConsole(alertFallback) {
    if (typeof console === "undefined") {
        console = {}; // define it if it doesn't exist already
    }
    if (typeof console.log === "undefined") {
        if (alertFallback) { console.log = function (msg) { alert(msg); }; }
        else { console.log = function () { }; }
    }
    if (typeof console.dir === "undefined") {
        if (alertFallback) {
            // THIS COULD BE IMPROVED… maybe list all the object properties?
            console.dir = function (obj) { alert("DIR: " + obj); };
        }
        else { console.dir = function () { }; }
    }
}


fixConsole();

function fullscreen() {
    var el = document.documentElement
        , rfs = // for newer Webkit and Firefox
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullScreen
    ;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
            // for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}﻿/* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: Andrew Cobby (@andrewcobby http://github.com/cobbweb)
 *              - Refactored for jQuery 1.7+ only
 *              - Use MozMousePixelScroll for new Gecko browsers
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 2.0.0
 *
 * Requires jQuery: 1.7+
 */(function (a, b) { function e(d) { var f = d || window.event, g = [].slice.call(arguments, 1), h = 0, i = 0, j = 0; return d = a.event.fix(f), d.type = "mousewheel", f.wheelDelta && (h = f.wheelDelta / 120), f.detail && (f.type == c[2] ? (this.removeEventListener(c[0], e, !1), h = -f.detail / 42) : h = -f.detail / 3), j = h, f.axis !== b && f.axis === f.HORIZONTAL_AXIS && (j = 0, i = -1 * h), f.wheelDeltaY !== b && (j = f.wheelDeltaY / 120), f.wheelDeltaX !== b && (i = -1 * f.wheelDeltaX / 120), g.unshift(d, h, i, j), (a.event.dispatch || a.event.handle).apply(this, g) } var c = ["DOMMouseScroll", "mousewheel", "MozMousePixelScroll"]; if (a.event.fixHooks) for (var d = c.length; d;) a.event.fixHooks[c[--d]] = a.event.mouseHooks; a.event.special.mousewheel = { setup: function () { if (this.addEventListener) for (var a = c.length; a;) this.addEventListener(c[--a], e, !1); else this.onmousewheel = e }, teardown: function () { if (this.removeEventListener) for (var a = c.length; a;) this.removeEventListener(c[--a], e, !1); else this.onmousewheel = null } } })(jQuery);/*!
    jQuery.kinetic v1.5
    Dave Taylor http://the-taylors.org/jquery.kinetic

    The MIT License (MIT)
    Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*global define,require */
(function($){
	'use strict';

    var DEFAULT_SETTINGS    = { decelerate: true
                              , triggerHardware: false
                              , y: true
                              , x: true
                              , slowdown: 0.9
                              , maxvelocity: 40 
                              , throttleFPS: 60
                              , movingClass: {
                                  up:    'kinetic-moving-up'
                                , down:  'kinetic-moving-down'
                                , left:  'kinetic-moving-left'
                                , right: 'kinetic-moving-right'
                                }
                              , deceleratingClass: {
                                  up:    'kinetic-decelerating-up'
                                , down:  'kinetic-decelerating-down'
                                , left:  'kinetic-decelerating-left'
                                , right: 'kinetic-decelerating-right'
                                }
                              },
        SETTINGS_KEY        = 'kinetic-settings',
        ACTIVE_CLASS        = 'kinetic-active';

    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = ( function() {

            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                window.setTimeout( callback, 1000 / 60 );
            };

        }());

    }

    // add touch checker to jQuery.support
    $.support = $.support || {};
    $.extend($.support, {
        touch: "ontouchend" in document
    });
    var selectStart = function() { return false; };

    var decelerateVelocity = function(velocity, slowdown) {
        return Math.floor(Math.abs(velocity)) === 0 ? 0 // is velocity less than 1?
               : velocity * slowdown; // reduce slowdown
    };

    var capVelocity = function(velocity, max) {
        var newVelocity = velocity;
        if (velocity > 0) {
            if (velocity > max) {
                newVelocity = max;
            }
        } else {
            if (velocity < (0 - max)) {
                newVelocity = (0 - max);
            }
        }
        return newVelocity;
    };

    var setMoveClasses = function(settings, classes) {
        this.removeClass(settings.movingClass.up)
            .removeClass(settings.movingClass.down)
            .removeClass(settings.movingClass.left)
            .removeClass(settings.movingClass.right)
            .removeClass(settings.deceleratingClass.up)
            .removeClass(settings.deceleratingClass.down)
            .removeClass(settings.deceleratingClass.left)
            .removeClass(settings.deceleratingClass.right);

        if (settings.velocity > 0) {
            this.addClass(classes.right);
        }
        if (settings.velocity < 0) {
            this.addClass(classes.left);
        }
        if (settings.velocityY > 0) {
            this.addClass(classes.down);
        }
        if (settings.velocityY < 0) {
            this.addClass(classes.up);
        }
        
    };

    var stop = function($scroller, settings) {
        if (typeof settings.stopped === 'function') {
            settings.stopped.call($scroller, settings);
        }
    };

    /** do the actual kinetic movement */
    var move = function($scroller, settings) {
        var scroller = $scroller[0];
        // set scrollLeft
        if (settings.x && scroller.scrollWidth > 0){
            scroller.scrollLeft = settings.scrollLeft = scroller.scrollLeft + settings.velocity;
            if (Math.abs(settings.velocity) > 0) {
                settings.velocity = settings.decelerate ? 
                    decelerateVelocity(settings.velocity, settings.slowdown) : settings.velocity;
            }
        } else {
            settings.velocity = 0;
        }

        // set scrollTop
        if (settings.y && scroller.scrollHeight > 0){
            scroller.scrollTop = settings.scrollTop = scroller.scrollTop + settings.velocityY;
            if (Math.abs(settings.velocityY) > 0) {
                settings.velocityY = settings.decelerate ? 
                    decelerateVelocity(settings.velocityY, settings.slowdown) : settings.velocityY;
            }
        } else {
            settings.velocityY = 0;
        }

        setMoveClasses.call($scroller, settings, settings.deceleratingClass);
        
        if (typeof settings.moved === 'function') {
            settings.moved.call($scroller, settings);
        }

        if (Math.abs(settings.velocity) > 0 || Math.abs(settings.velocityY) > 0) {
            // tick for next movement
            window.requestAnimationFrame(function(){ move($scroller, settings); });
        } else {
            stop($scroller, settings);
        }
    };

    var callOption = function(method, options) {
        var methodFn = $.kinetic.callMethods[method]
        ,   args = Array.prototype.slice.call(arguments)
        ;
        if (methodFn) {
            this.each(function(){
                var opts = args.slice(1), settings = $(this).data(SETTINGS_KEY);
                opts.unshift(settings);
                methodFn.apply(this, opts);
            });
        }
    };

    var attachListeners = function($this, settings) {
        var element = $this[0];
        if ($.support.touch) {
            element.addEventListener('touchstart', settings.events.touchStart, false);
            element.addEventListener('touchend', settings.events.inputEnd, false);
            element.addEventListener('touchmove', settings.events.touchMove,false);
        } else {
            $this
            .mousedown(settings.events.inputDown)
            .mouseup(settings.events.inputEnd)
            .mousemove(settings.events.inputMove);
        }
        $this.click(settings.events.inputClick)
        .bind("selectstart", selectStart); // prevent selection when dragging
        $this.bind('dragstart', settings.events.dragStart);
    };
    var detachListeners = function($this, settings) {
        var element = $this[0];
        if ($.support.touch) {
            element.removeEventListener('touchstart', settings.events.touchStart, false);
            element.removeEventListener('touchend', settings.events.inputEnd, false);
            element.removeEventListener('touchmove', settings.events.touchMove,false);
        } else {
            $this
            .unbind('mousedown', settings.events.inputDown)
            .unbind('mouseup', settings.events.inputEnd)
            .unbind('mousemove', settings.events.inputMove);
        }
        $this.unbind('click', settings.events.inputClick)
        .unbind("selectstart", selectStart); // prevent selection when dragging
        $this.unbind('dragstart', settings.events.dragStart);
    };

    var initElements = function(options) {
        this
        .addClass(ACTIVE_CLASS)
        .each(function(){

            var settings = $.extend({}, DEFAULT_SETTINGS, options);
            
            var self = this
            ,   $this = $(this)
            ,   xpos
            ,   prevXPos = false
            ,   ypos
            ,   prevYPos = false
            ,   mouseDown = false
            ,   scrollLeft
            ,   scrollTop
            ,   throttleTimeout = 1000 / settings.throttleFPS
            ,   lastMove
            ,   elementFocused
            ;

            settings.velocity = 0;
            settings.velocityY = 0;

            // make sure we reset everything when mouse up
            var resetMouse = function() {
                xpos = false;
                ypos = false;
                mouseDown = false;
            };
            $(document).mouseup(resetMouse).click(resetMouse);

            var calculateVelocities = function() {
                settings.velocity    = capVelocity(prevXPos - xpos, settings.maxvelocity);
                settings.velocityY   = capVelocity(prevYPos - ypos, settings.maxvelocity);
            };
            var useTarget = function(target) {
                if ($.isFunction(settings.filterTarget)) {
                    return settings.filterTarget.call(self, target) !== false;
                }
                return true;
            };
            var start = function(clientX, clientY) {
                mouseDown = true;
                settings.velocity = prevXPos = 0;
                settings.velocityY = prevYPos = 0;
                xpos = clientX;
                ypos = clientY;
            };
            var end = function() {
                if (xpos && prevXPos && settings.decelerate === false) {
                    settings.decelerate = true;
                    calculateVelocities();
                    xpos = prevXPos = mouseDown = false;
                    move($this, settings);
                }
            };
            var inputmove = function(clientX, clientY) {
                if (!lastMove || new Date() > new Date(lastMove.getTime() + throttleTimeout)) {
                    lastMove = new Date();

                    if (mouseDown && (xpos || ypos)) {
                        if (elementFocused) {
                            $(elementFocused).blur();
                            elementFocused = null;
                            $this.focus();
                        }
                        settings.decelerate = false;
                        settings.velocity   = settings.velocityY  = 0;
                        $this[0].scrollLeft = settings.scrollLeft = settings.x ? $this[0].scrollLeft - (clientX - xpos) : $this[0].scrollLeft;
                        $this[0].scrollTop  = settings.scrollTop  = settings.y ? $this[0].scrollTop - (clientY - ypos)  : $this[0].scrollTop;
                        prevXPos = xpos;
                        prevYPos = ypos;
                        xpos = clientX;
                        ypos = clientY;

                        calculateVelocities();
                        setMoveClasses.call($this, settings, settings.movingClass);

                        if (typeof settings.moved === 'function') {
                            settings.moved.call($this, settings);
                        }
                    }
                }
            };

            // Events
            settings.events = {
                touchStart: function(e){
                    if (useTarget(e.target)) {
                        start(e.touches[0].clientX, e.touches[0].clientY);
                        e.stopPropagation();
                    }
                },
                touchMove: function(e){
                    if (mouseDown) {
                        inputmove(e.touches[0].clientX, e.touches[0].clientY);
                        if (e.preventDefault) {e.preventDefault();}
                    }
                },
                inputDown: function(e){
                    if (useTarget(e.target)) {
                        start(e.clientX, e.clientY);
                        elementFocused = e.target;
                        if (e.target.nodeName === 'IMG'){
                            e.preventDefault();
                        }
                        e.stopPropagation();
                    }
                },
                inputEnd: function(e){
                    end();
                    elementFocused = null;
                    if (e.preventDefault) {e.preventDefault();}
                },
                inputMove: function(e) {
                    if (mouseDown){
                        inputmove(e.clientX, e.clientY);
                        if (e.preventDefault) {e.preventDefault();}
                    }
                },
                inputClick: function(e){
                    if (Math.abs(settings.velocity) > 0) {
                        e.preventDefault();
                        return false;
                    }
                },
                // prevent drag and drop images in ie
                dragStart: function(e) {
                    if (elementFocused) {
                        return false;
                    }
                }
            };
            
            attachListeners($this, settings);
            $this.data(SETTINGS_KEY, settings).css("cursor", "move");

            if (settings.triggerHardware) {
                $this.css('-webkit-transform', 'translate3d(0,0,0)');
            }
        });
    };

    $.kinetic = {
        settingsKey: SETTINGS_KEY,
        callMethods: {
            start: function(settings, options){
                var $this = $(this);
                    settings = $.extend(settings, options);
                if (settings) {
                    settings.decelerate = false;
                    move($this, settings);
                }
            },
            end: function(settings, options){
                var $this = $(this);
                if (settings) {
                    settings.decelerate = true;
                }
            },
            stop: function(settings, options){
                settings.velocity = 0;
                settings.velocityY = 0;
                settings.decelerate = true;
            },
            detach: function(settings, options) {
                var $this = $(this);
                detachListeners($this, settings);
                $this
                .removeClass(ACTIVE_CLASS)
                .css("cursor", "");
            },
            attach: function(settings, options) {
                var $this = $(this);
                attachListeners($this, settings);
                $this
                .addClass(ACTIVE_CLASS)
                .css("cursor", "move");
            }
        }
    };
    $.fn.kinetic = function(options) {
        if (typeof options === 'string') {
            callOption.apply(this, arguments);
        } else {
            initElements.call(this, options);
        }
        return this;
    };

}(window.jQuery || window.Zepto));
﻿// Knockout JavaScript library v2.1.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function (window, document, navigator, undefined) {
	function m(w) { throw w; } var n = void 0, p = !0, s = null, t = !1; function A(w) { return function () { return w } }; function E(w) {
		function B(b, c, d) { d && c !== a.k.r(b) && a.k.S(b, c); c !== a.k.r(b) && a.a.va(b, "change") } var a = "undefined" !== typeof w ? w : {}; a.b = function (b, c) { for (var d = b.split("."), f = a, g = 0; g < d.length - 1; g++) f = f[d[g]]; f[d[d.length - 1]] = c }; a.B = function (a, c, d) { a[c] = d }; a.version = "2.1.0"; a.b("version", a.version); a.a = new function () {
			function b(b, c) { if ("input" !== a.a.o(b) || !b.type || "click" != c.toLowerCase()) return t; var e = b.type; return "checkbox" == e || "radio" == e } var c = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, d = {}, f = {}; d[/Firefox\/2/i.test(navigator.userAgent) ?
			"KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"]; d.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" "); for (var g in d) { var e = d[g]; if (e.length) for (var h = 0, j = e.length; h < j; h++) f[e[h]] = g } var k = { propertychange: p }, i = function () { for (var a = 3, b = document.createElement("div"), c = b.getElementsByTagName("i") ; b.innerHTML = "<\!--[if gt IE " + ++a + "]><i></i><![endif]--\>", c[0];); return 4 < a ? a : n }(); return {
				Ca: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
				v: function (a, b) { for (var c = 0, e = a.length; c < e; c++) b(a[c]) }, j: function (a, b) { if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b); for (var c = 0, e = a.length; c < e; c++) if (a[c] === b) return c; return -1 }, ab: function (a, b, c) { for (var e = 0, f = a.length; e < f; e++) if (b.call(c, a[e])) return a[e]; return s }, ba: function (b, c) { var e = a.a.j(b, c); 0 <= e && b.splice(e, 1) }, za: function (b) { for (var b = b || [], c = [], e = 0, f = b.length; e < f; e++) 0 > a.a.j(c, b[e]) && c.push(b[e]); return c }, T: function (a, b) {
					for (var a = a || [], c = [],
					e = 0, f = a.length; e < f; e++) c.push(b(a[e])); return c
				}, aa: function (a, b) { for (var a = a || [], c = [], e = 0, f = a.length; e < f; e++) b(a[e]) && c.push(a[e]); return c }, N: function (a, b) { if (b instanceof Array) a.push.apply(a, b); else for (var c = 0, e = b.length; c < e; c++) a.push(b[c]); return a }, extend: function (a, b) { if (b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]); return a }, ga: function (b) { for (; b.firstChild;) a.removeNode(b.firstChild) }, Ab: function (b) {
					for (var b = a.a.L(b), c = document.createElement("div"), e = 0, f = b.length; e < f; e++) a.F(b[e]),
					c.appendChild(b[e]); return c
				}, X: function (b, c) { a.a.ga(b); if (c) for (var e = 0, f = c.length; e < f; e++) b.appendChild(c[e]) }, Na: function (b, c) { var e = b.nodeType ? [b] : b; if (0 < e.length) { for (var f = e[0], d = f.parentNode, g = 0, h = c.length; g < h; g++) d.insertBefore(c[g], f); g = 0; for (h = e.length; g < h; g++) a.removeNode(e[g]) } }, Pa: function (a, b) { 0 <= navigator.userAgent.indexOf("MSIE 6") ? a.setAttribute("selected", b) : a.selected = b }, w: function (a) { return (a || "").replace(c, "") }, Ib: function (b, c) {
					for (var e = [], f = (b || "").split(c), g = 0, d = f.length; g <
					d; g++) { var h = a.a.w(f[g]); "" !== h && e.push(h) } return e
				}, Hb: function (a, b) { a = a || ""; return b.length > a.length ? t : a.substring(0, b.length) === b }, eb: function (a, b) { for (var c = "return (" + a + ")", e = 0; e < b; e++) c = "with(sc[" + e + "]) { " + c + " } "; return new Function("sc", c) }, kb: function (a, b) { if (b.compareDocumentPosition) return 16 == (b.compareDocumentPosition(a) & 16); for (; a != s;) { if (a == b) return p; a = a.parentNode } return t }, fa: function (b) { return a.a.kb(b, b.ownerDocument) }, o: function (a) { return a && a.tagName && a.tagName.toLowerCase() },
				n: function (a, c, e) { var f = i && k[c]; if (!f && "undefined" != typeof jQuery) { if (b(a, c)) var g = e, e = function (a, b) { var c = this.checked; b && (this.checked = b.fb !== p); g.call(this, a); this.checked = c }; jQuery(a).bind(c, e) } else !f && "function" == typeof a.addEventListener ? a.addEventListener(c, e, t) : "undefined" != typeof a.attachEvent ? a.attachEvent("on" + c, function (b) { e.call(a, b) }) : m(Error("Browser doesn't support addEventListener or attachEvent")) }, va: function (a, c) {
					(!a || !a.nodeType) && m(Error("element must be a DOM node when calling triggerEvent"));
					if ("undefined" != typeof jQuery) { var e = []; b(a, c) && e.push({ fb: a.checked }); jQuery(a).trigger(c, e) } else "function" == typeof document.createEvent ? "function" == typeof a.dispatchEvent ? (e = document.createEvent(f[c] || "HTMLEvents"), e.initEvent(c, p, p, window, 0, 0, 0, 0, 0, t, t, t, t, 0, a), a.dispatchEvent(e)) : m(Error("The supplied element doesn't support dispatchEvent")) : "undefined" != typeof a.fireEvent ? (b(a, c) && (a.checked = a.checked !== p), a.fireEvent("on" + c)) : m(Error("Browser doesn't support triggering events"))
				}, d: function (b) {
					return a.la(b) ?
					b() : b
				}, Ua: function (b, c, e) { var f = (b.className || "").split(/\s+/), g = 0 <= a.a.j(f, c); if (e && !g) b.className += (f[0] ? " " : "") + c; else if (g && !e) { e = ""; for (g = 0; g < f.length; g++) f[g] != c && (e += f[g] + " "); b.className = a.a.w(e) } }, Qa: function (b, c) { var e = a.a.d(c); if (e === s || e === n) e = ""; "innerText" in b ? b.innerText = e : b.textContent = e; 9 <= i && (b.style.display = b.style.display) }, lb: function (a) { if (9 <= i) { var b = a.style.width; a.style.width = 0; a.style.width = b } }, Eb: function (b, e) { for (var b = a.a.d(b), e = a.a.d(e), c = [], f = b; f <= e; f++) c.push(f); return c },
				L: function (a) { for (var b = [], e = 0, c = a.length; e < c; e++) b.push(a[e]); return b }, tb: 6 === i, ub: 7 === i, ja: i, Da: function (b, e) { for (var c = a.a.L(b.getElementsByTagName("input")).concat(a.a.L(b.getElementsByTagName("textarea"))), f = "string" == typeof e ? function (a) { return a.name === e } : function (a) { return e.test(a.name) }, g = [], d = c.length - 1; 0 <= d; d--) f(c[d]) && g.push(c[d]); return g }, Bb: function (b) { return "string" == typeof b && (b = a.a.w(b)) ? window.JSON && window.JSON.parse ? window.JSON.parse(b) : (new Function("return " + b))() : s }, sa: function (b,
				e, c) { ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) && m(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")); return JSON.stringify(a.a.d(b), e, c) }, Cb: function (b, e, c) {
					var c = c || {}, f = c.params || {}, g = c.includeFields || this.Ca, d = b; if ("object" == typeof b && "form" === a.a.o(b)) for (var d = b.action, h = g.length - 1; 0 <= h; h--) for (var k = a.a.Da(b, g[h]),
					j = k.length - 1; 0 <= j; j--) f[k[j].name] = k[j].value; var e = a.a.d(e), i = document.createElement("form"); i.style.display = "none"; i.action = d; i.method = "post"; for (var z in e) b = document.createElement("input"), b.name = z, b.value = a.a.sa(a.a.d(e[z])), i.appendChild(b); for (z in f) b = document.createElement("input"), b.name = z, b.value = f[z], i.appendChild(b); document.body.appendChild(i); c.submitter ? c.submitter(i) : i.submit(); setTimeout(function () { i.parentNode.removeChild(i) }, 0)
				}
			}
		}; a.b("utils", a.a); a.b("utils.arrayForEach", a.a.v);
		a.b("utils.arrayFirst", a.a.ab); a.b("utils.arrayFilter", a.a.aa); a.b("utils.arrayGetDistinctValues", a.a.za); a.b("utils.arrayIndexOf", a.a.j); a.b("utils.arrayMap", a.a.T); a.b("utils.arrayPushAll", a.a.N); a.b("utils.arrayRemoveItem", a.a.ba); a.b("utils.extend", a.a.extend); a.b("utils.fieldsIncludedWithJsonPost", a.a.Ca); a.b("utils.getFormFields", a.a.Da); a.b("utils.postJson", a.a.Cb); a.b("utils.parseJson", a.a.Bb); a.b("utils.registerEventHandler", a.a.n); a.b("utils.stringifyJson", a.a.sa); a.b("utils.range", a.a.Eb);
		a.b("utils.toggleDomNodeCssClass", a.a.Ua); a.b("utils.triggerEvent", a.a.va); a.b("utils.unwrapObservable", a.a.d); Function.prototype.bind || (Function.prototype.bind = function (a) { var c = this, d = Array.prototype.slice.call(arguments), a = d.shift(); return function () { return c.apply(a, d.concat(Array.prototype.slice.call(arguments))) } }); a.a.f = new function () {
			var b = 0, c = "__ko__" + (new Date).getTime(), d = {}; return {
				get: function (b, c) { var e = a.a.f.getAll(b, t); return e === n ? n : e[c] }, set: function (b, c, e) {
					e === n && a.a.f.getAll(b,
					t) === n || (a.a.f.getAll(b, p)[c] = e)
				}, getAll: function (a, g) { var e = a[c]; if (!(e && "null" !== e)) { if (!g) return; e = a[c] = "ko" + b++; d[e] = {} } return d[e] }, clear: function (a) { var b = a[c]; b && (delete d[b], a[c] = s) }
			}
		}; a.b("utils.domData", a.a.f); a.b("utils.domData.clear", a.a.f.clear); a.a.G = new function () {
			function b(b, c) { var f = a.a.f.get(b, d); f === n && c && (f = [], a.a.f.set(b, d, f)); return f } function c(e) {
				var f = b(e, t); if (f) for (var f = f.slice(0), d = 0; d < f.length; d++) f[d](e); a.a.f.clear(e); "function" == typeof jQuery && "function" == typeof jQuery.cleanData &&
				jQuery.cleanData([e]); if (g[e.nodeType]) for (f = e.firstChild; e = f;) f = e.nextSibling, 8 === e.nodeType && c(e)
			} var d = "__ko_domNodeDisposal__" + (new Date).getTime(), f = { 1: p, 8: p, 9: p }, g = { 1: p, 9: p }; return {
				wa: function (a, c) { "function" != typeof c && m(Error("Callback must be a function")); b(a, p).push(c) }, Ma: function (c, f) { var g = b(c, t); g && (a.a.ba(g, f), 0 == g.length && a.a.f.set(c, d, n)) }, F: function (b) { if (f[b.nodeType] && (c(b), g[b.nodeType])) { var d = []; a.a.N(d, b.getElementsByTagName("*")); for (var b = 0, j = d.length; b < j; b++) c(d[b]) } },
				removeNode: function (b) { a.F(b); b.parentNode && b.parentNode.removeChild(b) }
			}
		}; a.F = a.a.G.F; a.removeNode = a.a.G.removeNode; a.b("cleanNode", a.F); a.b("removeNode", a.removeNode); a.b("utils.domNodeDisposal", a.a.G); a.b("utils.domNodeDisposal.addDisposeCallback", a.a.G.wa); a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.G.Ma); (function () {
			a.a.pa = function (b) {
				var c; if ("undefined" != typeof jQuery) {
					if ((c = jQuery.clean([b])) && c[0]) {
						for (b = c[0]; b.parentNode && 11 !== b.parentNode.nodeType;) b = b.parentNode; b.parentNode &&
						b.parentNode.removeChild(b)
					}
				} else { var d = a.a.w(b).toLowerCase(); c = document.createElement("div"); d = d.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !d.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!d.indexOf("<td") || !d.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""]; b = "ignored<div>" + d[1] + b + d[2] + "</div>"; for ("function" == typeof window.innerShiv ? c.appendChild(window.innerShiv(b)) : c.innerHTML = b; d[0]--;) c = c.lastChild; c = a.a.L(c.lastChild.childNodes) } return c
			};
			a.a.Y = function (b, c) { a.a.ga(b); if (c !== s && c !== n) if ("string" != typeof c && (c = c.toString()), "undefined" != typeof jQuery) jQuery(b).html(c); else for (var d = a.a.pa(c), f = 0; f < d.length; f++) b.appendChild(d[f]) }
		})(); a.b("utils.parseHtmlFragment", a.a.pa); a.b("utils.setHtml", a.a.Y); a.s = function () {
			function b() { return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) } function c(b, g) {
				if (b) if (8 == b.nodeType) { var e = a.s.Ja(b.nodeValue); e != s && g.push({ jb: b, yb: e }) } else if (1 == b.nodeType) for (var e = 0, d = b.childNodes, j = d.length; e <
				j; e++) c(d[e], g)
			} var d = {}; return {
				na: function (a) { "function" != typeof a && m(Error("You can only pass a function to ko.memoization.memoize()")); var c = b() + b(); d[c] = a; return "<\!--[ko_memo:" + c + "]--\>" }, Va: function (a, b) { var c = d[a]; c === n && m(Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.")); try { return c.apply(s, b || []), p } finally { delete d[a] } }, Wa: function (b, d) {
					var e = []; c(b, e); for (var h = 0, j = e.length; h < j; h++) {
						var k = e[h].jb, i = [k]; d && a.a.N(i, d); a.s.Va(e[h].yb, i); k.nodeValue = ""; k.parentNode &&
						k.parentNode.removeChild(k)
					}
				}, Ja: function (a) { return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : s }
			}
		}(); a.b("memoization", a.s); a.b("memoization.memoize", a.s.na); a.b("memoization.unmemoize", a.s.Va); a.b("memoization.parseMemoText", a.s.Ja); a.b("memoization.unmemoizeDomNodeAndDescendants", a.s.Wa); a.Ba = {
			throttle: function (b, c) { b.throttleEvaluation = c; var d = s; return a.h({ read: b, write: function (a) { clearTimeout(d); d = setTimeout(function () { b(a) }, c) } }) }, notify: function (b, c) {
				b.equalityComparer = "always" == c ? A(t) : a.m.fn.equalityComparer;
				return b
			}
		}; a.b("extenders", a.Ba); a.Sa = function (b, c, d) { this.target = b; this.ca = c; this.ib = d; a.B(this, "dispose", this.A) }; a.Sa.prototype.A = function () { this.sb = p; this.ib() }; a.R = function () { this.u = {}; a.a.extend(this, a.R.fn); a.B(this, "subscribe", this.ta); a.B(this, "extend", this.extend); a.B(this, "getSubscriptionsCount", this.ob) }; a.R.fn = {
			ta: function (b, c, d) { var d = d || "change", b = c ? b.bind(c) : b, f = new a.Sa(this, b, function () { a.a.ba(this.u[d], f) }.bind(this)); this.u[d] || (this.u[d] = []); this.u[d].push(f); return f }, notifySubscribers: function (b,
			c) { c = c || "change"; this.u[c] && a.a.v(this.u[c].slice(0), function (a) { a && a.sb !== p && a.ca(b) }) }, ob: function () { var a = 0, c; for (c in this.u) this.u.hasOwnProperty(c) && (a += this.u[c].length); return a }, extend: function (b) { var c = this; if (b) for (var d in b) { var f = a.Ba[d]; "function" == typeof f && (c = f(c, b[d])) } return c }
		}; a.Ga = function (a) { return "function" == typeof a.ta && "function" == typeof a.notifySubscribers }; a.b("subscribable", a.R); a.b("isSubscribable", a.Ga); a.U = function () {
			var b = []; return {
				bb: function (a) { b.push({ ca: a, Aa: [] }) },
				end: function () { b.pop() }, La: function (c) { a.Ga(c) || m(Error("Only subscribable things can act as dependencies")); if (0 < b.length) { var d = b[b.length - 1]; 0 <= a.a.j(d.Aa, c) || (d.Aa.push(c), d.ca(c)) } }
			}
		}(); var G = { undefined: p, "boolean": p, number: p, string: p }; a.m = function (b) {
			function c() { if (0 < arguments.length) { if (!c.equalityComparer || !c.equalityComparer(d, arguments[0])) c.I(), d = arguments[0], c.H(); return this } a.U.La(c); return d } var d = b; a.R.call(c); c.H = function () { c.notifySubscribers(d) }; c.I = function () {
				c.notifySubscribers(d,
				"beforeChange")
			}; a.a.extend(c, a.m.fn); a.B(c, "valueHasMutated", c.H); a.B(c, "valueWillMutate", c.I); return c
		}; a.m.fn = { equalityComparer: function (a, c) { return a === s || typeof a in G ? a === c : t } }; var x = a.m.Db = "__ko_proto__"; a.m.fn[x] = a.m; a.ia = function (b, c) { return b === s || b === n || b[x] === n ? t : b[x] === c ? p : a.ia(b[x], c) }; a.la = function (b) { return a.ia(b, a.m) }; a.Ha = function (b) { return "function" == typeof b && b[x] === a.m || "function" == typeof b && b[x] === a.h && b.pb ? p : t }; a.b("observable", a.m); a.b("isObservable", a.la); a.b("isWriteableObservable",
		a.Ha); a.Q = function (b) { 0 == arguments.length && (b = []); b !== s && (b !== n && !("length" in b)) && m(Error("The argument passed when initializing an observable array must be an array, or null, or undefined.")); var c = a.m(b); a.a.extend(c, a.Q.fn); return c }; a.Q.fn = {
			remove: function (a) { for (var c = this(), d = [], f = "function" == typeof a ? a : function (c) { return c === a }, g = 0; g < c.length; g++) { var e = c[g]; f(e) && (0 === d.length && this.I(), d.push(e), c.splice(g, 1), g--) } d.length && this.H(); return d }, removeAll: function (b) {
				if (b === n) {
					var c = this(),
					d = c.slice(0); this.I(); c.splice(0, c.length); this.H(); return d
				} return !b ? [] : this.remove(function (c) { return 0 <= a.a.j(b, c) })
			}, destroy: function (a) { var c = this(), d = "function" == typeof a ? a : function (c) { return c === a }; this.I(); for (var f = c.length - 1; 0 <= f; f--) d(c[f]) && (c[f]._destroy = p); this.H() }, destroyAll: function (b) { return b === n ? this.destroy(A(p)) : !b ? [] : this.destroy(function (c) { return 0 <= a.a.j(b, c) }) }, indexOf: function (b) { var c = this(); return a.a.j(c, b) }, replace: function (a, c) {
				var d = this.indexOf(a); 0 <= d && (this.I(),
				this()[d] = c, this.H())
			}
		}; a.a.v("pop push reverse shift sort splice unshift".split(" "), function (b) { a.Q.fn[b] = function () { var a = this(); this.I(); a = a[b].apply(a, arguments); this.H(); return a } }); a.a.v(["slice"], function (b) { a.Q.fn[b] = function () { var a = this(); return a[b].apply(a, arguments) } }); a.b("observableArray", a.Q); a.h = function (b, c, d) {
			function f() { a.a.v(v, function (a) { a.A() }); v = [] } function g() { var a = h.throttleEvaluation; a && 0 <= a ? (clearTimeout(x), x = setTimeout(e, a)) : e() } function e() {
				if (!l) if (i && w()) u(); else {
					l =
					p; try { var b = a.a.T(v, function (a) { return a.target }); a.U.bb(function (c) { var e; 0 <= (e = a.a.j(b, c)) ? b[e] = n : v.push(c.ta(g)) }); for (var e = q.call(c), f = b.length - 1; 0 <= f; f--) b[f] && v.splice(f, 1)[0].A(); i = p; h.notifySubscribers(k, "beforeChange"); k = e } finally { a.U.end() } h.notifySubscribers(k); l = t
				}
			} function h() { if (0 < arguments.length) j.apply(h, arguments); else return i || e(), a.U.La(h), k } function j() { "function" === typeof o ? o.apply(c, arguments) : m(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")) }
			var k, i = t, l = t, q = b; q && "object" == typeof q ? (d = q, q = d.read) : (d = d || {}, q || (q = d.read)); "function" != typeof q && m(Error("Pass a function that returns the value of the ko.computed")); var o = d.write; c || (c = d.owner); var v = [], u = f, r = "object" == typeof d.disposeWhenNodeIsRemoved ? d.disposeWhenNodeIsRemoved : s, w = d.disposeWhen || A(t); if (r) { u = function () { a.a.G.Ma(r, arguments.callee); f() }; a.a.G.wa(r, u); var y = w, w = function () { return !a.a.fa(r) || y() } } var x = s; h.nb = function () { return v.length }; h.pb = "function" === typeof d.write; h.A = function () { u() };
			a.R.call(h); a.a.extend(h, a.h.fn); d.deferEvaluation !== p && e(); a.B(h, "dispose", h.A); a.B(h, "getDependenciesCount", h.nb); return h
		}; a.rb = function (b) { return a.ia(b, a.h) }; w = a.m.Db; a.h[w] = a.m; a.h.fn = {}; a.h.fn[w] = a.h; a.b("dependentObservable", a.h); a.b("computed", a.h); a.b("isComputed", a.rb); (function () {
			function b(a, g, e) {
				e = e || new d; a = g(a); if (!("object" == typeof a && a !== s && a !== n && !(a instanceof Date))) return a; var h = a instanceof Array ? [] : {}; e.save(a, h); c(a, function (c) {
					var d = g(a[c]); switch (typeof d) {
						case "boolean": case "number": case "string": case "function": h[c] =
						d; break; case "object": case "undefined": var i = e.get(d); h[c] = i !== n ? i : b(d, g, e)
					}
				}); return h
			} function c(a, b) { if (a instanceof Array) { for (var c = 0; c < a.length; c++) b(c); "function" == typeof a.toJSON && b("toJSON") } else for (c in a) b(c) } function d() { var b = [], c = []; this.save = function (e, d) { var j = a.a.j(b, e); 0 <= j ? c[j] = d : (b.push(e), c.push(d)) }; this.get = function (e) { e = a.a.j(b, e); return 0 <= e ? c[e] : n } } a.Ta = function (c) {
				0 == arguments.length && m(Error("When calling ko.toJS, pass the object you want to convert.")); return b(c, function (b) {
					for (var c =
					0; a.la(b) && 10 > c; c++) b = b(); return b
				})
			}; a.toJSON = function (b, c, e) { b = a.Ta(b); return a.a.sa(b, c, e) }
		})(); a.b("toJS", a.Ta); a.b("toJSON", a.toJSON); (function () {
			a.k = {
				r: function (b) { switch (a.a.o(b)) { case "option": return b.__ko__hasDomDataOptionValue__ === p ? a.a.f.get(b, a.c.options.oa) : b.getAttribute("value"); case "select": return 0 <= b.selectedIndex ? a.k.r(b.options[b.selectedIndex]) : n; default: return b.value } }, S: function (b, c) {
					switch (a.a.o(b)) {
						case "option": switch (typeof c) {
							case "string": a.a.f.set(b, a.c.options.oa,
							n); "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__; b.value = c; break; default: a.a.f.set(b, a.c.options.oa, c), b.__ko__hasDomDataOptionValue__ = p, b.value = "number" === typeof c ? c : ""
						} break; case "select": for (var d = b.options.length - 1; 0 <= d; d--) if (a.k.r(b.options[d]) == c) { b.selectedIndex = d; break } break; default: if (c === s || c === n) c = ""; b.value = c
					}
				}
			}
		})(); a.b("selectExtensions", a.k); a.b("selectExtensions.readValue", a.k.r); a.b("selectExtensions.writeValue", a.k.S); a.g = function () {
			function b(a, b) {
				for (var d =
				s; a != d;) d = a, a = a.replace(c, function (a, c) { return b[c] }); return a
			} var c = /\@ko_token_(\d+)\@/g, d = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i, f = ["true", "false"]; return {
				D: [], W: function (c) {
					var e = a.a.w(c); if (3 > e.length) return []; "{" === e.charAt(0) && (e = e.substring(1, e.length - 1)); for (var c = [], d = s, f, k = 0; k < e.length; k++) {
						var i = e.charAt(k); if (d === s) switch (i) { case '"': case "'": case "/": d = k, f = i } else if (i == f && "\\" !== e.charAt(k - 1)) {
							i = e.substring(d, k + 1); c.push(i); var l = "@ko_token_" + (c.length -
							1) + "@", e = e.substring(0, d) + l + e.substring(k + 1), k = k - (i.length - l.length), d = s
						}
					} f = d = s; for (var q = 0, o = s, k = 0; k < e.length; k++) { i = e.charAt(k); if (d === s) switch (i) { case "{": d = k; o = i; f = "}"; break; case "(": d = k; o = i; f = ")"; break; case "[": d = k, o = i, f = "]" } i === o ? q++ : i === f && (q--, 0 === q && (i = e.substring(d, k + 1), c.push(i), l = "@ko_token_" + (c.length - 1) + "@", e = e.substring(0, d) + l + e.substring(k + 1), k -= i.length - l.length, d = s)) } f = []; e = e.split(","); d = 0; for (k = e.length; d < k; d++) q = e[d], o = q.indexOf(":"), 0 < o && o < q.length - 1 ? (i = q.substring(o + 1), f.push({
						key: b(q.substring(0,
						o), c), value: b(i, c)
					})) : f.push({ unknown: b(q, c) }); return f
				}, ka: function (b) {
					for (var c = "string" === typeof b ? a.g.W(b) : b, h = [], b = [], j, k = 0; j = c[k]; k++) if (0 < h.length && h.push(","), j.key) { var i; a: { i = j.key; var l = a.a.w(i); switch (l.length && l.charAt(0)) { case "'": case '"': break a; default: i = "'" + l + "'" } } j = j.value; h.push(i); h.push(":"); h.push(j); l = a.a.w(j); if (0 <= a.a.j(f, a.a.w(l).toLowerCase()) ? 0 : l.match(d) !== s) 0 < b.length && b.push(", "), b.push(i + " : function(__ko_value) { " + j + " = __ko_value; }") } else j.unknown && h.push(j.unknown);
					c = h.join(""); 0 < b.length && (c = c + ", '_ko_property_writers' : { " + b.join("") + " } "); return c
				}, wb: function (b, c) { for (var d = 0; d < b.length; d++) if (a.a.w(b[d].key) == c) return p; return t }, $: function (b, c, d, f, k) { if (!b || !a.Ha(b)) { if ((b = c()._ko_property_writers) && b[d]) b[d](f) } else (!k || b() !== f) && b(f) }
			}
		}(); a.b("jsonExpressionRewriting", a.g); a.b("jsonExpressionRewriting.bindingRewriteValidators", a.g.D); a.b("jsonExpressionRewriting.parseObjectLiteral", a.g.W); a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",
		a.g.ka); (function () {
			function b(a) { return 8 == a.nodeType && (g ? a.text : a.nodeValue).match(e) } function c(a) { return 8 == a.nodeType && (g ? a.text : a.nodeValue).match(h) } function d(a, e) { for (var d = a, f = 1, g = []; d = d.nextSibling;) { if (c(d) && (f--, 0 === f)) return g; g.push(d); b(d) && f++ } e || m(Error("Cannot find closing comment tag to match: " + a.nodeValue)); return s } function f(a, b) { var c = d(a, b); return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : s } var g = "<\!--test--\>" === document.createComment("test").text, e = g ? /^<\!--\s*ko\s+(.*\:.*)\s*--\>$/ :
			/^\s*ko\s+(.*\:.*)\s*$/, h = g ? /^<\!--\s*\/ko\s*--\>$/ : /^\s*\/ko\s*$/, j = { ul: p, ol: p }; a.e = {
				C: {}, childNodes: function (a) { return b(a) ? d(a) : a.childNodes }, ha: function (c) { if (b(c)) for (var c = a.e.childNodes(c), e = 0, d = c.length; e < d; e++) a.removeNode(c[e]); else a.a.ga(c) }, X: function (c, e) { if (b(c)) { a.e.ha(c); for (var d = c.nextSibling, f = 0, g = e.length; f < g; f++) d.parentNode.insertBefore(e[f], d) } else a.a.X(c, e) }, Ka: function (a, c) { b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c) },
				Fa: function (a, c, e) { b(a) ? a.parentNode.insertBefore(c, e.nextSibling) : e.nextSibling ? a.insertBefore(c, e.nextSibling) : a.appendChild(c) }, firstChild: function (a) { return !b(a) ? a.firstChild : !a.nextSibling || c(a.nextSibling) ? s : a.nextSibling }, nextSibling: function (a) { b(a) && (a = f(a)); return a.nextSibling && c(a.nextSibling) ? s : a.nextSibling }, Xa: function (a) { return (a = b(a)) ? a[1] : s }, Ia: function (e) {
					if (j[a.a.o(e)]) {
						var d = e.firstChild; if (d) {
							do if (1 === d.nodeType) {
								var g; g = d.firstChild; var h = s; if (g) {
									do if (h) h.push(g); else if (b(g)) {
										var o =
										f(g, p); o ? g = o : h = [g]
									} else c(g) && (h = [g]); while (g = g.nextSibling)
								} if (g = h) { h = d.nextSibling; for (o = 0; o < g.length; o++) h ? e.insertBefore(g[o], h) : e.appendChild(g[o]) }
							} while (d = d.nextSibling)
						}
					}
				}
			}
		})(); a.b("virtualElements", a.e); a.b("virtualElements.allowedBindings", a.e.C); a.b("virtualElements.emptyNode", a.e.ha); a.b("virtualElements.insertAfter", a.e.Fa); a.b("virtualElements.prepend", a.e.Ka); a.b("virtualElements.setDomNodeChildren", a.e.X); (function () {
			a.J = function () { this.cb = {} }; a.a.extend(a.J.prototype, {
				nodeHasBindings: function (b) {
					switch (b.nodeType) {
						case 1: return b.getAttribute("data-bind") !=
						s; case 8: return a.e.Xa(b) != s; default: return t
					}
				}, getBindings: function (a, c) { var d = this.getBindingsString(a, c); return d ? this.parseBindingsString(d, c) : s }, getBindingsString: function (b) { switch (b.nodeType) { case 1: return b.getAttribute("data-bind"); case 8: return a.e.Xa(b); default: return s } }, parseBindingsString: function (b, c) {
					try { var d = c.$data, d = "object" == typeof d && d != s ? [d, c] : [c], f = d.length, g = this.cb, e = f + "_" + b, h; if (!(h = g[e])) { var j = " { " + a.g.ka(b) + " } "; h = g[e] = a.a.eb(j, f) } return h(d) } catch (k) {
						m(Error("Unable to parse bindings.\nMessage: " +
						k + ";\nBindings value: " + b))
					}
				}
			}); a.J.instance = new a.J
		})(); a.b("bindingProvider", a.J); (function () {
			function b(b, d, e) { for (var h = a.e.firstChild(d) ; d = h;) h = a.e.nextSibling(d), c(b, d, e) } function c(c, g, e) { var h = p, j = 1 === g.nodeType; j && a.e.Ia(g); if (j && e || a.J.instance.nodeHasBindings(g)) h = d(g, s, c, e).Gb; h && b(c, g, !j) } function d(b, c, e, d) {
				function j(a) { return function () { return l[a] } } function k() { return l } var i = 0, l, q; a.h(function () {
					var o = e && e instanceof a.z ? e : new a.z(a.a.d(e)), v = o.$data; d && a.Ra(b, o); if (l = ("function" ==
					typeof c ? c() : c) || a.J.instance.getBindings(b, o)) {
						if (0 === i) { i = 1; for (var u in l) { var r = a.c[u]; r && 8 === b.nodeType && !a.e.C[u] && m(Error("The binding '" + u + "' cannot be used with virtual elements")); if (r && "function" == typeof r.init && (r = (0, r.init)(b, j(u), k, v, o)) && r.controlsDescendantBindings) q !== n && m(Error("Multiple bindings (" + q + " and " + u + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")), q = u } i = 2 } if (2 === i) for (u in l) (r = a.c[u]) && "function" ==
						typeof r.update && (0, r.update)(b, j(u), k, v, o)
					}
				}, s, { disposeWhenNodeIsRemoved: b }); return { Gb: q === n }
			} a.c = {}; a.z = function (b, c) { c ? (a.a.extend(this, c), this.$parentContext = c, this.$parent = c.$data, this.$parents = (c.$parents || []).slice(0), this.$parents.unshift(this.$parent)) : (this.$parents = [], this.$root = b); this.$data = b }; a.z.prototype.createChildContext = function (b) { return new a.z(b, this) }; a.z.prototype.extend = function (b) { var c = a.a.extend(new a.z, this); return a.a.extend(c, b) }; a.Ra = function (b, c) {
				if (2 == arguments.length) a.a.f.set(b,
				"__ko_bindingContext__", c); else return a.a.f.get(b, "__ko_bindingContext__")
			}; a.ya = function (b, c, e) { 1 === b.nodeType && a.e.Ia(b); return d(b, c, e, p) }; a.Ya = function (a, c) { (1 === c.nodeType || 8 === c.nodeType) && b(a, c, p) }; a.xa = function (a, b) { b && (1 !== b.nodeType && 8 !== b.nodeType) && m(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")); b = b || window.document.body; c(a, b, p) }; a.ea = function (b) { switch (b.nodeType) { case 1: case 8: var c = a.Ra(b); if (c) return c; if (b.parentNode) return a.ea(b.parentNode) } };
			a.hb = function (b) { return (b = a.ea(b)) ? b.$data : n }; a.b("bindingHandlers", a.c); a.b("applyBindings", a.xa); a.b("applyBindingsToDescendants", a.Ya); a.b("applyBindingsToNode", a.ya); a.b("contextFor", a.ea); a.b("dataFor", a.hb)
		})(); a.a.v(["click"], function (b) { a.c[b] = { init: function (c, d, f, g) { return a.c.event.init.call(this, c, function () { var a = {}; a[b] = d(); return a }, f, g) } } }); a.c.event = {
			init: function (b, c, d, f) {
				var g = c() || {}, e; for (e in g) (function () {
					var g = e; "string" == typeof g && a.a.n(b, g, function (b) {
						var e, i = c()[g]; if (i) {
							var l =
							d(); try { var q = a.a.L(arguments); q.unshift(f); e = i.apply(f, q) } finally { e !== p && (b.preventDefault ? b.preventDefault() : b.returnValue = t) } l[g + "Bubble"] === t && (b.cancelBubble = p, b.stopPropagation && b.stopPropagation())
						}
					})
				})()
			}
		}; a.c.submit = { init: function (b, c, d, f) { "function" != typeof c() && m(Error("The value for a submit binding must be a function")); a.a.n(b, "submit", function (a) { var e, d = c(); try { e = d.call(f, b) } finally { e !== p && (a.preventDefault ? a.preventDefault() : a.returnValue = t) } }) } }; a.c.visible = {
			update: function (b, c) {
				var d =
				a.a.d(c()), f = "none" != b.style.display; d && !f ? b.style.display = "" : !d && f && (b.style.display = "none")
			}
		}; a.c.enable = { update: function (b, c) { var d = a.a.d(c()); d && b.disabled ? b.removeAttribute("disabled") : !d && !b.disabled && (b.disabled = p) } }; a.c.disable = { update: function (b, c) { a.c.enable.update(b, function () { return !a.a.d(c()) }) } }; a.c.value = {
			init: function (b, c, d) {
				function f() { var e = c(), f = a.k.r(b); a.g.$(e, d, "value", f, p) } var g = ["change"], e = d().valueUpdate; e && ("string" == typeof e && (e = [e]), a.a.N(g, e), g = a.a.za(g)); if (a.a.ja &&
				("input" == b.tagName.toLowerCase() && "text" == b.type && "off" != b.autocomplete && (!b.form || "off" != b.form.autocomplete)) && -1 == a.a.j(g, "propertychange")) { var h = t; a.a.n(b, "propertychange", function () { h = p }); a.a.n(b, "blur", function () { if (h) { h = t; f() } }) } a.a.v(g, function (c) { var e = f; if (a.a.Hb(c, "after")) { e = function () { setTimeout(f, 0) }; c = c.substring(5) } a.a.n(b, c, e) })
			}, update: function (b, c) {
				var d = "select" === a.a.o(b), f = a.a.d(c()), g = a.k.r(b), e = f != g; 0 === f && (0 !== g && "0" !== g) && (e = p); e && (g = function () { a.k.S(b, f) }, g(), d && setTimeout(g,
				0)); d && 0 < b.length && B(b, f, t)
			}
		}; a.c.options = {
			update: function (b, c, d) {
				"select" !== a.a.o(b) && m(Error("options binding applies only to SELECT elements")); for (var f = 0 == b.length, g = a.a.T(a.a.aa(b.childNodes, function (b) { return b.tagName && "option" === a.a.o(b) && b.selected }), function (b) { return a.k.r(b) || b.innerText || b.textContent }), e = b.scrollTop, h = a.a.d(c()) ; 0 < b.length;) a.F(b.options[0]), b.remove(0); if (h) {
					d = d(); "number" != typeof h.length && (h = [h]); if (d.optionsCaption) {
						var j = document.createElement("option"); a.a.Y(j,
						d.optionsCaption); a.k.S(j, n); b.appendChild(j)
					} for (var c = 0, k = h.length; c < k; c++) { var j = document.createElement("option"), i = "string" == typeof d.optionsValue ? h[c][d.optionsValue] : h[c], i = a.a.d(i); a.k.S(j, i); var l = d.optionsText, i = "function" == typeof l ? l(h[c]) : "string" == typeof l ? h[c][l] : i; if (i === s || i === n) i = ""; a.a.Qa(j, i); b.appendChild(j) } h = b.getElementsByTagName("option"); c = j = 0; for (k = h.length; c < k; c++) 0 <= a.a.j(g, a.k.r(h[c])) && (a.a.Pa(h[c], p), j++); b.scrollTop = e; f && "value" in d && B(b, a.a.d(d.value), p); a.a.lb(b)
				}
			}
		};
		a.c.options.oa = "__ko.optionValueDomData__"; a.c.selectedOptions = {
			Ea: function (b) { for (var c = [], b = b.childNodes, d = 0, f = b.length; d < f; d++) { var g = b[d], e = a.a.o(g); "option" == e && g.selected ? c.push(a.k.r(g)) : "optgroup" == e && (g = a.c.selectedOptions.Ea(g), Array.prototype.splice.apply(c, [c.length, 0].concat(g))) } return c }, init: function (b, c, d) { a.a.n(b, "change", function () { var b = c(), g = a.c.selectedOptions.Ea(this); a.g.$(b, d, "value", g) }) }, update: function (b, c) {
				"select" != a.a.o(b) && m(Error("values binding applies only to SELECT elements"));
				var d = a.a.d(c()); if (d && "number" == typeof d.length) for (var f = b.childNodes, g = 0, e = f.length; g < e; g++) { var h = f[g]; "option" === a.a.o(h) && a.a.Pa(h, 0 <= a.a.j(d, a.k.r(h))) }
			}
		}; a.c.text = { update: function (b, c) { a.a.Qa(b, c()) } }; a.c.html = { init: function () { return { controlsDescendantBindings: p } }, update: function (b, c) { var d = a.a.d(c()); a.a.Y(b, d) } }; a.c.css = { update: function (b, c) { var d = a.a.d(c() || {}), f; for (f in d) if ("string" == typeof f) { var g = a.a.d(d[f]); a.a.Ua(b, f, g) } } }; a.c.style = {
			update: function (b, c) {
				var d = a.a.d(c() || {}), f;
				for (f in d) if ("string" == typeof f) { var g = a.a.d(d[f]); b.style[f] = g || "" }
			}
		}; a.c.uniqueName = { init: function (b, c) { c() && (b.name = "ko_unique_" + ++a.c.uniqueName.gb, (a.a.tb || a.a.ub) && b.mergeAttributes(document.createElement("<input name='" + b.name + "'/>"), t)) } }; a.c.uniqueName.gb = 0; a.c.checked = {
			init: function (b, c, d) {
				a.a.n(b, "click", function () {
					var f; if ("checkbox" == b.type) f = b.checked; else if ("radio" == b.type && b.checked) f = b.value; else return; var g = c(); "checkbox" == b.type && a.a.d(g) instanceof Array ? (f = a.a.j(a.a.d(g), b.value),
					b.checked && 0 > f ? g.push(b.value) : !b.checked && 0 <= f && g.splice(f, 1)) : a.g.$(g, d, "checked", f, p)
				}); "radio" == b.type && !b.name && a.c.uniqueName.init(b, A(p))
			}, update: function (b, c) { var d = a.a.d(c()); "checkbox" == b.type ? b.checked = d instanceof Array ? 0 <= a.a.j(d, b.value) : d : "radio" == b.type && (b.checked = b.value == d) }
		}; var F = { "class": "className", "for": "htmlFor" }; a.c.attr = {
			update: function (b, c) {
				var d = a.a.d(c()) || {}, f; for (f in d) if ("string" == typeof f) {
					var g = a.a.d(d[f]), e = g === t || g === s || g === n; e && b.removeAttribute(f); 8 >= a.a.ja &&
					f in F ? (f = F[f], e ? b.removeAttribute(f) : b[f] = g) : e || b.setAttribute(f, g.toString())
				}
			}
		}; a.c.hasfocus = { init: function (b, c, d) { function f(b) { var e = c(); a.g.$(e, d, "hasfocus", b, p) } a.a.n(b, "focus", function () { f(p) }); a.a.n(b, "focusin", function () { f(p) }); a.a.n(b, "blur", function () { f(t) }); a.a.n(b, "focusout", function () { f(t) }) }, update: function (b, c) { var d = a.a.d(c()); d ? b.focus() : b.blur(); a.a.va(b, d ? "focusin" : "focusout") } }; a.c["with"] = {
			p: function (b) { return function () { var c = b(); return { "if": c, data: c, templateEngine: a.q.K } } },
			init: function (b, c) { return a.c.template.init(b, a.c["with"].p(c)) }, update: function (b, c, d, f, g) { return a.c.template.update(b, a.c["with"].p(c), d, f, g) }
		}; a.g.D["with"] = t; a.e.C["with"] = p; a.c["if"] = { p: function (b) { return function () { return { "if": b(), templateEngine: a.q.K } } }, init: function (b, c) { return a.c.template.init(b, a.c["if"].p(c)) }, update: function (b, c, d, f, g) { return a.c.template.update(b, a.c["if"].p(c), d, f, g) } }; a.g.D["if"] = t; a.e.C["if"] = p; a.c.ifnot = {
			p: function (b) { return function () { return { ifnot: b(), templateEngine: a.q.K } } },
			init: function (b, c) { return a.c.template.init(b, a.c.ifnot.p(c)) }, update: function (b, c, d, f, g) { return a.c.template.update(b, a.c.ifnot.p(c), d, f, g) }
		}; a.g.D.ifnot = t; a.e.C.ifnot = p; a.c.foreach = {
			p: function (b) { return function () { var c = a.a.d(b()); return !c || "number" == typeof c.length ? { foreach: c, templateEngine: a.q.K } : { foreach: c.data, includeDestroyed: c.includeDestroyed, afterAdd: c.afterAdd, beforeRemove: c.beforeRemove, afterRender: c.afterRender, templateEngine: a.q.K } } }, init: function (b, c) { return a.c.template.init(b, a.c.foreach.p(c)) },
			update: function (b, c, d, f, g) { return a.c.template.update(b, a.c.foreach.p(c), d, f, g) }
		}; a.g.D.foreach = t; a.e.C.foreach = p; a.t = function () { }; a.t.prototype.renderTemplateSource = function () { m(Error("Override renderTemplateSource")) }; a.t.prototype.createJavaScriptEvaluatorBlock = function () { m(Error("Override createJavaScriptEvaluatorBlock")) }; a.t.prototype.makeTemplateSource = function (b, c) {
			if ("string" == typeof b) { var c = c || document, d = c.getElementById(b); d || m(Error("Cannot find template with ID " + b)); return new a.l.i(d) } if (1 ==
			b.nodeType || 8 == b.nodeType) return new a.l.M(b); m(Error("Unknown template type: " + b))
		}; a.t.prototype.renderTemplate = function (a, c, d, f) { return this.renderTemplateSource(this.makeTemplateSource(a, f), c, d) }; a.t.prototype.isTemplateRewritten = function (a, c) { return this.allowTemplateRewriting === t || !(c && c != document) && this.V && this.V[a] ? p : this.makeTemplateSource(a, c).data("isRewritten") }; a.t.prototype.rewriteTemplate = function (a, c, d) {
			var f = this.makeTemplateSource(a, d), c = c(f.text()); f.text(c); f.data("isRewritten",
			p); !(d && d != document) && "string" == typeof a && (this.V = this.V || {}, this.V[a] = p)
		}; a.b("templateEngine", a.t); a.Z = function () {
			function b(b, c, e) {
				for (var b = a.g.W(b), d = a.g.D, j = 0; j < b.length; j++) { var k = b[j].key; if (d.hasOwnProperty(k)) { var i = d[k]; "function" === typeof i ? (k = i(b[j].value)) && m(Error(k)) : i || m(Error("This template engine does not support the '" + k + "' binding within its templates")) } } b = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {             return (function() { return { " + a.g.ka(b) +
				" } })()         })"; return e.createJavaScriptEvaluatorBlock(b) + c
			} var c = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi, d = /<\!--\s*ko\b\s*([\s\S]*?)\s*--\>/g; return {
				mb: function (b, c, e) { c.isTemplateRewritten(b, e) || c.rewriteTemplate(b, function (b) { return a.Z.zb(b, c) }, e) }, zb: function (a, g) { return a.replace(c, function (a, c, d, f, i, l, q) { return b(q, c, g) }).replace(d, function (a, c) { return b(c, "<\!-- ko --\>", g) }) }, Za: function (b) {
					return a.s.na(function (c,
					e) { c.nextSibling && a.ya(c.nextSibling, b, e) })
				}
			}
		}(); a.b("templateRewriting", a.Z); a.b("templateRewriting.applyMemoizedBindingsToNextSibling", a.Z.Za); (function () {
			a.l = {}; a.l.i = function (a) { this.i = a }; a.l.i.prototype.text = function () { var b = a.a.o(this.i), b = "script" === b ? "text" : "textarea" === b ? "value" : "innerHTML"; if (0 == arguments.length) return this.i[b]; var c = arguments[0]; "innerHTML" === b ? a.a.Y(this.i, c) : this.i[b] = c }; a.l.i.prototype.data = function (b) {
				if (1 === arguments.length) return a.a.f.get(this.i, "templateSourceData_" +
				b); a.a.f.set(this.i, "templateSourceData_" + b, arguments[1])
			}; a.l.M = function (a) { this.i = a }; a.l.M.prototype = new a.l.i; a.l.M.prototype.text = function () { if (0 == arguments.length) { var b = a.a.f.get(this.i, "__ko_anon_template__") || {}; b.ua === n && b.da && (b.ua = b.da.innerHTML); return b.ua } a.a.f.set(this.i, "__ko_anon_template__", { ua: arguments[0] }) }; a.l.i.prototype.nodes = function () { if (0 == arguments.length) return (a.a.f.get(this.i, "__ko_anon_template__") || {}).da; a.a.f.set(this.i, "__ko_anon_template__", { da: arguments[0] }) };
			a.b("templateSources", a.l); a.b("templateSources.domElement", a.l.i); a.b("templateSources.anonymousTemplate", a.l.M)
		})(); (function () {
			function b(b, c, d) { for (var f, c = a.e.nextSibling(c) ; b && (f = b) !== c;) b = a.e.nextSibling(f), (1 === f.nodeType || 8 === f.nodeType) && d(f) } function c(c, d) { if (c.length) { var f = c[0], g = c[c.length - 1]; b(f, g, function (b) { a.xa(d, b) }); b(f, g, function (b) { a.s.Wa(b, [d]) }) } } function d(a) { return a.nodeType ? a : 0 < a.length ? a[0] : s } function f(b, f, j, k, i) {
				var i = i || {}, l = b && d(b), l = l && l.ownerDocument, q = i.templateEngine ||
				g; a.Z.mb(j, q, l); j = q.renderTemplate(j, k, i, l); ("number" != typeof j.length || 0 < j.length && "number" != typeof j[0].nodeType) && m(Error("Template engine must return an array of DOM nodes")); l = t; switch (f) { case "replaceChildren": a.e.X(b, j); l = p; break; case "replaceNode": a.a.Na(b, j); l = p; break; case "ignoreTargetNode": break; default: m(Error("Unknown renderMode: " + f)) } l && (c(j, k), i.afterRender && i.afterRender(j, k.$data)); return j
			} var g; a.ra = function (b) {
				b != n && !(b instanceof a.t) && m(Error("templateEngine must inherit from ko.templateEngine"));
				g = b
			}; a.qa = function (b, c, j, k, i) { j = j || {}; (j.templateEngine || g) == n && m(Error("Set a template engine before calling renderTemplate")); i = i || "replaceChildren"; if (k) { var l = d(k); return a.h(function () { var g = c && c instanceof a.z ? c : new a.z(a.a.d(c)), o = "function" == typeof b ? b(g.$data) : b, g = f(k, i, o, g, j); "replaceNode" == i && (k = g, l = d(k)) }, s, { disposeWhen: function () { return !l || !a.a.fa(l) }, disposeWhenNodeIsRemoved: l && "replaceNode" == i ? l.parentNode : l }) } return a.s.na(function (d) { a.qa(b, c, j, d, "replaceNode") }) }; a.Fb = function (b,
			d, g, k, i) { function l(a, b) { c(b, o); g.afterRender && g.afterRender(b, a) } function q(c, d) { var h = "function" == typeof b ? b(c) : b; o = i.createChildContext(a.a.d(c)); o.$index = d; return f(s, "ignoreTargetNode", h, o, g) } var o; return a.h(function () { var b = a.a.d(d) || []; "undefined" == typeof b.length && (b = [b]); b = a.a.aa(b, function (b) { return g.includeDestroyed || b === n || b === s || !a.a.d(b._destroy) }); a.a.Oa(k, b, q, g, l) }, s, { disposeWhenNodeIsRemoved: k }) }; a.c.template = {
				init: function (b, c) {
					var d = a.a.d(c()); if ("string" != typeof d && !d.name &&
					(1 == b.nodeType || 8 == b.nodeType)) d = 1 == b.nodeType ? b.childNodes : a.e.childNodes(b), d = a.a.Ab(d), (new a.l.M(b)).nodes(d); return { controlsDescendantBindings: p }
				}, update: function (b, c, d, f, g) {
					c = a.a.d(c()); f = p; "string" == typeof c ? d = c : (d = c.name, "if" in c && (f = f && a.a.d(c["if"])), "ifnot" in c && (f = f && !a.a.d(c.ifnot))); var l = s; "object" === typeof c && "foreach" in c ? l = a.Fb(d || b, f && c.foreach || [], c, b, g) : f ? (g = "object" == typeof c && "data" in c ? g.createChildContext(a.a.d(c.data)) : g, l = a.qa(d || b, g, c, b)) : a.e.ha(b); g = l; (c = a.a.f.get(b, "__ko__templateSubscriptionDomDataKey__")) &&
					"function" == typeof c.A && c.A(); a.a.f.set(b, "__ko__templateSubscriptionDomDataKey__", g)
				}
			}; a.g.D.template = function (b) { b = a.g.W(b); return 1 == b.length && b[0].unknown || a.g.wb(b, "name") ? s : "This template engine does not support anonymous templates nested within its templates" }; a.e.C.template = p
		})(); a.b("setTemplateEngine", a.ra); a.b("renderTemplate", a.qa); (function () {
			a.a.O = function (b, c, d) {
				if (d === n) return a.a.O(b, c, 1) || a.a.O(b, c, 10) || a.a.O(b, c, Number.MAX_VALUE); for (var b = b || [], c = c || [], f = b, g = c, e = [], h = 0; h <= g.length; h++) e[h] =
				[]; for (var h = 0, j = Math.min(f.length, d) ; h <= j; h++) e[0][h] = h; h = 1; for (j = Math.min(g.length, d) ; h <= j; h++) e[h][0] = h; for (var j = f.length, k, i = g.length, h = 1; h <= j; h++) { k = Math.max(1, h - d); for (var l = Math.min(i, h + d) ; k <= l; k++) e[k][h] = f[h - 1] === g[k - 1] ? e[k - 1][h - 1] : Math.min(e[k - 1][h] === n ? Number.MAX_VALUE : e[k - 1][h] + 1, e[k][h - 1] === n ? Number.MAX_VALUE : e[k][h - 1] + 1) } d = b.length; f = c.length; g = []; h = e[f][d]; if (h === n) e = s; else {
					for (; 0 < d || 0 < f;) {
						j = e[f][d]; i = 0 < f ? e[f - 1][d] : h + 1; l = 0 < d ? e[f][d - 1] : h + 1; k = 0 < f && 0 < d ? e[f - 1][d - 1] : h + 1; if (i === n || i < j - 1) i =
						h + 1; if (l === n || l < j - 1) l = h + 1; k < j - 1 && (k = h + 1); i <= l && i < k ? (g.push({ status: "added", value: c[f - 1] }), f--) : (l < i && l < k ? g.push({ status: "deleted", value: b[d - 1] }) : (g.push({ status: "retained", value: b[d - 1] }), f--), d--)
					} e = g.reverse()
				} return e
			}
		})(); a.b("utils.compareArrays", a.a.O); (function () {
			function b(a) { if (2 < a.length) { for (var b = a[0], c = a[a.length - 1], e = [b]; b !== c;) { b = b.nextSibling; if (!b) return; e.push(b) } Array.prototype.splice.apply(a, [0, a.length].concat(e)) } } function c(c, f, g, e, h) {
				var j = [], c = a.h(function () {
					var c = f(g, h) ||
					[]; 0 < j.length && (b(j), a.a.Na(j, c), e && e(g, c)); j.splice(0, j.length); a.a.N(j, c)
				}, s, { disposeWhenNodeIsRemoved: c, disposeWhen: function () { return 0 == j.length || !a.a.fa(j[0]) } }); return { xb: j, h: c }
			} a.a.Oa = function (d, f, g, e, h) {
				for (var f = f || [], e = e || {}, j = a.a.f.get(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === n, k = a.a.f.get(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], i = a.a.T(k, function (a) { return a.$a }), l = a.a.O(i, f), f = [], q = 0, o = [], v = 0, i = [], u = s, r = 0, w = l.length; r < w; r++) switch (l[r].status) {
					case "retained": var y =
					k[q]; y.qb(v); v = f.push(y); 0 < y.P.length && (u = y.P[y.P.length - 1]); q++; break; case "deleted": k[q].h.A(); b(k[q].P); a.a.v(k[q].P, function (a) { o.push({ element: a, index: r, value: l[r].value }); u = a }); q++; break; case "added": for (var y = l[r].value, x = a.m(v), v = c(d, g, y, h, x), C = v.xb, v = f.push({ $a: l[r].value, P: C, h: v.h, qb: x }), z = 0, B = C.length; z < B; z++) { var D = C[z]; i.push({ element: D, index: r, value: l[r].value }); u == s ? a.e.Ka(d, D) : a.e.Fa(d, D, u); u = D } h && h(y, C, x)
				} a.a.v(o, function (b) { a.F(b.element) }); g = t; if (!j) {
					if (e.afterAdd) for (r = 0; r < i.length; r++) e.afterAdd(i[r].element,
					i[r].index, i[r].value); if (e.beforeRemove) { for (r = 0; r < o.length; r++) e.beforeRemove(o[r].element, o[r].index, o[r].value); g = p }
				} if (!g && o.length) for (r = 0; r < o.length; r++) e = o[r].element, e.parentNode && e.parentNode.removeChild(e); a.a.f.set(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult", f)
			}
		})(); a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.Oa); a.q = function () { this.allowTemplateRewriting = t }; a.q.prototype = new a.t; a.q.prototype.renderTemplateSource = function (b) {
			var c = !(9 > a.a.ja) && b.nodes ? b.nodes() : s;
			if (c) return a.a.L(c.cloneNode(p).childNodes); b = b.text(); return a.a.pa(b)
		}; a.q.K = new a.q; a.ra(a.q.K); a.b("nativeTemplateEngine", a.q); (function () {
			a.ma = function () {
				var a = this.vb = function () { if ("undefined" == typeof jQuery || !jQuery.tmpl) return 0; try { if (0 <= jQuery.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2 } catch (a) { } return 1 }(); this.renderTemplateSource = function (b, f, g) {
					g = g || {}; 2 > a && m(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")); var e = b.data("precompiled");
					e || (e = b.text() || "", e = jQuery.template(s, "{{ko_with $item.koBindingContext}}" + e + "{{/ko_with}}"), b.data("precompiled", e)); b = [f.$data]; f = jQuery.extend({ koBindingContext: f }, g.templateOptions); f = jQuery.tmpl(e, b, f); f.appendTo(document.createElement("div")); jQuery.fragments = {}; return f
				}; this.createJavaScriptEvaluatorBlock = function (a) { return "{{ko_code ((function() { return " + a + " })()) }}" }; this.addTemplate = function (a, b) { document.write("<script type='text/html' id='" + a + "'>" + b + "<\/script>") }; 0 < a && (jQuery.tmpl.tag.ko_code =
				{ open: "__.push($1 || '');" }, jQuery.tmpl.tag.ko_with = { open: "with($1) {", close: "} " })
			}; a.ma.prototype = new a.t; var b = new a.ma; 0 < b.vb && a.ra(b); a.b("jqueryTmplTemplateEngine", a.ma)
		})()
	} "function" === typeof require && "object" === typeof exports && "object" === typeof module ? E(module.exports || exports) : "function" === typeof define && define.amd ? define(["exports"], E) : E(window.ko = {}); p;
})(window, document, navigator);﻿function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
/**
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){"use strict",a.support.transition=function(){var b=document.body||document.documentElement,c=b.style,d=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;return d&&{end:function(){var b="TransitionEnd";return a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"),b}()}}()})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype={constructor:c,close:function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),e.trigger("close"),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger("close").removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()}},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype={constructor:b,setState:function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},toggle:function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")}},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.carousel.defaults,c),this.options.slide&&this.slide(this.options.slide),this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.prototype={cycle:function(){return this.interval=setInterval(a.proxy(this.next,this),this.options.interval),this},to:function(b){var c=this.$element.find(".active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(){return clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this;this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h]();if(e.hasClass("active"))return;return!a.support.transition&&this.$element.hasClass("slide")?(this.$element.trigger("slide"),d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")):(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.trigger("slide"),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})),f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=typeof c=="object"&&c;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):typeof c=="string"||(c=f.slide)?e[c]():e.cycle()})},a.fn.carousel.defaults={interval:5e3,pause:"hover"},a.fn.carousel.Constructor=b,a(function(){a("body").on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=!e.data("modal")&&a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find(".in"),e;d&&d.length&&(e=d.data("collapse"),d.collapse("hide"),e||d.data("collapse",null)),this.$element[b](0),this.transition("addClass","show","shown"),this.$element[b](this.$element[0][c])},hide:function(){var a=this.dimension();this.reset(this.$element[a]()),this.transition("removeClass","hide","hidden"),this.$element[a](0)},reset:function(a){var b=this.dimension();return this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element[a?"addClass":"removeClass"]("collapse"),this},transition:function(b,c,d){var e=this,f=function(){c=="show"&&e.reset(),e.$element.trigger(d)};this.$element.trigger(c)[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();a(e).collapse(f)})})}(window.jQuery),!function(a){function d(){a(b).parent().removeClass("open")}"use strict";var b='[data-toggle="dropdown"]',c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),e=c.attr("data-target"),f,g;return e||(e=c.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,"")),f=a(e),f.length||(f=c.parent()),g=f.hasClass("open"),d(),!g&&f.toggleClass("open"),!1}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api",d),a("body").on("click.dropdown.data-api",b,c.prototype.toggle)})}(window.jQuery),!function(a){function c(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),d.call(b)},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),d.call(b)})}function d(a){this.$element.hide().trigger("hidden"),e.call(this)}function e(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(f,this)):f.call(this)):b&&b()}function f(){this.$backdrop.remove(),this.$backdrop=null}function g(){var b=this;this.isShown&&this.options.keyboard?a(document).on("keyup.dismiss.modal",function(a){a.which==27&&b.hide()}):this.isShown||a(document).off("keyup.dismiss.modal")}"use strict";var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this))};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this;if(this.isShown)return;a("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),g.call(this),e.call(this,function(){var c=a.support.transition&&b.$element.hasClass("fade");!b.$element.parent().length&&b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in"),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();if(!this.isShown)return;var e=this;this.isShown=!1,a("body").removeClass("modal-open"),g.call(this),this.$element.trigger("hide").removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?c.call(this):d.call(this)}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,d.data(),typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({},e.data(),c.data());b.preventDefault(),e.modal(f)})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.show?c.show():(c.hoverState="in",setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show))},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.hide?c.hide():(c.hoverState="out",setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide))},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle()),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a=(a||"").toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c),b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d),b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body").on("click.scroll.data-api",this.selector,d),this.refresh(),this.process()}"use strict",b.prototype={constructor:b,refresh:function(){this.targets=this.$body.find(this.selector).map(function(){var b=a(this).attr("href");return/^#\w/.test(b)&&a(b).length?b:null}),this.offsets=a.map(this.targets,function(b){return a(b).position().top})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.offsets,c=this.targets,d=this.activeTarget,e;for(e=b.length;e--;)d!=c[e]&&a>=b[e]&&(!b[e+1]||a<=b[e+1])&&this.activate(c[e])},activate:function(a){var b;this.activeTarget=a,this.$body.find(this.selector).parent(".active").removeClass("active"),b=this.$body.find(this.selector+'[href="'+a+'"]').parent("li").addClass("active"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],b.trigger({type:"show",relatedTarget:e}),f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(a),this.$element.change(),this.hide()},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c=this,d,e;return this.query=this.$element.val(),this.query?(d=a.grep(this.source,function(a){if(c.matcher(a))return a}),d=this.sorter(d),d.length?this.render(d.slice(0,this.options.items)).show():this.shown?this.hide():this):this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){return a.replace(new RegExp("("+this.query+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keypress,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},keyup:function(a){switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},keypress:function(a){if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()},blur:function(a){var b=this;setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery);﻿/* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* TOOLTIP PUBLIC CLASS DEFINITION
     * =============================== */

    var Tooltip = function (element, options) {
        this.init('tooltip', element, options)
    }

    Tooltip.prototype = {

        constructor: Tooltip

    , init: function (type, element, options) {
        var eventIn
          , eventOut

        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        this.enabled = true

        if (this.options.trigger != 'manual') {
            eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
            eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
            this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
            this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
        }

        this.options.selector ?
          (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
          this.fixTitle()
    }

    , getOptions: function (options) {
        options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay
            , hide: options.delay
            }
        }

        return options
    }

    , enter: function (e) {
        var self = $(e.currentTarget)[this.type](this._options).data(this.type)

        if (!self.options.delay || !self.options.delay.show) return self.show()

        clearTimeout(this.timeout)
        self.hoverState = 'in'
        this.timeout = setTimeout(function () {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    , leave: function (e) {
        var self = $(e.currentTarget)[this.type](this._options).data(this.type)

        if (this.timeout) clearTimeout(this.timeout)
        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.hoverState = 'out'
        this.timeout = setTimeout(function () {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    , show: function () {
        var $tip
          , inside
          , pos
          , actualWidth
          , actualHeight
          , placement
          , tp

        if (this.hasContent() && this.enabled) {
            $tip = this.tip()
            this.setContent()

            if (this.options.animation) {
                $tip.addClass('fade')
            }

            placement = typeof this.options.placement == 'function' ?
              this.options.placement.call(this, $tip[0], this.$element[0]) :
              this.options.placement

            inside = /in/.test(placement)

            $tip
              .remove()
              .css({ top: 0, left: 0, display: 'block' })
              .appendTo(inside ? this.$element : document.body)

            pos = this.getPosition(inside)

            actualWidth = $tip[0].offsetWidth
            actualHeight = $tip[0].offsetHeight

            switch (inside ? placement.split(' ')[1] : placement) {
                case 'bottom':
                    tp = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 }
                    break
                case 'top':
                    tp = { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 }
                    break
                case 'left':
                    tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth }
                    break
                case 'right':
                    tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }
                    break
            }

            $tip
              .css(tp)
              .addClass(placement)
              .addClass('in')
        }
    }

    , isHTML: function (text) {
        // html string detection logic adapted from jQuery
        return typeof text != 'string'
          || (text.charAt(0) === "<"
            && text.charAt(text.length - 1) === ">"
            && text.length >= 3
          ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
    }

    , setContent: function () {
        var $tip = this.tip()
          , title = this.getTitle()

        $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    , hide: function () {
        var that = this
          , $tip = this.tip()

        $tip.removeClass('in')

        function removeWithAnimation() {
            var timeout = setTimeout(function () {
                $tip.off($.support.transition.end).remove()
            }, 500)

            $tip.one($.support.transition.end, function () {
                clearTimeout(timeout)
                $tip.remove()
            })
        }

        $.support.transition && this.$tip.hasClass('fade') ?
          removeWithAnimation() :
          $tip.remove()
    }

    , fixTitle: function () {
        var $e = this.$element
        if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
        }
    }

    , hasContent: function () {
        return this.getTitle()
    }

    , getPosition: function (inside) {
        return $.extend({}, (inside ? { top: 0, left: 0 } : this.$element.offset()), {
            width: this.$element[0].offsetWidth
        , height: this.$element[0].offsetHeight
        })
    }

    , getTitle: function () {
        var title
          , $e = this.$element
          , o = this.options

        title = $e.attr('data-original-title')
          || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
    }

    , tip: function () {
        return this.$tip = this.$tip || $(this.options.template)
    }

    , validate: function () {
        if (!this.$element[0].parentNode) {
            this.hide()
            this.$element = null
            this.options = null
        }
    }

    , enable: function () {
        this.enabled = true
    }

    , disable: function () {
        this.enabled = false
    }

    , toggleEnabled: function () {
        this.enabled = !this.enabled
    }

    , toggle: function () {
        this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

    }


    /* TOOLTIP PLUGIN DEFINITION
     * ========================= */

    $.fn.tooltip = function (option) {
        return this.each(function () {
            var $this = $(this)
              , data = $this.data('tooltip')
              , options = typeof option == 'object' && option
            if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tooltip.Constructor = Tooltip

    $.fn.tooltip.defaults = {
        animation: true
    , placement: 'top'
    , selector: false
    , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    , trigger: 'hover'
    , title: ''
    , delay: 0
    }

}(window.jQuery);﻿/* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle="dropdown"]'
      , Dropdown = function (element) {
          var $el = $(element).on('click.dropdown.data-api', this.toggle)
          $('html').on('click.dropdown.data-api', function () {
              $el.parent().removeClass('open')
          })
      }

    Dropdown.prototype = {

        constructor: Dropdown

    , toggle: function (e) {
        var $this = $(this)
          , $parent
          , selector
          , isActive

        if ($this.is('.disabled, :disabled')) return

        selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = $(selector)
        $parent.length || ($parent = $this.parent())

        isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) $parent.toggleClass('open')

        return false
    }

    }

    function clearMenus() {
        $(toggle).parent().removeClass('open')
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
              , data = $this.data('dropdown')
            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(function () {
        $('html').on('click.dropdown.data-api', clearMenus)
        $('body')
          .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
          .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    })

}(window.jQuery);﻿// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function () {
    function r(a, c, d) {
        if (a === c) return 0 !== a || 1 / a == 1 / c; if (null == a || null == c) return a === c; a._chain && (a = a._wrapped); c._chain && (c = c._wrapped); if (a.isEqual && b.isFunction(a.isEqual)) return a.isEqual(c); if (c.isEqual && b.isFunction(c.isEqual)) return c.isEqual(a); var e = l.call(a); if (e != l.call(c)) return !1; switch (e) {
            case "[object String]": return a == "" + c; case "[object Number]": return a != +a ? c != +c : 0 == a ? 1 / a == 1 / c : a == +c; case "[object Date]": case "[object Boolean]": return +a == +c; case "[object RegExp]": return a.source ==
            c.source && a.global == c.global && a.multiline == c.multiline && a.ignoreCase == c.ignoreCase
        } if ("object" != typeof a || "object" != typeof c) return !1; for (var f = d.length; f--;) if (d[f] == a) return !0; d.push(a); var f = 0, g = !0; if ("[object Array]" == e) { if (f = a.length, g = f == c.length) for (; f-- && (g = f in a == f in c && r(a[f], c[f], d)) ;); } else {
            if ("constructor" in a != "constructor" in c || a.constructor != c.constructor) return !1; for (var h in a) if (b.has(a, h) && (f++, !(g = b.has(c, h) && r(a[h], c[h], d)))) break; if (g) {
                for (h in c) if (b.has(c, h) && !f--) break;
                g = !f
            }
        } d.pop(); return g
    } var s = this, I = s._, o = {}, k = Array.prototype, p = Object.prototype, i = k.slice, J = k.unshift, l = p.toString, K = p.hasOwnProperty, y = k.forEach, z = k.map, A = k.reduce, B = k.reduceRight, C = k.filter, D = k.every, E = k.some, q = k.indexOf, F = k.lastIndexOf, p = Array.isArray, L = Object.keys, t = Function.prototype.bind, b = function (a) { return new m(a) }; "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = b), exports._ = b) : s._ = b; b.VERSION = "1.3.3"; var j = b.each = b.forEach = function (a,
    c, d) { if (a != null) if (y && a.forEach === y) a.forEach(c, d); else if (a.length === +a.length) for (var e = 0, f = a.length; e < f; e++) { if (e in a && c.call(d, a[e], e, a) === o) break } else for (e in a) if (b.has(a, e) && c.call(d, a[e], e, a) === o) break }; b.map = b.collect = function (a, c, b) { var e = []; if (a == null) return e; if (z && a.map === z) return a.map(c, b); j(a, function (a, g, h) { e[e.length] = c.call(b, a, g, h) }); if (a.length === +a.length) e.length = a.length; return e }; b.reduce = b.foldl = b.inject = function (a, c, d, e) {
        var f = arguments.length > 2; a == null && (a = []); if (A &&
        a.reduce === A) { e && (c = b.bind(c, e)); return f ? a.reduce(c, d) : a.reduce(c) } j(a, function (a, b, i) { if (f) d = c.call(e, d, a, b, i); else { d = a; f = true } }); if (!f) throw new TypeError("Reduce of empty array with no initial value"); return d
    }; b.reduceRight = b.foldr = function (a, c, d, e) { var f = arguments.length > 2; a == null && (a = []); if (B && a.reduceRight === B) { e && (c = b.bind(c, e)); return f ? a.reduceRight(c, d) : a.reduceRight(c) } var g = b.toArray(a).reverse(); e && !f && (c = b.bind(c, e)); return f ? b.reduce(g, c, d, e) : b.reduce(g, c) }; b.find = b.detect = function (a,
    c, b) { var e; G(a, function (a, g, h) { if (c.call(b, a, g, h)) { e = a; return true } }); return e }; b.filter = b.select = function (a, c, b) { var e = []; if (a == null) return e; if (C && a.filter === C) return a.filter(c, b); j(a, function (a, g, h) { c.call(b, a, g, h) && (e[e.length] = a) }); return e }; b.reject = function (a, c, b) { var e = []; if (a == null) return e; j(a, function (a, g, h) { c.call(b, a, g, h) || (e[e.length] = a) }); return e }; b.every = b.all = function (a, c, b) {
        var e = true; if (a == null) return e; if (D && a.every === D) return a.every(c, b); j(a, function (a, g, h) {
            if (!(e = e && c.call(b,
            a, g, h))) return o
        }); return !!e
    }; var G = b.some = b.any = function (a, c, d) { c || (c = b.identity); var e = false; if (a == null) return e; if (E && a.some === E) return a.some(c, d); j(a, function (a, b, h) { if (e || (e = c.call(d, a, b, h))) return o }); return !!e }; b.include = b.contains = function (a, c) { var b = false; if (a == null) return b; if (q && a.indexOf === q) return a.indexOf(c) != -1; return b = G(a, function (a) { return a === c }) }; b.invoke = function (a, c) { var d = i.call(arguments, 2); return b.map(a, function (a) { return (b.isFunction(c) ? c || a : a[c]).apply(a, d) }) }; b.pluck =
    function (a, c) { return b.map(a, function (a) { return a[c] }) }; b.max = function (a, c, d) { if (!c && b.isArray(a) && a[0] === +a[0]) return Math.max.apply(Math, a); if (!c && b.isEmpty(a)) return -Infinity; var e = { computed: -Infinity }; j(a, function (a, b, h) { b = c ? c.call(d, a, b, h) : a; b >= e.computed && (e = { value: a, computed: b }) }); return e.value }; b.min = function (a, c, d) {
        if (!c && b.isArray(a) && a[0] === +a[0]) return Math.min.apply(Math, a); if (!c && b.isEmpty(a)) return Infinity; var e = { computed: Infinity }; j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a; b < e.computed &&
            (e = { value: a, computed: b })
        }); return e.value
    }; b.shuffle = function (a) { var b = [], d; j(a, function (a, f) { d = Math.floor(Math.random() * (f + 1)); b[f] = b[d]; b[d] = a }); return b }; b.sortBy = function (a, c, d) { var e = b.isFunction(c) ? c : function (a) { return a[c] }; return b.pluck(b.map(a, function (a, b, c) { return { value: a, criteria: e.call(d, a, b, c) } }).sort(function (a, b) { var c = a.criteria, d = b.criteria; return c === void 0 ? 1 : d === void 0 ? -1 : c < d ? -1 : c > d ? 1 : 0 }), "value") }; b.groupBy = function (a, c) {
        var d = {}, e = b.isFunction(c) ? c : function (a) { return a[c] };
        j(a, function (a, b) { var c = e(a, b); (d[c] || (d[c] = [])).push(a) }); return d
    }; b.sortedIndex = function (a, c, d) { d || (d = b.identity); for (var e = 0, f = a.length; e < f;) { var g = e + f >> 1; d(a[g]) < d(c) ? e = g + 1 : f = g } return e }; b.toArray = function (a) { return !a ? [] : b.isArray(a) || b.isArguments(a) ? i.call(a) : a.toArray && b.isFunction(a.toArray) ? a.toArray() : b.values(a) }; b.size = function (a) { return b.isArray(a) ? a.length : b.keys(a).length }; b.first = b.head = b.take = function (a, b, d) { return b != null && !d ? i.call(a, 0, b) : a[0] }; b.initial = function (a, b, d) {
        return i.call(a,
        0, a.length - (b == null || d ? 1 : b))
    }; b.last = function (a, b, d) { return b != null && !d ? i.call(a, Math.max(a.length - b, 0)) : a[a.length - 1] }; b.rest = b.tail = function (a, b, d) { return i.call(a, b == null || d ? 1 : b) }; b.compact = function (a) { return b.filter(a, function (a) { return !!a }) }; b.flatten = function (a, c) { return b.reduce(a, function (a, e) { if (b.isArray(e)) return a.concat(c ? e : b.flatten(e)); a[a.length] = e; return a }, []) }; b.without = function (a) { return b.difference(a, i.call(arguments, 1)) }; b.uniq = b.unique = function (a, c, d) {
        var d = d ? b.map(a, d) : a,
        e = []; a.length < 3 && (c = true); b.reduce(d, function (d, g, h) { if (c ? b.last(d) !== g || !d.length : !b.include(d, g)) { d.push(g); e.push(a[h]) } return d }, []); return e
    }; b.union = function () { return b.uniq(b.flatten(arguments, true)) }; b.intersection = b.intersect = function (a) { var c = i.call(arguments, 1); return b.filter(b.uniq(a), function (a) { return b.every(c, function (c) { return b.indexOf(c, a) >= 0 }) }) }; b.difference = function (a) { var c = b.flatten(i.call(arguments, 1), true); return b.filter(a, function (a) { return !b.include(c, a) }) }; b.zip = function () {
        for (var a =
        i.call(arguments), c = b.max(b.pluck(a, "length")), d = Array(c), e = 0; e < c; e++) d[e] = b.pluck(a, "" + e); return d
    }; b.indexOf = function (a, c, d) { if (a == null) return -1; var e; if (d) { d = b.sortedIndex(a, c); return a[d] === c ? d : -1 } if (q && a.indexOf === q) return a.indexOf(c); d = 0; for (e = a.length; d < e; d++) if (d in a && a[d] === c) return d; return -1 }; b.lastIndexOf = function (a, b) { if (a == null) return -1; if (F && a.lastIndexOf === F) return a.lastIndexOf(b); for (var d = a.length; d--;) if (d in a && a[d] === b) return d; return -1 }; b.range = function (a, b, d) {
        if (arguments.length <=
        1) { b = a || 0; a = 0 } for (var d = arguments[2] || 1, e = Math.max(Math.ceil((b - a) / d), 0), f = 0, g = Array(e) ; f < e;) { g[f++] = a; a = a + d } return g
    }; var H = function () { }; b.bind = function (a, c) { var d, e; if (a.bind === t && t) return t.apply(a, i.call(arguments, 1)); if (!b.isFunction(a)) throw new TypeError; e = i.call(arguments, 2); return d = function () { if (!(this instanceof d)) return a.apply(c, e.concat(i.call(arguments))); H.prototype = a.prototype; var b = new H, g = a.apply(b, e.concat(i.call(arguments))); return Object(g) === g ? g : b } }; b.bindAll = function (a) {
        var c =
        i.call(arguments, 1); c.length == 0 && (c = b.functions(a)); j(c, function (c) { a[c] = b.bind(a[c], a) }); return a
    }; b.memoize = function (a, c) { var d = {}; c || (c = b.identity); return function () { var e = c.apply(this, arguments); return b.has(d, e) ? d[e] : d[e] = a.apply(this, arguments) } }; b.delay = function (a, b) { var d = i.call(arguments, 2); return setTimeout(function () { return a.apply(null, d) }, b) }; b.defer = function (a) { return b.delay.apply(b, [a, 1].concat(i.call(arguments, 1))) }; b.throttle = function (a, c) {
        var d, e, f, g, h, i, j = b.debounce(function () {
            h =
            g = false
        }, c); return function () { d = this; e = arguments; f || (f = setTimeout(function () { f = null; h && a.apply(d, e); j() }, c)); g ? h = true : i = a.apply(d, e); j(); g = true; return i }
    }; b.debounce = function (a, b, d) { var e; return function () { var f = this, g = arguments; d && !e && a.apply(f, g); clearTimeout(e); e = setTimeout(function () { e = null; d || a.apply(f, g) }, b) } }; b.once = function (a) { var b = false, d; return function () { if (b) return d; b = true; return d = a.apply(this, arguments) } }; b.wrap = function (a, b) {
        return function () {
            var d = [a].concat(i.call(arguments, 0));
            return b.apply(this, d)
        }
    }; b.compose = function () { var a = arguments; return function () { for (var b = arguments, d = a.length - 1; d >= 0; d--) b = [a[d].apply(this, b)]; return b[0] } }; b.after = function (a, b) { return a <= 0 ? b() : function () { if (--a < 1) return b.apply(this, arguments) } }; b.keys = L || function (a) { if (a !== Object(a)) throw new TypeError("Invalid object"); var c = [], d; for (d in a) b.has(a, d) && (c[c.length] = d); return c }; b.values = function (a) { return b.map(a, b.identity) }; b.functions = b.methods = function (a) {
        var c = [], d; for (d in a) b.isFunction(a[d]) &&
        c.push(d); return c.sort()
    }; b.extend = function (a) { j(i.call(arguments, 1), function (b) { for (var d in b) a[d] = b[d] }); return a }; b.pick = function (a) { var c = {}; j(b.flatten(i.call(arguments, 1)), function (b) { b in a && (c[b] = a[b]) }); return c }; b.defaults = function (a) { j(i.call(arguments, 1), function (b) { for (var d in b) a[d] == null && (a[d] = b[d]) }); return a }; b.clone = function (a) { return !b.isObject(a) ? a : b.isArray(a) ? a.slice() : b.extend({}, a) }; b.tap = function (a, b) { b(a); return a }; b.isEqual = function (a, b) { return r(a, b, []) }; b.isEmpty =
    function (a) { if (a == null) return true; if (b.isArray(a) || b.isString(a)) return a.length === 0; for (var c in a) if (b.has(a, c)) return false; return true }; b.isElement = function (a) { return !!(a && a.nodeType == 1) }; b.isArray = p || function (a) { return l.call(a) == "[object Array]" }; b.isObject = function (a) { return a === Object(a) }; b.isArguments = function (a) { return l.call(a) == "[object Arguments]" }; b.isArguments(arguments) || (b.isArguments = function (a) { return !(!a || !b.has(a, "callee")) }); b.isFunction = function (a) { return l.call(a) == "[object Function]" };
    b.isString = function (a) { return l.call(a) == "[object String]" }; b.isNumber = function (a) { return l.call(a) == "[object Number]" }; b.isFinite = function (a) { return b.isNumber(a) && isFinite(a) }; b.isNaN = function (a) { return a !== a }; b.isBoolean = function (a) { return a === true || a === false || l.call(a) == "[object Boolean]" }; b.isDate = function (a) { return l.call(a) == "[object Date]" }; b.isRegExp = function (a) { return l.call(a) == "[object RegExp]" }; b.isNull = function (a) { return a === null }; b.isUndefined = function (a) { return a === void 0 }; b.has = function (a,
    b) { return K.call(a, b) }; b.noConflict = function () { s._ = I; return this }; b.identity = function (a) { return a }; b.times = function (a, b, d) { for (var e = 0; e < a; e++) b.call(d, e) }; b.escape = function (a) { return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") }; b.result = function (a, c) { if (a == null) return null; var d = a[c]; return b.isFunction(d) ? d.call(a) : d }; b.mixin = function (a) { j(b.functions(a), function (c) { M(c, b[c] = a[c]) }) }; var N = 0; b.uniqueId =
    function (a) { var b = N++; return a ? a + b : b }; b.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var u = /.^/, n = { "\\": "\\", "'": "'", r: "\r", n: "\n", t: "\t", u2028: "\u2028", u2029: "\u2029" }, v; for (v in n) n[n[v]] = v; var O = /\\|'|\r|\n|\t|\u2028|\u2029/g, P = /\\(\\|'|r|n|t|u2028|u2029)/g, w = function (a) { return a.replace(P, function (a, b) { return n[b] }) }; b.template = function (a, c, d) {
        d = b.defaults(d || {}, b.templateSettings); a = "__p+='" + a.replace(O, function (a) { return "\\" + n[a] }).replace(d.escape ||
        u, function (a, b) { return "'+\n_.escape(" + w(b) + ")+\n'" }).replace(d.interpolate || u, function (a, b) { return "'+\n(" + w(b) + ")+\n'" }).replace(d.evaluate || u, function (a, b) { return "';\n" + w(b) + "\n;__p+='" }) + "';\n"; d.variable || (a = "with(obj||{}){\n" + a + "}\n"); var a = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + a + "return __p;\n", e = new Function(d.variable || "obj", "_", a); if (c) return e(c, b); c = function (a) { return e.call(this, a, b) }; c.source = "function(" + (d.variable || "obj") + "){\n" + a + "}"; return c
    };
    b.chain = function (a) { return b(a).chain() }; var m = function (a) { this._wrapped = a }; b.prototype = m.prototype; var x = function (a, c) { return c ? b(a).chain() : a }, M = function (a, c) { m.prototype[a] = function () { var a = i.call(arguments); J.call(a, this._wrapped); return x(c.apply(b, a), this._chain) } }; b.mixin(b); j("pop,push,reverse,shift,sort,splice,unshift".split(","), function (a) {
        var b = k[a]; m.prototype[a] = function () {
            var d = this._wrapped; b.apply(d, arguments); var e = d.length; (a == "shift" || a == "splice") && e === 0 && delete d[0]; return x(d,
            this._chain)
        }
    }); j(["concat", "join", "slice"], function (a) { var b = k[a]; m.prototype[a] = function () { return x(b.apply(this._wrapped, arguments), this._chain) } }); m.prototype.chain = function () { this._chain = true; return this }; m.prototype.value = function () { return this._wrapped }
}).call(this);


!function (a) { "use strict"; var b = String.prototype.trim, c = String.prototype.trimRight, d = String.prototype.trimLeft, e = function (a) { return a * 1 || 0 }, f = function (a, b) { if (b < 1) return ""; var c = ""; while (b > 0) b & 1 && (c += a), b >>= 1, a += a; return c }, g = [].slice, h = function (a, b, c) { return ("" + a).replace(b, c) }, i = function (a) { return a != null ? "[" + o.escapeRegExp(a) + "]" : "\\s" }, j = function (a, b) { a += "", b += ""; var c = [], d, e; for (var f = 0; f <= b.length; f++) for (var g = 0; g <= a.length; g++) f && g ? a.charAt(g - 1) === b.charAt(f - 1) ? e = d : e = Math.min(c[g], c[g - 1], d) + 1 : e = f + g, d = c[g], c[g] = e; return c.pop() }, k = { lt: "<", gt: ">", quot: '"', apos: "'", amp: "&" }, l = {}; for (var m in k) l[k[m]] = m; var n = function () { function a(a) { return Object.prototype.toString.call(a).slice(8, -1).toLowerCase() } var b = f, c = function () { return c.cache.hasOwnProperty(arguments[0]) || (c.cache[arguments[0]] = c.parse(arguments[0])), c.format.call(null, c.cache[arguments[0]], arguments) }; return c.format = function (c, d) { var e = 1, f = c.length, g = "", h, i = [], j, k, l, m, o, p; for (j = 0; j < f; j++) { g = a(c[j]); if (g === "string") i.push(c[j]); else if (g === "array") { l = c[j]; if (l[2]) { h = d[e]; for (k = 0; k < l[2].length; k++) { if (!h.hasOwnProperty(l[2][k])) throw new Error(n('[_.sprintf] property "%s" does not exist', l[2][k])); h = h[l[2][k]] } } else l[1] ? h = d[l[1]] : h = d[e++]; if (/[^s]/.test(l[8]) && a(h) != "number") throw new Error(n("[_.sprintf] expecting number but found %s", a(h))); switch (l[8]) { case "b": h = h.toString(2); break; case "c": h = String.fromCharCode(h); break; case "d": h = parseInt(h, 10); break; case "e": h = l[7] ? h.toExponential(l[7]) : h.toExponential(); break; case "f": h = l[7] ? parseFloat(h).toFixed(l[7]) : parseFloat(h); break; case "o": h = h.toString(8); break; case "s": h = (h = String(h)) && l[7] ? h.substring(0, l[7]) : h; break; case "u": h = Math.abs(h); break; case "x": h = h.toString(16); break; case "X": h = h.toString(16).toUpperCase() } h = /[def]/.test(l[8]) && l[3] && h >= 0 ? "+" + h : h, o = l[4] ? l[4] == "0" ? "0" : l[4].charAt(1) : " ", p = l[6] - String(h).length, m = l[6] ? b(o, p) : "", i.push(l[5] ? h + m : m + h) } } return i.join("") }, c.cache = {}, c.parse = function (a) { var b = a, c = [], d = [], e = 0; while (b) { if ((c = /^[^\x25]+/.exec(b)) !== null) d.push(c[0]); else if ((c = /^\x25{2}/.exec(b)) !== null) d.push("%"); else { if ((c = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b)) === null) throw new Error("[_.sprintf] huh?"); if (c[2]) { e |= 1; var f = [], g = c[2], h = []; if ((h = /^([a-z_][a-z_\d]*)/i.exec(g)) === null) throw new Error("[_.sprintf] huh?"); f.push(h[1]); while ((g = g.substring(h[0].length)) !== "") if ((h = /^\.([a-z_][a-z_\d]*)/i.exec(g)) !== null) f.push(h[1]); else { if ((h = /^\[(\d+)\]/.exec(g)) === null) throw new Error("[_.sprintf] huh?"); f.push(h[1]) } c[2] = f } else e |= 2; if (e === 3) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported"); d.push(c) } b = b.substring(c[0].length) } return d }, c }(), o = { VERSION: "2.2.0rc", isBlank: function (a) { return /^\s*$/.test(a) }, stripTags: function (a) { return h(a, /<\/?[^>]+>/g, "") }, capitalize: function (a) { return a += "", a.charAt(0).toUpperCase() + a.slice(1) }, chop: function (a, b) { return a += "", b = ~~b, b > 0 ? a.match(new RegExp(".{1," + b + "}", "g")) : [a] }, clean: function (a) { return o.strip(a).replace(/\s+/g, " ") }, count: function (a, b) { return a += "", b += "", a.split(b).length - 1 }, chars: function (a) { return ("" + a).split("") }, swapCase: function (a) { return h(a, /\S/g, function (a) { return a === a.toUpperCase() ? a.toLowerCase() : a.toUpperCase() }) }, escapeHTML: function (a) { return h(a, /[&<>"']/g, function (a) { return "&" + l[a] + ";" }) }, unescapeHTML: function (a) { return h(a, /\&([^;]+);/g, function (a, b) { var c; return b in k ? k[b] : (c = b.match(/^#x([\da-fA-F]+)$/)) ? String.fromCharCode(parseInt(c[1], 16)) : (c = b.match(/^#(\d+)$/)) ? String.fromCharCode(~~c[1]) : a }) }, escapeRegExp: function (a) { return h(a, /([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") }, insert: function (a, b, c) { var d = o.chars(a); return d.splice(~~b, 0, "" + c), d.join("") }, include: function (a, b) { return !!~("" + a).indexOf(b) }, join: function () { var a = g.call(arguments); return a.join(a.shift()) }, lines: function (a) { return ("" + a).split("\n") }, reverse: function (a) { return o.chars(a).reverse().join("") }, splice: function (a, b, c, d) { var e = o.chars(a); return e.splice(~~b, ~~c, d), e.join("") }, startsWith: function (a, b) { return a += "", b += "", a.length >= b.length && a.slice(0, b.length) === b }, endsWith: function (a, b) { return a += "", b += "", a.length >= b.length && a.slice(a.length - b.length) === b }, succ: function (a) { a += ""; var b = o.chars(a); return b.splice(a.length - 1, 1, String.fromCharCode(a.charCodeAt(a.length - 1) + 1)), b.join("") }, titleize: function (a) { return h(a, /(?:^|\s)\S/g, function (a) { return a.toUpperCase() }) }, camelize: function (a) { return o.trim(a).replace(/[-_\s]+(.)?/g, function (a, b) { return b.toUpperCase() }) }, underscored: function (a) { return o.trim(a).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase() }, dasherize: function (a) { return o.trim(a).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase() }, classify: function (a) { return o.titleize(h(a, /_/g, " ")).replace(/\s/g, "") }, humanize: function (a) { return o.capitalize(o.underscored(a).replace(/_id$/, "").replace(/_/g, " ")) }, trim: function (a, c) { return a += "", !c && b ? b.call(a) : (c = i(c), a.replace(new RegExp("^" + c + "+|" + c + "+$", "g"), "")) }, ltrim: function (a, b) { return a += "", !b && d ? d.call(a) : (b = i(b), a.replace(new RegExp("^" + b + "+"), "")) }, rtrim: function (a, b) { return a += "", !b && c ? c.call(a) : (b = i(b), a.replace(new RegExp(b + "+$"), "")) }, truncate: function (a, b, c) { return a += "", c = c || "...", b = ~~b, a.length > b ? a.slice(0, b) + c : a }, prune: function (a, b, c) { a += "", b = ~~b, c = c != null ? "" + c : "..."; var d, e, f = a.replace(/\W/g, function (a) { return a.toUpperCase() !== a.toLowerCase() ? "A" : " " }); return e = f.charAt(b), d = f.slice(0, b), e && e.match(/\S/) && (d = d.replace(/\s\S+$/, "")), d = o.rtrim(d), (d + c).length > a.length ? a : a.slice(0, d.length) + c }, words: function (a, b) { return o.trim(a, b).split(b || /\s+/) }, pad: function (a, b, c, d) { a += ""; var e = 0; b = ~~b, c ? c.length > 1 && (c = c.charAt(0)) : c = " "; switch (d) { case "right": return e = b - a.length, a + f(c, e); case "both": return e = b - a.length, f(c, Math.ceil(e / 2)) + a + f(c, Math.floor(e / 2)); default: return e = b - a.length, f(c, e) + a } }, lpad: function (a, b, c) { return o.pad(a, b, c) }, rpad: function (a, b, c) { return o.pad(a, b, c, "right") }, lrpad: function (a, b, c) { return o.pad(a, b, c, "both") }, sprintf: n, vsprintf: function (a, b) { return b.unshift(a), n.apply(null, b) }, toNumber: function (a, b) { a += ""; var c = e(e(a).toFixed(~~b)); return c === 0 && !a.match(/^0+$/) ? Number.NaN : c }, strRight: function (a, b) { a += "", b = b != null ? "" + b : b; var c = b ? a.indexOf(b) : -1; return ~c ? a.slice(c + b.length, a.length) : a }, strRightBack: function (a, b) { a += "", b = b != null ? "" + b : b; var c = b ? a.lastIndexOf(b) : -1; return ~c ? a.slice(c + b.length, a.length) : a }, strLeft: function (a, b) { a += "", b = b != null ? "" + b : b; var c = b ? a.indexOf(b) : -1; return ~c ? a.slice(0, c) : a }, strLeftBack: function (a, b) { a += "", b = b != null ? "" + b : b; var c = a.lastIndexOf(b); return ~c ? a.slice(0, c) : a }, toSentence: function (a, b, c) { b || (b = ", "), c || (c = " and "); var d = a.length, e = ""; for (var f = 0; f < d; f++) e += a[f], f === d - 2 ? e += c : f < d - 1 && (e += b); return e }, slugify: function (a) { var b = "ąàáäâãćęèéëêìíïîłńòóöôõùúüûñçżź", c = "aaaaaaceeeeeiiiilnooooouuuunczz", d = new RegExp(i(b), "g"); return a = ("" + a).toLowerCase(), a = a.replace(d, function (a) { var d = b.indexOf(a); return c.charAt(d) || "-" }), o.dasherize(a.replace(/[^\w\s-]/g, "")) }, surround: function (a, b) { return [b, a, b].join("") }, quote: function (a) { return o.surround(a, '"') }, exports: function () { var a = {}; for (var b in this) { if (!this.hasOwnProperty(b) || b.match(/^(?:include|contains|reverse)$/)) continue; a[b] = this[b] } return a }, repeat: function (a, b, c) { b = ~~b; if (c == null) return f(a + "", b); for (var d = []; b > 0; d[--b] = a); return d.join(c) }, levenshtein: j }; o.strip = o.trim, o.lstrip = o.ltrim, o.rstrip = o.rtrim, o.center = o.lrpad, o.rjust = o.lpad, o.ljust = o.rpad, o.contains = o.include, o.q = o.quote, typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (module.exports = o), exports._s = o) : typeof define == "function" && define.amd ? define("underscore.string", [], function () { return o }) : (a._ = a._ || {}, a._.string = a._.str = o) }(this);﻿/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, e, b) { var c = "hashchange", h = document, f, g = $.event.special, i = h.documentMode, d = "on" + c in e && (i === b || i > 7); function a(j) { j = j || location.href; return "#" + j.replace(/^[^#]*#?(.*)$/, "$1") } $.fn[c] = function (j) { return j ? this.bind(c, j) : this.trigger(c) }; $.fn[c].delay = 50; g[c] = $.extend(g[c], { setup: function () { if (d) { return false } $(f.start) }, teardown: function () { if (d) { return false } $(f.stop) } }); f = (function () { var j = {}, p, m = a(), k = function (q) { return q }, l = k, o = k; j.start = function () { p || n() }; j.stop = function () { p && clearTimeout(p); p = b }; function n() { var r = a(), q = o(m); if (r !== m) { l(m = r, q); $(e).trigger(c) } else { if (q !== m) { location.href = location.href.replace(/#.*/, "") + q } } p = setTimeout(n, $.fn[c].delay) } $.browser.msie && !d && (function () { var q, r; j.start = function () { if (!q) { r = $.fn[c].src; r = r && r + a(); q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () { r || l(a()); n() }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow; h.onpropertychange = function () { try { if (event.propertyName === "title") { q.document.title = h.title } } catch (s) { } } } }; j.stop = k; o = function () { return a(q.location.href) }; l = function (v, s) { var u = q.document, t = $.fn[c].domain; if (v !== s) { u.title = h.title; u.open(); t && u.write('<script>document.domain="' + t + '"<\/script>'); u.close(); q.location.hash = v } } })(); return j })() })(jQuery, this);﻿// Copyright 2012 Omar AL Zabir
// This is part of Droptiles open source project.

var User = function (param) {
    this.firstName = param.firstName;
    this.lastName = param.lastName;
    this.photo = param.photo;

    this.isAnonymous = param.isAnonymous;
}
