<template>
    <div class="feed">
        <div class="my-5 py-5" v-if="loggedUser.id === 0">
            <p class="container h3 my-5 py-5">Vous êtes sur le réseau social interne de l'entreprise Groupomania,<br>merci de vous connecter pour pouvoir accéder au contenu.</p>
        </div>
        <div class="container mt-5" v-else>            
            <CreationPost />
            <AllPosts /> 
        </div>    
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