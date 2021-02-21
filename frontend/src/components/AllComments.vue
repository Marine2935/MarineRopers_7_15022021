<template>
    <div class="container mt-4">
        <div class="row justify-content-center" v-for="comment in comments" :key="comment.id">
            <div class="col-1 my-3 pt-1">
                <b-avatar></b-avatar><!-- image profil -->
            </div>
            <div class="test col-7 bg-white rounded shadow-sm p-3 my-3">
                <div class="text-left d-flex align-items-center">                    
                    <p class="font-weight-bold m-0 ml-2">{{ comment.User.username }}</p>
                </div>
                <div class="mb-3">
                    {{ comment.text }}
                </div>
                <div class="text-right m-0">
                    {{ comment.date_comment }}
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