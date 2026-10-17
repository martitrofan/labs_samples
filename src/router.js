import { createRouter, createWebHashHistory } from 'vue-router'
import TicketList from './pages/TicketList.vue'
import TicketNew from './pages/TicketNew.vue'
import TicketEdit from './pages/TicketEdit.vue'
import Docs from './pages/Docs.vue'
import Login from './pages/Login.vue'

const routes = [
  { path: '/', component: TicketList },
  { path: '/new', component: TicketNew },
  { path: '/edit/:id', component: TicketEdit },
  { path: '/docs', component: Docs },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
