(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"5JGD":function(e,a,t){"use strict";t.r(a);t("YBKJ");var n=t("q1tI"),c=t.n(n),i=t("tRbT"),r=t("ofer"),l=t("469l"),o=t("zgWt"),s=t("vOnD"),m=t("AiFK"),d=t("9Koi"),p=t("Wbzz"),u=t("efpO"),b=s.a.div.withConfig({displayName:"TradFuncConstituency__TradTemplateWrapper",componentId:"sc-19k883e-0"})([".block{margin:","px 0;}.social{font-size:24px;}.social svg{margin-left:","px;}"],m.a.spacing(1),m.a.spacing(1)),g=Object(s.a)(i.a).withConfig({displayName:"TradFuncConstituency__TradHeader",componentId:"sc-19k883e-1"})([".title-box{margin-right:","px;}}.title{font-size:24px;font-weight:700;}"],m.a.spacing(3)),f=s.a.div.withConfig({displayName:"TradFuncConstituency__CandidatesWrapper",componentId:"sc-19k883e-2"})(["display:grid;grid-gap:","px;grid-template-columns:repeat(3,1fr);.avatar-group{display:flex;flex-direction:column;align-items:start;justify-content:space-end;.avatar{width:64px;height:64px;}.avatar.demo{border:3px "," solid;}.avatar.beijing{border:3px "," solid;}.title{text-align:center;}}"],m.a.spacing(1),m.a.palette.warning.main,m.a.palette.info.main);a.default=function(e){var a=e.pageContext,t=a.constituency,n=a.councillors,s=a.candidates,m=a.tags,v=Object(d.a)(),E=v.t,_=v.i18n;return c.a.createElement(b,null,c.a.createElement(g,{container:!0},c.a.createElement(i.a,{item:!0},c.a.createElement(i.a,{container:!0,direction:"column",justify:"center",className:"title-box"},c.a.createElement(r.a,{variant:"body2",color:"textSecondary"},E("no_of_seats",{seats:t.seats})),c.a.createElement("div",{className:"title"},Object(u.b)(_,t,"name")))),c.a.createElement(i.a,{item:!0},c.a.createElement(r.a,{variant:"body1"},"選民人數："+t.electors_total_2020+"（較16年"+(Number(t.electors_total_2020)-Number(t.electors_total_2016))+"）"),c.a.createElement(r.a,{variant:"body1"},"票差：",t.last_election_vote_beijing_minus_demo))),c.a.createElement(i.a,{className:"block",container:!0},m.map((function(e){return c.a.createElement(o.a,{label:E("tag."+e.i18nKey),variant:"outlined"})}))),c.a.createElement(r.a,{className:"block",variant:"body2"},Object(u.b)(_,t,"description")),c.a.createElement(i.a,{container:!0,spacing:3},c.a.createElement(i.a,{item:!0,xs:3},c.a.createElement(r.a,null,"現任"),c.a.createElement(f,null,n.map((function(e){return c.a.createElement("div",{className:"avatar-group clickable",onClick:function(){Object(p.navigate)(Object(u.a)(_,"/profile/"+e.node.uuid+"/"+Object(u.b)(_,e.node,"name")))}},c.a.createElement(l.a,{className:"avatar "+e.node.camp.toLowerCase(),alt:Object(u.b)(_,e.node,"name"),src:e.image_url}),c.a.createElement("span",{className:"title"},Object(u.b)(_,e.node,"name")))})))),c.a.createElement(i.a,{item:!0,xs:9},c.a.createElement(r.a,null,"候選人"),c.a.createElement(f,null,s.map((function(e){return c.a.createElement("div",{className:"avatar-group",onClick:function(){Object(p.navigate)(Object(u.a)(_,"/profile/"+e.node.uuid+"/"+Object(u.b)(_,e.node,"name")))}},c.a.createElement(l.a,{className:"avatar "+e.node.camp.toLowerCase(),alt:Object(u.b)(_,e.node,"name"),src:e.image_url}),c.a.createElement("span",{className:"title"},Object(u.b)(_,e.node,"name")))}))))))}}}]);
//# sourceMappingURL=component---src-templates-trad-func-constituency-js-0165dcffa05685e18fca.js.map