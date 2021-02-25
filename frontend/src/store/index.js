import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedUser: {
            id: 0,
            isAdmin: false
        }
    },
    mutations: {
        initUser(state, user) {
            state.loggedUser.id = user.id;
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