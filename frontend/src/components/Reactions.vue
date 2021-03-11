<template>
    <div class="d-flex" v-if="reactions">
        <p class="m-0">
            <a href="#" :title="`${usersLiked}`">{{ reactions[0].like }}</a>
            <button class="border-0 btn-like button_bg" aria-label="J'aime ce contenu" @click="react(true)">
                <b-icon icon="arrow-up-circle-fill" variant="success" font-scale="1.5" v-if="loggedUserLiked"></b-icon>
                <b-icon icon="arrow-up-circle" font-scale="1.5" v-else></b-icon>                
            </button>
        </p>
        <p class="m-0 ml-2">
            <a href="#" :title="`${usersDisliked}`">{{ reactions[0].dislike }}</a>
            <button class="border-0 btn-dislike button_bg" aria-label="Je n'aime ce contenu" @click="react(false)">
                <b-icon icon="arrow-down-circle-fill" variant="danger" font-scale="1.5" v-if="loggedUserDisliked"></b-icon>
                <b-icon icon="arrow-down-circle" font-scale="1.5" v-else></b-icon>                
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
            reactions: null,
            loggedUserLiked: false,
            loggedUserDisliked: false,
            usersLiked: [],
            usersDisliked: []
        }
    },

    props: {
        commentId: Number, 
        postId: Number,
        type: String
    },

    computed: {
        ...mapState(['loggedUser'])                
    },

    created() {
        http.get(this.defineUrl())
            .then(response => {
                this.reactions = response.data;

                if (!this.reactions[0]) {
                    this.reactions = [{like: 0, dislike: 0}]; 
                } else {
                    this.reactions.forEach((reaction) => {
                        if (reaction.has_liked) {
                            this.usersLiked.push(`\n${reaction.user.username}`);

                            if (reaction.user_id === this.loggedUser.id) {
                                this.loggedUserLiked = true;
                            }
                        } else {
                            this.usersDisliked.push(`\n${reaction.user.username}`);
                            
                            if (reaction.user_id === this.loggedUser.id) {
                                this.loggedUserDisliked = true;
                            }
                        }
                    })
                }
            })
            .catch(error => console.log(error));            
    },

    methods: {
        defineUrl() {
            if (this.type == 'all_posts') {
                return `/posts/${this.postId}/reactions`;
            }

            if (this.type == 'single_post') {
                return `/posts/${this.$route.params.post_id}/reactions`; 
            }

            if (this.type == 'comment') {
                return `/posts/${this.$route.params.post_id}/comments/${this.commentId}/reactions`;            
            }
        },

        deleteUserFromArray(array, user_id) {
            let object = '';
            
            array.forEach((user) => {
                if (user.id === user_id) {
                    object = user;
                }
            });

            let index = array.indexOf(object);

            array.splice(index, 1);
        },

        react(params) {
            let payload = {
                has_liked: params,
                user_id: this.loggedUser.id
            };

            if ((params === true && this.loggedUserLiked) || (params === false && this.loggedUserDisliked)) {
                http.delete(`${this.defineUrl()}/${this.loggedUser.id}/${this.loggedUser.isAdmin}`)
                .then(() => {
                    if (params === true) {
                        this.reactions[0].like--;
                        this.loggedUserLiked = false;
                        this.deleteUserFromArray(this.usersLiked, this.loggedUser.id);                        
                    }

                    if (params === false) {
                        this.reactions[0].dislike--;
                        this.loggedUserDisliked = false;
                        this.deleteUserFromArray(this.usersDisliked, this.loggedUser.id); 
                    }
                })
            } else {
                http.post(this.defineUrl(), payload)
                .then(() => {
                    if (params === true) {
                        this.reactions[0].like++;
                        this.loggedUserLiked = true;
                        this.usersLiked.push(`\n${this.loggedUser.username}`);
                    }

                    if (params === false) {
                        this.reactions[0].dislike++;
                        this.loggedUserDisliked = true;
                        this.usersDisliked.push(`\n${this.loggedUser.username}`);
                    }
                })
                .catch(error => console.log(error)); 
            }
        }
    }
}
</script>