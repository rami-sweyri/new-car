(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[14],{143:function(e,t,a){"use strict";a(2);var n=a(3);t.a=function(){return Object(n.jsx)("div",{class:"loader"})}},147:function(e,t,a){"use strict";a.d(t,"d",(function(){return u})),a.d(t,"f",(function(){return m})),a.d(t,"e",(function(){return f})),a.d(t,"b",(function(){return p})),a.d(t,"g",(function(){return j})),a.d(t,"c",(function(){return h})),a.d(t,"a",(function(){return b}));var n=a(29),s=a(20),r=a(36),o=a(18),l=a(34),c=a(35),i=function(){return function(e){e({type:n.g})}},d=function(){return function(e){e({type:n.d})}},u=function(e){return Object(s.a)({url:"https://lavado.ae/api/users/all",successType:n.f,errorType:n.i,startReload:i,finishedReload:d,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},m=function(e){return Object(s.a)({url:"https://lavado.ae"+"/api/users?query=".concat(encodeURIComponent(JSON.stringify(e.query)),"&page=").concat(e.page,"&limit=").concat(e.limit),successType:n.f,errorType:n.i,startReload:i,finishedReload:d,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},f=function(e){return Object(r.a)({url:"https://lavado.ae/api/users/",successType:n.e,errorType:n.i,startReload:i,finishedReload:d,id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},p=function(e){return Object(o.a)({url:"https://lavado.ae/api/users",successType:n.b,errorType:n.i,startReload:i,finishedReload:d,title:"User",formData:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},j=function(e){return Object(l.a)({url:"https://lavado.ae/api/users/",successType:n.h,errorType:n.i,startReload:i,finishedReload:d,title:"User",formData:e,id:e._id,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},h=function(e){return Object(c.a)({url:"https://lavado.ae/api/users",successType:n.c,errorType:n.i,startReload:i,finishedReload:d,title:"User",id:e,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-access-token":localStorage.getItem("token")}})},b=function(){return function(e){e({type:n.a})}}},236:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return b}));var n=a(12),s=a.n(n),r=a(21),o=a(22),l=a(1),c=a(13),i=a(59),d=a(2),u=a(16),m=a(147),f=a(83),p=(a(60),a(44)),j=a(143),h=a(3);function b(e){var t=e.history,a=e.match,n=Object(u.c)(),b=Object(u.d)((function(e){return e.userReducer})),x=Object(u.d)((function(e){return e.rolesReducer})),O=Object(d.useState)({}),w=Object(c.a)(O,2),g=w[0],y=w[1],v=Object(d.useState)({firstName:"",lastName:"",email:"",password:"",passwordConfirmation:"",roles:[]}),N=Object(c.a)(v,2),C=N[0],k=N[1],T=function(e){e.preventDefault(),k(Object(l.a)(Object(l.a)({},C),{},Object(o.a)({},e.target.name,e.target.value)))};Object(d.useEffect)((function(){a.params.id&&n(Object(m.e)(a.params.id)).then((function(e){k(Object(l.a)(Object(l.a)({},C),e.data.data)),console.log({res:e.data})})).catch((function(e){}))}),[a.params.id]),Object(d.useEffect)((function(){n(Object(f.e)())}),[]),Object(d.useEffect)((function(){y({})}),[]),console.log({userReducer:b});var R=function(){var e=Object(r.a)(s.a.mark((function e(r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),a.params.id?a.params.id?C.password.length>0?n(Object(m.g)({_id:C._id,firstName:C.firstName,lastName:C.lastName,password:C.password,passwordConfirmation:C.passwordConfirmation,email:C.email,roles:C.roles})).then((function(e){return t.push("/admin/users")})):n(Object(m.g)({_id:C._id,firstName:C.firstName,lastName:C.lastName,email:C.email,roles:C.roles})).then((function(e){return t.push("/admin/users")})):alert("error"):n(Object(m.b)({firstName:C.firstName,lastName:C.lastName,email:C.email.toLowerCase(),password:C.password,passwordConfirmation:C.passwordConfirmation,roles:C.roles})).then((function(e){t.push("/admin/users")}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return b.loading||x.loading?Object(h.jsx)(i.a,{children:Object(h.jsx)("div",{className:"flex items-center justify-center h-screen",children:Object(h.jsx)(j.a,{})})}):Object(h.jsx)(i.a,{parentClassName:" ",children:Object(h.jsxs)("div",{style:{backgroundColor:"#F8F8F8"},className:"w-full h-screen p-10 transition-all ",children:[Object(h.jsx)("div",{className:"flex flex-wrap items-center justify-between w-full transition-all select-none",children:Object(h.jsxs)("div",{className:"flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ",children:["Users",Object(h.jsxs)("div",{className:"flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all",children:[Object(h.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Dashboard"}),Object(h.jsx)("div",{className:"px-3 font-medium",children:"->"}),Object(h.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Users"}),Object(h.jsx)("div",{className:"px-3 font-medium",children:"->"}),Object(h.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"New User"})]})]})}),Object(h.jsxs)("div",{className:"py-16 bg-white border rounded shadow-md hover:shadow-lg px-14 ",children:[Object(h.jsxs)("div",{className:"my-5",children:[Object(h.jsx)("input",{placeholder:"First Name",value:C.firstName,type:"text",name:"firstName",onChange:function(e){T(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(h.jsx)("small",{className:"text-red-600"})]}),Object(h.jsxs)("div",{className:"my-5",children:[Object(h.jsx)("input",{placeholder:"Last Name",value:C.lastName,type:"text",name:"lastName",onChange:function(e){T(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(h.jsx)("small",{className:"text-red-600"})]}),Object(h.jsxs)("div",{className:"my-5",children:[Object(h.jsx)("input",{name:"email",value:C.email,type:"email",placeholder:"Email",onChange:function(e){T(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(h.jsx)("small",{className:"text-red-600",children:g&&g.email})]}),Object(h.jsxs)("div",{className:"my-5",children:[Object(h.jsx)("input",{type:"password",name:"password",value:C.password,placeholder:"Password",onChange:function(e){T(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(h.jsx)("small",{className:"text-red-600",children:g&&g.password})]}),Object(h.jsxs)("div",{className:"my-5",children:[Object(h.jsx)("input",{type:"password",name:"passwordConfirmation",value:C.passwordConfirmation,placeholder:"Confirm Password",onChange:function(e){T(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(h.jsx)("small",{className:"text-red-600",children:g&&g.passwordConfirmation})]}),Object(h.jsx)("div",{className:"my-5",children:Object(h.jsxs)("select",{value:C.roles[0],name:"roles",placeholder:"Confirm Password",onChange:function(e){k(Object(l.a)(Object(l.a)({},C),{},{roles:[e.target.value]}))},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none",children:[Object(h.jsx)("option",{children:"Select a roles "}),x.roles.map((function(e){return Object(h.jsx)("option",{value:e._id,children:e.name},e._id)}))]})}),Object(h.jsx)("div",{className:"flex items-center justify-center w-full",children:Object(h.jsxs)("div",{onClick:function(e){return R(e)},style:{backgroundColor:Object(p.a)(g)?"#666":"#212121",borderColor:"#212121"},className:" ".concat(b.loading?"animate-pulse":""," \n               \n                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black "),children:[b.loading?Object(h.jsx)("svg",{className:"absolute w-5 h-5 mr-3 border-r-2 border-white rounded-full animate-spin left-3",viewBox:"0 0 24 24"}):"","Save"]})})]})]})})}}}]);
//# sourceMappingURL=14.2de789aa.chunk.js.map