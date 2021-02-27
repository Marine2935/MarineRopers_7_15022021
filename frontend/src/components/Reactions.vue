<template>
    <div class="d-flex" v-if="reactions">
        <p class="m-0">
            <span>{{ reactions[0].like }}</span>
            <button class="border-0 btn-like button_bg" @click="react(true)">
                <b-icon icon="hand-thumbs-up"></b-icon>
            </button>
        </p>
        <p class="m-0 ml-2">
            <span>{{ reactions[0].dislike }}</span>
            <button class="border-0 btn-dislike button_bg" @click="react(false)">
                <b-icon icon="hand-thumbs-down"></b-icon>
            </button>
        </p>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

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
    computed: {
        ...mapState(['loggedUser'])                
    },
    created() {
        http.get(this.defineUrl())
            .then(response => {
                this.reactions = response.data

                if (!this.reactions[0]) {
                    this.reactions = [{like: 0, dislike: 0}] 
                }               
            })
            .catch(error => console.log(error));            
    },
    methods: {
        defineUrl() {
            if (this.type == 'all_posts') {
                return `/posts/${this.postId}/reactions` 
            }

            if (this.type == 'single_post') {
                return `/posts/${this.$route.params.post_id}/reactions` 
            }

            if (this.type == 'comment') {
                return `/posts/${this.$route.params.post_id}/comments/${this.commentId}/reactions`            
            }
        },
        react(params) {
            let payload = {
                has_liked: params,
                user_id: this.loggedUser.id
            };

            http.post(this.defineUrl(), payload)
            .then(() => {
                if (params === true) {
                    this.reactions[0].like++
                }

                if (params === false) {
                    this.reactions[0].dislike++
                }
            })
            .catch(error => console.log(error)); 
        }
    }
}
</script>