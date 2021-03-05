<template>
    <div class="container mt-5">
        <h1>Liste des membres</h1>
        <div class="row justify-content-center mt-5" v-if="users">
            <div class="col-12 text-left my-3" v-for="user in users" :key="user.id">
                <div class="row">
                    <div class="col-2">
                        <b-avatar :src="user.avatar_url" size="3rem"></b-avatar>
                    </div>
                    <div class="col">
                        <router-link class="font-weight-bold m-0 ml-3 username" title="Voir tous ses posts" :to="{ name: 'UserPosts', params: { user_id: `${user.id}`, username: `${user.username}` } }">{{ user.username }}
                        </router-link>
                    </div>
                    <div class="col">
                        <span>{{ user.last_name }} {{ user.first_name }}</span>
                    </div>
                    <div class="col">
                        <span>{{ user.email }}</span>
                    </div>
                    <div class="col-1">
                        <a href="javascript:;" @click="deleteUser(user.id)"><b-icon icon="person-x-fill" font-scale="1.3" variant="danger"></b-icon></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

export default {
    name: 'Users',
    data() {
        return {
            users: null
        }
    },
    computed: {
        ...mapState(['loggedUser'])        
    },
    created() {
        http.get('/users/')
        .then(response => this.users = response.data)
        .catch(error => console.log(error));
    },
    methods: {
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