(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[10],{143:function(e,t,l){"use strict";l(2);var a=l(3);t.a=function(){return Object(a.jsx)("div",{class:"loader"})}},150:function(e,t,l){"use strict";l.d(t,"e",(function(){return b})),l.d(t,"d",(function(){return u})),l.d(t,"b",(function(){return p})),l.d(t,"f",(function(){return x})),l.d(t,"c",(function(){return j})),l.d(t,"a",(function(){return h}));var a=l(30),r=l(20),s=l(36),n=l(18),c=l(34),o=l(35),i=function(){return function(e){e({type:a.h})}},d=function(){return function(e){e({type:a.d})}},b=function(){return Object(r.a)({url:"https://lavado.ae/api/plans/all",successType:a.g,errorType:a.e,startReload:i,finishedReload:d,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},u=function(e){return Object(s.a)({url:"https://lavado.ae/api/Plans/",successType:a.f,errorType:a.e,startReload:i,finishedReload:d,id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},p=function(e){return Object(n.a)({url:"https://lavado.ae/api/Plans/",successType:a.b,errorType:a.e,startReload:i,finishedReload:d,title:"Plans",formData:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},x=function(e){return Object(c.a)({url:"https://lavado.ae/api/Plans",successType:a.i,errorType:a.e,startReload:i,finishedReload:d,title:"Plans",formData:e,id:e._id,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},j=function(e){return Object(o.a)({url:"https://lavado.ae/api/Plans/",successType:a.c,errorType:a.e,startReload:i,finishedReload:d,title:"Plans",id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},h=function(){return function(e){e({type:a.a})}}},239:function(e,t,l){"use strict";l.r(t),l.d(t,"default",(function(){return b}));var a=l(2),r=l(16),s=l(49),n=l(45),c=l(59),o=l(150),i=l(143),d=l(3);function b(e){var t=e.history,l=Object(r.c)(),b=Object(r.d)((function(e){return e.plansReducer}));return console.log({plansReducer:b}),Object(a.useEffect)((function(){l(Object(o.e)())}),[]),b.loading?Object(d.jsx)(c.a,{children:Object(d.jsx)("div",{className:"flex items-center justify-center h-screen",children:Object(d.jsx)(i.a,{})})}):Object(d.jsx)(c.a,{children:Object(d.jsxs)("div",{style:{backgroundColor:"#F8F8F8"},className:"flex flex-col items-center w-full h-screen p-10 pb-20 transition-all ",children:[Object(d.jsxs)("div",{className:"flex flex-wrap items-center justify-between w-full transition-all select-none",children:[Object(d.jsxs)("div",{className:"flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ",children:["Plans",Object(d.jsxs)("div",{className:"flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all",children:[Object(d.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Dashboard"}),Object(d.jsx)("div",{className:"px-3 font-medium",children:"->"}),Object(d.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Plans"})]})]}),Object(d.jsx)("div",{onClick:function(){return t.push("/admin/plans/new")},style:{backgroundColor:"#212121"},className:"px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg",children:Object(d.jsx)("div",{className:"text-sm text-center text-white transition-all",children:"Add new Plan"})})]}),Object(d.jsxs)("table",{className:"w-full border-collapse shadow-lg table-auto hover:shadow-lg ",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"#"}),Object(d.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Name"}),Object(d.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Label"}),Object(d.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Price"}),Object(d.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Actions"})]})}),Object(d.jsx)("tbody",{children:b.plans.map((function(e,a){return Object(d.jsxs)("tr",{className:"flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0",children:[Object(d.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(d.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"#"}),a+1]}),Object(d.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(d.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Name"}),e.name]}),Object(d.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(d.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Label"}),Object(d.jsx)("span",{className:"px-3 py-1 text-xs font-bold text-gray-500 rounded",children:e.label})]}),Object(d.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(d.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Price"}),Object(d.jsx)("span",{className:"rounded py-1 px-3 text-xs font-semibold text-gray-500",children:e.price})]}),Object(d.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(d.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Actions"}),Object(d.jsxs)("div",{className:"flex items-center justify-evenly",children:[Object(d.jsx)("div",{onClick:function(){l(Object(o.a)()),t.push("/admin/plans/".concat(e._id,"/edit"))},className:"text-blue-400 underline cursor-pointer hover:text-blue-600",children:Object(d.jsx)(s.c,{size:"1.8rem"})}),Object(d.jsx)("div",{onClick:function(){l(Object(o.a)()),l(Object(o.c)(e._id))},className:"text-red-500 underline cursor-pointer hover:text-red-500",children:Object(d.jsx)(n.b,{size:"1.8rem"})})]})]})]})}))})]})]})})}}}]);
//# sourceMappingURL=10.3c2669c9.chunk.js.map