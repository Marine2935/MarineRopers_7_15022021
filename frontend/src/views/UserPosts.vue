<template>
    <div>
        <UsersList class="d-none d-lg-flex" />
        <div class="container mt-5">
            <h2>
                <span v-if="loggedUser.username == $route.params.username">Vos Posts</span>
                <span v-else>Posts de {{ $route.params.username }}</span>
            </h2>
            <div>
                <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                    <Post @deleted="deletePost" :post="post" :type="'all_posts'" />
                </div>  
                <div v-if="posts && posts.length === 0">
                    <p>Aucun post !</p>
                </div>
            </div>
            <FormPost @updated="updatePost" />
        </div>
    </div>
</template>

<script>
import http from '@/http';
import FormPost from '@/components/FormPost';
import Post from '@/components/Post';
import UsersList from '@/components/UsersList';
import { mapState } from "vuex";

export default {
    name: 'UserPosts',

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
        http.get(`/users/${this.$route.params.user_id}/posts`)
        .then(response => this.posts = response.data)
        .catch(error => console.log(error));
    },
    
    methods: {        
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

        getUserPosts() {
            http.get(`/users/${this.$route.params.user_id}/posts`)
            .then(response => this.posts = response.data)
            .catch(error => console.log(error)); 
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
    },

    watch: {
        $route() {
            this.getUserPosts();  
        }
    }
}
</script>