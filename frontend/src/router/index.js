import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Produtos.vue')
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: () => import('../views/Cadastrar.vue')
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../views/Pedidos.vue')
    }
  ]
})

export default router
