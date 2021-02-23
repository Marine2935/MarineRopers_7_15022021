<template>
    <div class="d-flex">
        <p class="m-0">
            <span>{{ reactions[0].like }}</span>
            <button class="border-0 bg-white btn-like" @click="react({ has_liked: true })">
                <b-icon icon="hand-thumbs-up"></b-icon>
            </button>
        </p>
        <p class="m-0 ml-2">
            <span>{{ reactions[0].dislike }}</span>
            <button class="border-0 bg-white btn-dislike" @click="react({ has_liked: false })">
                <b-icon icon="hand-thumbs-down"></b-icon>
            </button>
        </p>
    </div>
</template>

<script>
import http from '@/http';

export default {
    name: 'Reactions',
    data() {
        return {
            reactions: null
        }
    },
    props: {
        type: String, 
        postId: Number,
        commentId: Number
    },
    created() {
        if (this.type == 'all_posts') {
            http.get(`/posts/${this.postId}/reactions`)
            .then(response=> this.reactions = response.data)
            .catch(error => console.log(error)); 
        }

        if (this.type == 'single_post') {
            http.get(`/posts/${this.$route.params.post_id}/reactions`)
            .then(response=> this.reactions = response.data)
            .catch(error => console.log(error)); 
        }

        if (this.type == 'comment') {
            http.get(`/posts/${this.$route.params.post_id}/comments/${this.commentId}/reactions`)
            .then(response=> this.reactions = response.data)
            .catch(error => console.log(error)); 
        }
              
    },
    methods: {
        react(params) {
            let payload = params

            if (this.type == 'all_posts' || this.type == 'single_post') {
                http.post(`/posts/${this.$route.params.post_id}/reactions`, payload)
                .then(() =>  window.location.reload())
                .catch(error => console.log(error));  
            }

            if (this.type == 'comment') {
                http.post(`/posts/${this.$route.params.post_id}/comments/${this.commentId}/reactions`, payload)
                .then(() =>  window.location.reload())
                .catch(error => console.log(error)); 
            }
        }
    }
}
</script>