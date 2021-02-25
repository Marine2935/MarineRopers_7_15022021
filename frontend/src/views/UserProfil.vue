<template>
    <div class="container mt-5" v-if="user">
        <h1 class="pb-4">Mon profil</h1>
        <section class="my-5">
            <h2>Mes informations personnelles</h2><hr>
            <div class="my-5">
                <p>Nom d'utilisateur : {{ user.username }}</p>
                <p>Nom: {{ user.last_name }}</p>
                <p>Prénom: {{ user.first_name }}</p>
                <p>Adresse mail : {{user.email }}</p>
            </div>
        </section>
        <section class="pt-4">
            <h2>Informations diverses</h2><hr>
            <div class="my-5">
                <p>Nombre de posts : {{ user.posts_count }}</p>
                <p>Nombre commentaires : {{ user.comments_count }}</p>
                <p>Nombre de likes : {{ user.likes_count }}</p>
                <p>Nombre de dislikes : {{ user.dislikes_count }}</p>
            </div>
        </section>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

export default {
    name: 'UserProfil',
    data() {
        return {
            user: null
        }
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    created() {
        http.get(`/users/${this.loggedUser.id}`)
        .then(response => this.user = response.data)
        .catch(error => console.log(error));
    }
}
</script>