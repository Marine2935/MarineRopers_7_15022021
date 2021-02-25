<template>
    <div>
        <div v-if="loggedUser.id !== 0">
            <b-dropdown data-toggle="dropdown" block variant="link" id="dropdown-offset"  offset="-70" toggle-class="text-decoration-none" no-caret>
                <template #button-content><b-avatar></b-avatar></template>
                <b-dropdown-item class="text-dark py-1" :to="{ name: 'UserProfil', params: { user_id: `${loggedUser.id}`, username: `${loggedUser.username}` } }">
                    <b-icon class="mr-2" icon="person-square"></b-icon>Mon profil
                </b-dropdown-item>
                <b-dropdown-item class="text-dark py-1" :to="{ name: 'UserPosts', params: { user_id: `${loggedUser.id}`, username: `${loggedUser.username}` } }">
                    <b-icon class="mr-2" icon="card-heading"></b-icon>Mes posts
                </b-dropdown-item>
                <b-dropdown-divider class="my-2"></b-dropdown-divider>
                <b-dropdown-item class="text-dark" @click="loggOut"><b-icon class="mr-2" icon="power"></b-icon>Déconnexion</b-dropdown-item>
            </b-dropdown>
        </div>
        <div v-else>
            <router-link to="/signup" class="text-white font-weight-bold">Inscription</router-link> |
            <router-link to="/" class="text-white font-weight-bold">Connexion</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'NavBar',
    computed: {
        ...mapState(['loggedUser'])
    },
    methods: {
        loggOut() {
            sessionStorage.removeItem('token');
            this.loggedUser.id = 0;
            this.loggedUser.username = '';
            this.loggedUser.isAdmin = false;
            this.$router.push('/')
        }
    }
}
</script>