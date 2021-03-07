import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedUser: {
            id: 0,            
            username: null,
            avatarUrl: null,
            isAdmin: false,
            token: ''
        },
        popup: false,
        postId: null,
        userId: null
    },
    mutations: {
        initUser(state, user) {
            state.loggedUser.id = user.id;
            state.loggedUser.username = user.username;
            state.loggedUser.avatarUrl = user.avatar_url;
            state.loggedUser.isAdmin = user.isAdmin;
            state.loggedUser.token = user.token;
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
        },
        
        defineUserId(state, user_id) {
            state.userId = user_id
        }
    },
    actions: {
        togglePopup(context) {
            context.commit('changePopup');
        }
    },
    plugins: [createPersistedState()],
})