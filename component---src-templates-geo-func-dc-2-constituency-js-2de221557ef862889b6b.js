(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"469l":function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),i=a("q1tI"),l=a("iuhU"),c=a("H2TA"),o=a("5AJ6"),s=Object(o.a)(i.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var m=i.forwardRef((function(e,t){var a=e.alt,c=e.children,o=e.classes,m=e.className,p=e.component,d=void 0===p?"div":p,u=e.imgProps,f=e.sizes,g=e.src,v=e.srcSet,E=e.variant,b=void 0===E?"circle":E,h=Object(r.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),x=null,y=function(e){var t=e.src,a=e.srcSet,n=i.useState(!1),r=n[0],l=n[1];return i.useEffect((function(){if(t||a){l(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&l("loaded")},n.onerror=function(){e&&l("error")},function(){e=!1}}}),[t,a]),r}({src:g,srcSet:v}),_=g||v,O=_&&"error"!==y;return x=O?i.createElement("img",Object(n.a)({alt:a,src:g,srcSet:v,sizes:f,className:o.img},u)):null!=c?c:_&&a?a[0]:i.createElement(s,{className:o.fallback}),i.createElement(d,Object(n.a)({className:Object(l.a)(o.root,o.system,o[b],m,!O&&o.colorDefault),ref:t},h),x)}));t.a=Object(c.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(m)},"6JlU":function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a("q1tI"),r=a.n(n),i=a("vOnD"),l=a("469l"),c=a("9Koi"),o=a("efpO"),s=a("Wbzz"),m=a("AiFK"),p=i.a.div.withConfig({displayName:"People__PeopleWrapper",componentId:"sc-19gr1ag-0"})([".avatar-group{display:flex;flex-direction:column;align-items:center;justify-content:space-end;}","{.avatar{width:48px;height:48px;}}","{.avatar{width:64px;height:64px;}}.avatar.demo{border:3px "," solid;}.avatar.beijing{border:3px "," solid;}.avatar.other{border:3px "," solid;}.center{font-size:12px;text-align:center;display:flex;flex-direction:column;align-items:center;}"],m.a.breakpoints.up("sm"),m.a.breakpoints.up("md"),m.a.palette.warning.main,m.a.palette.info.main,m.a.palette.success.main),d=function(e){var t=e.info,a=Object(c.a)().i18n,n=Object(o.b)(a,t,"name");return r.a.createElement(p,{className:"avatar-group clickable",onClick:function(){Object(s.navigate)(Object(o.a)(a,"/profile/"+t.uuid+"/"+n))},onKeyDown:function(){}},r.a.createElement("div",{className:"center"},r.a.createElement(l.a,{className:"avatar "+t.camp.toLowerCase(),alt:n,src:t.img_url}),r.a.createElement("span",null,n+("FALSE"===t.primary?"*":""))))}},"U/uD":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),i=a("tRbT"),l=a("ofer"),c=a("vOnD"),o=a("AiFK"),s=a("9Koi"),m=a("rsHp"),p=a("e89E"),d=a("VphZ"),u=a("20nU"),f=24,g=3,v=5,E=12;var b=function(e){var t=e.votes,a=e.seats,i=e.title,l=Object(n.useRef)(),c=Object(n.useRef)(),s=Object(p.a)(c);return Object(n.useEffect)((function(){var e=Object(d.b)(l.current);if(s){var n=f,r=v,c=g,m=E,p=t.DEMO+t.BEIJING,b=Object(d.a)().domain([0,p]).range([0,100]),h=[{value:t.DEMO,cumulative:0,percentage:b(t.DEMO),color:u.a.FC_EXPECTED_WIN_DEMO},{value:t.BEIJING,cumulative:t.DEMO,percentage:b(t.BEIJING),color:u.a.FC_EXPECTED_WIN_BEIJING}],x=Object(d.a)().domain([0,p]).range([0,n*a.length]);e.selectAll(".vote-label").remove(),e.append("text").attr("class","vote-label").attr("text-anchor","start").attr("x",0).attr("y",0).attr("transform","translate(0,"+m+")").style("fill",o.a.palette.text.primary).style("font-size",m).style("font-weight",400).text(i.vote),e.selectAll(".vote-stacked").data(h).join("rect").attr("class","vote-stacked").attr("x",(function(e){return x(e.cumulative)})).attr("y",m+c).attr("height",n).attr("width",(function(e){return x(e.value)})).style("fill",(function(e){return e.color})).style("stroke",o.a.palette.background.paper),e.selectAll(".seat-label").remove(),e.append("text").attr("class","seat-label").attr("text-anchor","start").attr("x",0).attr("y",m+c+n+r/2).attr("transform","translate(0,"+m+")").style("fill",o.a.palette.text.primary).style("font-size",m).style("font-weight",400).text(i.seat),e.selectAll("seat").data(a).join("rect").attr("class","seat-stacked").attr("x",(function(e,t){return t*n})).attr("y",m+c+n+r+m).attr("height",n).attr("width",n).style("fill",(function(e){return e.color})).style("stroke",o.a.palette.background.paper),e.selectAll(".text-percentage-label").data(h).join("text").attr("class","text-percentage-label").attr("text-anchor","middle").attr("x",(function(e){return x(e.cumulative)+x(e.value)/2})).attr("y",m+c+n/2+5).style("fill",o.a.palette.text.primary).style("font-size",16).style("font-weight",700).text((function(e){return e.percentage.toFixed(0)+"%"}))}}),[t,a,s]),r.a.createElement("div",{ref:c},r.a.createElement("svg",{ref:l,style:{overflow:"visible",display:"block",width:f*a.length+"px",height:"84px"}}))},h=a("7Qib"),x=a("efpO"),y=a("6JlU"),_=Object(c.a)(i.a).withConfig({displayName:"GeoFuncDc2Constituency__GeoHeader",componentId:"v6ydxr-0"})([".title-box{margin-right:","px;}}.title{font-size:24px;font-weight:700;}"],o.a.spacing(3)),O=Object(c.a)(i.a).withConfig({displayName:"GeoFuncDc2Constituency__CampWrapper",componentId:"v6ydxr-1"})([".list-number{font-size:32px;font-weight:900;}.right{text-align:right;}.camp-text{padding:3px 5px;font-weight:700;}.camp-text.demo{background:",";}.camp-text.beijing{background:",";}.camp-text.other{background:",";}"],o.a.palette.warning.light,o.a.palette.info.light,o.a.palette.success.light),w=c.a.div.withConfig({displayName:"GeoFuncDc2Constituency__CandidatesWrapper",componentId:"v6ydxr-2"})(["display:grid;grid-gap:","px;grid-template-columns:repeat(3,1fr);","{grid-template-columns:repeat(4,1fr);}","{grid-template-columns:repeat(6,1fr);}"],o.a.spacing(1),o.a.breakpoints.up("sm"),o.a.breakpoints.up("md"));t.default=function(e){var t=e.pageContext,a=t.constituency,n=t.candidates,c=Object(s.a)(),o=c.t,p=c.i18n,d=n.filter((function(e){return"DEMO"===e.node.camp})),u=n.filter((function(e){return"BEIJING"===e.node.camp})),f=n.filter((function(e){return"OTHER"===e.node.camp}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(_,{container:!0},r.a.createElement(i.a,{item:!0},r.a.createElement(i.a,{container:!0,direction:"column",justify:"center",className:"title-box"},r.a.createElement(l.a,{variant:"body2",color:"textSecondary"},o("no_of_seats",{seats:a.seats})),r.a.createElement("div",{className:"title"},Object(x.b)(p,a,"name")))),r.a.createElement(i.a,{item:!0},r.a.createElement(b,{title:{vote:o("dc2019_demo_beijing_ratio"),seat:o("simulation_result")},votes:m.a[a.key].votes,seats:Object(h.a)(a)}))),r.a.createElement(l.a,{className:"block",variant:"body2"},Object(x.b)(p,a,"description")),r.a.createElement(O,{container:!0,spacing:3},r.a.createElement(i.a,{item:!0,xs:6},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("span",{className:"camp-text demo"},o("alias.DEMO"))),r.a.createElement("div",{className:"list-number"},d.length),r.a.createElement(l.a,{variant:"caption"},o("intented_list")),r.a.createElement(w,null,d.map((function(e){return r.a.createElement(y.a,{key:e.node,info:e.node})})))),r.a.createElement(l.a,{variant:"caption"},o("intented_list_postscript"))),r.a.createElement(i.a,{item:!0,xs:6},r.a.createElement("div",{className:"right"},r.a.createElement("div",null,r.a.createElement("span",{className:"camp-text beijing"},o("alias.BEIJING"))),r.a.createElement("div",{className:"list-number"},u.length),r.a.createElement(l.a,{variant:"caption"},o("intented_list")),r.a.createElement(w,{mt:2},u.map((function(e){return r.a.createElement(y.a,{key:e.node,info:e.node})})))),f.length?r.a.createElement("div",{className:"right"},r.a.createElement("div",null,r.a.createElement("span",{className:"camp-text other"},o("alias.OTHER"))),r.a.createElement(l.a,{variant:"caption"},o("intented_list")),r.a.createElement(w,null,f.map((function(e){return r.a.createElement(y.a,{key:e.node,info:e.node})})))):"")),r.a.createElement(O,{container:!0,spacing:3},["DEMO","BEIJING"].map((function(e){return r.a.createElement(i.a,{item:!0,xs:6,key:e},r.a.createElement(l.a,{variant:"h6"},o("coordination_method")),r.a.createElement(l.a,{variant:"body1"},a["stage_1_title_"+e.toLowerCase()+"_zh"]),r.a.createElement(l.a,{variant:"body1"},a["stage_1_description_"+e.toLowerCase()+"_zh"]))}))),r.a.createElement(O,{container:!0,spacing:3},["DEMO","BEIJING"].map((function(e){return r.a.createElement(i.a,{item:!0,xs:6,key:e},r.a.createElement(l.a,{variant:"h6"},o("vote_allocaton")),r.a.createElement(l.a,{variant:"body1"},a["stage_2_title_"+e.toLowerCase()+"_zh"]),r.a.createElement(l.a,{variant:"body1"},a["stage_2_description_"+e.toLowerCase()+"_zh"]))}))))}}}]);
//# sourceMappingURL=component---src-templates-geo-func-dc-2-constituency-js-2de221557ef862889b6b.js.map