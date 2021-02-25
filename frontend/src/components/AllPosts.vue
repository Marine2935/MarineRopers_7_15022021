<template>
    <div class="mt-4">
        <div class="row justify-content-center" v-for="post in posts" :key="post.id">
            <div class="test col-8 bg-white rounded shadow-sm p-3 my-3">
                <div class="d-flex justify-content-between">
                    <div class="d-flex text-left">
                        <b-avatar></b-avatar><!-- image profil -->
                        <div class="ml-3">
                            <router-link class="font-weight-bold m-0 username" title="Voir tous ses posts" :to="{ name: 'UserPosts', params: { user_id: `${post.user.id}`, username: `${post.user.username}` } }">
                                {{ post.user.username }}
                            </router-link>
                            <p class="m-0">
                                <span v-if="post.date_post_sec < 60">{{ post.date_post_sec }}s</span>
                                <span v-if="post.date_post_min < 60 && post.date_post_min !== 0">{{ post.date_post_min }}min</span>
                                <span v-if="post.date_post_hour < 24 && post.date_post_hour !== 0">{{ post.date_post_hour }}h</span>
                                <span v-if="post.date_post_day < 30 && post.date_post_day !== 0">{{ post.date_post_day }} jour<span v-if="post.date_post_day > 1">s</span></span>  
                                <span v-if="post.date_post_month < 12 && post.date_post_month !== 0">{{ post.date_post_month }} mois</span>
                                <span v-if="post.date_post_year !== 0">{{ post.date_post_year }} année<span v-if="post.date_post_year > 1">s</span></span>                              
                            </p>
                        </div>
                    </div>
                    <PostParams :post_id="post.id" v-show="loggedUser.id === post.user_id" />
                </div>                    
                <router-link :to="{ name: 'Post', params: { post_id: post.id } }">
                    <p class="my-4">{{ post.text }}</p>
                </router-link>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <Reactions :type="'all_posts'" :postId="post.id" />
                        <router-link :to="{ name: 'Post', params: { post_id: post.id } }">
                            <p class="m-0 ml-5">{{ post.comments.length }} Commentaire<span v-if="post.comments.length > 1">s</span></p>
                        </router-link>
                    </div>                        
                    <p class="m-0" v-show="post.last_update && post.last_update !== post.date_post">Modifié il y a 
                        <span v-if="post.last_update_sec < 60">{{ post.last_update_sec }}s</span>
                        <span v-if="post.last_update_min < 60 && post.last_update_min !== 0">{{ post.last_update_min }}min</span>
                        <span v-if="post.last_update_hour < 24 && post.last_update_hour !== 0">{{ post.last_update_hour }}h</span>
                        <span v-if="post.last_update_day < 30 && post.last_update_day !== 0">{{ post.last_update_day }} jour<span v-if="post.last_update_day > 1">s</span></span>  
                        <span v-if="post.last_update_month < 12 && post.last_update_month !== 0">{{ post.last_update_month }} mois</span>
                        <span v-if="post.last_update_year !== 0">{{ post.last_update_year }} année<span v-if="post.last_update_year > 1">s</span></span>
                    </p>
                </div>                    
            </div>
        </div>  
        <div v-if="!posts">
            <p>Aucun post !</p>
        </div>
    </div>  
</template>

<script>
import http from '@/http';
import PostParams from '@/components/PostParams';
import Reactions from '@/components/Reactions';
import { mapState } from "vuex";

export default {
    name: 'AllPosts',
    components: {
        PostParams,
        Reactions        
    },
    data() {
        return {
            posts: null
        }
    },
    props: {
        type: String
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    created() {
        if (this.type === 'user_posts') {
            http.get(`/users/${this.$route.params.user_id}/posts`)
            .then(response => this.posts = response.data)
            .catch(error => console.log(error));   
        } else {
            http.get('/posts/')
            .then(response => this.posts = response.data)
            .catch(error => console.log(error));  
        }              
    }    
}
</script>

<style scoped lang="scss">
.username:hover {
    text-decoration: underline!important;
}
</style>