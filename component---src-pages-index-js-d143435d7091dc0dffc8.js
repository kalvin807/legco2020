(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"1iKp":function(t,e,n){"use strict";n("R48M");var a=n("TqRt");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("q1tI")),i=(0,a(n("8/g6")).default)(r.default.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");e.default=i},"8/g6":function(t,e,n){"use strict";n("R48M");var a=n("TqRt");Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n=i.default.memo(i.default.forwardRef((function(e,n){return i.default.createElement(o.default,(0,r.default)({ref:n},e),t)})));0;return n.muiName=o.default.muiName,n};var r=a(n("pVnL")),i=a(n("q1tI")),o=a(n("UJJ5"))},RXBc:function(t,e,n){"use strict";n.r(e),n.d(e,"IndexPageQuery",(function(){return et}));n("pJf4"),n("q8oJ"),n("m210"),n("4DPX"),n("zTTH"),n("v9g0"),n("zGcK"),n("YBKJ"),n("gu/5"),n("eoYm"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("YbXK"),n("cFtU");var a=n("q1tI"),r=n.n(a),i=n("vrFN"),o=n("Wbzz"),l=(n("E5k/"),n("VphZ")),c=n("e89E"),s=n("AiFK");var u=function(t){var e=t.data,n=t.summary,i=t.title,o=Object(a.useRef)(),u=Object(a.useRef)(),d=Object(c.a)(u);return Object(a.useEffect)((function(){var t=Object(l.b)(o.current);if(d){var a={top:0,right:0,bottom:0,left:0},r=25,c=d.width-a.left-a.right,u=d.height-a.top-a.bottom,p=u/2,m=Object(l.c)(e,(function(t){return t.value})),f=function(t,e){var n=Object(l.a)().domain([0,e]).range([0,100]),a=0;return t.map((function(t){return a+=t.value,Object.assign(Object.assign({},t),{},{value:t.value,cumulative:a-t.value,label:t.label,percent:n(t.value)})})).filter((function(t){return t.value>0}))}(e,m),g=Object(l.a)().domain([0,m]).range([0,c]);t.selectAll("rect").data(f).join("rect").attr("class","rect-stacked").attr("x",(function(t){return g(t.cumulative)})).attr("y",p).attr("height",r).attr("width",(function(t){return g(t.value)})).style("fill",(function(t){return t.color})).style("stroke",s.a.palette.background.paper),Object.keys(n).forEach((function(e,a){var r=3,i=30,o=22;t.selectAll("."+e+"-name-bg").remove(),t.append("rect").attr("class",e+"-name-bg").attr("x",(function(){return 0===a?0+s.a.spacing(2):d.width-s.a.spacing(2)-i})).attr("y",0).attr("width",i).attr("height",o).style("fill",n[e].background),t.selectAll("."+e+"-name").remove(),t.append("text").attr("class",e+"-name").attr("text-anchor",n[e].pos).text(n[e].name).attr("x",(function(){return 0===a?0+s.a.spacing(2)+r:d.width-s.a.spacing(2)-r})).attr("y",16).style("fill",s.a.palette.text.primary).style("font-size",12).style("font-weight",500),t.selectAll("."+e+"-total").remove(),t.append("text").attr("class",e+"-total").attr("text-anchor",n[e].pos).text(n[e].total).attr("x",(function(){return 0===a?0+s.a.spacing(2):d.width-s.a.spacing(2)})).attr("y",p).style("fill",s.a.palette.text.primary).style("font-size",36).style("font-weight",900)})),t.selectAll(".center-text").remove(),t.append("text").attr("class","center-text").attr("text-anchor","middle").text(i).attr("x",d.width/2).attr("y",16).style("fill",s.a.palette.text.primary).style("font-size",12).style("font-weight",500),t.selectAll(".halfway").remove(),t.append("line").attr("class","halfway").style("stroke",s.a.palette.text.primary).attr("x1",g(m/2)).attr("y1",p-2).attr("x2",g(m/2)).attr("y2",p+r+2),t.selectAll(".halfway-triangle").remove(),t.append("text").attr("class","halfway-triangle").attr("text-anchor","middle").attr("x",g(m/2)).attr("y",p-6).style("font-size",12).text("▾"),t.selectAll(".halfway-text").remove(),t.append("text").attr("class","halfway-text").attr("text-anchor","middle").attr("x",g(m/2)).attr("y",p-16).style("font-size",12).text(m/2),t.selectAll(".text-label").data(f).join("text").attr("class","text-label").attr("text-anchor","middle").attr("x",(function(t){return g(t.cumulative)+g(t.value)/2})).attr("y",u/2+r+12).style("fill",(function(t){return t.color})).style("font-size",12).style("font-weight",700).text((function(t){return t.label}))}}),[e,d]),r.a.createElement("div",{ref:u},r.a.createElement("svg",{ref:o,style:{overflow:"visible",display:"block",width:"100%",height:"100px"}}))};var d=function(t){var e=t.data,n=t.width,i=Object(a.useRef)(),o=Object(a.useRef)(),s=Object(c.a)(o);return Object(a.useEffect)((function(){var t=Object(l.b)(i.current);if(s){var n=2,a=(s.width-2*n)/3;t.selectAll("rect").data(e).join("rect").attr("class","rect-stacked").attr("x",(function(t,e){return parseInt(e%3,10)*(a+n)})).attr("y",(function(t,e){return parseInt(e/3,10)*(a+n)})).attr("height",a).attr("width",a).style("fill",(function(t){return t.color}))}}),[e,s]),r.a.createElement("div",{ref:o},r.a.createElement("svg",{ref:i,style:{overflow:"visible",display:"block",width:n+"px",height:n+"px"}}))},p=(n("sC2a"),n("wx14")),m=n("aXM8"),f=n("A+CX");var g=n("ofer"),h=n("ODXe"),v=n("Ff2n"),E=n("iuhU"),b=n("zLVn"),x=n("dI71"),y=n("i8i4"),O=n.n(y),w=!1,N=n("0PSK"),_=function(t){function e(e,n){var a;a=t.call(this,e,n)||this;var r,i=n&&!n.isMounting?e.enter:e.appear;return a.appearStatus=null,e.in?i?(r="exited",a.appearStatus="entering"):r="entered":r=e.unmountOnExit||e.mountOnEnter?"unmounted":"exited",a.state={status:r},a.nextCallback=null,a}Object(x.a)(e,t),e.getDerivedStateFromProps=function(t,e){return t.in&&"unmounted"===e.status?{status:"exited"}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(t){var e=null;if(t!==this.props){var n=this.state.status;this.props.in?"entering"!==n&&"entered"!==n&&(e="entering"):"entering"!==n&&"entered"!==n||(e="exiting")}this.updateStatus(!1,e)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var t,e,n,a=this.props.timeout;return t=e=n=a,null!=a&&"number"!=typeof a&&(t=a.exit,e=a.enter,n=void 0!==a.appear?a.appear:e),{exit:t,enter:e,appear:n}},n.updateStatus=function(t,e){void 0===t&&(t=!1),null!==e?(this.cancelNextCallback(),"entering"===e?this.performEnter(t):this.performExit()):this.props.unmountOnExit&&"exited"===this.state.status&&this.setState({status:"unmounted"})},n.performEnter=function(t){var e=this,n=this.props.enter,a=this.context?this.context.isMounting:t,r=this.props.nodeRef?[a]:[O.a.findDOMNode(this),a],i=r[0],o=r[1],l=this.getTimeouts(),c=a?l.appear:l.enter;!t&&!n||w?this.safeSetState({status:"entered"},(function(){e.props.onEntered(i)})):(this.props.onEnter(i,o),this.safeSetState({status:"entering"},(function(){e.props.onEntering(i,o),e.onTransitionEnd(c,(function(){e.safeSetState({status:"entered"},(function(){e.props.onEntered(i,o)}))}))})))},n.performExit=function(){var t=this,e=this.props.exit,n=this.getTimeouts(),a=this.props.nodeRef?void 0:O.a.findDOMNode(this);e&&!w?(this.props.onExit(a),this.safeSetState({status:"exiting"},(function(){t.props.onExiting(a),t.onTransitionEnd(n.exit,(function(){t.safeSetState({status:"exited"},(function(){t.props.onExited(a)}))}))}))):this.safeSetState({status:"exited"},(function(){t.props.onExited(a)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(t,e){e=this.setNextCallback(e),this.setState(t,e)},n.setNextCallback=function(t){var e=this,n=!0;return this.nextCallback=function(a){n&&(n=!1,e.nextCallback=null,t(a))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(t,e){this.setNextCallback(e);var n=this.props.nodeRef?this.props.nodeRef.current:O.a.findDOMNode(this),a=null==t&&!this.props.addEndListener;if(n&&!a){if(this.props.addEndListener){var r=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],i=r[0],o=r[1];this.props.addEndListener(i,o)}null!=t&&setTimeout(this.nextCallback,t)}else setTimeout(this.nextCallback,0)},n.render=function(){var t=this.state.status;if("unmounted"===t)return null;var e=this.props,n=e.children,a=(e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef,Object(b.a)(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return r.a.createElement(N.a.Provider,{value:null},"function"==typeof n?n(t,a):r.a.cloneElement(r.a.Children.only(n),a))},e}(r.a.Component);function k(){}_.contextType=N.a,_.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:k,onEntering:k,onEntered:k,onExit:k,onExiting:k,onExited:k},_.UNMOUNTED="unmounted",_.EXITED="exited",_.ENTERING="entering",_.ENTERED="entered",_.EXITING="exiting";var j=_,C=n("H2TA"),S=n("wpWl");function I(t,e){var n=t.timeout,a=t.style,r=void 0===a?{}:a;return{duration:r.transitionDuration||"number"==typeof n?n:n[e.mode]||0,delay:r.transitionDelay}}var M=n("tr08"),D=n("bfFb"),R=a.forwardRef((function(t,e){var n=t.children,r=t.classes,i=t.className,o=t.collapsedHeight,l=void 0===o?"0px":o,c=t.component,s=void 0===c?"div":c,u=t.disableStrictModeCompat,d=void 0!==u&&u,m=t.in,f=t.onEnter,g=t.onEntered,b=t.onEntering,x=t.onExit,y=t.onExited,O=t.onExiting,w=t.style,N=t.timeout,_=void 0===N?S.b.standard:N,k=t.TransitionComponent,C=void 0===k?j:k,R=Object(v.a)(t,["children","classes","className","collapsedHeight","component","disableStrictModeCompat","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),T=Object(M.a)(),A=a.useRef(),z=a.useRef(null),F=a.useRef(),H="number"==typeof l?"".concat(l,"px"):l;a.useEffect((function(){return function(){clearTimeout(A.current)}}),[]);var L=T.unstable_strictMode&&!d,J=a.useRef(null),U=Object(D.a)(e,L?J:void 0),G=function(t){return function(e,n){if(t){var a=L?[J.current,e]:[e,n],r=Object(h.a)(a,2),i=r[0],o=r[1];t(i,o)}}},W=G((function(t,e){t.style.height=H,f&&f(t,e)})),B=G((function(t,e){var n=z.current?z.current.clientHeight:0,a=I({style:w,timeout:_},{mode:"enter"}).duration;if("auto"===_){var r=T.transitions.getAutoHeightDuration(n);t.style.transitionDuration="".concat(r,"ms"),F.current=r}else t.style.transitionDuration="string"==typeof a?a:"".concat(a,"ms");t.style.height="".concat(n,"px"),b&&b(t,e)})),P=G((function(t,e){t.style.height="auto",g&&g(t,e)})),q=G((function(t){var e=z.current?z.current.clientHeight:0;t.style.height="".concat(e,"px"),x&&x(t)})),K=G(y),X=G((function(t){var e=z.current?z.current.clientHeight:0,n=I({style:w,timeout:_},{mode:"exit"}).duration;if("auto"===_){var a=T.transitions.getAutoHeightDuration(e);t.style.transitionDuration="".concat(a,"ms"),F.current=a}else t.style.transitionDuration="string"==typeof n?n:"".concat(n,"ms");t.style.height=H,O&&O(t)}));return a.createElement(C,Object(p.a)({in:m,onEnter:W,onEntered:P,onEntering:B,onExit:q,onExited:K,onExiting:X,addEndListener:function(t,e){var n=L?t:e;"auto"===_&&(A.current=setTimeout(n,F.current||0))},nodeRef:L?J:void 0,timeout:"auto"===_?null:_},R),(function(t,e){return a.createElement(s,Object(p.a)({className:Object(E.a)(r.container,i,{entered:r.entered,exited:!m&&"0px"===H&&r.hidden}[t]),style:Object(p.a)({minHeight:H},w),ref:U},e),a.createElement("div",{className:r.wrapper,ref:z},a.createElement("div",{className:r.wrapperInner},n)))}))}));R.muiSupportAuto=!0;var T=Object(C.a)((function(t){return{container:{height:0,overflow:"hidden",transition:t.transitions.create("height")},entered:{height:"auto",overflow:"visible"},hidden:{visibility:"hidden"},wrapper:{display:"flex"},wrapperInner:{width:"100%"}}}),{name:"MuiCollapse"})(R),A=n("tRbT"),z=n("esk+"),F=n("vOnD"),H=n("9Koi"),L=n("mYdW"),J=n.n(L),U=n("1iKp"),G=n.n(U),W=n("rsHp"),B=n("20nU"),P=n("7Qib"),q=n("efpO");function K(t){return function(t){if(Array.isArray(t))return X(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return X(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return X(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var V=F.a.div.withConfig({displayName:"pages__FullWidithWrapper",componentId:"sc-1s2k7oc-0"})(["margin:0 -","px;.fullWidth-title{font-weight:700;text-align:center;padding:","px 0;}"],s.a.spacing(2),s.a.spacing(1)),Y=F.a.div.withConfig({displayName:"pages__Container",componentId:"sc-1s2k7oc-1"})(["margin:0 ","px;"],s.a.spacing(2)),Q=F.a.div.withConfig({displayName:"pages__DirectHeader",componentId:"sc-1s2k7oc-2"})(["margin:","px 0;"],s.a.spacing(2)),Z=F.a.div.withConfig({displayName:"pages__DirectWrapper",componentId:"sc-1s2k7oc-3"})(["display:grid;grid-template-columns:repeat(2,1fr);grid-gap:","px;.seat{padding:","px ","px;border-radius:2px;box-shadow:0 1px 6px 0 ",";.title{display:flex;justify-content:space-between;}.sub-title{font-size:0.65rem;}.roundup-title{margin-top:","px;display:flex;justify-content:space-between;}.roundup-title div{line-height:0.5;}.roundup-title div:last-child{text-align:right;}.roundup{display:flex;justify-content:space-between;line-height:1.2;}.large-number{font-size:2rem;font-weight:900;}.demo{text-align:left;color:",";}.beijing{text-align:right;color:",";}.other{color:",";}}"],s.a.spacing(1),s.a.spacing(1),s.a.spacing(1.5),s.a.palette.divider,s.a.spacing(.5),s.a.palette.warning.main,s.a.palette.info.main,s.a.palette.success.main),$=F.a.div.withConfig({displayName:"pages__TradFCWrapper",componentId:"sc-1s2k7oc-4"})([".situation-group{margin-bottom:","px;}.seat-group{margin-top:","px;display:grid;grid-gap:","px;}.group-title{font-weight:500;margin:","px 0;}.fierce{grid-template-columns:repeat(1,1fr);}","{.fierce{grid-template-columns:repeat(2,1fr);}}.probably_demo,.probably_beijing{grid-template-columns:repeat(2,1fr);}.seat{padding:","px ","px;border-radius:2px;box-shadow:0 1px 6px 0 ",";.title{display:flex;justify-content:space-between;line-height:0;}}.seat.demo{border-top:3px "," solid;}.seat.beijing{border-top:3px "," solid;}"],s.a.spacing(3),s.a.spacing(1.5),s.a.spacing(1),s.a.spacing(2),s.a.breakpoints.up("sm"),s.a.spacing(1),s.a.spacing(1.5),s.a.palette.divider,s.a.palette.warning.main,s.a.palette.info.main),tt=F.a.div.withConfig({displayName:"pages__ExpandButton",componentId:"sc-1s2k7oc-5"})(["text-align:center;"]),et=(e.default=function(t){var e=t.data,n=e.allGeoFuncDc2,l=e.allTradFunc,c=e.candidatesGroupByCamp,h=Object(a.useState)(!1),v=h[0],E=h[1],b=[].concat(K(Array.from(n.nodes)),K(Array.from(l.nodes))),x=Object(H.a)().t,y=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Object(m.a)(),r=Object(f.a)({theme:n,name:"MuiUseMediaQuery",props:{}}),i="function"==typeof t?t(n):t;i=i.replace(/^@media( ?)/m,"");var o="undefined"!=typeof window&&void 0!==window.matchMedia,l=Object(p.a)(Object(p.a)({},r),e),c=l.defaultMatches,s=void 0!==c&&c,u=l.matchMedia,d=void 0===u?o?window.matchMedia:null:u,g=l.noSsr,h=void 0!==g&&g,v=l.ssrMatchMedia,E=void 0===v?null:v,b=a.useState((function(){return h&&o?d(i).matches:E?E(i).matches:s})),x=b[0],y=b[1];return a.useEffect((function(){var t=!0;if(o){var e=d(i),n=function(){t&&y(e.matches)};return n(),e.addListener(n),function(){t=!1,e.removeListener(n)}}}),[i,d,o]),x}(s.a.breakpoints.up("md")),O={UNRESOLVED:70};b.forEach((function(t){Object.keys(t).filter((function(t){return t.includes("expected")})).map((function(e){var n=(t.type+"_"+e).toUpperCase();void 0===O[n]?O[n]=Number(t[e]):O[n]+=Number(t[e]),O.UNRESOLVED-=Number(t[e])}))}));var w=Object.keys(B.a).map((function(t){return{key:t,label:x("stackedBar."+t),value:O[t],color:B.a[t]}})),N={DEMO:{name:x("alias.DEMO"),pos:"start",total:0,background:s.a.palette.warning.light},BEIJING:{name:x("alias.BEIJING"),pos:"end",total:0,background:s.a.palette.info.light}};w.forEach((function(t){t.key.includes("DEMO")&&(N.DEMO.total+=t.value),t.key.includes("BEIJING")&&(N.BEIJING.total+=t.value)}));var _=Object(H.a)().i18n,k=function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,null,r.a.createElement(g.a,{variant:"body2"},x("direct_election_description"))),r.a.createElement(Z,null,t.sort((function(t,e){return t.order>e.order?1:t.order<e.order?-1:0})).map((function(t){var e=c.group.find((function(t){return"BEIJING"===t.camp})).edges.filter((function(e){return e.node.constituency===t.key})).length||0,n=c.group.find((function(t){return"OTHER"===t.camp})).edges.filter((function(e){return e.node.constituency===t.key})).length||0,a=c.group.find((function(t){return"DEMO"===t.camp})).edges.filter((function(e){return e.node.constituency===t.key})).length||0;return r.a.createElement("div",{key:t.key,className:"seat clickable",onClick:function(){Object(o.navigate)(Object(q.a)(_,"/constituency/"+t.key))}},r.a.createElement("div",{className:"title"},r.a.createElement(g.a,{variant:"caption",color:"textSecondary"},x("no_of_seats",{seats:t.seats})),r.a.createElement("div",{className:"sub-title"},x("estimated_result"))),r.a.createElement("div",{className:"title"},r.a.createElement("div",null,r.a.createElement(g.a,{variant:"h5"},Object(q.b)(_,t,"alias"))),r.a.createElement("div",null,r.a.createElement("div",{style:{width:"40px",height:"40px"}},r.a.createElement(d,{width:40,height:40,data:Object(P.a)(t)})))),r.a.createElement("div",{className:"roundup-title"},r.a.createElement("div",null,r.a.createElement(g.a,{variant:"caption"},x("alias.DEMO")),r.a.createElement("div",{className:"sub-title"},x("intented_list"))),r.a.createElement("div",null,r.a.createElement(g.a,{variant:"caption"},x("alias.BEIJING")),r.a.createElement("div",{className:"sub-title"},x("intented_list")))),r.a.createElement("div",{className:"roundup"},r.a.createElement("div",{className:"large-number demo"},a||"-"),r.a.createElement("div",null,r.a.createElement(g.a,{variant:"body1",color:"textSecondary"},"vs")),n?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"large-number other"},n||"-"),r.a.createElement("div",null,r.a.createElement(g.a,{variant:"body1",color:"textSecondary"},"vs"))):"",r.a.createElement("div",{className:"large-number beijing"},e||"-")))}))))},j=function(t){var e=t.reduce((function(t,e){var n=t.findIndex((function(t){return t.title===x("tag."+e.situation)}));return n<0?[].concat(K(t),[{key:e.key,title:x("tag."+e.situation),situation:e.situation,order:parseFloat(e.situation_order),content:[e]}]):(t[n].content.push(e),t)}),[]);return r.a.createElement($,null,e.sort((function(t,e){return t.order>e.order?1:t.order<e.order?-1:0})).map((function(t){return r.a.createElement("div",{className:"situation-group",key:"group-"+t.title},r.a.createElement("div",{className:"group-title"},x("no_of_seats_fc",{title:t.title,seats:t.content.reduce((function(t,e){return t+Number(e.seats)}),0)})),r.a.createElement(g.a,{variant:"body2"},x(t.situation+"_description")),r.a.createElement("div",{className:"seat-group "+t.situation},t.content.sort((function(t,e){return Number(t.situation_order)>Number(e.situation_order)?1:Number(t.situation_order)<Number(e.situation_order)?-1:0})).map((function(t){var e=Number(t.expected_win_demo)||0,n=Number(t.expected_win_beijing)||0,a="";return e>n?a="demo":e<n&&(a="beijing"),r.a.createElement("div",{key:t.key,className:"seat clickable "+a,onClick:function(){Object(o.navigate)(Object(q.a)(_,"/constituency/"+t.key))}},r.a.createElement(g.a,{variant:"caption",color:"textSecondary"},t.seats,"席 -"," ",x("tag.electors_composition_"+t.electors_composition)),r.a.createElement(g.a,{variant:"h5"},Object(q.b)(_,t,"name")),"uncontested"!==t.situation?r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{variant:"body2"},"親中 - 民主 ="," ",t.last_election_vote_beijing_minus_demo),r.a.createElement(g.a,{variant:"body2"},"新增選民 + 上屆未投票 ="," ",Number(t.electors_total_2020)-Number(t.electors_total_2016)+Number(t.electors_total_2016)-Number(t.last_election_voted_count))):null)}))))})))};return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{title:"Home"}),r.a.createElement(V,null,r.a.createElement(u,{data:w,summary:N,title:x("simulation_result")}),r.a.createElement(tt,{onClick:function(){return E(!v)}},v?r.a.createElement(J.a,null):r.a.createElement(G.a,null)),r.a.createElement(T,{in:v,timeout:100},W.b.map((function(t){return r.a.createElement(u,{key:t.year,data:t.result,summary:t.summary,title:t.year})}))),y?r.a.createElement(A.a,{container:!0,spacing:3},r.a.createElement(A.a,{item:!0,xs:6},r.a.createElement("div",{className:"fullWidth-title"},x("geo_func_dc2")),k(n.nodes)),r.a.createElement(A.a,{item:!0,xs:6},r.a.createElement("div",{className:"fullWidth-title"},x("trad_func")),j(l.nodes))):r.a.createElement(z.a,{tabs:[{name:"geo_func_dc2",title:x("geo_func_dc2"),content:r.a.createElement(Y,null,k(n.nodes))},{name:"trad_func",title:x("trad_func"),content:r.a.createElement(Y,null,j(l.nodes))}],onTabChange:function(){}})))},"1047816699")},UJJ5:function(t,e,n){"use strict";n.r(e);var a=n("HR5l");n.d(e,"default",(function(){return a.a}))},mYdW:function(t,e,n){"use strict";n("R48M");var a=n("TqRt");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("q1tI")),i=(0,a(n("8/g6")).default)(r.default.createElement("path",{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess");e.default=i},zTTH:function(t,e,n){"use strict";var a=n("P8UN"),r=n("Wadk")(6),i="findIndex",o=!0;i in[]&&Array(1)[i]((function(){o=!1})),a(a.P+a.F*o,"Array",{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n("Dq1/")(i)}}]);
//# sourceMappingURL=component---src-pages-index-js-d143435d7091dc0dffc8.js.map