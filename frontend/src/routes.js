import index from "./views/web/index";
var routes = [
    {path: "/index", component: index,  layout: "/web"  },
    {path: '**', component: index, layout: "/web"   },
];  
export default routes;
