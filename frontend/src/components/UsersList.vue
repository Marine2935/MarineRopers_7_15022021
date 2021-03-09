<template>
    <div class="row justify-content-end" v-if="users">
        <div class="col-2 bg-white rounded shadow mr-3 p-4 usersList">
            <h5 class="mb-4 font-weight-bold">Utilisateurs</h5>
            <div class="text-left my-3" v-for="user in users" :key="user.id">
                <User :user="user" />
            </div>                
        </div>
    </div>
</template>

<script>
import http from '@/http';
import User from '@/components/User';

export default {
    name: 'UsersList',

    components: {
        User
    },

    data() {
        return {
            users: null
        }
    },
    
    created() {
        http.get('/users/')
        .then(response => this.users = response.data)
        .catch(error => console.log(error));
    }
}
</script>

<style lang="scss">
.usersList {
    position: fixed;
}
</style>