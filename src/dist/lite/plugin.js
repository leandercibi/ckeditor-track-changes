/* Source version: 1.2.05 */
(function(){var q={Events:{INIT:"lite:init",ACCEPT:"lite:accept",REJECT:"lite:reject",SHOW_HIDE:"lite:showHide",TRACKING:"lite:tracking",CHANGE:"lite:change",HOVER_IN:"lite:hover-in",HOVER_OUT:"lite:hover-out"},Commands:{TOGGLE_TRACKING:"lite.ToggleTracking",TOGGLE_SHOW:"lite.ToggleShow",ACCEPT_ALL:"lite.AcceptAll",REJECT_ALL:"lite.RejectAll",ACCEPT_ONE:"lite.AcceptOne",REJECT_ONE:"lite.RejectOne",TOGGLE_TOOLTIPS:"lite.ToggleTooltips"}},l={show:true,path:"js/opentip-adapter.js",classPath:"OpentipAdapter",cssPath:"css/opentip.css",delay:500},o="%a by %u %t",e=/^[\s\r\n]*$/,s=[{regex:/[\s]*title=\"[^\"]+\"/g,replace:""},{regex:/[\s]*data-selected=\"[^\"]+\"/g,replace:""}],h=[],r=[CKEDITOR.CTRL+88,CKEDITOR.CTRL+120,CKEDITOR.SHIFT+46];function j(u){return r.indexOf(u)>=0}function g(u){if(u&&u.$&&(typeof u.getDocument==="function")){return u.$}return u}function i(v){for(var u=h.length;u--;){var w=h[u];if(w.editor==v){return u}}return -1}function c(u){var v=i(u);return v>=0?h[v]:null}function k(u){var v=c(u);return v&&v.plugin}function n(u,v){h.push({plugin:v,editor:u})}function p(w,x,u,z){if(null===w||(typeof(w)=="undefined")){w=""}else{w=String(w)}u=String(u);var y=u.length;for(var v=w.length;v<x;v+=y){if(z){w+=padWidth}else{w=u+w}}return w}function t(u,v){return p(u,v,"0")}function m(w,y){var x=w.document,u=x.getBody(),v=false,z=function(){v=true};u.on(y,z);(CKEDITOR.env.version>7?x.$:x.$.selection.createRange())["execCommand"](y);u.removeListener(y,z);return v}function a(w){var u=new Date();var A=u.getDate();var y=u.getMonth();var z=u.getFullYear();var C=typeof(w);if(C=="string"||C=="number"){w=new Date(w)}var v=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];if(A==w.getDate()&&y==w.getMonth()&&z==w.getFullYear()){var x=Math.floor((u.getTime()-w.getTime())/60000);if(x<1){return"now"}else{if(x<2){return"1 minute ago"}else{if(x<60){return(x+" minutes ago")}else{var B=w.getHours();var x=w.getMinutes();return"on "+t(B,2)+":"+t(x,2,"0")}}}}else{if(z==w.getFullYear()){return"on "+v[w.getMonth()]+" "+w.getDate()}else{return"on "+v[w.getMonth()]+" "+w.getDate()+", "+w.getFullYear()}}}CKEDITOR.plugins.add("lite",{icons:"lite_AcceptAll,lite_AcceptOne,lite_RejectAll,lite_RejectOne,lite_ToggleShow,lite_ToggleTracking",props:{deleteTag:"del",insertTag:"ins",deleteClass:"ice-del",insertClass:"ice-ins",attributes:{changeId:"data-cid",userId:"data-userid",userName:"data-username",sessionId:"data-session-id",changeData:"data-changedata",time:"data-time",lastTime:"data-last-change-time"},stylePrefix:"ice-cts",preserveOnPaste:"p",css:"css/lite.css"},_scriptsLoaded:null,init:function(B){var y=c(B);if(y){return}if(!this._inited){d();this._inited=true}var G=this.path,A=new LITEPlugin(this.props,G),u=CKEDITOR.tools.extend({},B.config.lite||{}),D=u.tooltips;if(undefined==D){D=true}if(D===true){D=l}u.tooltips=D;n(B,A);A.init(B,u);B.on("destroy",(function(H){var I=i(H);if(I>=0){h.splice(I,1)}}).bind(this));if(this._scriptsLoaded){A._onScriptsLoaded();return}else{if(this._scriptsLoaded===false){return}}this._scriptsLoaded=false;var v=(typeof(jQuery)=="function"),F=this,w=u.jQueryPath||"js/jquery.min.js",x=(u.includeType?u["includes_"+u.includeType]:u.includes)||["lite-includes.js"];x=x.slice();for(var z=0,C=x.length;z<C;++z){x[z]=G+x[z]}if(!v){x.splice(0,0,this.path+w)}if(D.path){x.push(this.path+D.path)}var E=function(){if(x.length<1){F._scriptsLoaded=true;if(!v){jQuery.noConflict()}jQuery.each(h,(function(I,J){J.plugin._onScriptsLoaded()}))}else{var H=x.shift();CKEDITOR.scriptLoader.load(H,function(){E()},F)}};E(x)},findPlugin:function(u){return k(u)},startNewSession:function(u){var v=k(u);if(v){v.startNewSession()}else{b("startNewSession: plugin not found")}}});LITEPlugin=function(v,w){this.props={};this.path=w;for(var u in v){if(v.hasOwnProperty(u)){this.props[u]=v[u]}}};LITEPlugin.prototype={init:function(B,x){this._editor=B;this._domLoaded=false;this._editor=null;this._tracker=null;this._isVisible=true;this._liteCommandNames=[];this._canAcceptReject=true;this._removeBindings=[];B.ui.addToolbarGroup("lite");this._setPluginFeatures(B,this.props);this._changeTimeout=null;this._notifyChange=this._notifyChange.bind(this);this._notifyTextChange=this._notifyTextChange.bind(this);this._config=x;var u=x.acceptRejectInReadOnly===true;var v=[{command:q.Commands.TOGGLE_TRACKING,exec:this._onToggleTracking,title:"Toggle Tracking Changes",trackingOnly:false},{command:q.Commands.TOGGLE_SHOW,exec:this._onToggleShow,title:"Toggle Tracking Changes",readOnly:true},{command:q.Commands.ACCEPT_ALL,exec:this._onAcceptAll,title:"Accept all changes",readOnly:u},{command:q.Commands.REJECT_ALL,exec:this._onRejectAll,title:"Reject all changes",readOnly:u},{command:q.Commands.ACCEPT_ONE,exec:this._onAcceptOne,title:"Accept Change",readOnly:u},{command:q.Commands.REJECT_ONE,exec:this._onRejectOne,title:"Reject Change",readOnly:u},{command:q.Commands.TOGGLE_TOOLTIPS,exec:this._onToggleTooltips,readOnly:true}];this._isTracking=x.isTracking!==false;this._eventsBounds=false;B.on("contentDom",(function(F){this._onDomLoaded(F)}).bind(this));B.on("dataReady",(function(F){this._onAfterSetData(F)}).bind(this));var E=this.path;var w=x.commands||[q.Commands.TOGGLE_TRACKING,q.Commands.TOGGLE_SHOW,q.Commands.ACCEPT_ALL,q.Commands.REJECT_ALL,q.Commands.ACCEPT_ONE,q.Commands.REJECT_ONE];var D=this;function A(G){B.addCommand(G.command,{exec:G.exec.bind(D),readOnly:G.readOnly||false});if(G.title&&w.indexOf(G.command)>=0){var F=D._commandNameToUIName(G.command);B.ui.addButton(F,{label:G.title,command:G.command,toolbar:"lite"});if(G.trackingOnly!==false){D._liteCommandNames.push(G.command)}}}for(var z=0,C=v.length;z<C;++z){A(v[z])}if(B.addMenuItems){B.addMenuGroup("lite",50);var y={};y[q.Commands.ACCEPT_ONE]={label:"Accept Change",command:q.Commands.ACCEPT_ONE,group:"lite",order:1,icon:E+"icons/accept_one.png"};y[q.Commands.REJECT_ONE]={label:"Reject Change",command:q.Commands.REJECT_ONE,group:"lite",order:2,icon:E+"icons/reject_one.png"};B.addMenuItems(y)}if(B.contextMenu){B.contextMenu.addListener((function(G,H){if(G&&this._tracker&&this._tracker.currentChangeNode(G)){var F={};F[q.Commands.ACCEPT_ONE]=CKEDITOR.TRISTATE_OFF;F[q.Commands.REJECT_ONE]=CKEDITOR.TRISTATE_OFF;return F}else{return null}}).bind(this))}},toggleTracking:function(u,v){if("boolean"===typeof v){v={notify:v}}v=v||{};var A=(undefined===u)?!this._isTracking:u,z=this._editor,y=v&&v.force;if(!A&&this._isTracking){var w=this._tracker.countChanges({verify:true});if(w){return window.alert("Your document containssome pending changes.\nPlease resolve them before turning off change tracking.")}}this._isTracking=A;this._setCommandsState(this._liteCommandNames,A?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);this._updateTrackingState();this.toggleShow(A,false);this._setCommandsState(q.Commands.TOGGLE_TRACKING,A?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);var x=z.ui.get(this._commandNameToUIName(q.Commands.TOGGLE_TRACKING));if(x){this._setButtonTitle(x,A?"Stop tracking changes":"Start tracking changes")}if(v.notify!==false){z.fire(q.Events.TRACKING,{tracking:A,lite:this})}},toggleShow:function(u,v){var x=(typeof(u)=="undefined")?(!this._isVisible):u;this._isVisible=x;if(this._isTracking){this._setCommandsState(q.Commands.TOGGLE_SHOW,x?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)}this._tracker.setShowChanges(x&&this._isTracking);var w=this._editor.ui.get(this._commandNameToUIName(q.Commands.TOGGLE_SHOW));if(w){this._setButtonTitle(w,x?"Hide tracked changes":"Show tracked changes")}if(v!==false){this._editor.fire(q.Events.SHOW_HIDE,{show:x,lite:this})}},isVisible:function(){return this._isVisible},isTracking:function(){return this._isTracking},acceptAll:function(u){this._tracker.acceptAll(u);this._cleanup();this._editor.fire(q.Events.ACCEPT,{lite:this,options:u})},rejectAll:function(u){this._tracker.rejectAll(u);this._cleanup();this._editor.fire(q.Events.REJECT,{lite:this,options:u})},setUserInfo:function(u){u=u||{};this._config.userId=String(u.id);this._config.userName=u.name||"";if(this._tracker){this._tracker.setCurrentUser({id:this._config.userId,name:this._config.userName})}},countChanges:function(u){return((this._tracker&&this._tracker.countChanges(u))||0)},enableAcceptReject:function(u){this._canAcceptReject=!!u;this._onIceChange()},filterIceElement:function(u){if(!u){return true}try{if(u.hasClass(this.props.insertClass)||u.hasClass(this.props.deleteClass)){return false}}catch(u){}return true},startNewSession:function(){var u=new Date();this._sessionId=String.fromCharCode(65+Math.round(Math.random()*26))+u.getDate()+u.getDay()+u.getHours()+u.getMinutes()+u.getMilliseconds();if(this._tracker){this._tracker.setSessionId(this._sessionId)}},getCleanMarkup:function(v){if(null===v||undefined===v){v=(this._editor&&this._editor.getData())||""}for(var u=s.length-1;u>=0;--u){v=v.replace(s[u].regex,s[u].replace)}return v},getCleanText:function(){var u=this._getBody();if(!u){return""}var w=new Array();w.push("");var v=this._tracker.getDeleteClass();this._getCleanText(u,w,v);var x=w.join("\n");x=x.replace(/&nbsp(;)?/ig," ");return x},acceptChange:function(u){u=g(u);if(u&&this._tracker){this._tracker.acceptChange(u);this._cleanup();this._editor.fire(q.Events.ACCEPT,{lite:this});this._onSelectionChanged(null)}},rejectChange:function(u){u=g(u);if(u&&this._tracker){this._tracker.rejectChange(u);this._cleanup();this._editor.fire(q.Events.REJECT,{lite:this});this._onSelectionChanged(null)}},_getCleanText:function(z,y,x){var w=z.getAttribute("class");if(w&&w.indexOf(x)>=0){return}var u;if(u=((z.nodeName&&z.nodeName.toUpperCase()=="BR")||("block"==jQuery(z).css("display")))){if(e.test(y[y.length-1])){y[y.length-1]=""}else{y.push("")}}for(var A=z.firstChild;A;A=A.nextSibling){var v=A.nodeType;if(3==v){y[y.length-1]+=String(A.nodeValue)}else{if(1==v||9==v||11==v){this._getCleanText(A,y,x)}}}if(u){y.push("")}},_onDomLoaded:function(v){this._domLoaded=true;this._editor=v.editor;var u=this._editor.editable();u.attachListener(u,"keypress",this._onKeyPress,this,null,1);this._hideTooltip();this._onReady()},_onScriptsLoaded:function(v,u){this._scriptsLoaded=true;this._onReady()},_loadCSS:function(x,v){var u=x.getElementsByTagName("head")[0];function w(z,A){var y=jQuery(u).find("#"+A);if(!y.length){y=x.createElement("link");y.setAttribute("rel","stylesheet");y.setAttribute("type","text/css");y.setAttribute("id",A);y.setAttribute("href",z);u.appendChild(y)}}w(this.path+v,"__lite__css__");if(this._config.tooltips.cssPath){w(this.path+this._config.tooltips.cssPath,"__lite_tt_css__")}},_onReady:function(){if(!this._scriptsLoaded||!this._domLoaded){return}setTimeout(this._afterReady.bind(this),5)},_getBody:function(){try{return this._editor.editable().$}catch(u){return null}},_afterReady:function(){var B=this._editor,A=B.document.$,u=this._getBody(),x=this._config,v=(x&&x.debug)||{};this._loadCSS(A,(x&&x.cssPath)||"css/lite.css");if(!this._eventsBounds){this._eventsBounds=true;var z=this._onPaste.bind(this);B.on("afterCommandExec",this._onAfterCommand.bind(this));B.on("beforeCommandExec",this._onBeforeCommand.bind(this));if(this._config.handlePaste){B.on("paste",z,null,null,1)}B.on("beforeGetData",this._onBeforeGetData.bind(this));B.on("beoreUndoImage",this._onBeforeGetData.bind(this));B.on("insertHtml",z,null,null,1);B.on("insertText",z,null,null,1);B.on("insertElement",z,null,null,1);B.on("mode",this._onModeChange.bind(this),null,null,1);B.on("readOnly",this._onReadOnly.bind(this))}if(this._tracker){if(u!=this._tracker.getContentElement()){this._tracker.stopTracking(true);jQuery(this._tracker).unbind();this._tracker=null}}if(this._tracker){return}var w={element:u,mergeBlocks:false,currentUser:{id:x.userId||"",name:x.userName||""},userStyles:x.userStyles,changeTypes:{insertType:{tag:this.props.insertTag,alias:this.props.insertClass,action:"Inserted"},deleteType:{tag:this.props.deleteTag,alias:this.props.deleteClass,action:"Deleted"}},hostMethods:{getHostRange:this._getHostRange.bind(this),getHostRangeData:this._getHostRangeData.bind(this),makeHostElement:function(C){return new CKEDITOR.dom.element(C)},getHostNode:function(C){return C&&C.$},setHostRange:this._setHostRange.bind(this),hostCopy:this._hostCopy.bind(this),beforeEdit:this._beforeEdit.bind(this)}};if(v.log){w.hostMethods.logError=b}w.tooltips=x.tooltips.show;if(w.tooltips){var y=this._hideTooltip.bind(this);w.hostMethods.showTooltip=this._showTooltip.bind(this);w.hostMethods.hideTooltip=y;w.hostMethods.beforeDelete=w.hostMethods.beforeInsert=y;if(x.tooltips.classPath){try{this._tooltipsHandler=new window[x.tooltips.classPath]();w.tooltipsDelay=x.tooltips.delay}catch(B){}if(!this._tooltipsHandler){b("Unable to create tooltip handler",x.tooltips.classPath)}else{this._tooltipsHandler.init(x.tooltips)}}}jQuery.extend(w,this.props);this._tracker=new ice.InlineChangeEditor(w);try{this._tracker.startTracking();this.toggleTracking(this._isTracking,false);this._updateTrackingState();jQuery(this._tracker).on("change",this._onIceChange.bind(this)).on("textChange",this._onIceTextChanged.bind(this));B.fire(q.Events.INIT,{lite:this});this._onSelectionChanged(null);this._onIceChange(null)}catch(B){b("ICE plugin init:",B)}},_onToggleShow:function(u){this.toggleShow()},_onToggleTracking:function(u){this.toggleTracking()},_onRejectAll:function(u){this.rejectAll()},_onAcceptAll:function(u){this.acceptAll()},_onAcceptOne:function(v){var u=this._tracker.currentChangeNode();return this.acceptChange(u)},_onRejectOne:function(v){var u=this._tracker.currentChangeNode();return this.rejectChange(u)},_onToggleTooltips:function(u){this._tracker&&this._tracker.toggleTooltips()},_cleanup:function(){var u=this._getBody();empty=jQuery(u).find(self.insertSelector+":empty,"+self.deleteSelector+":empty");empty.remove();this._onSelectionChanged(null)},_setButtonTitle:function(u,w){var v=jQuery("#"+u._.id);v.attr("title",w)},_onAfterCommand:function(v){var u=this._tracker&&this._isTracking&&v.data&&v.data.name;if("undo"==u||"redo"==u){this._tracker.reload()}},_onBeforeCommand:function(v){var u=this._tracker&&this._tracker.isTracking()&&v.data&&v.data.name;if("cut"==u){if(f(this._editor,"copy")){this._tracker.prepareToCut()}}else{if("copy"==u){if(f(this._editor,"copy")){this._tracker.prepareToCopy()}}}},_onModeChange:function(u){this._updateTrackingState();setTimeout(this._onIceChange.bind(this),0)},_onKeyPress:function(u){var v=u&&u.data&&u.data.getKeystroke();if(j(v)){u.stop()}},_onKeyDown:function(u){if(!this._tracker||!this._tracker.isTracking()){return}var v=u.data.keyCode;if(j(v)){if(this._tracker.tryToCut()){u.stop()}}},_onBeforeGetData:function(u){this._hideTooltip()},_onAfterSetData:function(u){this._hideTooltip();if(this._tracker){this._tracker.reload()}},_onReadOnly:function(u){this._updateTrackingState()},_updateTrackingState:function(){if(this._tracker){var u=this._isTracking&&this._editor.mode=="wysiwyg"&&!this._editor.readOnly;this._tracker.toggleChangeTracking(u);for(var w=this._removeBindings.length-1;w>=0;--w){this._removeBindings[w].removeListener()}this._removeBindings=[];if(u){var x=this._onSelectionChanged.bind(this),v=this._editor.editable();this._removeBindings.push(v.on("keyup",x));this._removeBindings.push(v.on("click",x));this._removeBindings.push(this._editor.on("selectionChange",x))}}},_onPaste:function(C){if(!this._tracker||!this._isTracking||!C){return true}var w=C.data||{},z=false,x=null,v=(C.name=="insertElement")&&w.$;if(!w){return}if("string"==typeof w){w={dataValue:w,type:"text"}}if(v){z=v.getAttribute("data-track-changes-ignore")}else{if(w.dataValue&&"html"==(w.type||w.mode)){try{v=jQuery(w.dataValue);z=v&&v.attr("data-track-changes-ignore")}catch(y){}}}if(z){return true}if("string"==typeof w.dataValue){try{var B=this._editor.document.$,u=B.createElement("div");u.innerHTML=String(w.dataValue);u=this._tracker.getCleanDOM(u);if(!u.innerHTML){return true}x=jQuery.makeArray(u.childNodes)}catch(y){b("ice plugin paste:",y)}}else{if(v){x=v}else{return true}}if(x){var A=this._editor.focusManager.hasFocus;this._beforeInsert();this._tracker.insert({nodes:x});this._afterInsert();if(A){this._editor.editable().focus()}}C.stop();this._onIceTextChanged();return true},_setCommandsState:function(u,x){if(typeof(u)=="string"){u=u.split(",")}for(var v=u.length-1;v>=0;--v){var w=this._editor.getCommand(u[v]);if(w){w.setState(x)}}},_onSelectionChanged:function(v){var u=this._isTracking&&this._tracker&&this._tracker.isInsideChange();var w=u&&this._canAcceptReject?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;this._setCommandsState([q.Commands.ACCEPT_ONE,q.Commands.REJECT_ONE],w)},_onIceChange:function(w){var u=this._isTracking&&this._tracker&&this._tracker.hasChanges();var v=u&&this._canAcceptReject?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;this._setCommandsState([q.Commands.ACCEPT_ALL,q.Commands.REJECT_ALL],v);this._onSelectionChanged();if(w){this._triggerChange()}},_onIceTextChanged:function(u){this._triggerChange()},_triggerChange:function(){if(!this._changeTimeout){this._changeTimeout=setTimeout(this._notifyChange,1)}},_notifyChange:function(){this._changeTimeout=null;this._editor.fire(q.Events.CHANGE,{lite:this})},_notifyTextChange:function(){this._changeTimeout=null;this._editor.fire("change",{lite:this})},_commandNameToUIName:function(u){return u.replace(".","_")},_setPluginFeatures:function(z,B){if(!z||!z.filter||!z.filter.addFeature){return}try{function x(){var D=[B.deleteClass,B.insertClass,B.stylePrefix+"*"];return D}function u(){var D=["title"];for(var E in B.attributes){if(B.attributes.hasOwnProperty(E)){var F=B.attributes[E];if((typeof F=="string")&&F.indexOf("data-")==0){D.push(F)}}}return D}function w(D){var E={};D.forEach(function(F){E[F]=true});return E}var v=[],C,y;C={};y={};y.classes=w(x());y.attributes=w(u());C[B.insertTag]=y;C.br=CKEDITOR.tools.clone(y);C.br.propertiesOnly=true;if(B.deleteTag&&B.deleteTag!==B.insertTag){C[B.deleteTag]=CKEDITOR.tools.clone(y)}z.filter.addFeature({name:"lite-features",allowedContent:C})}catch(A){b(A)}},_setHostRange:function(u){var v=this._editor&&this._editor.getSelection();if(v){v.selectRanges([u])}},_beforeEdit:function(){CKEDITOR.iscutting=true;var v=this._editor,u=function(){v.fire("saveSnapshot")};u();setTimeout(function(){CKEDITOR.iscutting=false},100)},_hostCopy:function(){try{if(CKEDITOR.env.ie){m(this._editor,"copy")}else{this._editor.document.$.execCommand("copy",false,null)}}catch(u){b(u)}},_getHostRange:function(){var w=this._editor&&this._editor.getSelection(),u=w&&w.getRanges(),v=u&&u[0];return v||null},_getHostRangeData:function(u){u=u||this._getHostRange();if(!u){return null}return{startContainer:u.startContainer&&u.startContainer.$,endContainer:u.endContainer&&u.endContainer.$,startOffset:u.startOffset,endOffset:u.endOffset}},_showTooltip:function(v,x){var u=this._config.tooltips;if(u.events){return this._editor&&this._editor.fire(q.Events.HOVER_IN,{lite:this,node:v,changeId:x.changeId})}if(u.show){var w=this._makeTooltipTitle(x);if(this._tooltipsHandler){this._tooltipsHandler.hideAll(this._getBody());this._tooltipsHandler.showTooltip(v,w,this._editor.container.$)}else{v.setAttribute("title",w)}}},_hideTooltip:function(w){var v=this._config.tooltips;if(v.events){return this._editor&&this._editor.fire(q.Events.HOVER_OUT,{lite:this,node:w})}if(this._tooltipsHandler){if(w){this._tooltipsHandler.hideTooltip(w)}else{this._tooltipsHandler.hideAll(this._getBody())}}else{if(this._tracker){if(w){w.removeAttribute("title")}else{var u=this._tracker.getIceNodes();if(u){u.removeAttr("title")}}}}},_beforeInsert:function(){this._editor.fire("saveSnapshot")},_afterInsert:function(){var u=this._editor;u.getSelection().scrollIntoView()},_makeTooltipTitle:function(x){var w=this._config.tooltipTemplate||o,v=new Date(x.time),u=new Date(x.lastTime);w=w.replace(/%a/g,"insert"==x.type?"added":"deleted");w=w.replace(/%t/g,a(v));w=w.replace(/%u/g,x.userName);w=w.replace(/%dd/g,t(v.getDate(),2));w=w.replace(/%d/g,v.getDate());w=w.replace(/%mm/g,t(v.getMonth()+1,2));w=w.replace(/%m/g,v.getMonth()+1);w=w.replace(/%yy/g,t(v.getYear()-100,2));w=w.replace(/%y/g,v.getFullYear());w=w.replace(/%nn/g,t(v.getMinutes(),2));w=w.replace(/%n/g,v.getMinutes());w=w.replace(/%hh/g,t(v.getHours(),2));w=w.replace(/%h/g,v.getHours());w=w.replace(/%T/g,a(u));w=w.replace(/%DD/g,t(u.getDate(),2));w=w.replace(/%D/g,u.getDate());w=w.replace(/%MM/g,t(u.getMonth()+1,2));w=w.replace(/%M/g,u.getMonth()+1);w=w.replace(/%YY/g,t(u.getYear()-100,2));w=w.replace(/%Y/g,u.getFullYear());w=w.replace(/%NN/g,t(u.getMinutes(),2));w=w.replace(/%N/g,u.getMinutes());w=w.replace(/%HH/g,t(u.getHours(),2));w=w.replace(/%H/g,u.getHours());return w}};function b(){var u=window.console;if(u&&u.error){u.error.apply(u,[].slice.call(arguments))}}function f(u,w){if(CKEDITOR.env.ie){return m(u,w)}try{return u.document.$.execCommand(w,false,null)}catch(v){return false}}function m(w,z){var x=w.document,u=x.getBody(),v=false,y=false,A=function(){v=true};u.on(z,A);y=(CKEDITOR.env.version>7?x.$:x.$.selection.createRange())["execCommand"](z,false);u.removeListener(z,A);return y||v}function d(){Function.prototype.bind=Function.prototype.bind||function(){var w=this,v=Array.prototype.slice.call(arguments),u=v.shift();return function(){return w.apply(u,v.concat(Array.prototype.slice.call(arguments)))}};Array.prototype.indexOf=Array.prototype.indexOf||function(w){if(this==null){throw new TypeError()}var x=Object(this);var u=x.length>>>0;if(u===0){return -1}var y=0;if(arguments.length>1){y=Number(arguments[1]);if(y!=y){y=0}else{if(y!=0&&y!=Infinity&&y!=-Infinity){y=(y>0||-1)*Math.floo1r(Math.abs(y))}}}if(y>=u){return -1}var v=y>=0?y:Math.max(u-Math.abs(y),0);for(;v<u;v++){if(v in x&&x[v]===w){return v}}return -1};Array.prototype.lastIndexOf=Array.prototype.indexOf||function(v){if(this==null){throw new TypeError()}var w=Object(this);var u=w.length>>>0;while(--u>=0){if(u in w&&w[u]===v){return u}}return -1}}})();
/* Copyright (C) 2014 LoopIndex - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the LoopIndex Comments CKEditor plugin license.
 *
 * You should have received a copy of the LoopIndex Comments CKEditor plugin license with
 * this file. If not, please write to: loopindex@gmail.com, or visit http://www.loopindex.com
 * written by (David *)Frenkiel (https://github.com/imdfl) 
 */