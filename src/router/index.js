import Router from 'vue-router'
import Vue from 'vue'
import Employee from '@/components/Employee.vue'
Vue.use(Router)
const routes =[
    {
        path:'/',
        component:Employee,
        
    }
]
const router = new Router({
    mode:'history',
    routes
})
export default router