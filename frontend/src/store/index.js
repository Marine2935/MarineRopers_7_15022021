import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedUser: {
            id: 0,
            username: null,
            isAdmin: false
        }
    },
    mutations: {
        initUser(state, user) {
            state.loggedUser.id = user.id;
            state.loggedUser.username = user.username;
            if (user.isAdmin) {
                state.loggedUser.isAdmin = user.isAdmin
            }            
        } 
    },
    actions: {
    },
    modules: {
    }
})