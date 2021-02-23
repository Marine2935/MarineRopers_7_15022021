import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Signup.vue')
    },
    {
        path: '/feed',
        name: 'feed',
        component: () => import('../views/Feed.vue')
    },
    {
        path: '/Post/:post_id',
        name: 'Post',
        component: () => import('../views/Post.vue')
    }  
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
