<template>
    <div class="row" v-if="user.id !== loggedUser.id || type === 'admin'">
        <div class="col">
            <b-avatar :src="user.avatar_url" size="2.5rem"></b-avatar>
            <router-link class="font-weight-bold m-0 ml-3 username" title="Voir tous ses posts" :to="{ name: 'UserPosts', params: { user_id: `${user.id}`, username: `${user.username}` } }">
                <span>{{ user.username }}</span>
            </router-link>
        </div>
        <div class="col" v-if="type === 'admin'">
            <span>{{ user.last_name }} {{ user.first_name }}</span>
        </div>
        <div class="col" v-if="type === 'admin'">
            <a :href="`mailto:${user.email}`" title="Envoyer un mail">{{ user.email }}</a>
        </div>
        <div class="col-2 col-xl-1" v-if="type === 'admin'">
            <a href="#" class="mr-4" aria-label="Modification d'un utilisateur" @click="togglePopup(); defineUserId(user.id)">
                <b-icon icon="person-lines-fill" font-scale="1.3" style="color: #11798B;"></b-icon>
            </a>
            <a href="javascript:;" aria-label="Suppression d'un utilisateur" @click="deleteUser(user.id)">
                <b-icon icon="person-x-fill" font-scale="1.3" variant="danger"></b-icon>
            </a>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import { mapActions, mapMutations, mapState } from "vuex";

export default {
    name: 'User',
    
    props: {
        type: String,
        user: Object
    },

    computed: {
        ...mapState(['loggedUser']),        
    },

    methods: {
        ...mapActions(['togglePopup']),

        ...mapMutations(['defineUserId']),

        deleteUser(user_id) {
            if (confirm("Cette action supprimera définitivement l'utilisateur.\nÊtes-vous sûr(e) de vouloir continuer ?")) {
                http.delete(`/users/${user_id}/${this.loggedUser.isAdmin}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>