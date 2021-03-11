<template>
    <div class="test col-lg-8 bg-white rounded shadow-sm p-3 mt-5">
        <div class="d-flex justify-content-between">
            <div class="d-flex text-left">
                <b-avatar :src="post.user.avatar_url" size="3rem"></b-avatar>
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
            <PostParams :post_id="post.id" v-show="loggedUser.id === post.user_id || loggedUser.isAdmin" />
        </div>                    
        <router-link :to="{ name: 'SinglePost', params: { post_id: post.id } }">
            <p class="my-4 text-left">{{ post.text }}</p>
            <img :src="post.file_url" alt="Image du post" width="100%" max-height="360" v-if="post.file_url && (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif')" />
            <video width="100%" height="360" controls v-if="post.file_url && extension === 'mp4'">
                <source :src="post.file_url">
            </video>
            <iframe :src="post.link_url" class="border-0" width="100%" height="360" v-if="post.link_url && post.link_url !== 'null'"></iframe>
        </router-link>
        <hr>
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <Reactions :type="type" :postId="post.id" />
                <router-link class="ml-3 ml-sm-5" :to="{ name: 'SinglePost', params: { post_id: post.id } }">
                    <p class="comments m-0">{{ totalCount }} Commentaire<span v-if="totalCount > 1">s</span></p>
                </router-link>
            </div>                        
            <p class="d-none d-md-block m-0" v-show="post.last_update && post.last_update !== post.date_post">Modifié il y a 
                <span v-if="post.last_update_sec < 60">{{ post.last_update_sec }}s</span>
                <span v-if="post.last_update_min < 60 && post.last_update_min !== 0">{{ post.last_update_min }}min</span>
                <span v-if="post.last_update_hour < 24 && post.last_update_hour !== 0">{{ post.last_update_hour }}h</span>
                <span v-if="post.last_update_day < 30 && post.last_update_day !== 0">{{ post.last_update_day }} jour<span v-if="post.last_update_day > 1">s</span></span>  
                <span v-if="post.last_update_month < 12 && post.last_update_month !== 0">{{ post.last_update_month }} mois</span>
                <span v-if="post.last_update_year !== 0">{{ post.last_update_year }} année<span v-if="post.last_update_year > 1">s</span></span>
            </p>
        </div>                    
    </div>
</template>

<script>
import http from '@/http';
import PostParams from '@/components/PostParams';
import Reactions from '@/components/Reactions';
import { mapState } from "vuex";

export default {
    name: 'Post',

    components: {
        PostParams,
        Reactions        
    },

    data() {
        return {
            answersCount: null,
            extension: null
        }
    },

    props: {        
        post: Object,
        changeCount: Number,
        type: String
    },

    computed: {
        ...mapState(['loggedUser']),

        totalCount() {
            if (this.changeCount) {
                return this.post.comments.length + this.answersCount + this.changeCount 
            }
            return this.post.comments.length + this.answersCount
        }
    },

    created() {
        http.get(`/posts/${this.post.id}/answers`)
        .then(response => this.answersCount = response.data)
        .catch(error => console.log(error));

        if (this.post.file_url) {
            this.extension = this.post.file_url.split('.')[1];
        }      
    }
}
</script>

<style lang="scss">
.comments:hover {
    color: darken(#2c3e50, 20%);
}
</style>