<template>
    <div class="container mt-4">
            <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                <div class="test col-8 bg-white rounded shadow-sm p-3 my-3">
                    <div class="text-left d-flex">
                        <b-avatar></b-avatar><!-- image profil -->
                        <div class="ml-3">
                            <p class="font-weight-bold m-0">{{ post.User.username }}</p>
                            <p>{{ post.date_post }}</p>
                        </div>
                    </div>
                    <router-link :to="{ name: 'Post', params: { post_id: post.id } }" class="stretched-link text-dark">
                        <p>{{ post.text }}</p>
                    </router-link>
                    <div class="d-flex justify-content-between">
                        <p class="m-0">{{}} Commentaire<span v-if="comments > 1">s</span></p>
                        <p class="m-0" v-if="post.last_update">Dernière modification : {{ post.last_update }}</p>
                    </div>                    
                </div>
            </div>  
        </div>  
</template>

<script>
import http from '../http';

export default {
    name: 'AllPosts',
    data() {
        return {
            posts: null
        }
    },
    created() {
        http.get('/posts/')
            .then(response => this.posts = response.data)
            .catch(error => console.log(error));        
    }
}
</script>