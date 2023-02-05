import { createRouter,createWebHistory } from 'vue-router'
import routes from './routes'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: ()=> import('@/views/home')
//   },

// ]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(){
    return {top:0,left:0}
  }
})

export default router
