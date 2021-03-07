<template>
    <div class="m-5">
        <h1>Liste des membres</h1>
        <div class="row justify-content-center mt-5" v-if="users">
            <div class="col-12 text-left my-3" v-for="user in users" :key="user.id">
                <User :user="user" :type="'admin'" />
            </div>
        </div>
        <EditUser />
    </div>
</template>

<script>
import http from '@/http';
import EditUser from '@/components/EditUser';
import User from '@/components/User';
import { mapState } from "vuex";

export default {
    name: 'Users',
    components: {
        EditUser,
        User
    },
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
        editUser(user_id) {
            console.log(user_id)
        },

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