<template>
    <div class="feed">
        <div class="my-5 py-5" v-if="loggedUser.id === 0">
            <p class="container h3 my-5 py-5">Vous êtes sur le réseau social interne de l'entreprise Groupomania,<br>merci de vous connecter pour pouvoir accéder au contenu.</p>
        </div>              
        <CreationPost />
        <AllPosts />        
    </div>
</template>

<script>
import { mapState } from "vuex";
import CreationPost from '@/components/CreationPost';
import AllPosts from '@/components/AllPosts';

export default {
    name: 'Feed',
    components: {
        CreationPost,
        AllPosts
    },
    computed: {
        ...mapState(['loggedUser'])
    }   
}
</script>

<style lang="scss">
a {
    cursor: pointer;
    text-decoration: none!important;
}
</style>