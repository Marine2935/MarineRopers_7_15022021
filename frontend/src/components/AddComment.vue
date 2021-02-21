<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-8 bg-white rounded shadow-sm p-3 d-flex justify-content-between align-items-center">
                <b-avatar></b-avatar><!-- image profil -->
                <form method="get" class="ml-3">
                    <!--<label class="m-0">Commentaire</label>-->
                    <textarea class="border-light" name="text_post" rows="1" placeholder="Votre commentaire" v-model="text" required></textarea>                    
                </form>
                <button class="border-0 rounded-pill p-2" @click="sendComment">Commenter</button>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../http';

export default {
    name: 'AddComment',
    data() {
        return {
            text: ''
        }
    },
    methods: {
        sendComment() {
            let payload = {
                text: this.text
            };
            
            http.post(`/posts/${this.$route.params.post_id}/comments/`, payload)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
    }
}
</script>