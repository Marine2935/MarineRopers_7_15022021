<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="test col-8 bg-white rounded shadow-sm p-3 my-3">
                <div class="text-left d-flex">
                    <b-avatar></b-avatar><!-- image profil -->
                    <div class="ml-3">
                        <p class="font-weight-bold m-0">{{ post.User.username }}</p>
                        <p>{{ post.date_post }}</p>
                    </div>
                </div>
                <p>{{ post.text }}</p>
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
    name: 'SinglePost',
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