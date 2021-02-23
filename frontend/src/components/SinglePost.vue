<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="test col-8 bg-white rounded shadow-sm p-3 my-3">
                <div class="text-left d-flex">
                    <b-avatar></b-avatar><!-- image profil -->
                    <div class="ml-3">
                        <p class="font-weight-bold m-0">{{ post.user.username }}</p>
                        <p>
                            <span v-if="post.date_post_second < 60">{{ post.date_post_second }}s</span>
                            <span v-if="post.date_post_minute < 60 && post.date_post_minute !== 0">{{ post.date_post_minute }}min</span>
                            <span v-if="post.date_post_hour < 24 && post.date_post_hour !== 0">{{ post.date_post_hour }}h</span>
                            <span v-if="post.date_post_day < 30 && post.date_post_day !== 0">{{ post.date_post_day }} jour<span v-if="post.date_post_day > 1">s</span></span>  
                            <span v-if="post.date_post_month < 12 && post.date_post_month !== 0">{{ post.date_post_month }} mois</span>
                            <span v-if="post.date_post_year !== 0">{{ post.date_post_year }} année<span v-if="post.date_post_year > 1">s</span></span>                              
                        </p>
                    </div>
                </div>
                <p class="mb-4">{{ post.text }}</p>
                <hr>
                <div class="d-flex justify-content-between">                    
                    <div class="d-flex">
                        <Reactions :type="'single_post'" />
                        <p class="m-0 ml-5">{{ post.comments.length }} Commentaire<span v-if="post.comments.length > 1">s</span></p>
                    </div>  
                    <p class="m-0" v-if="post.last_update">Modifié il y a 
                        <span v-if="post.last_update_second < 60">{{ post.last_update_second }}s</span>
                        <span v-if="post.last_update_minute < 60 && post.last_update_minute !== 0">{{ post.last_update_minute }}min</span>
                        <span v-if="post.last_update_hour < 24 && post.date_post_hour !== 0">{{ post.last_update_hour }}h</span>
                        <span v-if="post.last_update_day < 30 && post.date_post_day !== 0">{{ post.last_update_day }} jour<span v-if="post.date_post_day > 1">s</span></span>  
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
import Reactions from '@/components/Reactions';

export default {
    name: 'SinglePost',
    components: {
        Reactions        
    },
    data() {
        return {
            post: null
        }
    },
    created() {
        http.get(`/posts/${this.$route.params.post_id}`)
        .then(response=> this.post = response.data)
        .catch(error => console.log(error));       
    }
}
</script>