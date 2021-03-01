import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedUser: {
            id: 0,            
            username: null,
            avatarUrl: null,
            isAdmin: false
        },
        popup: false,
        postId: null
    },
    mutations: {
        initUser(state, user) {
            state.loggedUser.id = user.id;
            state.loggedUser.username = user.username;
            state.loggedUser.avatarUrl = user.avatar_url;
            state.loggedUser.isAdmin = user.isAdmin;
        },
        changePopup(state) {
            state.popup = !state.popup
        },
        definePost(state, post_id) {
            if (post_id) {
               state.postId = post_id; 
            } else {
                state.postId = null;
            }
        }   
    },
    actions: {
        displayPopup(context) {
            context.commit('changePopup');
        }
    },
    modules: {
    }
})