<template>
    <div class="feed">
        <div class="my-5 py-5" v-if="loggedUser.id === 0">
            <p class="container h3 my-5 py-5">Vous êtes sur le réseau social interne de l'entreprise Groupomania,<br>merci de vous connecter pour pouvoir accéder au contenu.</p>
        </div>
        <div v-else>  
            <UsersList />
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-8 text-left bg-white d-flex rounded shadow-sm p-3 align-items-center">
                        <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar>
                        <div class="w-100 ml-3">
                            <button class="px-4 py-2 rounded-pill border-0 text-left text-secondary w-100" @click="togglePopup(); definePost();">
                                Que voulez-vous dire, {{ loggedUser.username }} ?
                            </button>
                        </div>
                    </div>
                </div>           
                <FormPost @added="addPost" />
                <div class="mt-4">
                    <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                        <Post :post="post" :type="'all_posts'" />
                    </div>  
                    <div v-if="!posts">
                        <p>Aucun post !</p>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import http from '@/http';
import FormPost from '@/components/FormPost';
import Post from '@/components/Post';
import UsersList from '@/components/UsersList';
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
    name: 'Feed',
    components: {
        FormPost,
        Post,
        UsersList
    },
    data() {
        return {
            posts: null
        }
    },
    computed: {
        ...mapState(['loggedUser']),
        
    },
    created() {
        http.get('/posts/')
        .then(response => this.posts = response.data)
        .catch(error => console.log(error));
    },
    methods: {
        ...mapMutations(['definePost']),

        ...mapActions(['togglePopup']),

        addPost(post) {
            this.posts.splice(0, 0, post)
        } 
    }
}
</script>