(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"469l":function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),i=a("q1tI"),c=a("iuhU"),l=a("H2TA"),o=a("5AJ6"),s=Object(o.a)(i.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var m=i.forwardRef((function(e,t){var a=e.alt,l=e.children,o=e.classes,m=e.className,p=e.component,u=void 0===p?"div":p,d=e.imgProps,f=e.sizes,g=e.src,v=e.srcSet,E=e.variant,h=void 0===E?"circle":E,b=Object(r.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),y=null,x=function(e){var t=e.src,a=e.srcSet,n=i.useState(!1),r=n[0],c=n[1];return i.useEffect((function(){if(t||a){c(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&c("loaded")},n.onerror=function(){e&&c("error")},function(){e=!1}}}),[t,a]),r}({src:g,srcSet:v}),w=g||v,_=w&&"error"!==x;return y=_?i.createElement("img",Object(n.a)({alt:a,src:g,srcSet:v,sizes:f,className:o.img},d)):null!=l?l:w&&a?a[0]:i.createElement(s,{className:o.fallback}),i.createElement(u,Object(n.a)({className:Object(c.a)(o.root,o.system,o[h],m,!_&&o.colorDefault),ref:t},b),y)}));t.a=Object(l.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(m)},"U/uD":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),i=a("tRbT"),c=a("469l"),l=a("ofer"),o=a("vOnD"),s=a("AiFK"),m=a("9Koi"),p=a("Wbzz"),u=a("rsHp"),d=a("e89E"),f=a("VphZ"),g=a("20nU"),v=24,E=3,h=5,b=12;var y=function(e){var t=e.votes,a=e.seats,i=e.title,c=Object(n.useRef)(),l=Object(n.useRef)(),o=Object(d.a)(l);return Object(n.useEffect)((function(){var e=Object(f.b)(c.current);if(o){var n=v,r=h,l=E,m=b,p=t.DEMO+t.BEIJING,u=Object(f.a)().domain([0,p]).range([0,100]),d=[{value:t.DEMO,cumulative:0,percentage:u(t.DEMO),color:g.a.FC_EXPECTED_WIN_DEMO},{value:t.BEIJING,cumulative:t.DEMO,percentage:u(t.BEIJING),color:g.a.FC_EXPECTED_WIN_BEIJING}],y=Object(f.a)().domain([0,p]).range([0,n*a.length]);e.selectAll(".vote-label").remove(),e.append("text").attr("class","vote-label").attr("text-anchor","start").attr("x",0).attr("y",0).attr("transform","translate(0,"+m+")").style("fill",s.a.palette.text.primary).style("font-size",m).style("font-weight",400).text(i.vote),e.selectAll(".vote-stacked").data(d).join("rect").attr("class","vote-stacked").attr("x",(function(e){return y(e.cumulative)})).attr("y",m+l).attr("height",n).attr("width",(function(e){return y(e.value)})).style("fill",(function(e){return e.color})).style("stroke",s.a.palette.background.paper),e.selectAll(".seat-label").remove(),e.append("text").attr("class","seat-label").attr("text-anchor","start").attr("x",0).attr("y",m+l+n+r/2).attr("transform","translate(0,"+m+")").style("fill",s.a.palette.text.primary).style("font-size",m).style("font-weight",400).text(i.seat),e.selectAll("seat").data(a).join("rect").attr("class","seat-stacked").attr("x",(function(e,t){return t*n})).attr("y",m+l+n+r+m).attr("height",n).attr("width",n).style("fill",(function(e){return e.color})).style("stroke",s.a.palette.background.paper),e.selectAll(".text-percentage-label").data(d).join("text").attr("class","text-percentage-label").attr("text-anchor","middle").attr("x",(function(e){return y(e.cumulative)+y(e.value)/2})).attr("y",m+l+n/2+5).style("fill",s.a.palette.text.primary).style("font-size",16).style("font-weight",700).text((function(e){return e.percentage.toFixed(0)+"%"}))}}),[t,a,o]),r.a.createElement("div",{ref:l},r.a.createElement("svg",{ref:c,style:{overflow:"visible",display:"block",width:v*a.length+"px",height:"84px"}}))},x=a("7Qib"),w=a("efpO"),_=Object(o.a)(i.a).withConfig({displayName:"GeoFuncDc2Constituency__GeoHeader",componentId:"v6ydxr-0"})([".title-box{margin-right:","px;}}.title{font-size:24px;font-weight:700;}"],s.a.spacing(3)),j=Object(o.a)(i.a).withConfig({displayName:"GeoFuncDc2Constituency__CampWrapper",componentId:"v6ydxr-1"})([".list-number{font-size:32px;font-weight:900;}.right{text-align:right;}.camp-text{padding:3px 5px;font-weight:700;}.camp-text.demo{background:",";}.camp-text.beijing{background:",";}.camp-text.other{background:",";}"],s.a.palette.warning.light,s.a.palette.info.light,s.a.palette.success.light),O=o.a.div.withConfig({displayName:"GeoFuncDc2Constituency__CandidatesWrapper",componentId:"v6ydxr-2"})(["display:grid;grid-gap:","px;grid-template-columns:repeat(3,1fr);","{grid-template-columns:repeat(4,1fr);}","{grid-template-columns:repeat(6,1fr);}.avatar-group{display:flex;flex-direction:column;align-items:center;justify-content:space-end;","{.avatar{width:48px;height:48px;}}","{.avatar{width:64px;height:64px;}}.avatar.demo{border:3px "," solid;}.avatar.beijing{border:3px "," solid;}.avatar.other{border:3px "," solid;}.center{font-size:12px;text-align:center;display:flex;flex-direction:column;align-items:center;}}"],s.a.spacing(1),s.a.breakpoints.up("sm"),s.a.breakpoints.up("md"),s.a.breakpoints.up("sm"),s.a.breakpoints.up("md"),s.a.palette.warning.main,s.a.palette.info.main,s.a.palette.success.main),k=function(e){var t=e.info,a=Object(m.a)().i18n;return r.a.createElement("div",{className:"avatar-group clickable",onClick:function(){Object(p.navigate)(Object(w.a)(a,"/profile/"+t.uuid+"/"+t.name_zh))},onKeyDown:function(){}},r.a.createElement("div",{className:"center"},r.a.createElement(c.a,{className:"avatar "+t.camp.toLowerCase(),alt:t.name_zh,src:t.img_url}),r.a.createElement("span",null,t.name_zh+("FALSE"===t.primary?"*":""))))};t.default=function(e){var t=e.pageContext,a=t.constituency,n=t.candidates,c=Object(m.a)().t,o=n.filter((function(e){return"DEMO"===e.node.camp})),s=n.filter((function(e){return"BEIJING"===e.node.camp})),p=n.filter((function(e){return"OTHER"===e.node.camp}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(_,{container:!0},r.a.createElement(i.a,{item:!0},r.a.createElement(i.a,{container:!0,direction:"column",justify:"center",className:"title-box"},r.a.createElement(l.a,{variant:"body2",color:"textSecondary"},c("no_of_seats",{seats:a.seats})),r.a.createElement("div",{className:"title"},a.name_zh))),r.a.createElement(i.a,{item:!0},r.a.createElement(y,{title:{vote:c("dc2019_demo_beijing_ratio"),seat:c("simulation_result")},votes:u.a[a.key].votes,seats:Object(x.a)(a)}))),r.a.createElement(l.a,{className:"block",variant:"body2"},a.description_zh),r.a.createElement(j,{container:!0,spacing:3},r.a.createElement(i.a,{item:!0,xs:6},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("span",{className:"camp-text demo"},c("alias.DEMO"))),r.a.createElement("div",{className:"list-number"},o.length),r.a.createElement(l.a,{variant:"caption"},"有意出選名單"),r.a.createElement(O,null,o.map((function(e){return r.a.createElement(k,{key:e.node,info:e.node})})))),r.a.createElement(l.a,{variant:"caption"},"* 表明不參加民主派初選")),r.a.createElement(i.a,{item:!0,xs:6},r.a.createElement("div",{className:"right"},r.a.createElement("div",null,r.a.createElement("span",{className:"camp-text beijing"},c("alias.BEIJING"))),r.a.createElement("div",{className:"list-number"},s.length),r.a.createElement(l.a,{variant:"caption"},"有意出選名單"),r.a.createElement(O,{mt:2},s.map((function(e){return r.a.createElement(k,{key:e.node,info:e.node})})))),p.length?r.a.createElement("div",{className:"right"},r.a.createElement("div",null,r.a.createElement("span",{className:"camp-text other"},c("alias.OTHER"))),r.a.createElement(l.a,{variant:"caption"},"有意出選名單"),r.a.createElement(O,null,p.map((function(e){return r.a.createElement(k,{key:e.node,info:e.node})})))):"")),r.a.createElement(j,{container:!0,spacing:3},["DEMO","BEIJING"].map((function(e){return r.a.createElement(i.a,{item:!0,xs:6,key:e},r.a.createElement(l.a,{variant:"h6"},"名單協調方法"),r.a.createElement(l.a,{variant:"body1"},a["stage_1_title_"+e.toLowerCase()+"_zh"]),r.a.createElement(l.a,{variant:"body1"},a["stage_1_description_"+e.toLowerCase()+"_zh"]))}))),r.a.createElement(j,{container:!0,spacing:3},["DEMO","BEIJING"].map((function(e){return r.a.createElement(i.a,{item:!0,xs:6,key:e},r.a.createElement(l.a,{variant:"h6"},"配票方法"),r.a.createElement(l.a,{variant:"body1"},a["stage_2_title_"+e.toLowerCase()+"_zh"]),r.a.createElement(l.a,{variant:"body1"},a["stage_2_description_"+e.toLowerCase()+"_zh"]))}))))}},yLpj:function(e,t){var a;a=function(){return this}();try{a=a||new Function("return this")()}catch(n){"object"==typeof window&&(a=window)}e.exports=a}}]);
//# sourceMappingURL=component---src-templates-geo-func-dc-2-constituency-js-dadafda27832ab718add.js.map