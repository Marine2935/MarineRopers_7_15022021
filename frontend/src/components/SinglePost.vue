<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="test col-8 bg-white rounded shadow-sm p-3 my-3" v-if="post">
                <div class="d-flex justify-content-between">
                    <div class="d-flex text-left">
                        <b-avatar :src="post.user.avatar_url" size="3rem"></b-avatar><!-- image profil -->
                        <div class="ml-3">
                            <p class="font-weight-bold m-0">{{ post.user.username }}</p>
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
                <p class="my-4">{{ post.text }}</p>
                <hr>
                <div class="d-flex justify-content-between">                    
                    <div class="d-flex">
                        <Reactions :type="'single_post'" />
                        <p class="m-0 ml-5">{{ post.comments.length }} Commentaire<span v-if="post.comments.length > 1">s</span></p>
                    </div>  
                    <p class="m-0" v-if="post.last_update && post.last_update !== post.date_post">Modifié il y a 
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
    </div>
</template>

<script>
import http from '@/http';
import PostParams from '@/components/PostParams';
import Reactions from '@/components/Reactions';
import { mapState } from "vuex";

export default {
    name: 'SinglePost',
    components: {
        PostParams,
        Reactions        
    },
    data() {
        return {
            post: null
        }
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    created() {
        http.get(`/posts/${this.$route.params.post_id}`)
        .then(response=> this.post = response.data)
        .catch(error => console.log(error));       
    }
}
</script>