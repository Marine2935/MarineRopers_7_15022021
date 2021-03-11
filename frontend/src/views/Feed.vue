<template>
    <div class="feed">
        <div class="my-md-5 py-md-5" v-if="loggedUser.id === 0">
            <p class="container h3 my-5 py-5">Vous êtes sur le réseau social interne de l'entreprise Groupomania,<br>merci de vous connecter pour pouvoir accéder au contenu.</p>
            <p><router-link to="/" class="text-white font-weight-bold rounded-pill shadow p-3 btn_login">Retour à la page de connexion</router-link></p>
        </div>
        <div v-else>  
            <UsersList class="d-none d-lg-flex" />
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-left bg-white d-flex rounded shadow-sm p-3 align-items-center">
                        <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar>
                        <div class="w-100 ml-3">
                            <button class="px-4 py-2 rounded-pill border-0 text-left text-secondary w-100" @click="togglePopup(); definePost();">
                                Que voulez-vous dire, {{ loggedUser.username }} ?
                            </button>
                        </div>
                    </div>
                </div>           
                <FormPost @added="addPost" @updated="updatePost" />
                <div>
                    <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                        <Post :post="post" :type="'all_posts'" @deleted="deletePost" />
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
import { mapActions, mapMutations, mapState } from "vuex";

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
        ...mapState(['loggedUser'])        
    },

    created() {
        http.get('/posts/')
        .then(response => this.posts = response.data)
        .catch(error => console.log(error));
    },

    methods: {
        ...mapActions(['togglePopup']),

        ...mapMutations(['definePost']),        

        addPost(post) {
            this.posts.splice(0, 0, post);
            
        },
        
        deletePost(post_id) {
            let object = '';
            
            this.posts.forEach((post) => {
                if (post.id === post_id) {
                    object = post;
                }
            });

            let index = this.posts.indexOf(object); 
            
            this.posts.splice(index, 1);
        },

        updatePost(updatePost) {
            let object = '';
            
            this.posts.forEach((post) => {
                if (post.id === updatePost.id) {
                    object = post;
                }
            });

            let index = this.posts.indexOf(object);

            this.posts.splice(index, 1, updatePost);
        }        
    }
}
</script>

<style scoped lang="scss">
.btn_login {
    background-color: #116E8B;

    &:hover {
        background-color: darken(#116E8B, 10%)!important;
    }
}
</style>