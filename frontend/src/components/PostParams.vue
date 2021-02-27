<template>
    <div>
        <b-dropdown data-toggle="dropdown" block variant="link" id="dropdown-offset" offset="-110" toggle-class="text-decoration-none" no-caret>
            <template #button-content><b-icon icon="gear" font-scale="0.9"></b-icon></template>
            <b-dropdown-item class="text-dark py-1 menu-post" @click="editPost"><b-icon class="mr-2" icon="pencil-square" font-scale="0.9"></b-icon>Modifier le post</b-dropdown-item>
            <b-dropdown-item class="text-dark py-1 menu-post" @click="deletePost"><b-icon class="mr-2" icon="trash" font-scale="0.9"></b-icon>Supprimer le post</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import http from '@/http';

export default {
    name: 'PostParams',
    props: {
        post_id: Number
    },
    methods: {
        editPost() {

        },
        deletePost() {
            http.delete(`/posts/${this.post_id}`)
            .then(() => {
                if (this.$router.currentRoute.path !== '/feed')
                this.$router.push('/feed')
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