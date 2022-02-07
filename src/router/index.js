import { createRouter, createWebHistory } from 'vue-router'
import protectedRoute from "./../views/protected/router"
import publicRoute from "./../views/public/router"
import middlewarePipeline from './kernel/middlewarePipeline'
import store from "@/store/index"
const routes = [
  ...protectedRoute,
  ...publicRoute,
  {
    path:'/:catchAll(.*)',
    component: () => import('@/errors/404'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  })
});

export default router
