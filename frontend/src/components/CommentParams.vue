<template>
    <div>
        <b-dropdown data-toggle="dropdown" block variant="link" id="dropdown-offset" offset="-165" toggle-class="text-decoration-none" no-caret v-if="comment_id">
            <template #button-content aria-label="Menu déroulant des modifications de commentaire">
                <b-icon icon="gear" font-scale="0.9"></b-icon>
            </template>
            <b-dropdown-item class="text-dark py-1 menu-comment" @click="deleteComment">
                <b-icon class="mr-2" icon="trash" font-scale="0.9"></b-icon>Supprimer le commentaire
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

export default {
    name: 'CommentParams',

    props: {        
        answer_id: Number,
        comment_id: Number,
        post_id: Number,
        type: String
    },

    computed: {
        ...mapState(['loggedUser'])        
    },

    methods: {
        deleteComment() {    
            if (this.type === 'answer') {
                http.delete(`/posts/${this.post_id}/comments/${this.comment_id}/answers/${this.answer_id}/${this.loggedUser.id}/${this.loggedUser.isAdmin}`)
                .then(() => {
                    this.$parent.$emit('deleted', this.answer_id);
                })
                .catch(error => console.log(error));
            } else if (this.type === 'comment') {
                http.delete(`/posts/${this.post_id}/comments/${this.comment_id}/${this.loggedUser.id}/${this.loggedUser.isAdmin}`)
                .then(() => {
                    this.$parent.$emit('deleted', this.comment_id);
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>

<style lang="scss">
.menu-comment {
    font-size: 0.9rem;
}

.dropdown-menu {
    box-shadow: 0.1rem 0.1rem 0.2rem 0.2rem rgb(127 127 127 / 25%);
    border-radius: 0.8rem;
    border: none;
}

.dropdown-item {
    padding: 0.25rem 1rem;
}

.btn-link {
    color: #2c3e50;
}
</style>