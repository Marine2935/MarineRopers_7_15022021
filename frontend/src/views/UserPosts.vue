<template>
    <div class="container my-5">
        <h1>
            <span v-if="loggedUser.username == $route.params.username">Vos Posts</span>
            <span v-else>Posts de {{ $route.params.username }}</span>
        </h1>
        <AllPosts :type="'user_posts'" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import AllPosts from '@/components/AllPosts';

export default {
    name: 'UserPosts',
    components: {
        AllPosts
    },
    computed: {
        ...mapState(['loggedUser'])
    }
}
</script>