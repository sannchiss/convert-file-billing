import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'upload',
    component: () => import(/* webpackChunkName: "about" */ '../views/upload/UploadView.vue')
  },
  
 
]

const router = new VueRouter({
  routes
})

export default router
