<template>
    <div class="container mt-4">
        <div class="row justify-content-center" v-for="comment in comments" :key="comment.id">
            <div class="col-1 my-3 pt-1">
                <b-avatar></b-avatar><!-- image profil -->                
            </div>
            <div class="test col-7 my-2">
                <div class="row bg-white rounded shadow-sm p-3">
                    <div class="col pl-1">
                        <div class="text-left align-items-center">                    
                            <p class="font-weight-bold m-0">{{ comment.User.username }}</p>                    
                        </div>
                        <div class="mb-2">
                            {{ comment.text }}
                        </div>
                    </div>
                </div>
                <div class="row text-right"> 
                    <div class="col text-right mt-2">
                        <span v-if="comment.date_comment_second < 60">{{ comment.date_comment_second }}s</span>
                        <span v-if="comment.date_comment_minute < 60 && comment.date_comment_minute !== 0">{{ comment.date_comment_minute }}min</span>
                        <span v-if="comment.date_comment_hour < 24 && comment.date_comment_hour !== 0">{{ comment.date_comment_hour }}h</span>
                        <span v-if="comment.date_comment_day < 30 && comment.date_comment_day !== 0">{{ comment.date_comment_day }}j</span>  
                        <span v-if="comment.date_comment_month < 12 && comment.date_comment_month !== 0">{{ comment.date_comment_month }} mois</span>
                        <span v-if="comment.date_comment_year !== 0">{{ comment.date_comment_year }} année<span v-if="comment.date_comment_year > 1">s</span></span>
                    </div>
                </div>               
            </div>
        </div>  
    </div>  
</template>

<script>
import http from '../http';

export default {
    name: 'AllComments',
    data() {
        return {
            comments: null
        }
    },
    created() {
        http.get(`/posts/${this.$route.params.post_id}/comments/`)
        .then(response => this.comments = response.data)
        .catch(error => console.log(error));
    }
}
</script>