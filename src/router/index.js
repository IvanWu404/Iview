import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import column from '@/components/column'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: dashboard
    } ,
    {
      path: '/coloum',
      component: column
    } 
  ]
})
