(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[7],{143:function(e,t,r){"use strict";r(2);var l=r(3);t.a=function(){return Object(l.jsx)("div",{class:"loader"})}},146:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return i}));var l="FILE_ERROR",a=(r(20),r(36)),n=r(18),c=(r(34),r(35),function(){return function(e){e({type:"START_FILES_RELOAD"})}}),s=function(){return function(e){e({type:"FINISHED_FILES_RELOAD"})}},o=function(e){return Object(a.a)({url:"https://lavado.ae/api/files/",successType:"READ_ONE_FILE",errorType:l,startReload:c,finishedReload:s,id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},i=function(e){return Object(n.a)({url:"https://lavado.ae/api/files/",successType:"CREATE_FILE",errorType:l,startReload:c,finishedReload:s,type:"file",formData:e,title:"Media File",headers:{"Content-Type":"multipart/form-data","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})}},149:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var l=r(13),a=r(2),n=r(16),c=r(146),s=r(44),o=r(3);function i(e){var t=e.id,r=e.width,i=(e.height,Object(n.c)()),d=Object(a.useState)(""),b=Object(l.a)(d,2),u=b[0],p=b[1];return Object(a.useEffect)((function(){t&&function(e){i(Object(c.b)(e)).then((function(e){200===e.status&&p(e.data)}))}(t)}),[t]),Object(o.jsx)("img",{src:Object(s.a)(u)?"/".concat(u.data.path):"",className:"".concat(r||"w-64")})}},161:function(e,t,r){"use strict";r.d(t,"d",(function(){return b})),r.d(t,"e",(function(){return u})),r.d(t,"b",(function(){return p})),r.d(t,"f",(function(){return x})),r.d(t,"c",(function(){return j})),r.d(t,"a",(function(){return f}));var l=r(32),a=r(20),n=r(36),c=r(18),s=r(34),o=r(35),i=function(){return function(e){e({type:l.h})}},d=function(){return function(e){e({type:l.d})}},b=function(){return Object(a.a)({url:"https://lavado.ae/api/intro/all",successType:l.f,errorType:l.e,startReload:i,finishedReload:d,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},u=function(e){return Object(n.a)({url:"https://lavado.ae/api/intro/",successType:l.g,errorType:l.e,startReload:i,finishedReload:d,id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},p=function(e){return Object(c.a)({url:"https://lavado.ae/api/intro/",successType:l.b,errorType:l.e,startReload:i,finishedReload:d,title:"Intro",formData:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},x=function(e){return Object(s.a)({url:"https://lavado.ae/api/intro",successType:l.i,errorType:l.e,startReload:i,finishedReload:d,title:"Intro",formData:e,id:e._id,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},j=function(e){return Object(o.a)({url:"https://lavado.ae/api/intro/",successType:l.c,errorType:l.e,startReload:i,finishedReload:d,title:"Intro",id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},f=function(){return function(e){e({type:l.a})}}},250:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return u}));var l=r(2),a=r(16),n=(r(146),r(49)),c=r(45),s=r(59),o=r(149),i=r(161),d=r(143),b=r(3);function u(e){var t=e.history,r=Object(a.c)(),u=Object(a.d)((function(e){return e.introReducer}));return console.log({introReducer:u}),Object(l.useEffect)((function(){r(Object(i.d)())}),[]),u.loading?Object(b.jsxs)(s.a,{children:[Object(b.jsx)("div",{className:"flex items-center justify-center h-screen",children:Object(b.jsx)(d.a,{})})," "]}):Object(b.jsx)(s.a,{children:Object(b.jsxs)("div",{style:{backgroundColor:"#F8F8F8"},className:"flex flex-col items-center w-full h-screen p-10 pb-20 transition-all ",children:[Object(b.jsxs)("div",{className:"flex flex-wrap items-center justify-between w-full transition-all select-none",children:[Object(b.jsxs)("div",{className:"flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ",children:["Mobile Intro",Object(b.jsxs)("div",{className:"flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all",children:[Object(b.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Dashboard"}),Object(b.jsx)("div",{className:"px-3 font-medium",children:"->"}),Object(b.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Mobile Intro"})]})]}),Object(b.jsx)("div",{onClick:function(){return t.push("/admin/intro/new")},style:{backgroundColor:"#212121"},className:"px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg",children:Object(b.jsx)("div",{className:"text-sm text-center text-white transition-all",children:"Add new intro"})})]}),Object(b.jsxs)("table",{className:"w-full border-collapse shadow-lg table-auto hover:shadow-lg ",children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"#"}),Object(b.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Name"}),Object(b.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Label"}),Object(b.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Description"}),Object(b.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Image"}),Object(b.jsx)("th",{className:"hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell",children:"Actions"})]})}),Object(b.jsx)("tbody",{children:u.intros.map((function(e,l){return Object(b.jsxs)("tr",{className:"flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0",children:[Object(b.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(b.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"#"}),l+1]}),Object(b.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(b.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Name"}),e.name]}),Object(b.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(b.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Label"}),Object(b.jsx)("span",{className:"px-3 py-1 text-xs font-bold text-gray-500 rounded",children:e.label})]}),Object(b.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(b.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Description"}),Object(b.jsx)("span",{className:"rounded py-1 px-3 text-xs font-semibold text-gray-500",children:e.description})]}),Object(b.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(b.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Image"}),Object(b.jsx)("span",{className:"rounded py-1 px-3 text-xs font-semibold text-gray-500",children:Object(b.jsx)("div",{className:"flex items-center justify-center w-full",children:Object(b.jsx)(o.a,{id:e.image,width:"w-20"})})})]}),Object(b.jsxs)("td",{className:"relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static",children:[Object(b.jsx)("span",{className:"absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden",children:"Actions"}),Object(b.jsxs)("div",{className:"flex items-center justify-evenly",children:[Object(b.jsx)("div",{onClick:function(){r(Object(i.a)()),t.push("/admin/intro/".concat(e._id,"/edit"))},className:"text-blue-400 underline cursor-pointer hover:text-blue-600",children:Object(b.jsx)(n.c,{size:"1.8rem"})}),Object(b.jsx)("div",{onClick:function(){r(Object(i.a)()),r(Object(i.c)(e._id))},className:"text-red-500 underline cursor-pointer hover:text-red-500",children:Object(b.jsx)(c.b,{size:"1.8rem"})})]})]})]})}))})]})]})})}}}]);
//# sourceMappingURL=7.5effe3da.chunk.js.map