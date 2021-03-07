<template>
    <div class="d-flex align-items-center">
        <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar>
        <form class="w-100 text-center ml-4" @submit.prevent="sendComment">
            <label for="text_post" class="font-weight-bold m-0 mb-2"><span v-if="type === 'answer'">Répondre au commentaire</span><span v-else>Ajouter un commentaire</span></label>  
            <div class="container_comment d-flex align-items-center">                  
                <div class="comment">
                    <textarea class="form-control textinput" name="text_post" id="text_post" placeholder="Votre message" v-model="text" required></textarea> 
                </div>  
                <div>
                    <button type="submit" class="bg-dark text-white rounded-pill ml-3 px-2 py-2"><span v-if="type === 'answer'">Répondre</span><span v-else>Commenter</span></button>   
                </div> 
            </div>
        </form>                
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

export default {
    name: 'AddComment',
    data() {
        return {
            text: ''
        }
    },
    props: {
        type: null,
        commentId: null
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    methods: {
        sendComment() {
            let payload = {
                text: this.text,
                user_id: this.loggedUser.id
            };

            if (this.type === 'answer') {
                http.post(`/posts/${this.$route.params.post_id}/comments/${this.commentId}/answers`, payload)
                .then(response => {
                    this.$emit("added", response.data)
                })
                .catch(error => console.log(error));
            } else {
                http.post(`/posts/${this.$route.params.post_id}/comments/`, payload)
                .then(response => {
                    this.$emit("added", response.data)
                })
                .catch(error => console.log(error));
            }            
        }
    }
}
</script>

<style scoped lang="scss">
.container_comment {
    max-width: 820px;
    margin: 0px auto;
}

.comment {
    float: left;
    width: 100%;
    height: auto;
}

.textinput {
    float: left;
    width: 100%;
    outline: none;
    resize: none;
}
</style>