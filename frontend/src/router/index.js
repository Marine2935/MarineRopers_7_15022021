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
        path: '/post/:post_id',
        name: 'Post',
        component: () => import('../views/Post.vue')
    },
    {
        path: '/users/:user_id',
        name: 'UserProfil',
        component: () => import('../views/UserProfil.vue')
    },
    {
        path: '/user_posts',
        name: 'UserPosts',
        component: () => import('../views/UserPosts.vue')
    } 
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
