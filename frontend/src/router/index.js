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
        name: 'SinglePost',
        component: () => import('../views/SinglePost.vue')
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('../views/Users.vue')
    },
    {
        path: '/users/:user_id/:username/profil',
        name: 'UserProfil',
        component: () => import('../views/UserProfil.vue')
    },
    {
        path: '/users/:user_id/:username/posts',
        name: 'UserPosts',
        component: () => import('../views/UserPosts.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
