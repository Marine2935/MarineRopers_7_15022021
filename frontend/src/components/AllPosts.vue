<template>
    <div class="container mt-4">
            <div class="row justify-content-center" v-for="post in posts" :key="post.id">
                <div class="test col-8 bg-white rounded shadow-sm p-3 my-3">
                    <div class="text-left d-flex justify-content-between">
                        <div class="d-flex">
                            <b-avatar></b-avatar><!-- image profil -->
                            <div class="ml-3">
                                <p class="font-weight-bold m-0">{{ post.user.username }}</p>
                                <p>
                                    <span v-if="post.date_post_second < 60">{{ post.date_post_second }}s</span>
                                    <span v-if="post.date_post_minute < 60 && post.date_post_minute !== 0">{{ post.date_post_minute }}min</span>
                                    <span v-if="post.date_post_hour < 24 && post.date_post_hour !== 0">{{ post.date_post_hour }}h</span>
                                    <span v-if="post.date_post_day < 30 && post.date_post_day !== 0">{{ post.date_post_day }} jour<span v-if="post.date_post_day > 1">s</span></span>  
                                    <span v-if="post.date_post_month < 12 && post.date_post_month !== 0">{{ post.date_post_month }} mois</span>
                                    <span v-if="post.date_post_year !== 0">{{ post.date_post_year }} année<span v-if="post.date_post_year > 1">s</span></span>                              
                                </p>
                            </div>
                        </div>
                        <div v-show="loggedUser.id === post.user_id">
                            <b-dropdown data-toggle="dropdown" block variant="link" id="dropdown-offset" offset="-110" toggle-class="text-decoration-none" no-caret>
                                <template #button-content><b-icon icon="gear" font-scale="0.9"></b-icon></template>
                                <b-dropdown-item class="text-dark py-1 menu-post"><b-icon class="mr-2" icon="pencil-square" font-scale="0.9"></b-icon>Modifier le post</b-dropdown-item>
                                <b-dropdown-item class="text-dark py-1 menu-post"><b-icon class="mr-2" icon="trash" font-scale="0.9"></b-icon>Supprimer le post</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>                    
                    <router-link :to="{ name: 'Post', params: { post_id: post.id } }" class="text-dark">
                        <p class="mb-4">{{ post.text }}</p>
                    </router-link>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <Reactions :type="'all_posts'" :postId="post.id" />
                            <p class="m-0 ml-5">{{ post.comments.length }} Commentaire<span v-if="post.comments.length > 1">s</span></p>
                        </div>                        
                        <p class="m-0" v-if="post.last_update">Modifié il y a 
                            <span v-if="post.last_update_second < 60">{{ post.last_update_second }}s</span>
                            <span v-if="post.last_update_minute < 60 && post.last_update_minute !== 0">{{ post.last_update_minute }}min</span>
                            <span v-if="post.last_update_hour < 24 && post.date_post_hour !== 0">{{ post.last_update_hour }}h</span>
                            <span v-if="post.last_update_day < 30 && post.date_post_day !== 0">{{ post.last_update_day }} jour<span v-if="post.date_post_day > 1">s</span></span>  
                            <span v-if="post.last_update_month < 12 && post.last_update_month !== 0">{{ post.last_update_month }} mois</span>
                            <span v-if="post.last_update_year !== 0">{{ post.last_update_year }} année<span v-if="post.last_update_year > 1">s</span></span>
                        </p>
                    </div>                    
                </div>
            </div>  
            <div v-if="!posts">
                <p>Aucun post !</p>
            </div>
        </div>  
</template>

<script>
import http from '@/http';
import Reactions from '@/components/Reactions';
import { mapState } from "vuex";

export default {
    name: 'AllPosts',
    components: {
        Reactions
    },
    data() {
        return {
            posts: null
        }
    },
    props: {
        type: String
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    created() {
        if (this.type === 'user_posts') {
            http.get(`/users/${this.loggedUser.id}/posts`)
            .then(response => this.posts = response.data)
            .catch(error => console.log(error));   
        } else {
            http.get('/posts/')
            .then(response => this.posts = response.data)
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