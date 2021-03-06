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
        <div class="col-1" v-if="type === 'admin'">
            <a href="javascript:;" @click="deleteUser(user.id)"><b-icon icon="person-x-fill" font-scale="1.3" variant="danger"></b-icon></a>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'User',
    props: {
        type: String,
        user: Object
    },
    computed: {
        ...mapState(['loggedUser']),
        
    }
}
</script>