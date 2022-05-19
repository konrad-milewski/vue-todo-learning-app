import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About'
import Home from '../views/Home'

const routes =  [
    {
        path:"/",
        name: "Home",
        component: Home
    },
    {
        path:"/about",
        name: "About",
        component: About
    }
]

let router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;