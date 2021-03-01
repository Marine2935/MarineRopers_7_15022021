<template>
    <div class="container my-5">
        <h1>
            <span v-if="loggedUser.username == $route.params.username">Vos Posts</span>
            <span v-else>Posts de {{ $route.params.username }}</span>
        </h1>
        <div class="mt-4">
            <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                <Post :post="post" :type="'all_posts'" />
            </div>  
            <div v-if="!posts">
                <p>Aucun post !</p>
            </div>
        </div>
        <FormPost />
    </div>
</template>

<script>
import http from '@/http';
import Post from '@/components/Post';
import FormPost from '@/components/FormPost';
import { mapState } from "vuex";

export default {
    name: 'UserPosts',
    components: {
        Post,
        FormPost
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
    }
}
</script>