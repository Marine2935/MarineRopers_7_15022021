<template>
    <div class="home">        
        <CreationPost /><br>
        <div class="container">
            <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                <div class="test col-8 bg-white rounded shadow-sm p-3 my-3">
                    <div class="text-left d-flex">
                        <b-avatar></b-avatar><!-- image profil -->
                        <div class="ml-3">
                            <p class="font-weight-bold m-0">{{ post.User.username }}</p>
                            <p>{{ post.date_post }}</p>
                        </div>
                    </div>
                    <a class="stretched-link text-dark">
                        <p>{{ post.text }}</p>
                    </a>
                    <div class="d-flex justify-content-between">
                        <p class="m-0">{{}} Commentaire<span v-if="comments > 1">s</span></p>
                        <p class="m-0">{{ post.last_update }}</p>
                    </div>                    
                </div>
            </div>  
        </div>  
    </div>
</template>

<script>
import CreationPost from '@/components/CreationPost.vue';
import http from '../http';

export default {
    name: 'Home',
    data() {
        return {
            posts: null
        }
    },
    components: {
        CreationPost
    },
    methods: {
    },
    created() {
        http.get('/posts/')
            .then(response => this.posts = response.data);        
    }
}
</script>

<style lang="scss">
a {
    cursor: pointer;
    text-decoration: none!important;
}
</style>