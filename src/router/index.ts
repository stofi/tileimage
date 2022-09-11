import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'

const configureRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: HomePage,
      },
    ],
  })

  return router
}

export default configureRouter
