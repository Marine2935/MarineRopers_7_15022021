<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-8 bg-white rounded shadow-sm p-3 d-flex align-items-center">
                <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar>
                <form class="d-flex ml-4" @submit.prevent="sendComment">
                    <!--<label class="m-0">Commentaire</label>-->
                    <textarea class="form-control" name="text_post" rows="1" placeholder="Votre commentaire" v-model="text" required></textarea>  
                    <button type="submit" class="bg-dark text-white rounded-pill ml-4 px-2 py-1">Commenter</button>                  
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