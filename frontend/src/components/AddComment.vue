<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-8 bg-white rounded shadow-sm p-3 d-flex align-items-center">
                <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar>
                <form class="w-100 text-center ml-4" @submit.prevent="sendComment">
                    <label for="text_post" class="m-0 mb-2">Ajouter un commentaire</label>  
                    <div class="container_comment d-flex align-items-center">                  
                        <div class="comment">
                            <textarea class="form-control textinput" name="text_post" id="text_post" placeholder="Votre commentaire" v-model="text" required></textarea> 
                        </div>  
                        <div>
                            <button type="submit" class="bg-dark text-white rounded-pill ml-3 px-2 py-2">Commenter</button>   
                        </div> 
                    </div>
                </form>                
            </div>
        </div>
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
    computed: {
        ...mapState(['loggedUser'])
    },
    methods: {
        sendComment() {
            let payload = {
                text: this.text,
                user_id: this.loggedUser.id
            };
            
            http.post(`/posts/${this.$route.params.post_id}/comments/`, payload)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
    }
}
</script>

<style lang="scss">
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