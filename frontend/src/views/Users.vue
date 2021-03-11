<template>
    <div class="m-3 m-sm-5">
        <div v-if="loggedUser.isAdmin">
            <h2>Liste des membres</h2>
            <div class="row justify-content-center mt-5" v-if="users">
                <div class="col-12 text-left my-3" v-for="user in users" :key="user.id">
                    <User :user="user" :type="'admin'" @deleted="deleteUser" />
                </div>
            </div>
            <EditUser @edited="editUser" />
        </div>
        <div class="mt-5" v-else>
            <p class="h4">--- Section réservée aux administrateurs ---</p>
        </div>
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
        deleteUser(deletedUser) {
            let object = '';
            
            this.users.forEach((user) => {
                if (user.id === deletedUser.id) {
                    object = user;
                }
            });

            let index = this.users.indexOf(object);

            this.users.splice(index, 1);
        },

        editUser(editUser) {
            let object = '';
            
            this.users.forEach((user) => {
                if (user.id === editUser.id) {
                    object = user;
                }
            });

            let index = this.users.indexOf(object);

            this.users.splice(index, 1, editUser);
        }
    }
}
</script>