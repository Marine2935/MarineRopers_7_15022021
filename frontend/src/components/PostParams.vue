<template>
    <div>
        <b-dropdown data-toggle="dropdown" block variant="link" id="dropdown-offset" offset="-110" toggle-class="text-decoration-none" aria-label="Menu déroulant des modifications de post" no-caret v-if="post_id">
            <template #button-content aria-label="Bouton du menu déroulant">
                <b-icon icon="gear" font-scale="0.9"></b-icon>
            </template>
            <b-dropdown-item class="text-dark py-1 menu-post" @click="togglePopup(); definePost(post_id);">
                <b-icon class="mr-2" icon="pencil-square" font-scale="0.9"></b-icon>Modifier le post
            </b-dropdown-item>
            <b-dropdown-item class="text-dark py-1 menu-post" @click="deletePost">
                <b-icon class="mr-2" icon="trash" font-scale="0.9"></b-icon>Supprimer le post
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import http from '@/http';
import { mapActions, mapMutations, mapState } from "vuex";

export default {
    name: 'PostParams',

    props: {
        post_id: Number
    },

    computed: {
        ...mapState(['loggedUser'])        
    },

    methods: {
        ...mapActions(['togglePopup']),

        ...mapMutations(['definePost']),        

        deletePost() {
            http.delete(`/posts/${this.post_id}/${this.loggedUser.id}/${this.loggedUser.isAdmin}`)
            .then(() => {
                if (this.$router.currentRoute.path == `/post/${this.post_id}`) {
                    this.$router.push('/feed');
                } else {
                    this.$parent.$emit('deleted', this.post_id);
                }
            })
            .catch(error => console.log(error));
        }
    }
}
</script>

<style lang="scss">
.menu-post {
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