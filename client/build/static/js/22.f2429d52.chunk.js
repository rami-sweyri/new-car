(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[22],{143:function(e,t,n){"use strict";n(2);var s=n(3);t.a=function(){return Object(s.jsx)("div",{class:"loader"})}},242:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return O}));var s=n(5),a=n(12),r=n.n(a),c=n(21),i=n(22),l=n(1),o=n(13),d=n(59),u=n(2),m=n(16),j=n(83),b=(n(60),n(44)),f=n(85),x=n(51),h=n(143),p=n(3);function O(e){var t=e.history,n=e.match,a=Object(m.c)(),O=Object(m.d)((function(e){return e.rolesReducer})),v=Object(m.d)((function(e){return e.permissionsReducer})),g=Object(u.useState)({}),N=Object(o.a)(g,2),w=N[0],y=(N[1],Object(u.useState)({name:"",label:"",permissions:[]})),C=Object(o.a)(y,2),k=C[0],S=C[1],_=function(e){e.preventDefault(),S(Object(l.a)(Object(l.a)({},k),{},Object(i.a)({},e.target.name,e.target.value)))};Object(u.useEffect)((function(){n.params.id&&a(Object(j.d)(n.params.id)).then((function(e){S(Object(l.a)(Object(l.a)({},k),e.data.data)),console.log({res:e.data})})).catch((function(e){}))}),[n.params.id]),Object(u.useEffect)((function(){a(Object(j.e)()),a(Object(f.e)())}),[]);var D=Object(u.useState)(""),F=Object(o.a)(D,2),E=F[0],J=(F[1],function(){var e=Object(c.a)(r.a.mark((function e(s){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),n.params.id?n.params.id?a(Object(j.f)({_id:n.params.id,name:k.name,label:k.label,permissions:k.permissions})).then((function(e){return t.push("/admin/roles")})):console.log("error"):a(Object(j.b)({name:k.name,label:k.label,permissions:k.permissions})).then((function(e){return t.push("/admin/roles")}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());return O.loading||v.loading?Object(p.jsx)(d.a,{children:Object(p.jsx)("div",{className:"flex items-center justify-center h-screen",children:Object(p.jsx)(h.a,{})})}):Object(p.jsx)(d.a,{parentClassName:" ",children:Object(p.jsxs)("div",{style:{backgroundColor:"#F8F8F8"},className:"w-full h-full p-10 transition-all",children:[Object(p.jsx)("div",{className:"flex flex-wrap items-center justify-between w-full transition-all select-none",children:Object(p.jsxs)("div",{className:"flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ",children:["Services",Object(p.jsxs)("div",{className:"flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all",children:[Object(p.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Dashboard"}),Object(p.jsx)("div",{className:"px-3 font-medium",children:"->"}),Object(p.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"Services"}),Object(p.jsx)("div",{className:"px-3 font-medium",children:"->"}),Object(p.jsx)("div",{className:"font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110",children:"New service"})]})]})}),Object(p.jsxs)("div",{className:"py-16 bg-white border rounded shadow-md hover:shadow-lg px-14 ",children:[Object(p.jsxs)("div",{className:"my-5",children:[Object(p.jsx)("input",{placeholder:"Name",value:k.name,type:"text",name:"name",onChange:function(e){_(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(p.jsx)("small",{className:"text-red-600"})]}),Object(p.jsxs)("div",{className:"my-5",children:[Object(p.jsx)("input",{name:"label",value:k.label,type:"email",placeholder:"Label",onChange:function(e){_(e)},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"}),Object(p.jsx)("small",{className:"text-red-600"})]}),Object(p.jsx)("div",{className:"flex my-5",children:Object(p.jsxs)("select",{name:"permissions",value:E,placeholder:"Permissions",onChange:function(e){S(Object(l.a)(Object(l.a)({},k),{},{permissions:[].concat(Object(s.a)(k.permissions),[e.target.value])}))},className:"w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none",children:[Object(p.jsx)("option",{className:"hidden",children:"Select Permission"}),v.permissions.map((function(e){return Object(p.jsx)("option",{value:e._id,children:e.name})}))]})}),Object(p.jsx)("div",{className:"flex flex-wrap w-full",children:k.permissions.map((function(e){return Object(p.jsxs)("div",{className:"relative px-3 py-3 pr-6 my-2 mr-2 text-xs text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600",children:[Object(p.jsxs)("span",{className:"mx-2",children:["name:",v.permissions.find((function(t){return t._id===e}))?v.permissions.find((function(t){return t._id===e})).name:""," "]}),Object(p.jsx)("div",{className:"absolute text-xl top-1 right-1",onClick:function(){return S(Object(l.a)(Object(l.a)({},k),{},{permissions:k.permissions.filter((function(t){return t._id!==e}))}))},children:Object(p.jsx)(x.a,{className:"text-white"})})]})}))}),Object(p.jsx)("div",{className:"flex items-center justify-center w-full",children:Object(p.jsxs)("div",{onClick:function(e){return J(e)},style:{backgroundColor:Object(b.a)(w)?"#666":"#212121",borderColor:"#212121"},className:" ".concat(O.loading?"animate-pulse":""," \n               \n                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black "),children:[O.loading?Object(p.jsx)("svg",{className:"absolute w-5 h-5 mr-3 border-r-2 border-white rounded-full animate-spin left-3",viewBox:"0 0 24 24"}):"","Save"]})})]})]})})}}}]);
//# sourceMappingURL=22.f2429d52.chunk.js.map